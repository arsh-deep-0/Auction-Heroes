import { useSelector } from "react-redux";
import BuyerInfo from "./buyer-info";
import BuyerLogo from "./buyer-logo";

export default function Buyer({ buyerOrder}) {
  const buyer = useSelector(state=>state.buyers.buyers[buyerOrder-1])
  const state= useSelector(state=>state.buyers.buyers)
  console.log('buyer State: ', state)
  console.log('buyer:',buyer);
  return (
    <>
      <div className="flex w-full justify-between ">
        <div className="w-[25%]">
          {/* {Buyer.teamLogo} */}
          <BuyerLogo teamLogo={buyer.teamLogo} order={buyerOrder}/>
        </div>
        <div className="w-[70%] ">
          {/* {buyer.teamName} */}
          <BuyerInfo {...buyer} />
        </div>
      </div>
    </>
  );
}
