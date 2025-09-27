import SmallCard from "../components/SmallCard";
import BigCard from "../components/BigCard";
import Board from "../components/Board";
import Sidebar from "../components/Sidebar";
import { BUY, GAME_OVER, GET_BOARD, GET_PLAYERS, GET_SELF, INIT_GAME, INVALID, MOVE, PAY, RECEIVE, RENT } from "../utils/messages";
import { useSocket } from "../hooks/useSocket.js";
import { useEffect, useState } from "react";

const GamePage = () => {
  const socket = useSocket();

   const [started, setStarted] = useState(false)
   const [board, setBoard] = useState([])
  const [players, setPlayers] = useState([])
  const [roll, setRoll] = useState([1,1])
  const [self, setSelf] = useState()

  // new: track whether dice animation is in progress and buffer moves
  const [isRolling, setIsRolling] = useState(false);
  const [pendingMoves, setPendingMoves] = useState([]);

  // helper to apply a move payload (used both for immediate and buffered moves)
  const applyMovePayload = (payload) => {
    setPlayers((prev) => {
      if (!Array.isArray(prev)) return prev;
      const idx = prev.findIndex((p) => p.name === payload.name);
      if (idx === -1) return prev; // player not found

      const updated = [...prev];
      updated[idx] = { ...updated[idx], position: payload.position };
      return updated;
    });
    setRoll(payload.roll);
  };

   useEffect(() => {
        if (!socket) {
            return;
        }
        const handler = (event) => {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case INIT_GAME:
              setStarted(true);
              socket.send(JSON.stringify({ type: GET_BOARD }));
              socket.send(JSON.stringify({ type: GET_PLAYERS }));
              socket.send(JSON.stringify({ type: GET_SELF }));
              console.log("connected");
              break;
            case MOVE:
              console.log("Move made", message.payload);

              // if dice animation is in progress, buffer the move(s)
              if (isRolling) {
                setPendingMoves((prev) => [...prev, message.payload]);
              } else {
                applyMovePayload(message.payload);
              }
              break;
            
            case BUY:
              if(message.type === INVALID) {
                console.log(message)
                break;
              }
              setBoard((prev) => {
                if (!Array.isArray(prev)) return prev;
                const idx = prev.findIndex((p) => p.id === message.payload.changeInBoard.id);
                if (idx === -1) return prev; // player not found

                const updated = [...prev];
                updated[idx] = message.payload.changeInBoard;
                return updated;
              });
              setPlayers((prev) => {
                if (!Array.isArray(prev)) return prev;
                const idx = prev.findIndex((p) => p.name === message.payload.player);
                if (idx === -1) return prev; // player not found

                const updated = [...prev];
                updated[idx] = { ...updated[idx], money:  updated[idx].money - message.payload.cost};
                return updated;
              });
              break;
            case GET_BOARD:
              // set the real payload instead of "hi"
              setBoard(message.payload);
              console.log("received board payload:", message.payload);
              break;
            case GET_PLAYERS:
              // set the real payload instead of "hi"
              setPlayers(message.payload);
              console.log("received players payload:", message.payload);
              break;
            case GET_SELF:
              // set the real payload instead of "hi"
              setSelf(message.payload);
              console.log("received self payload:", message.payload);
              break;
            case PAY:
              setPlayers((prev) => {
                if (!Array.isArray(prev)) return prev;
                const idx = prev.findIndex((p) => p.name === message.payload.name);
                if (idx === -1) return prev; // player not found

                const updated = [...prev];
                updated[idx] = { ...updated[idx], money:  updated[idx].money - message.payload.amount};
                return updated;
              });
              break;
            case RECEIVE:
              console.log("received -", message)
              setPlayers((prev) => {
                if (!Array.isArray(prev)) return prev;
                const idx = prev.findIndex((p) => p.name === message.payload.name);
                if (idx === -1) return prev; // player not found
                
                const updated = [...prev];
                updated[idx] = { ...updated[idx], money:  updated[idx].money + message.payload.amount};
                return updated;
              });
              console.log("received - ", players)
              break;
            case RENT:
              setPlayers((prev) => {
                if (!Array.isArray(prev)) return prev;
                const idx = prev.findIndex((p) => p.name === message.payload.name);
                const ownerIdx = prev.findIndex((p) => p.name === message.payload.ownerName)
                if (idx === -1) return prev; // player not found

                const updated = [...prev];
                updated[idx] = { ...updated[idx], money:  updated[idx].money - message.payload.rent};
                updated[ownerIdx] = { ...updated[ownerIdx], money:  updated[ownerIdx].money + message.payload.rent};
                return updated;
              });
              break;
              
            case GAME_OVER:
                console.log("Game over");
                break;
            case INVALID:
                console.log("Invalid move, ", message.payload);
                break;
          }
        };

        socket.addEventListener("message", handler);
        return () => socket.removeEventListener("message", handler);
    }, [socket, isRolling]); // added isRolling so handler sees latest rolling flag

    // when rolling finishes, apply any buffered moves
    useEffect(() => {
      if (!isRolling && pendingMoves.length > 0) {
        // apply buffered moves in order (usually there's only one)
        pendingMoves.forEach((payload) => applyMovePayload(payload));
        setPendingMoves([]);
      }
    }, [isRolling, pendingMoves]);

    // log when board actually updates
    useEffect(() => {
      console.log("board updated:", board);
      console.log("players updated:", players);
    }, [board, players]);

  return (
    <div className="flex max-lg:flex-col justify-between w-full p-1">
      {started && players && <div className=" lg:w-[80%] flex items-center justify-center w-max">
        <Board socket={socket} started={started} board={board} players={players}/>
      </div> }
      <Sidebar
        socket={socket}
        started={started}
        board={board}
        players={players}
        self={self}
        roll={roll}
        isRolling={isRolling}
        setIsRolling={setIsRolling}
      />
      {/* pass rolling state to Dice via Sidebar -> Dice: we'll provide isRolling control via Sidebar -> Dice */}
    </div>
  );
};

export default GamePage;
