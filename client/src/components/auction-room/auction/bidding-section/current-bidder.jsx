import React, { useEffect, useState } from "react";
import BuyerLogo from "../buyers-section/buyer-logo";
import { useSelector } from "react-redux";

export default function CurrentBidder() {
  const [currentBidder, setCurrentBidder] = useState(null);
  const [currentBidderLogo, setCurrentBidderLogo] = useState(null);

  const reduxcurrentBidderName = useSelector((state) => state.currentBid.currentBidderName);
  const reduxcurrentBidderLogo = useSelector((state) => state.currentBid.currentBidderLogo);
  console.log('state: ',useSelector(state=>state))

  useEffect(() => {
    setCurrentBidder(reduxcurrentBidderName);
    setCurrentBidderLogo(reduxcurrentBidderLogo)
  }, [reduxcurrentBidderName,reduxcurrentBidderLogo]);

  console.log("buyer:", currentBidder);
  return (
    <div className="bg-white rounded-lg aspect-[3/2] pink-shadow  mx-1 p-[2px] flex flex-col items-center justify-between box-border ">
      <div className=" w-[45%] h-[50%]">
        {currentBidderLogo&&<BuyerLogo teamLogo={currentBidderLogo} order={4} orderVisibility={"hidden"} />}
      </div>

      <span className="poppins-medium text-black  bar-text text-center text-blue">
        {currentBidder}
      </span>
    </div>
  );
}
