import { useSelector } from "react-redux";
import BuyerInfo from "./buyer-info";
import BuyerLogo from "./buyer-logo";

export default function Buyer({ buyerOrder}) {
  const buyer = useSelector(state=>state.buyers[buyerOrder-1])
  return (
    <>
      <div className="flex w-full justify-between ">
        <div className="w-[25%]">
          <BuyerLogo teamName={buyer.teamName} order={buyer.order}/>
        </div>
        <div className="w-[70%] ">
          <BuyerInfo { ...buyer} />
        </div>
      </div>
    </>
  );
}
