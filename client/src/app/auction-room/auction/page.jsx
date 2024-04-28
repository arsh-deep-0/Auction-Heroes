"use client";
import BiddingSection from "@/components/auction-room/auction/bidding-section/bidding-section";
import BuyersSection from "@/components/auction-room/auction/buyers-section/buyers-section";
import PlayerSection from "@/components/auction-room/auction/player-section/player-section";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";

export default function Auction() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  const enterFullScreen = () => {
    document.body.requestFullscreen();
  };

  return (
    <div
      className="h-[85%]  my-4 flex flex-col justify-between items-center text-white lg:flex-row lg:gap-12 lg:px-12 sm:px-12"
      onClick={enterFullScreen}
    >
      <div className=" h-[46%] w-full flex justify-center gap-4 lg:h-full lg:gap-12">
        <div className="h-full  w-1/2  rounded-md">
          <PlayerSection />
        </div>
        <div className="h-full  w-1/2   rounded-md">
          <BuyersSection />
        </div>
      </div>
      {/* divider */}
      <div className="lg:hidden flex gap-[0.65rem]">
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
        <div className="w-[0.35rem] h-[0.35rem] bg-blue rounded-full"></div>
      </div>
      <div className="min-h-[40%] bg-blue-purple  rounded-xl w-full flex justify-center gap-2 lg:h-[90%] lg:flex-col  p-4 mt-[4%] lg:w-[50%]">
        <BiddingSection />
      </div>
    </div>
  );
}
