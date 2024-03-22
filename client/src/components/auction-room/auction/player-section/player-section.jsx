import Heading from "../common-components/heading";
import ImageSection from "./image-section";
import Stats from "./stats-section";

export default function PlayerSection() {
  return (
    <>
      <div className="flex flex-col items-center w-full h-full justify-between">
        <div className="h-[10%] w-full "> <Heading title="Player Stats" fontSize="heading" /></div>
        <div className="h-[75%] w-full "> <ImageSection /></div>
        <div className="h-[10%] w-full"><Stats/></div>
       
       
        
      </div>
    </>
  );
}
