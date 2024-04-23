'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const PlayerItem = ({ name, type, index, movePlayer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: type,
    hover(item) {
      if (!item || item.index === index) {
        return;
      }
      movePlayer(item.index, index);
      item.index = index;
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className="player-item"
    >
      {name}
    </div>
  );
};

const PlayersTable = () => {
  const [finalPlayers, setFinalPlayers] = useState([
    
  ]);

  const [allPlayers, setAllPlayers] = useState([
    "V Kohli",
    "J Butler",
    "M Marsh",
    "R Jadeja",
    "J Bumrah",
    "J Archer",
  ]);

  const movePlayer = (dragIndex, hoverIndex) => {
    const player = allPlayers[dragIndex];
    const updatedPlayers = [...allPlayers];
    updatedPlayers.splice(dragIndex, 1);
    updatedPlayers.splice(hoverIndex, 0, player);
    setAllPlayers(updatedPlayers);
  };

  return (
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
        <div className="flex flex-col justify-center items-center">
          <div>Name</div>
          {finalPlayers.map((name, index) => (
            <PlayerItem
              key={name}
              name={name}
              type="finalPlayer"
              index={index}
              movePlayer={movePlayer}
            />
          ))}
        </div>
        {/* Contribution */}
        <div className="flex flex-col justify-center items-center">
          <div>Contribution</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
        </div>
      </div>

      {/* All Players */}
      <div className="flex justify-center items-center">All Players</div>
      <div className="flex justify-center items-center gap-4">
        {/* Player Names */}
        <div className="flex flex-col justify-center items-center">
          <div>Name</div>
          {allPlayers.map((name, index) => (
            <PlayerItem
              key={name}
              name={name}
              type="allPlayer"
              index={index}
              movePlayer={movePlayer}
            />
          ))}
        </div>
        {/* Batting Points */}
        <div className="flex flex-col justify-center items-center">
          <div>Bat</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
          <div>99</div>
        </div>
        {/* Bowling Points */}
        <div className="flex flex-col justify-center items-center">
          <div>Bowl</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
          <div>99</div>
        </div>
        {/* WK Points */}
        <div className="flex flex-col justify-center items-center">
          <div>WK</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
          <div>99</div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <main className="App">
      <DndProvider backend={HTML5Backend}>
        <PlayersTable />
      </DndProvider>
    </main>
  );
};

export default App;
