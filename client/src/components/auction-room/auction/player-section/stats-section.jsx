export default function Stats() {
  return (
    <>
      <div className="grid grid-flow-row grid-cols-3 w-full gap-2 h-full">
        <div className="bg-blue  rounded-md  items-center gray-border poppins-medium text-sm gap-1 grid grid-cols-2 px-[0.2rem]">
          <img src="/images/components/bat.svg" alt="" />
          <p className="stat-text">95</span>
        </div>
        <div className="bg-blue  rounded-md  justify-center items-center gray-border  poppins-medium text-sm gap-1 grid grid-cols-2 px-[0.2rem]">
          <img src="/images/components/bowl.svg" alt="" />
          <p className="stat-text">84</span>
        </div>
        <div className="bg-blue  rounded-md  justify-center items-center gray-border  poppins-medium text-sm gap-1 grid grid-cols-2 px-[0.2rem]">
          <img src="/images/components/wicket.svg" alt="" />
          <p className="stat-text">29</span>
        </div>
      </div>
    </>
  );
}
