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
  console.log("buyersData:", buyersData);
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
        const buyers = convertTeamsToReduxStateBuyers(teams);
        console.log("buyers-data", buyers);
        dispatch(addBuyers(buyers));
        dispatch(getBuyersData(roomID,teams))
        const teamLogos = teams.map((team) => team.teamLogo);
      } catch (error) {
        console.error("Error dispatching teams:", error);
      }
    };
    dispatchData();
  }, [roomID]);

  useEffect(() => {
    console.log("buyersData:", buyersData);
    if (buyersData) {
      const sortedBuyersData = Object.values(buyersData).sort(
        (a, b) => a.order - b.order
      );
      const renderedBuyers = sortedBuyersData?.map((buyer) => {
        console.log(buyer);
        return (
          <Buyer
            key={buyer._id}
            buyerOrder={buyer.order}
            initialBuyer={buyer}
            logo={buyer.teamLogo}
          />
        );
      });
      setRenderedBuyersList(renderedBuyers);
    }
  }, [buyersData]);

  return (
    <>
      <div className="gray-border h-full w-full rounded-md overflow-y-scroll bg-white py-2 px-1 flex flex-col gap-2 border-solid border-white border-b-4 border-t-4">
        {renderedBuyersList}
      </div>
    </>
  );
}


export const convertTeamsToReduxStateBuyers = (teams) => {
  console.log('teams',teams);
  return teams?.reduce((acc, obj) => {
    acc[obj.teamLogo] = obj;
    return acc;
  }, {});
};

const getBuyersData = (roomID, teams) => {
  return {
    type: "GET_BUYERS_INFO",
    payload: { auctionRoomID: roomID, teams: teams },
  };
};
