"use client";
import getPlayerByOrder from "@/utils/getPlayerByOrder";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Players() {
  const [buyerLogo, setbuyerLogo]=useState('MI')
  const [selected,setSelected]=useState(null)
  const searchParams = useSearchParams();
  const [myPlayers, setMyPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]); // Define allPlayers state
  const teamLogo = buyerLogo;
  const cookies = new Cookies(null, { path: "/" });

  const roomID = searchParams.get("roomID");
  
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

  const handleClick = (number, logo) => {
    setbuyerLogo(logo);
    setSelected(number);
  };

  return (
    <div className="flex flex-col rounded-md p-4 justify-center items-center text-black bg-white gray-border">
      {/* Render allPlayers here */}
      <div className="flex gap-2 px-0  justify-between  overflow-auto items-center p-4">
          <img
            className={` ${
              selected == 1 ? "border-red-500 border-2 border-solid" : ""
            } w-12 aspect-square bg-white rounded-full p-2 gray-border pointer-events-auto`}
            src="/images/team-logos/MIlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "MI");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2 gray-border"
            src="/images/team-logos/CSKlogo.webp"
            alt=""
            onClick={() => {
              handleClick(2, "CSK");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/RCBlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "RCB");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/SRHlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "SRH");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/KKRlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "KKR");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/PBKSlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "PBKS");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/RRlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "RR");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/GTlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "GT");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/DClogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "DC");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/LSGlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "LSG");
            }}
          />
        </div>
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
