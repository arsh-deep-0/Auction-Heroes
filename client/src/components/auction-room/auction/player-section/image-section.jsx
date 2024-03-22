export default function ImageSection() {
  return (
    <div className="relative gray-border w-full flex justify-center  rounded-md h-full overflow-hidden bg-white">
      <img
        className="absolute  max-w-full max-h-full bottom-0  object-cover z-10"
        src="/images/player-images/Virat Kohli .svg"
        alt=""
      />
      <div className="absolute flex flex-col  w-full">
        <div className="flex text-black  justify-between w-full p-2 poppins-medium">
          <p>Virat</p>
          <p>Kohli</p>
        </div>
        <div className="flex text-black poppins-light justify-between w-full p-2 noto- text-[0.65rem] items-center">
          <div>
            <p>IND </p>
            <p>Batsman</p>
          </div>
          <p className="bg-blue text-white px-2 rounded-md py-[0.1rem] border-b-2 border-white border-solid pink-shadow text-xs font-bold">₹2 Cr</p>
        </div>
      </div>

      <div className="pt-[50%] w-full h-full absolute  flex justify-center   items-baseline">
        <div className="absolute bottom-0 min-h-[52%]  max-h-[53%] min-w-[57%] max-width-[58%] aspect-square bg-blue rounded-full blur-[10px]"></div>
      </div>
    </div>
  );
}
