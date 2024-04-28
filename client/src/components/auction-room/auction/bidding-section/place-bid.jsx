import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import getPlayerByOrder from "@/utils/getPlayerByOrder";

export default function PlaceBid() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const cookies = new Cookies(null, { path: "/" });
  const currentBid= useSelector((state) => state.currentBid);
  const currentBidValue = useSelector((state) => state.currentBid.amount);
  const currentBidderLogo = useSelector(
    (state) => state.currentBid.currentBidderLogo
  );

  const currentPlayerOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const currentOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const buyers = useSelector((state) => state.buyers);

  const [player, setPlayer] = useState(null); // Define player state

  useEffect(() => {
    const fetchPlayer = async () => {
      if (currentOrder) {
        setIsLoading(true);
        const playerInfo = await getPlayerByOrder(currentOrder,roomID);
        console.log("playerInfo: ", playerInfo);
        setPlayer(playerInfo);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchPlayer();
    console.log("Player:", player);
  }, [currentOrder]);

  console.log("cpo: ", currentPlayerOrder);
  const fullName = cookies.get("fullName");
  const teamLogo = cookies.get("teamLogo");
  const userID = cookies.get("userID");

  console.log("all buyers:", buyers);
  const currentPurse = buyers?.buyers?.[teamLogo]?.currentPurse;
  const playersBought = buyers?.buyers?.[teamLogo]?.playersBought;
  console.log("currentPurse:", currentPurse);

  useEffect(() => {
    console.log("disable:", currentBidderLogo, teamLogo);
    const isCurrentBidder = currentBidderLogo === teamLogo;
    const hasNotEnoughMoney = currentPurse < currentBidValue + 0.3;
    const hasBoughtEightPlayers = playersBought > 7;
    const disable =
      isCurrentBidder || hasNotEnoughMoney || hasBoughtEightPlayers;

    setIsDisabled(disable);

    console.log("isDisabled:", isDisabled);
  }, [
    currentBidderLogo,
    teamLogo,
    currentPlayerOrder,
    currentPurse,
    currentBidValue,
  ]);

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
        basePrice: player.basePrice,
        playersSold:currentBid.playersSold,
        playersUnsold:currentBid.playersUnsold
      },
    };
  };
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }
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
