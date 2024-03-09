export default function Stats() {
  return (
    <>
      <div className="grid grid-flow-row grid-cols-3 w-full gap-2 h-full">
        <div className="bg-blue  rounded-md flex justify-center items-center border-white border-2 border-solid pink-shadow aoboshi text-sm gap-1">
          <img src="/images/components/bat.svg" alt="" />
          <p>95</p>
        </div>
        <div className="bg-blue  rounded-md flex justify-center items-center border-white border-2 border-solid pink-shadow aoboshi text-sm gap-1">
          <img src="/images/components/bowl.svg" alt="" />
          <p>84</p>
        </div>
        <div className="bg-blue  rounded-md flex justify-center items-center border-white border-2 border-solid pink-shadow aoboshi text-sm gap-1">
          <img src="/images/components/wicket.svg" alt="" />
          <p>29</p>
        </div>
      </div>
    </>
  );
}
