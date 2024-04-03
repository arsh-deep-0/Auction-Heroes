'use client'
import React from "react";
import { socket } from "../socket";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addParticipant } from "@/lib/features/waiting-room-participants/waitingRoomParticipantsSlice";

export default function Page() {
  const cookies = new Cookies(null, { path: "/" });
  const router = useRouter();
  const dispatch = useDispatch();
  function connectSocket() {
    socket.connect();
  }
  connectSocket();
  const { query } = router;
  console.log(query);
  socket.emit("join-waiting-room", { userID: cookies.get("userID"), roomID: query });

  socket.on('update-status',(users)=>{
    console.log(users);
    dispatch(addParticipant(users));
  });

  
  
  const waitingRoomParticipantsData = useSelector(
    (state) => state.waitingRoomParticipants
  );

  const renderedwaitingRoomParticipants = waitingRoomParticipantsData.map(
    (waitingRoomParticipant) => {
      return (
        <waitingRoomParticipant
          key={waitingRoomParticipant.name}
          order={waitingRoomParticipant.order}
        />
      );
    }
  );
  return (
    <div>
      <span>Waiting Room</span>
      <div className="flex flex-col justify-between items-center">
        {renderedwaitingRoomParticipants}
      </div>
    </div>
  );
}
