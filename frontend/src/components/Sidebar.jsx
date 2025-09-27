import React, { useState } from "react";
import { BUY, INIT_GAME, ROLL } from "../utils/messages";
import Dice from "./Dice";

const Sidebar = ({ socket, started, board, players, self, roll, isRolling, setIsRolling }) => {
  const nonBuyable = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col items-center justify-between py-5 lg:w-[30%] bg-[#001b36]">
      {!started && (
        <button
          onClick={() => {
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
              })
            );
          }}
          className="btn"
        >
          Start Game
        </button>
      )}
      {started && Array.isArray(players) && (
        <div>
          <div className="text-center text-4xl">Player Stats</div>
          {players.map((e) => (
            <div key={e.id ?? e.id} className="p-2 py-5">
              <div>{e.name}</div>
              <div>
                Money: <span className="text-green-400">${e.money}</span>
              </div>
              <div>Position: {e.position}</div>
            </div>
          ))}
        </div>
      )}
      {started &&
        Array.isArray(players) &&
        Array.isArray(board) &&
        (() => {
          const player = players.find((f) => f.name === self);
          if (!player) return null;
          const card = board.find((e) => e.id === player.position);
          if (!card) return null;

          // render only when card is buyable
          return !nonBuyable.includes(card.id) ? (
            <div className="border-2 border-gray-400 p-5">
              <div className={`${card.color} w-full p-2 px-14`}>
                <div className="text-center text-xl font-semibold">
                  {card.name}
                </div>
                <div className="text-center text-md font-medium">
                  Owner: {card.ownership[0] ? card.ownership[0] : "None"}
                </div>
              </div>
              <div className="text-center font-medium text-lg mt-3">
                Cost: ${card.cost[0]}
              </div>
              <div className="text-center text-lg my-1">
                Rent: ${card.rents[0]}
              </div>
              <div>
                <ul>
                  <li className="flex justify-around">
                    <p>With 1 House</p>
                    <p>${card.rents[1]}</p>
                  </li>
                  <li className="flex justify-around">
                    <p>With 2 House</p>
                    <p>${card.rents[2]}</p>
                  </li>
                  <li className="flex justify-around">
                    <p>With 3 House</p>
                    <p>${card.rents[3]}</p>
                  </li>
                  <li className="flex justify-around">
                    <p>With 4 House</p>
                    <p>${card.rents[4]}</p>
                  </li>
                </ul>
              </div>
              <div className="text-center text-lg mt-3">
                With Hotel ${card.rents[5]}
              </div>
              <div className="text-center text-lg mt-1">
                Houses cost ${card.cost[1]} each
              </div>
              <div className="text-center text-lg mt-1">
                Hotels, ${card.cost[1]} Plus 4 houses
              </div>
              <div className="text-center text-lg mt-1">
                Mortgage/Sell Value ${card.cost[0] / 2}
              </div>
              {!card.ownership[0] && (
                <div className="flex justify-around items-center my-2">
                  <div className="flex flex-col m-1">
                    <label for="countries" class="block mb-2 text-sm font-medium text-white">Select No. of Houses</label>
                    <select
                    value={selected}
                    onChange={(e) => setSelected(Number(e.target.value))}
                    className="text-sm rounded-lg block w-full p-1 bg-gray-500 border-gray-600 placeholder-gray-400 text-white"
                  >
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  </div>
                  
                  <button
                  onClick={() => {
            socket.send(
              JSON.stringify({
                type: BUY,
                noOfHouses: selected
              })
            );
          }}
                    className={`text-white ${card.color} cursor-pointer font-medium rounded-sm text-sm px-2 py-2`}
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          ) : null;
        })()}
      {started && (
        <Dice socket={socket} roll={roll} isRolling={isRolling} setIsRolling={setIsRolling} />
      )}
    </div>
  );
};

export default Sidebar;
