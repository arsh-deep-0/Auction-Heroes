export default function BuyerLogo({teamName, order ,orderVisibility=""}) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between py-1">
        <p className={`${orderVisibility} text-black
         text-center poppins-regular text-xs`}>#{order}</span>
      <div className={`rounded-full border-white border-[1px] border-solid w-full p-1 box-border ${teamName}  pink-shadow`}>
          <img className="" src={`/images/team-logos/${teamName}logo.webp`} alt="" />
        </div>
      </div>
    </>
  );
}
