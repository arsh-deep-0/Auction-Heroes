"use client";
import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import Cookies from "universal-cookie";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addParticipant } from "@/lib/features/waiting-room-participants/waitingRoomParticipantsSlice";
import ParticipantCard from "@/components/waiting-room/participant-card";
import getHostID from "@/components/common/hostId";
import StartOptions from "./start-options";

export default function Page() {
  const cookies = new Cookies(null, { path: "/" });
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const roomID = searchParams.get("roomID");
  cookies.set('roomID',roomID)

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

  return (
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center ">
          <span className="text-center gray-border px-2 py-1 rounded-md bg-blue text-white poppins-regular">
            Waiting Room
          </span>
        </div>

        <div className="flex flex-col justify-start items-center py-2 px-2 rounded-md gap-2 gray-border bg-blue min-h-[50%]">
          {waitingRoomParticipantsData.map((waitingRoomParticipant) => (
            <ParticipantCard
              key={waitingRoomParticipant.userID}
              participantData={waitingRoomParticipant}
            />
          ))}
        </div>
      </div>

      <StartOptions users={waitingRoomParticipantsData}/>
    </div>
  );
}
