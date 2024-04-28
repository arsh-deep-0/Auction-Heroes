import BuyerLogo from "../buyers-section/buyer-logo";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import Heading from "../common-components/heading";
import ProgressBar from "./progress-bar";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";
import CountdownTimer from "./countdown-timer";
import CurrentBid from "./current-bid";
import CurrentBidder from "./current-bidder";
import PlaceBid from "./place-bid";
import { useSearchParams } from "next/navigation";

export default function BiddingSection() {
  const searchParams = useSearchParams();

  const roomID = searchParams.get("roomID");
  return (
    <>
      <div className="w-full h-full  flex flex-col box-borderlg:p-4 py-4 justify-between lg:gap-4 lg:bg-blue-purple">
        <div className="w-full max-h-[10%]  grid grid-cols-2">
          <div>
            <Heading
              title={"Bidding Section"}
              fontcolor="white"
              fontSize="heading"
            />
          </div>
          <div>
            <Heading
              title={"Room ID -" + roomID}
              background="#0094ff"
              font="poppins-medium"
              fontcolor="white"
              border={1}
            />
          </div>
        </div>

        <div className="w-full max-h[50%] sm:max-h-[30%] flex-col flex gap-2 lg:max-h-full lg:bg-blue-purple">
          <div className="w-full  max-h-[20%] grid grid-cols-3 gap-1">
            <div>
              <Heading
                title={"Countdown"}
                font="poppins-regular"
                fontcolor="white"
                border={0}
              />
            </div>
            <div>
              <Heading
                title={"Current Bid"}
                font="poppins-regular"
                fontcolor="white"
                border={0}
              />
            </div>
            <div>
              <Heading
                title={"Current Bidder"}
                font="poppins-regular"
                fontcolor="white"
                border={0}
              />
            </div>
          </div>

          <div className="w-full  max-h-[75%] grid grid-cols-3 gap-1">
            <CountdownTimer />
            <CurrentBid />
            <CurrentBidder />
          </div>
        </div>

        <div className="w-full  max-h-[30%] grid grid-cols-3 gap-1 lg:flex lg:flex-col lg:gap-4 lg:justify-center lg:items-center">
          <div className="col-span-2 h-full bg-white text-black flex flex-col justify-between  rounded-md text-center mx-1 lg:w-full lg:p-2">
            <ProgressBar soldPlayers={17} UnsoldPlayers={4} totalPlayers={31} />
          </div>

          <div className="flex flex-col justify-center mx-1 gap-2 max-w-[10rem]">
            <PlaceBid />
          </div>
        </div>
      </div>
    </>
  );
}
