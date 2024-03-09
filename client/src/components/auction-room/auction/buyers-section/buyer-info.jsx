import CircularProgressBar from "../common-components/circular-progress-bar";

export default function BuyerInfo({ teamName, currentWallet, totalWallet, playersBought, playerName}){
    const spendingData ={
        value:currentWallet.toFixed(1),
        valueBefore:"₹",
        valueAfter:"Cr",
        percentage:((currentWallet/totalWallet)*100),
        circleColor:"#0094ff",
        progressBarColor:"black",
        textColor:"white",
        radius:1.5
        
    }
    
    const playersBoughtData ={
      value:playersBought,
      valueAfter:"Players",
      percentage:(playersBought/14*100),
      circleColor:"black",
      progressBarColor:"#0094ff",
      textColor:"white",
      radius:1.5
    }
    
    return <>
    <div className="relative rounded-lg pink-shadow h-full w-full bg-white flex flex-col gap-1">
        <div className="h-[20%] text-black aoboshi stat-text text-center"><p>{playerName}</p></div>
        <div className="h-[70%] flex justify-center">
            <CircularProgressBar {...spendingData}/>
            <CircularProgressBar {...playersBoughtData}/>
        </div>
    </div>
    </>
}