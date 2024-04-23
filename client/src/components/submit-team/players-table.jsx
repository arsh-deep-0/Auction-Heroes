import React from "react";

export default function PlayersTable() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {/*Final 5  */}
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
        {/*Player Names*/}
        <div className="flex flex-col justify-center items-center">
          <div>Name</div>
          <div>V Kohli</div>
          <div>J Butler</div>
          <div>M Marsh</div>
          <div>R jadeja</div>
          <div>J bumrah</div>
        </div>
        {/*Contribution*/}
        <div className="flex flex-col justify-center items-center">
          <div>Contribution</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
        </div>
      </div>

      {/* All Players*/}
      <div className="flex justify-center items-center">All Players</div>
      <div className="flex justify-center items-center gap-4">
        {/*Player Names*/}
        <div className="flex flex-col justify-center items-center">
          <div>Name</div>
          <div>V Kohli</div>
          <div>J Butler</div>
          <div>M Marsh</div>
          <div>R jadeja</div>
          <div>J bumrah</div>
          <div>J Archer</div>
        </div>
        {/*Batting Points*/}
        <div className="flex flex-col justify-center items-center">
          <div>Bat</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
          <div>99</div>
        </div>
        {/*Bowling Points*/}
        <div className="flex flex-col justify-center items-center">
          <div>Bowl</div>
          <div>93</div>
          <div>102</div>
          <div>104</div>
          <div>73</div>
          <div>99</div>
          <div>99</div>
        </div>
        {/*WK Points*/}
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
}
