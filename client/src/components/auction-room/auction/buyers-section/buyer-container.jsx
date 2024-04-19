import { useDispatch, useSelector } from "react-redux";
import Buyer from "./buyer";
import getAllTeamsByRoomID from "@/utils/getTeamsByRoomID";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addBuyers } from "@/lib/features/buyers/buyerSlice";

export default function BuyersContainer() {
  const [renderedBuyersList, setRenderedBuyersList] = useState([]);
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const dispatch = useDispatch();

  const buyersData = useSelector((state) => state.buyers.buyers);
 

  const getTeams = async () => {
    try {
      const teams = await getAllTeamsByRoomID(roomID);
      return teams;
    } catch (error) {
      console.error("Error fetching teams:", error);
      return [];
    }
  };

  useEffect(() => {
    const dispatchData = async () => {
      try {
        const teams = await getTeams();
        console.log("dispatching:", teams);
        dispatch(addBuyers(teams));
      } catch (error) {
        console.error("Error dispatching teams:", error);
      }
    };
    dispatchData();
  }, [roomID]);

  useEffect(() => {
    const renderedBuyers = buyersData?.map((buyer) => {
      console.log(buyer);
      return <Buyer key={buyer._id} buyerOrder={buyer.order} initialBuyer={buyer} />;
    });
    setRenderedBuyersList(renderedBuyers);
  }, [buyersData]);

  return (
    <>
      <div className="gray-border h-full w-full rounded-md overflow-y-scroll bg-white py-2 px-1 flex flex-col gap-2 border-solid border-white border-b-4 border-t-4">
        {renderedBuyersList}
      </div>
    </>
  );
}
