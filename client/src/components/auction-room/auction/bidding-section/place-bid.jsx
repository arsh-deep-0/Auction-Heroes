import React from "react";
import { useDispatch } from "react-redux";
import { increaseBid } from "@/lib/features/currentBid/currentBidSlice";


export default function PlaceBid() {
  const dispatch = useDispatch();
  return (
    <button
      className="rounded-lg text-sm hover:translate-y-[-4px]  bg-red-500 shadow-blue-500/50 shadow-lg transition ease-in-out duration-75 1 active:shadow-lg  active:scale-95 active:transalate-y-4 px-2 py-1  border-white border-solid border-[1px] poppins-medium"
      onClick={() => {
        dispatch(increaseBid());
      }}
    >
      Place Bid
    </button>
  );
}
