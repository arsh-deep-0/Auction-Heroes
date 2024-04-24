import Heading from "../common-components/heading";
import BuyersContainer from "./buyer-container";

export default function BuyersSection() {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        <div className=" h-[5%]">
          <Heading title="Buyers" fontSize="heading"/>
        </div>
        <div  className="h-[90%] w-full">
            <BuyersContainer/>
        </div>
      </div>
    </>
  );
}
