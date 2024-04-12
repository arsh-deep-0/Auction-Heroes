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
      <div className="flex flex-col gap-4">
        <div className="flex justify-center ">
          <span className="text-center gray-border px-2 py-1 rounded-md bg-blue text-white">
            Waiting Room
          </span>
        </div>

        <div className="flex flex-col justify-between items-center py-2 px-2 rounded-md gap-2 gray-border">
          {waitingRoomParticipantsData.map((waitingRoomParticipant) => (
            <ParticipantCard
              key={waitingRoomParticipant.userID}
              participantData={waitingRoomParticipant}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center poppins-regular">
        <div className="gray-border rounded-md px-2 py-[0.2rem] w-[45%] text-center">
          Room ID: {roomID}
        </div>
        <button className="bg-blue text-white w-[45%] rounded-md">
          Start Auction
        </button>
      </div>
    </div>
  );
}
