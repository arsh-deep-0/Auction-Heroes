import React from "react";
import BuyerLogo from "../buyers-section/buyer-logo";

export default function CurrentBidder() {
  return (
    <div className="bg-white rounded-lg aspect-[3/2] pink-shadow  mx-1 p-[2px] flex flex-col items-center justify-between box-border ">
      <div className=" w-[45%] h-[50%]">
        <BuyerLogo teamName={"srh"} order={4} orderVisibility={"hidden"} />
      </div>

      <span className="poppins-medium text-black  bar-text text-center text-blue">
        Bhaskar Mishra
      </span>
    </div>
  );
}
