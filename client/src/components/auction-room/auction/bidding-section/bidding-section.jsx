import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import Heading from "../common-components/heading";

export default function BiddingSection() {
  return (
    <>
      <div className="w-full h-full  flex flex-col p-4 gap-4">
        <div className="w-full  grid grid-cols-2">
          <div>
            <Heading title={"Bidding Section"} />
          </div>
          <div>
            <Heading
              title={"Room ID -838442"}
              background="#0094ff"
              font="frank-r"
              border={1}
            />
          </div>
        </div>
        <div className="w-full  grid grid-cols-3 gap-1">
          <div>
            <Heading title={"Coundown"} font="cantora-one" border={0} />
          </div>
          <div>
            <Heading title={"Current Bid"} font="cantora-one" border={0} />
          </div>
          <div>
            <Heading title={"Current Bidder"} font="cantora-one" border={0} />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-1">
          <div className="bg-white aspect-[3] rounded-xl pink-shadow mx-2 p-4 flex justify-center items-center">
            <div className="absolute flex justify-center items-center flex-col text-white">
              <p className="" style={{fontSize:"clamp(1.2rem,5vw,2rem)"}}>11s</p>
            </div>
            <CircularProgressBarDiv
              percentage={75}
              circleColor={"#0094ff"}
              textColor={"white"}
              progressBarColor={"black"}
            />
          </div>

          <div className="bg-white rounded-xl pink-shadow mx-2"></div>
          <div className="bg-white  rounded-xl pink-shadow mx-2"></div>
        </div>
        <div className="w-full "></div>
      </div>
    </>
  );
}
