import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Username from "../common/username";
import Fullname from "../common/fullname";
import getHostID from "../common/hostId";
import { useSearchParams } from "next/navigation";

export default function ParticipantCard({ participantData }) {
  const [isHost, setIsHost] = useState(false);
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  useEffect(() => {
    const fetchData = async () => {
      const hostID = await getHostID(roomID);
      console.log(hostID);
      console.log(participantData.userID);
      setIsHost(hostID == participantData.userID);
    };

    fetchData();
  }, [participantData.userID]);
  return (
    <div className="flex justify-between items-center gray-border py-2 px-2 rounded-md gap-2 w-full bg-white">
      <div className="w-10 h-10 csk rounded-full p-1 shadow-md border-[2px] border-white border-solid">
        <img src="/images/team-logos/csklogo.webp" alt="" />
      </div>

      <div className="flex justify-between items-center flex-grow">
        <div className="flex items-start gap-1">
          <div className="flex flex-col  items-start">
            <span className="poppins-regular text-sm">
              <Fullname userID={participantData.userID} />
            </span>

            <span className="text-gray-500 poppins-regular italic text-xs">
              <Username
                className="text-gray-500"
                userID={participantData.userID}
              />
            </span>
          </div>
          {isHost ? (
            <span className="text-xs gray-border text-gray-600 px-1 rounded-sm  bg-yellow-300">
              Host
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center gap-1">
          <div
            className={`h-3 w-3 rounded-full ${
              participantData.isOnline ? "bg-green-500" : "bg-red-500"
            }  `}
          ></div>

          <span className="poppins-regular text-sm">
            {participantData.isOnline ? "online" : "offline"}
          </span>
        </div>
      </div>
    </div>
  );
}
