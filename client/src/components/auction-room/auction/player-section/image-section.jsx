export default function ImageSection() {
  return (
    <div className="relative pink-shadow w-full flex justify-center  rounded-xl border-b-2 border-black border-solid h-full overflow-hidden">
      <img
        className="absolute  w-full bottom-0  object-cover z-10"
        src="/images/player-images/Jos Buttler.svg"
        alt=""
      />
      <div className="absolute flex flex-col  w-full">
        <div className="flex text-black  justify-between w-full p-2 aoboshi">
          <p>Virat</p>
          <p>Kohli</p>
        </div>
        <div className="flex text-black  justify-between w-full p-2 noto-serif text-[0.65rem] items-center">
          <div>
            <p>IND </p>
            <p>Batsman</p>
          </div>
          <p className="bg-black text-white px-2 rounded-md py-[0.1rem] border-b-2 border-white border-solid pink-shadow text-xs font-bold">₹2 Cr</p>
        </div>
      </div>

      <div className="pt-[50%] w-full h-full absolute  flex justify-center   items-baseline">
        <div className="h-[100%] min-h-[80px] aspect-square bg-blue rounded-full blur-[8px]"></div>
      </div>
    </div>
  );
}
