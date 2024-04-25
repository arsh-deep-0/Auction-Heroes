"use client";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function SellingSection() {
  const [amount, setAmount] = useState();
  const [buyerLogo, setBuyerLogo] = useState("");
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const cookies = new Cookies(null, { path: "/" });
  const currentBidValue = useSelector((state) => state.currentBid.amount);


  const currentBid = useSelector((state) => state.currentBid);
  const playerOrder = currentBid.currentPlayerOrder;

  const handleAmountChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setAmount(newValue);
    }
  };

  const sellPlayer = () => {
    console.log("sell called");
    return {
      type: eventTypes.SELL_PLAYER,
      payload: {
        auctionRoomID: roomID,
        sellingAmount: Number(amount),
        buyerID: "random",
        currentPlayerOrder: currentBid.currentPlayerOrder,
        buyerName: buyerLogo,
        buyerLogo: buyerLogo,
      },
    };
  };

  const unsoldPlayer = ()=>{
    return {
      type: eventTypes.SELL_PLAYER,
      payload: {
        auctionRoomID: roomID,
        sellingAmount: 0,
        buyerID: "random",
        currentPlayerOrder: currentBid.currentPlayerOrder,
        buyerName: 'unsold',
        buyerLogo: 'unsold',
      },
    };
  }

  const handleSellPlayer = () => {
    if(buyerLogo){
      console.log('set to null')
      setSelected(null);
      console.log('value',selected)
      dispatch(sellPlayer()); 
    }else{
      alert('select buyer logo')
    }
   
  };

  const handleUnsoldPlayer = () => {
    dispatch(unsoldPlayer());
    setSelected(null);
  };

  const handleClick = (number, logo) => {
    setBuyerLogo(logo);
    setSelected(number);
  };

  useEffect(() => {
    console.log("selected:", selected);
    console.log("buyerLogo:", buyerLogo);
  }, [selected]);

  useEffect(() => {
    dispatch({
      type: eventTypes.GET_CURRENT_BID_INFO,
      payload: {
        auctionRoomID: roomID,
      },
    });
  }, []);

  return (
    <div className="gray-border text-black flex-col flex w-full p-4 rounded-md gap-4 max-w-full poppins-regular">
      <div className="flex flex-col justify-between  items-center bg-blue rounded-md w-full p-4 text-white  ">
        <div>Select Team</div>

        <div className="flex gap-2 px-0  justify-between  overflow-auto items-center p-2">
          <img
            className={` ${
              selected == 1 ? "border-red-500 border-2 border-solid" : ""
            } w-12 aspect-square bg-white rounded-full p-2 gray-border pointer-events-auto`}
            src="/images/team-logos/MIlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "MI");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2 gray-border"
            src="/images/team-logos/CSKlogo.webp"
            alt=""
            onClick={() => {
              handleClick(2, "CSK");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/RCBlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "RCB");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/SRHlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "SRH");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/KKRlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "KKR");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/PBKSlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "PBKS");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/RRlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "RR");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/GTlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "GT");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/DClogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "DC");
            }}
          />
          <img
            className="w-12 aspect-square bg-white rounded-full p-2"
            src="/images/team-logos/LSGlogo.webp"
            alt=""
            onClick={() => {
              handleClick(1, "LSG");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between  items-center bg-blue rounded-md w-full p-4 text-white ">
        <div>Selected Team</div>
        {buyerLogo && (
          <img

            className="w-14 aspect-square bg-white rounded-full"
            src={`/images/team-logos/${buyerLogo}logo.webp`}
            alt=""
          />
        )}
      </div>
      <div className="bg-white gray-border rounded-md p-4  flex flex-col items-center   gap-4">
        <div>Enter Amount:</div>
        <div>
          <input
            className="bg-blue w-28  rounded-md text-center text-white text-xl active:border-none"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="flex gap-4 min-w-52">
          <button
            className="bg-sky-blue text-white w-24  "
            onClick={handleSellPlayer}
          >
            Sell
          </button>
          <button
            className="bg-red-500 text-white w-24"
            onClick={handleUnsoldPlayer}
          >
            Unsold
          </button>
        </div>
      </div>
    </div>
  );
}
