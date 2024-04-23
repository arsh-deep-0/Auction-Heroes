"use client";
import getPlayerByOrder from "@/utils/getPlayerByOrder";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Players() {
  const searchParams = useSearchParams();
  const [myPlayers, setMyPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]); // Define allPlayers state

  const cookies = new Cookies(null, { path: "/" });

  const teamLogo = cookies.get("teamLogo");
  const roomID = cookies.get("roomID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/players/getAllPlayers/${roomID}/${teamLogo}`
        );
        setMyPlayers(response.data.data); // Assuming response contains player data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchData();
  }, [roomID, teamLogo]); // Add dependencies for useEffect

  useEffect(() => {
    const fetchAllPlayers = async () => {
      const playerDataPromises = myPlayers.map(async (player) => {
        const playerData = await getPlayerByOrder(player.playerOrder);
        console.log("pd", playerData);
        return playerData;
      });

      const allPlayerData = await Promise.all(playerDataPromises);
      setAllPlayers(allPlayerData);
    };

    if (myPlayers.length > 0) {
      fetchAllPlayers();
    }
  }, [myPlayers]); // Add myPlayers as a dependency

  return (
    <div className="flex flex-col rounded-md p-4 justify-center items-center text-black bg-white gray-border">
      {/* Render allPlayers here */}
      <div className="flex w-[80%] gap-2 justify-between text-blue ">
        <div className="w-48 ">Name</div>
       
        <div className="w-16 text-center">Bat</div>
        <div className="w-16 text-center">Bowl</div>
        <div className="w-16 text-center">WK</div>
      </div>
      {allPlayers.map((player, index) => (
        <div className="flex w-[80%] gap-2 justify-between" key={index}> 
          <div className="w-48">{player.playerFirstName + ' ' + player.playerLastName}</div>
          <div className="w-16 text-center">{player.battingPoints}</div>
          <div className="w-16 text-center">{player.bowlingPoints}</div>
          <div className="w-16 text-center">{player.wkPoints}</div>
        </div>
      ))}
    </div>
  );
}
