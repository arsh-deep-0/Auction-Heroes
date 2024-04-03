import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ParticipantCard({ order }) {
  const isOnline = useSelector(state.waitingRoomParticipants[order].isOnline);
  const buyerName = useSelector(state.waitingRoomParticipants[order].name);

  return (
    <div className="flex justify-between items-center gray-border">
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <span>{buyerName}</span>
        <div className={`h-4 w-4 bg-${isOnline ? "green" : "red"}-500`}></div>
        <span>{isOnline ? "online" : "offline"}</span>
      </div>
    </div>
  );
}
