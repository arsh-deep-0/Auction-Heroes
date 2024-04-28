import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Cookies from "universal-cookie";

function Buttons({ name1, name2 }) {
  const cookies = new Cookies(null, { path: "/" });

  const router = useRouter();

  const navigateToCreateRoom = () => {
    const userID = cookies.get("userID");
    console.log("userID: " + userID);
    if (userID!=undefined) {
      router.push("/create-room");
    } else {
      cookies.set("intendedDestination", "/create-room");
      navigateToSignUp();
    }
   
  };
  const navigateToJoinRoom = () => {
    const userID = cookies.get("userID");
    if (userID!=undefined) {
      router.push("/join-room");
    } else {
      cookies.set("intendedDestination", "/join-room");
      navigateToSignUp();
    }
  };
  const navigateToSignUp = () => {
    router.push("/sign-up");
  };
  const navigateTocreateOfflineRoom = () => {
    router.push("/create-offline-room");
  };
  return (
    <div className="start flex justify-center gap-4 py-8 my-2 lg:gap-16 lg:py-821">
      <button
        id="plans-button"
        className="button-l w-40 lg:w-44 text-sm crimson bg-blue-pink text-white poppins-regular"
        onClick={navigateToCreateRoom}
      >
        {name1}
      </button>
      <a
        className="button-l w-40 lg:w-44 rounded-lg  text-sm text-white crimson bg-black flex justify-center poppins-regular"
        onClick={navigateToJoinRoom}
      >
        {name2} <FaExternalLinkAlt className="mt-1 ml-1" />
      </a>
    </div>
  );
}

export default Buttons;
