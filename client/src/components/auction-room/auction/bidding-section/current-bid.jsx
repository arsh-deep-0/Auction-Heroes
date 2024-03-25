import React from "react";
import { useSelector } from "react-redux";

export default function CurrentBid() {
  const currentBid = useSelector(state=>state.currentBid.amount);
  const currentBidAmount = parseFloat(currentBid).toFixed(1)

  return (
    <div className="bg-white rounded-lg aspect-[3/2] pink-shadow  flex flex-col box-border mx-1 items-center justify-between text-black poppins-light  text-center p-[2px] pt-4">
      <p className="bar-text">
        ₹ <span className="bid-amount-text text-blue poppins-medium">{currentBidAmount}</span>{" "}
        Cr
      </p>
      <p className="bar-text ">Max Bid : 20 Cr</p>
    </div>
  );
}
