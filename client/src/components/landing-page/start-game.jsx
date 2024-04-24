import { useRouter } from "next/navigation";
import React from "react";

export const StartGame = () => {
  const router = useRouter();

  const navigateToCreateRoom = () => {
    router.push("/create-room");
  };
  const navigateToJoinRoom = () => {
    router.push("/join-room");
  };
  const navigateToSignUp = () => {
    router.push("/sign-up");
  };
  const navigateTocreateOfflineRoom = () => { router.push("/create-offline-room"); };

  return (
    <div className="flex justify-between p-4 gap-4">
      <button onClick={navigateToCreateRoom}>Create Room</button>
      <button onClick={navigateToJoinRoom}>Join Room</button>
      <button onClick={navigateToSignUp}>Sign up</button>
      <button onClick={navigateTocreateOfflineRoom}>Create Offline Room </button>

    </div>
  );
};
