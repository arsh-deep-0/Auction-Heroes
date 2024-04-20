import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function PlaceBid() {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
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

  console.log("cpo: ", currentPlayerOrder);
  const fullName = cookies.get("fullName");
  const teamLogo = cookies.get("teamLogo");
  const userID = cookies.get("userID");

  console.log("disable:", currentBidderLogo, teamLogo);
  useEffect(() => {
    setIsDisabled(currentBidderLogo === teamLogo);

    console.log("isDisabled:", isDisabled);
  }, [currentBidderLogo, teamLogo]);
  useEffect(() => {
    dispatch({
      type: eventTypes.GET_CURRENT_BID_INFO,
      payload: {
        auctionRoomID: roomID,
      },
    });
  }, []);

  const bidUp = () => {
    return {
      type: eventTypes.BID_UP,
      payload: {
        auctionRoomID: roomID,
        currentAmount: currentBidValue,
        currentBidderID: userID,
        currentPlayerOrder: currentPlayerOrder,
        currentBidderName: fullName,
        currentBidderLogo: teamLogo,
      },
    };
  };
  return (
    <button
      className="rounded-lg text-sm hover:translate-y-[-4px]  bg-red-500 shadow-blue-500/50 shadow-lg transition ease-in-out duration-75 1 active:shadow-lg  active:scale-95 active:transalate-y-4 px-2 py-1  border-white border-solid border-[1px] poppins-medium"
      onClick={() => {
        dispatch(bidUp());
      }}
      disabled={isDisabled}
    >
      Place Bid
    </button>
  );
}
