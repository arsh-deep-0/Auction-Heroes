import React from "react";
import { useSelector } from "react-redux";

export default function CurrentBid() {
  const currentBid = useSelector(state=>state.currentBid.amount);
  const currentBidAmount = parseFloat(currentBid).toFixed(1)

  return (
    <div className="bg-white rounded-lg aspect-[3/2] sm:aspect-[4] lg:aspect-square pink-shadow  flex flex-col box-border mx-1 items-center justify-center text-black poppins-light  text-center p-[2px] pt-4 lg:p-2">
      <span className="bar-text">
        ₹ <span className="bid-amount-text text-blue poppins-medium">{currentBidAmount}</span>{" "}
        Cr
      </span>
      <span className="bar-text ">Max Bid : 20 Cr</span>
    </div>
  );
}
