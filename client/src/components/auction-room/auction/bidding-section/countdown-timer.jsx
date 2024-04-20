import React, { useEffect, useRef, useState } from "react";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import { useDispatch, useSelector } from "react-redux";
import { reduceTimerCount } from "@/lib/features/timer/timerSlice";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function CountdownTimer() {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(15);
  const timerValue = useSelector((state) => state.timer.time);
  const auctionInProcess = useSelector(
    (state) => state.timer.auctionInProcess
  );

  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const cookies = new Cookies(null, { path: "/" });
  const currentBidValue = useSelector((state) => state.currentBid.amount);
  const currentBidderLogo = useSelector(
    (state) => state.currentBid.currentBidderLogo
  );

  const currentPlayerOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const fullName = cookies.get("fullName");
  const teamLogo = cookies.get("teamLogo");
  const userID = cookies.get("userID");

  useEffect(() => {
    let intervalId;

    if (timerValue !== null) {
      intervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - timerValue) / 1000);
        const newCountdown = 16 - elapsedSeconds;
        if (newCountdown >= 0) {
          setCountdown(newCountdown);
        } else {
          console.log('auctionInPogress',auctionInProcess)
          if (auctionInProcess) {
            dispatch(sellPlayer());
          }
          setCountdown(null);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerValue]);

  const sellPlayer = () => {
    return {
      type: eventTypes.SELL_PLAYER,
      payload: {
        auctionRoomID: roomID,
        sellingAmount: currentBidValue,
        buyerID: userID,
        currentPlayerOrder: currentPlayerOrder,
        buyerName: fullName,
        buyerLogo: teamLogo,
      },
    };
  };

  return (
    <>
      <div className="bg-white aspect-[3/2] rounded-lg pink-shadow mx-1  pt-1 pb-[2px] box-border flex flex-col justify-between items-center">
        <div className="w-[45%] relative flex items-center justify-center">
          <div className="absolute flex justify-center items-center flex-col text-white">
            <span
              className="poppins-light"
              style={{ fontSize: "clamp(1.2rem,4vw,2rem)" }}
            >
              {countdown}
            </span>
          </div>
          <CircularProgressBarDiv
            percentage={(countdown * 100) / 15}
            circleColor={countdown > 5 || countdown == null ? "#7d54f2" : "red"}
            progressBarColor={"black"}
          />
        </div>

        <span className="poppins-light bar-text text-black ">Timer</span>
      </div>
    </>
  );
}
