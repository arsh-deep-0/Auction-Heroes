"use client";
import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addParticipant } from "@/lib/features/waiting-room-participants/waitingRoomParticipantsSlice";
import ParticipantCard from "@/components/waiting-room/participant-card";

export default function Page() {
  const cookies = new Cookies(null, { path: "/" });
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const roomID = searchParams.get("roomID");
  const waitingRoomParticipantsRef = useRef([]);

  useEffect(() => {
    
    socket.connect();

    socket.emit("join-waiting-room", {
      userID: cookies.get("userID"),
      waitingRoomID: roomID,
    });

    socket.on("update-status", (users) => {
      console.log("backend-users: ", users);
      dispatch(addParticipant(users));
    });

    return () => {
      socket.off("update-status", (users) => {
        console.log("backend-users: ", users);
        dispatch(addParticipant(users));
      });
    };
  }, [roomID, dispatch]);

  const waitingRoomParticipantsData = useSelector(
    (state) => state.waitingRoomParticipants.users
  );

  // useEffect(() => {
  //   console.log("object:", waitingRoomParticipantsData);
  //   waitingRoomParticipantsRef.current = Object.values(
  //     waitingRoomParticipantsData
  //   );
  //   console.log("arrayo: ", waitingRoomParticipantsRef.current);
  //   console.log("array: ", waitingRoomParticipantsRef.current[0]);
  // }, [waitingRoomParticipantsData]);

  return (
    <div className="p-4 ">
      <div className="flex justify-center">
        <span className="text-center">Waiting Room</span>
      </div>

      <div className="flex flex-col justify-between items-center py-4 gap-2">
        {waitingRoomParticipantsData.map((waitingRoomParticipant) => (
          <ParticipantCard
            key={waitingRoomParticipant.userID}
            participantData={waitingRoomParticipant}
          />
        ))}
      </div>
    </div>
  );
}
