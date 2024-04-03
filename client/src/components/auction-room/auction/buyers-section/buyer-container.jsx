import { useSelector } from "react-redux";
import Buyer from "./buyer";

export default function BuyersContainer() {
  
  const buyersData = useSelector((state) => state.buyers);

  const renderedBuyers = buyersData.map((buyer) => {
    return <Buyer key={buyer.teamName} buyerOrder={buyer.order} />;
  });

  return (
    <>
      <div className="gray-border h-full w-full rounded-md overflow-y-scroll bg-white py-2 px-1 flex flex-col gap-2 border-solid border-white border-b-4 border-t-4">
        {renderedBuyers}
      </div>
    </>
  );
}
