import CurrentBid from "@/components/auction-room/auction/bidding-section/current-bid";
import { eventTypes } from "@/constants/eventTypes";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function Navigator() {
    const dispatch = useDispatch();
   
   
  
    const searchParams = useSearchParams();
    const roomID = searchParams.get("roomID");
    const cookies = new Cookies(null, { path: "/" });
    const currentBidValue = useSelector((state) => state.currentBid.amount);
  
    const currentState=useSelector(state=>state)
    console.log('current State:',currentState)
  
    const currentBid = useSelector((state) => state.currentBid);
    const playerOrder = currentBid.currentPlayerOrder
    // const fullName = cookies.get("fullName");
   
    const nextPlayer = () => {
        const newPlayerOrder = (currentBid.currentPlayerOrder % 70) ;
        return {
          type: eventTypes.SKIP_PLAYER,
          payload: {
            auctionRoomID: roomID,
            sellingAmount: currentBidValue,
            buyerID: "randomid",
            currentPlayerOrder: newPlayerOrder,
            buyerName: currentBid.currentBidderLogo,
            buyerLogo: currentBid.currentBidderLogo,
          },
        };
      };
      const prevPlayer = () => {

        let currentPlayerOrder = currentBid.currentPlayerOrder
       
        if(currentBid.currentPlayerOrder==1){
            console.log('cpoo',currentBid.currentPlayerOrder)
             currentPlayerOrder = 71;
        } 
        console.log("cporder",currentPlayerOrder)
        
        return {
          type: eventTypes.SKIP_PLAYER,
          payload: {
            auctionRoomID: roomID,
            sellingAmount: currentBidValue,
            buyerID: "randomid",
            currentPlayerOrder: currentPlayerOrder-2,
            buyerName: currentBid.currentBidderLogo,
            buyerLogo: currentBid.currentBidderLogo,
          },
        };
      };
    
      const handleNextPlayer = ()=>{
        dispatch(nextPlayer());
      }
      const handlePrevPlayer = ()=>{
        dispatch(prevPlayer());
      }
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center gap-4">
        <div className="poppins-medium text-black text-xl">Navigation</div>
      <div className="flex gap-4 min-w-52">
        <button className="bg-sky-blue text-white w-24  " onClick={handlePrevPlayer}>Prev</button>
        <button className="bg-red-500 text-white w-24" onClick={handleNextPlayer}>Next</button>
      </div>
    </div>
  );
}
