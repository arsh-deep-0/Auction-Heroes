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
        
            {/* <div className="p-4 bg-white pink-shadow rounded-lg aspect-square flex justify-center items-center">
              <CircularProgressBarDiv
                percentage={75}
                circleColor={"#0094ff"}
                textColor={"white"}
                progressBarColor={"black"}
              />
            </div> */}
            <div className="bg-white aspect-square rounded-xl pink-shadow mx-2 p-2">
                <CircularProgressBarDiv percentage={75} circleColor={"#0094ff"} textColor={"white"} progressBarColor={"black"}/>
            </div>
          
          <div className="bg-white aspect-square rounded-xl pink-shadow mx-2"></div>
          <div className="bg-white aspect-square rounded-xl pink-shadow mx-2"></div>
        </div>
        <div className="w-full "></div>
      </div>
    </>
  );
}
