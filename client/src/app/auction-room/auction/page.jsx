"use client";
import PlayerSection from "@/components/auction-room/auction/player-section/player-section";
import { useEffect, useState } from "react";

export default function Auction() {
  const enterFullScreen = () => {
    document.body.requestFullscreen();
  };

  return (
    <div
      onClick={enterFullScreen}
      className="h-[100%]  my-4 flex flex-col justify-between"
    >
      <div className=" h-[45%] w-full flex justify-center gap-4">
        <div className="h-full  w-1/2  rounded-md">
          <PlayerSection/>
        </div>
        <div className="h-full  w-1/2 pink-shadow  rounded-md"></div>
      </div>
      <div className="h-[40%] bg-blue-pink border-white border-solid border-2 rounded-md w-full flex justify-center gap-2"></div>
    </div>
  );
}
