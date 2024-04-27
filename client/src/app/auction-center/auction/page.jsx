"use client";
import BuyersSection from "@/components/auction-room/auction/buyers-section/buyers-section";
import PlayerSection from "@/components/auction-room/auction/player-section/player-section";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket";
import Biddingsection from "@/components/auction-center/auction/bidding-section/bidding-section";

export default function Auction() {
  const [isFullScreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    socket.connect();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    console.log("fullScreen :", isFullScreen);
    return () => {
      socket.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  const enterFullScreen = () => {
    document.body.requestFullscreen();
  };
  const handleFullscreenChange = () => {
    setIsFullscreen((prevFullscreen) => !prevFullscreen);
    setIsFullscreen((prevFullscreen) => {
      console.log("fullScreen :", prevFullscreen);
      return prevFullscreen;
    });
    console.log("fullScreen :", isFullScreen);
  };

  return (
    <div
      className="h-full w-full  my-4 flex justify-between gap-12  text-white"
      onClick={enterFullScreen}
    >
      <div
        className={` ${
          isFullScreen ? "h-[95%]" : "h-[90%]"
        } w-[75%] flex  justify-between  gap-12`}
      >
        <div
          className={`${
            isFullScreen ? "h-[60%]" : "h-[70%]"
          }   w-1/2  rounded-md lg:w-[20%]`}
        >
          <PlayerSection isFullScreen={isFullScreen} />
        </div>
        <div className="h-full  w-1/2 flex-grow  rounded-md lg:w-[130%]]">
          <BuyersSection />
        </div>
      </div>

      <div className="h-full w-1/5  rounded-xl  flex justify-center gap-2">
        <Biddingsection />
      </div>
    </div>
  );
}
