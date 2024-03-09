import BuyerInfo from "./buyer-info";
import BuyerLogo from "./buyer-logo";

export default function Buyer({ teamName, currentWallet, totalWallet, playersBought, playerName ,order}) {
  const buyerData={ teamName, currentWallet, totalWallet, playersBought, playerName , order}
  return (
    <>
      <div className="flex w-full justify-between ">
        <div className="w-[25%]">
          <BuyerLogo teamName={buyerData.teamName} order={buyerData.order}/>
        </div>
        <div className="w-[70%]">
          <BuyerInfo { ...buyerData} />
        </div>
      </div>
    </>
  );
}
