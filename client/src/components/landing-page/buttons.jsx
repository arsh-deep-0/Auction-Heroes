import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function Buttons({ name1, name2, scrollToPricing }) {
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
    <div className="start flex justify-center gap-4 py-8 my-2 lg:gap-16 lg:py-821">
      <button id="plans-button" className="button-l w-40 lg:w-44 text-sm crimson bg-blue-pink text-white poppins-regular" onClick={navigateToCreateRoom}>
        {name1}
      </button>
      <a  className="button-l w-40 lg:w-44 rounded-lg  text-sm text-white crimson bg-black flex justify-center poppins-regular" onClick={navigateToJoinRoom}>
        {name2} <FaExternalLinkAlt className='mt-1 ml-1'/>
      </a>
    </div>
  );
}

export default Buttons;

