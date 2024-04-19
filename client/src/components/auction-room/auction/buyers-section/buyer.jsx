import { useSelector } from "react-redux";
import BuyerInfo from "./buyer-info";
import BuyerLogo from "./buyer-logo";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Buyer({ buyerOrder, initialBuyer }) {
  const cookies = new Cookies(null, { path: "/" });
  const fullName=cookies.get('fullName');
  const [buyer, setBuyer] = useState(initialBuyer);

  const reduxBuyer = useSelector((state) => state.buyers.buyers[buyerOrder-1]);

  useEffect(() => {
    if(reduxBuyer){
      setBuyer(reduxBuyer);
      console.log('comapre:',buyer?.teamName,fullName)
      if(buyer?.teamName==fullName){
        cookies.set('teamLogo', buyer.teamLogo);
      }
    }
   
  }, [reduxBuyer]);

  console.log("buyer:", buyer);
  return (
    <>
      <div className="flex w-full justify-between ">
        <div className="w-[25%]">
          {/* {Buyer.teamLogo} */}
          {buyer&&<BuyerLogo teamLogo={buyer?.teamLogo} order={buyerOrder} />}
        </div>
        <div className="w-[70%] ">
          {/* {buyer.teamName} */}
          {buyer&&<BuyerInfo {...buyer} />}
        </div>
      </div>
    </>
  );
}
