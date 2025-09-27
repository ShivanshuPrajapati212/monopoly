import React from "react";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

const Board = ({ socket, started, board, players }) => {
  return (
    <div className={`flex flex-col items-center container max-w-max text-xs text-center`}>
      <div className="flex w-full">
        <BigCard index={20} color={'bg-gray-800'} players={players}>{board[20]?.name}</BigCard>
        <div className="grid grid-flow-col grid-cols-9">
          {board
            ?.slice(21, 30) // take elements 1..9
            .map((element, idx) => (
              <SmallCard key={element.id ?? idx} players={players} index={element.id} colorFace={'-bottom-[20%] w-full h-[20%]'} cost={element.cost} color={element.color} ownership={element.ownership}>{element.name}</SmallCard>
            ))}
        </div>
        <BigCard index={30} color={"bg-gray-800"} players={players}>{board[30]?.name}</BigCard>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          {board
            ?.slice(11, 20) // take elements 1..9
            .reverse()
            .map((element, idx) => (
              <SmallCard className="lg:!h-20 lg:!w-28" players={players} index={element.id} key={element.id ?? idx} colorFace={'-right-[20%] w-[20%] h-full top-0'} cost={element.cost} color={element.color} ownership={element.ownership}>
                {element.name}
              </SmallCard>
            ))}
        </div>
        <div className="flex flex-col">
          {board
            ?.slice(31, 40) // take elements 1..9
            .map((element, idx) => (
              <SmallCard className="lg:!h-20 lg:!w-28" players={players} index={element.id} key={element.id ?? idx} colorFace={'-left-[20%] w-[20%] h-full top-0'} cost={element.cost} color={element.color} ownership={element.ownership}>
                {element.name}
              </SmallCard>
            ))}
        </div>
      </div>

      <div className="flex w-full">
        <BigCard index={10} color={'bg-gray-800'} players={players}>{board[10]?.name}</BigCard>
        <div className="grid grid-flow-col grid-cols-9">
          {board
            ?.slice(1, 10) // take elements 1..9
            .reverse() // reverse them
            .map((element, idx) => (
              <SmallCard key={idx} players={players} index={element.id} colorFace={'-top-[20%] w-full h-[20%]'} color={element.color} cost={element.cost} ownership={element.ownership}>{element.name}</SmallCard>
            ))}
        </div>
        <BigCard index={0} color={'bg-green-600'} players={players}>{board[0]?.name}</BigCard>
      </div>
    </div>
  );
};

export default Board;
