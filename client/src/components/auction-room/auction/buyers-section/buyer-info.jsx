import { useSelector } from "react-redux";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";

export default function BuyerInfo({
  teamLogo,
  currentPurse,
  initialPurse,
  playersBoughtCount,
  teamName,
}) {
  const buyer = useSelector((state) => state.buyers.buyers[teamLogo]);
  console.log('buyer info comp:',buyer)
  const spendingData = {
    value: buyer.currentPurse?.toFixed(1),
    valueBefore: "₹",
    valueAfter: "Cr",
    percentage: (buyer.currentPurse / buyer.initialPurse) * 100,
    circleColor: "#7D54F2",
    progressBarColor: "black",
    
   
  };

  const playersBoughtCountData = {
    value: buyer.playersBoughtCount,
    valueAfter: "Players",
    percentage: (buyer.playersBoughtCount / 14) * 100,
    circleColor: "white",
    progressBarColor: "#7D54F2",
   
    
  };

  return (
    <>
      <div className="relative rounded-lg gray-border h-full gap-2 w-full bg-white flex flex-col justify-around p-[0.5rem] ">
        <div className="h-[20%] text-black poppins-regular stat-text text-center w-full">
          <span>{teamName}</span>
        </div>
        <div className="h-[70%] lg:h-[60%] flex justify-around w-full px-1 pb-1 gap-2 ">
          <div className="w-[45%] lg:w-[35%] aspect-square flex justify-center items-center">
            <div className={`absolute flex justify-center items-center flex-col text-white`}>
              <span className = {"circular-bar-text poppins-regular "}>{`${spendingData?.valueBefore} `}<span className="bar-value">{`${spendingData.value}`}</span></span>
              <span className="circular-bar-text poppins-regular">{` ${spendingData?.valueAfter}`}</span>
            </div>

            <CircularProgressBarDiv {...spendingData} />
          </div>

          <div className="w-[45%] lg:w-[35%] aspect-square flex justify-center items-center">
            <div className={`absolute flex justify-center items-center flex-col text-black`}>
              <span className="bar-value poppins-regular">{` ${playersBoughtCountData?.value}`}</span>
              <span className="circular-bar-text poppins-regular">{` ${playersBoughtCountData?.valueAfter}`}</span>
            </div>
            <CircularProgressBarDiv {...playersBoughtCountData} />
          </div>
        </div>
      </div>
    </>
  );
}
