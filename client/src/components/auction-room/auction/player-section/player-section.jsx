import getPlayerByOrder from "@/utils/getPlayerByOrder";
import Heading from "../common-components/heading";
import ImageSection from "./image-section";
import Stats from "./stats-section";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function PlayerSection() {
  const currentOrder = useSelector(
    (state) => state.currentBid.currentPlayerOrder
  );

  const [player, setPlayer] = useState(null); // Define player state

  useEffect(() => {
    const fetchPlayer = async () => {
      if (currentOrder) {
        // Check if currentOrder is defined
        const playerInfo = await getPlayerByOrder(currentOrder);
        console.log("playerInfo: ", playerInfo);
        setPlayer(playerInfo); // Update player state
      }
    };

    fetchPlayer();
    console.log("Player:", player);
  }, [currentOrder]); // Add currentOrder to dependency array

  return (
    <>
      <div className="flex flex-col items-center w-full h-full justify-between">
        <div className="h-[10%] w-full ">
          <Heading title="Player Stats" fontSize="heading" />
        </div>
        <div className="h-[75%] w-full ">
          <ImageSection player={player}/>
        </div>
        <div className="h-[10%] w-full">
          <Stats player={player}/>
        </div>
      </div>
    </>
  );
}
