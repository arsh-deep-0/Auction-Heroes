import { useSelector } from "react-redux";
import BuyerInfo from "./buyer-info";
import BuyerLogo from "./buyer-logo";
import { useEffect, useState } from "react";

export default function Buyer({ buyerOrder,initialBuyer}) {
  const [buyer, setBuyer] = useState(initialBuyer);

  // Subscribe to Redux store updates
  const reduxBuyer = useSelector(state => state.buyers.buyers[buyerOrder]);

  // Update local state when Redux store changes
  useEffect(() => {
    setBuyer(reduxBuyer);
  }, [reduxBuyer]);

  
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
