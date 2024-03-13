import BuyerLogo from "../buyers-section/buyer-logo";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";
import Heading from "../common-components/heading";
import ProgressBar from "./progress-bar";

export default function BiddingSection() {
  return (
    <>
      <div className="w-full h-full  flex flex-col box-border p-4 py-4 justify-between">
        <div className="w-full max-h-[10%]  grid grid-cols-2">
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

        <div className="w-full max-h[50%] flex-col flex gap-4">
          <div className="w-full  max-h-[20%] grid grid-cols-3 gap-1">
            <div>
              <Heading title={"Countdown"} font="cantora-one" border={0} />
            </div>
            <div>
              <Heading title={"Current Bid"} font="cantora-one" border={0} />
            </div>
            <div>
              <Heading title={"Current Bidder"} font="cantora-one" border={0} />
            </div>
          </div>

          <div className="w-full  max-h-[70%] grid grid-cols-3 gap-1">
            <div className="bg-white aspect-[3/2] rounded-xl pink-shadow mx-1  p-1 pb-[2px] box-border flex flex-col justify-center items-center">
              <div className="w-[50%] relative flex items-center justify-center">
                <div className="absolute flex justify-center items-center flex-col text-white">
                  <p
                    className=""
                    style={{ fontSize: "clamp(1.2rem,5vw,2rem)" }}
                  >
                    11s
                  </p>
                </div>
                <CircularProgressBarDiv
                  percentage={75}
                  circleColor={"#0094ff"}
                  textColor={"white"}
                  progressBarColor={"black"}
                />
              </div>

              <p className="gabriela bar-text text-black ">Timer</p>
            </div>

            <div className="bg-white rounded-xl aspect-[3/2] pink-shadow  flex flex-col box-border mx-1 items-center justify-between text-black gabriela  text-center p-[2px] pt-4">
              <p className="bar-text">
                ₹ <span className="bid-amount-text">5.2</span> Cr
              </p>
              <p className="bar-text">Max Bid : 20 Cr</p>
            </div>
            <div className="bg-white rounded-xl aspect-[3/2] pink-shadow  mx-1 p-[2px] flex flex-col items-center justify-center box-border ">
              <div className=" px-6">
                <BuyerLogo
                  teamName={"srh"}
                  order={4}
                  orderVisibility={"hidden"}
                />
              </div>

              <p className="gabriela text-black  bar-text text-center">
                Bhaskar Mishra
              </p>
            </div>
          </div>
        </div>

        <div className="w-full  max-h-[30%] grid grid-cols-3 gap-1">
          <div className="col-span-2 h-full bg-white text-black flex flex-col justify-between  rounded-md text-center mx-1">
            {/* <div className=" grid grid-cols-3 cantora-one">
              <p>Sold</p>
              <p>Unsold</p>
              <p>Total</p>
            </div>
            <div className=" grid grid-cols-3 cantora-one">
              <p>17</p>
              <p>4</p>
              <p>31</p>
            </div>
  <div className="w-full h-2 bg-black rounded-full"></div>*/}
    <ProgressBar soldPlayers={17} unsoldPlayers={4} totalPlayers={31}/>
          </div> 

        

          <div className="flex flex-col justify-center ">
            <button className="rounded-full bg-golden px-2 py-1 mx-1 border-white border-solid border-2 text-black font-bold frank-r">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
