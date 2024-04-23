import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function PlayersTable() {
  // Player data
  const players = [
    { id: "1", name: "V Kohli", contribution: 93 },
    { id: "2", name: "J Butler", contribution: 102 },
    { id: "3", name: "M Marsh", contribution: 104 },
    { id: "4", name: "R Jadeja", contribution: 73 },
    { id: "5", name: "J Bumrah", contribution: 99 },
    { id: "6", name: "J Archer", contribution: 99 }
  ];

  // Function to handle drag and drop
  const onDragEnd = (result) => {
    // TODO: Implement logic to handle drag and drop
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col justify-center items-center gap-8">
        {/* Final 5 */}
        <div>Final 5</div>
        <div className="flex justify-between gap-2">
          {/* Roles */}
          <div className="flex flex-col justify-center items-center">
            <div>Roles</div>
            <div>Batsman</div>
            <div>WK</div>
            <div>All Rounder</div>
            <div>Bowler</div>
            <div>Bowler</div>
          </div>
          {/* Player Names */}
          <Droppable droppableId="final-5">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col justify-center items-center"
              >
                <div>Name</div>
                {players.map((player, index) => (
                  <Draggable key={player.id} draggableId={player.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {player.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* Contribution */}
          <div className="flex flex-col justify-center items-center">
            <div>Contribution</div>
            {players.map((player) => (
              <div key={player.id}>{player.contribution}</div>
            ))}
          </div>
        </div>

        {/* All Players */}
        <div className="flex justify-center items-center">All Players</div>
        <div className="flex justify-center items-center gap-4">
          {/* Player Names */}
          <div className="flex flex-col justify-center items-center">
            <div>Name</div>
            {players.map((player) => (
              <div key={player.id}>{player.name}</div>
            ))}
          </div>
          {/* Batting Points */}
          <div className="flex flex-col justify-center items-center">
            <div>Bat</div>
            {players.map((player) => (
              <div key={player.id}>{player.contribution}</div>
            ))}
          </div>
          {/* Bowling Points */}
          <div className="flex flex-col justify-center items-center">
            <div>Bowl</div>
            {players.map((player) => (
              <div key={player.id}>{player.contribution}</div>
            ))}
          </div>
          {/* WK Points */}
          <div className="flex flex-col justify-center items-center">
            <div>WK</div>
            {players.map((player) => (
              <div key={player.id}>{player.contribution}</div>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
