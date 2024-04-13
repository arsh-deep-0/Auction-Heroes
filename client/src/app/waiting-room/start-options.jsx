"use client";
import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import getHostID from "@/components/common/hostId";

export default function StartOptions() {
  const cookies = new Cookies(null, { path: "/" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomID = searchParams.get("roomID");
  const [isHost, setIsHost] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const hostID = await getHostID(roomID);
      console.log(hostID);
      const userID = cookies.get("userID");
      setIsHost(hostID == userID);
    };

    fetchData();
  }, []);

  const startAuction = () => {
    socket.emit("start-auction", { waitingRoomID: roomID });
  };
  useEffect(() => {
    socket.on("auction-started", () => {
      router.push(`/auction-room/auction?roomID=${roomID}`);
    });
  });
  const requestToStartAuction = () => {};
  return (
    <div className="flex justify-between items-center poppins-regular">
      <div className="gray-border rounded-md px-2 py-[0.2rem] w-[45%] text-center">
        Room ID: {roomID}
      </div>
      <button
        className="bg-blue text-white w-[45%] rounded-md"
        onClick={isHost ? startAuction : requestToStartAuction}
      >
        {isHost ? "Start Auction" : "Request to Start"}
      </button>
    </div>
  );
}
