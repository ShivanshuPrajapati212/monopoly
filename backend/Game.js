import { Board } from "./Board.js";
import {
  GET_PLAYERS,
  GET_SELF,
  INIT_GAME,
  INVALID,
  MOVE,
  PAY,
  RECEIVE,
  RENT,
  SELL,
} from "./messages.js";

function getRandomInteger(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // return 4;
}

function changePosition(number, currentPosition) {
  if (number + currentPosition > 39) {
    return number + currentPosition - 40;
  }
  return number + currentPosition;
}

export class Game {
  constructor(...sockets) {
    // allow constructor(socket1, socket2, ...) or constructor([socket1, socket2, ...])
    const socketsArr = Array.isArray(sockets[0]) ? sockets[0] : sockets;

    this.players = socketsArr.map((socket, i) => ({
      socket,
      money: 1500,
      position: 0,
      name: `Player ${i + 1}`,
    }));

    this.board = new Board();
    this.currentTurn = 0; // index in this.players

    // notify all players
    this.players.forEach((p) =>
      p.socket.send(
        JSON.stringify({
          type: INIT_GAME,
          payload: { name: p.name },
        })
      )
    );
  }

  findPlayerIndexBySocket(socket) {
    return this.players.findIndex((p) => p.socket === socket);
  }

  broadcast(obj) {
    const msg = JSON.stringify(obj);
    this.players.forEach((p) => p.socket.send(msg));
  }

  roll(socket) {
    const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;

    if (idx !== this.currentTurn) {
      this.players[idx].socket.send(
        JSON.stringify({ type: INVALID, payload: "not your turn" })
      );
      return;
    }

    try {
      const min = 1;
      const max = 6;
      const randomInt1 = getRandomInteger(min, max);
      const randomInt2 = getRandomInteger(min, max);

      const player = this.players[idx];
      if (
        player.position >
        changePosition(randomInt1 + randomInt2, player.position)
      ) {
        player.money += 200;
        this.broadcast({
          type: RECEIVE,
          payload: {
            name: player.name,
            amount: 200,
          },
        });
      }
      player.position = changePosition(
        randomInt1 + randomInt2,
        player.position
      );

      const moveMsg = {
        type: MOVE,
        payload: {
          name: player.name,
          position: player.position,
          roll: [randomInt1, randomInt2],
        },
      };

      this.broadcast(moveMsg);
      this.specialSpace(player.socket)
      this.checkRent(player.socket)

      // advance turn
      this.currentTurn = (this.currentTurn + 1) % this.players.length;

      return [randomInt1, randomInt2];
    } catch (error) {
      console.log(error);
    }
  }

  buy(socket, noOfHouses) {
    const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;

    if (
      idx !==
      (this.currentTurn - 1 + this.players.length) % this.players.length
    ) {
      // Buying usually happens immediately after your move; adapt if your flow differs.
      // This check ensures the buyer is the player who just moved. Remove if not needed.
      // For a simpler rule: require idx === this.currentTurn (uncomment if you want buy before advancing turn)
    }

    try {
      const player = this.players[idx];

      if (this.board.nonBuyable().includes(player.position)) {
        player.socket.send(
          JSON.stringify({ type: INVALID, payload: "non buyable" })
        );
        return;
      }

      const res = this.board.buyProperty(player, player.position, noOfHouses);

      if (res.type === INVALID) {
        player.socket.send(JSON.stringify(res));
        return res;
      }

      // deduct cost and broadcast update
      player.money -= res.payload.cost;
      this.broadcast(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  checkRent(socket) {
    const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;

    try {
      const player = this.players[idx];
      const res = this.board.checkRent(player, player.position);
      if (!res) return;

      // find owner player object
      const ownerIdx = this.players.findIndex(
        (p) => p.name === res.payload.ownerName
      );
      if (ownerIdx !== -1) {
        player.money -= res.payload.rent;
        this.players[ownerIdx].money += res.payload.rent;
      }

      this.broadcast(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  // sell a property at board index `idx` for the player who invoked the action
  sell(socket, idx, noOfHouses) {
    const pIdx = this.findPlayerIndexBySocket(socket);
    if (pIdx === -1) return;

    try {
      const player = this.players[pIdx];

      const res = this.board.sellProperty(player, idx, noOfHouses);

      if (res.type === INVALID) {
        player.socket.send(JSON.stringify(res));
        return res;
      }

      // credit amount to player and broadcast
      player.money += res.payload.amount;
      this.broadcast(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  specialSpace(socket) {
    const pIdx = this.findPlayerIndexBySocket(socket);
    if (pIdx === -1) return;

    try {
      const player = this.players[pIdx];

      const res = this.board.checkSpecialSpace(player, player.position);

      if (res === null || !res.type) {
        return;
      }
      if (res.type === RECEIVE) {
        player.money += res.payload.amount;
        this.broadcast(res);
        return;
      }
      if (res.type === PAY) {
        player.money -= res.payload.amount;
        this.broadcast(res);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }
  getBoard(socket) {
     const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;
    
    this.players[idx].socket.send(JSON.stringify(this.board.getBoard()))
    return;
  }
  getPlayers(socket){
    const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;
    
    this.players[idx].socket.send(JSON.stringify({
        type: GET_PLAYERS,
        payload: this.players,
      }))
    return;
  }
  getSelf(socket){
    const idx = this.findPlayerIndexBySocket(socket);
    if (idx === -1) return;
    
    this.players[idx].socket.send(JSON.stringify({
        type: GET_SELF,
        payload: this.players[idx].name,
      }))
    return;
  }
}
