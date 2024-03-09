import CircularProgressBarDiv from "../common-components/circular-progress-bar";

export default function BuyerInfo({
  teamName,
  currentWallet,
  totalWallet,
  playersBought,
  playerName,
}) {
  const spendingData = {
    value: currentWallet.toFixed(1),
    valueBefore: "₹",
    valueAfter: "Cr",
    percentage: (currentWallet / totalWallet) * 100,
    circleColor: "#0094ff",
    progressBarColor: "black",
    textColor: "white",
    radius: 1.5,
  };

  const playersBoughtData = {
    value: playersBought,
    valueAfter: "Players",
    percentage: (playersBought / 14) * 100,
    circleColor: "black",
    progressBarColor: "#0094ff",
    textColor: "white",
    radius: 1.5,
  };

  return (
    <>
      <div className="relative rounded-lg pink-shadow h-full w-full bg-white flex flex-col justify-around p-[0.1rem]">
        <div className="h-[20%] text-black aoboshi stat-text text-center w-full">
          <p>{playerName}</p>
        </div>
        <div className="h-[70%] flex justify-between w-full px-0 py-1">
          {/* <CircularProgressBar {...spendingData}/>
            <CircularProgressBar {...playersBoughtData}/> */}
          <div className="w-[48%] aspect-square flex justify-center items-center">
            <div className="absolute flex justify-center items-center flex-col">
              <p className="bar-text">{`${spendingData.valueBefore} ${spendingData.value}`}</p>
              <p className=" bar-text">{` ${spendingData.valueAfter}`}</p>
            </div>

            <CircularProgressBarDiv {...spendingData} />
          </div>

          <div className="w-[48%] aspect-square flex justify-center items-center">
          <div className="absolute flex justify-center items-center flex-col">
              <p className="bar-text">{` ${playersBoughtData.value}`}</p>
              <p className=" bar-text">{` ${playersBoughtData.valueAfter}`}</p>
            </div>
            <CircularProgressBarDiv {...playersBoughtData} />
          </div>
        </div>
      </div>
    </>
  );
}
