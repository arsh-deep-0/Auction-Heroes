import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";

export default function PlaceBid() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const currentBidValue = useSelector((state) => state.currentBid.amount);

  const bidUp = ()=>{
    return {
      type: eventTypes.BID_UP,
      payload:{
        auctionRoomID:roomID,
        currentAmount:currentBidValue
      }
    }
  }
  return (
    <button
      className="rounded-lg text-sm hover:translate-y-[-4px]  bg-red-500 shadow-blue-500/50 shadow-lg transition ease-in-out duration-75 1 active:shadow-lg  active:scale-95 active:transalate-y-4 px-2 py-1  border-white border-solid border-[1px] poppins-medium"
      onClick={() => {
        dispatch(bidUp());
      }}
    >
      Place Bid
    </button>
  );
}
