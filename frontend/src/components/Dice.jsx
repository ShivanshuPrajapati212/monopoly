import React, { useState, useEffect } from "react";
import { ROLL, GET_BOARD, GET_PLAYERS, GET_SELF } from "../utils/messages";

const Dice = ({ socket, roll, isRolling, setIsRolling }) => {
  const [dice1Value, setDice1Value] = useState((Array.isArray(roll) && roll[0]) || 1);
  const [dice2Value, setDice2Value] = useState((Array.isArray(roll) && roll[1]) || 1);
  const [targetDice1, setTargetDice1] = useState((Array.isArray(roll) && roll[0]) || 1);
  const [targetDice2, setTargetDice2] = useState((Array.isArray(roll) && roll[1]) || 1);

  useEffect(() => {
    // keep targets in sync with incoming roll prop
    if (Array.isArray(roll) && roll.length >= 2) {
      setTargetDice1(roll[0]);
      setTargetDice2(roll[1]);

      // if not currently animating, update displayed dice immediately
      if (!isRolling) {
        setDice1Value(roll[0]);
        setDice2Value(roll[1]);
      }
    }
  }, [roll, isRolling]);

  const getDiceFace = (number) => {
    const dotPatterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const pattern = dotPatterns[number] || [];

    return (
      <div className="grid grid-cols-3 gap-1 p-1">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              pattern.includes(index) ? "bg-black" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  const rollDice = () => {
    if (isRolling) return;
    if (!socket) return;

    // request server to roll
    socket.send(JSON.stringify({ type: ROLL }));

    // notify parent that animation starts (safe-call)
    if (typeof setIsRolling === "function") setIsRolling(true);

    // animate for ~2000ms with smoother ticks
    const durationMs = 2000;
    const tickMs = 80;
    const maxRolls = Math.ceil(durationMs / tickMs);
    let rollCount = 0;

    const rollInterval = setInterval(() => {
      setDice1Value(Math.floor(Math.random() * 6) + 1);
      setDice2Value(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);

        // prefer the server-provided roll if available, otherwise fall back to current targets
        const final1 = Array.isArray(roll) && roll.length >= 2 ? roll[0] : targetDice1;
        const final2 = Array.isArray(roll) && roll.length >= 2 ? roll[1] : targetDice2;

        setDice1Value(final1);
        setDice2Value(final2);

        // end animation (safe-call)
        if (typeof setIsRolling === "function") setIsRolling(false);

        // after animation finishes, request updated board/players/self from server
        // small delay to give server time to process the roll message
        setTimeout(() => {
          if (!socket) return;
          socket.send(JSON.stringify({ type: GET_BOARD }));
          socket.send(JSON.stringify({ type: GET_PLAYERS }));
          socket.send(JSON.stringify({ type: GET_SELF }));
        }, 250);
      }
    }, tickMs);
  };

  return (
    // compact container so this can be embedded in the Sidebar
    <div className="flex flex-col items-center p-2">
      <div className="flex gap-4 justify-center mb-2">
        <div className={`relative ${isRolling ? "animate-bounce" : ""}`}>
          <div
            className={`w-14 h-14 bg-white rounded-xl shadow-lg transform transition-transform duration-100  ${
              isRolling ? "rotate-12 scale-110" : "hover:scale-105"
            }`}
          >
            {getDiceFace(dice1Value)}
          </div>
        </div>

        <div className={`relative ${isRolling ? "animate-bounce" : ""}`}>
          <div
            className={`w-14 h-14 bg-white rounded-xl shadow-lg transform transition-transform duration-100 ${
              isRolling ? "-rotate-12 scale-110" : "hover:scale-105"
            }`}
          >
            {getDiceFace(dice2Value)}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 bg-red-500`}
        >
          {isRolling ? "Rolling..." : "Roll"}
        </button>
      </div>
    </div>
  );
};

export default Dice;
