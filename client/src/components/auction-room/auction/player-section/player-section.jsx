import getPlayerByOrder from "@/utils/getPlayerByOrder";
import Heading from "../common-components/heading";
import ImageSection from "./image-section";
import Stats from "./stats-section";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PlayerSection(isFullScreen) {
  const searchParamms= useSearchParams();
  const roomID = searchParamms.get('roomID');
  const currentOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );


  const [player, setPlayer] = useState(null);
  useEffect(() => {
    
    const fetchPlayer = async () => {
      if (currentOrder) {
        // Check if currentOrder is defined
        const playerInfo = await getPlayerByOrder(currentOrder,roomID);
        console.log("playerInfo: ", playerInfo);
        setPlayer(playerInfo); // Update player state
      }
      return () => {
       
      };
    };

    fetchPlayer();
    console.log("Player:", player);
  }, [currentOrder]);

  
  return (
    <>
      <div className={`${isFullScreen ? "gap-2" : "gap-0"} flex flex-col items-center  w-full h-full justify-center `}>

        <div className={`h-[10%] w-full `}>
          <Heading title="Player Stats" fontSize="heading" />
        </div>

        <div className="flex flex-col h-[100%] justify-between gap-4 w-full">
          <div className="h-[90%] w-full ">
            <ImageSection player={player} />
          </div>
          <div className="h-[10%] w-full">
            <Stats player={player} />
          </div>
        </div>
      </div>
    </>
  );
}
