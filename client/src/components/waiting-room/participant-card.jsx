import React, { useState } from "react";
import { useSelector } from "react-redux";
import Username from "../common/username";
import Fullname from "../common/fullname";

export default function ParticipantCard({ participantData }) {
  return (
    <div className="flex justify-between items-center gray-border py-2 px-2 rounded-md gap-2 w-full">
      <div className="w-8 h-8 csk rounded-full p-1 shadow-md border-[2px] border-white border-solid">
        <img src="/images/team-logos/csklogo.webp" alt="" />
      </div>

      <div className="flex justify-between items-center flex-grow">
        <div className="flex gap-1 items-center">
          <span>
            <Fullname
              className="poppins-regular"
              userID={participantData.userID}
            />
          </span>

          <span className="text-gray-500 poppins-regular italic text-sm">
            <Username
              className="text-gray-500"
              userID={participantData.userID}
            />
          </span>
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
