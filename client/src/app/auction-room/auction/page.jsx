"use client";
import BiddingSection from "@/components/auction-room/auction/bidding-section/bidding-section";
import BuyersSection from "@/components/auction-room/auction/buyers-section/buyers-section";
import PlayerSection from "@/components/auction-room/auction/player-section/player-section";
import { useEffect, useState } from "react";

export default function Auction() {
  const enterFullScreen = () => {
    document.body.requestFullscreen();
  };

  return (
    <div
      className="h-[85%]  my-4 flex flex-col justify-between items-center"
      onClick={enterFullScreen}
    >
      <div className=" h-[45%] w-full flex justify-center gap-4">
        <div className="h-full  w-1/2  rounded-md">
          <PlayerSection />
        </div>
        <div className="h-full  w-1/2   rounded-md">
          <BuyersSection />
        </div>
      </div>
      {/* divider */}
      <div className="flex gap-2">
        <div className="w-[0.4rem] h-[0.4rem] bg-blue rounded-full"></div>
        <div className=" w-[0.4rem] h-[0.4rem] bg-blue rounded-full"></div>
        <div className="w-[0.4rem] h-[0.4rem] bg-blue rounded-full"></div>
        <div className="w-[0.4rem] h-[0.4rem] bg-blue rounded-full"></div>
        <div className="w-[0.4rem] h-[0.4rem] bg-blue rounded-full"></div>
        
      </div>
      <div className="h-[40%] bg-blue-pink border-white border-solid border-2 rounded-xl w-full flex justify-center gap-2">
        <BiddingSection/>
      </div>
    </div>
  );
}
