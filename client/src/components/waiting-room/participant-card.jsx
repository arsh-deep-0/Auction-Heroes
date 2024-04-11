import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ParticipantCard({ participantData }) {

  return (
    <div className="flex justify-between items-center gray-border py-2 px-2 rounded-md">
      <div>
        <img src="" alt="" />
      </div>
      <div className="flex justify-between items-center gap-4">
        <span>{participantData.userID}</span>
        <div className={`h-4 w-4 rounded-full ${participantData.isOnline ? "bg-green-500" : "bg-red-500"  }  `}></div>
        <span>{participantData.isOnline ? "online" : "offline"}</span>
      </div>
    </div>
  );
}
