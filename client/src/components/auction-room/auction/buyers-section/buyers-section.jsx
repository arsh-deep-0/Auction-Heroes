import Heading from "../common-components/heading";
import BuyersContainer from "./buyer-container";

export default function BuyersSection() {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        <div className="h-[10%]">
          <Heading title="Buyers" />
        </div>
        <div  className="h-[85%] w-full">
            <BuyersContainer/>
        </div>
      </div>
    </>
  );
}
