export default function BuyerLogo({teamLogo, order ,orderVisibility=""}) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between py-1 pb-2">
        <span className={`${orderVisibility} text-black
         text-center poppins-regular text-xs`}>#{order}</span>
      <div className={`rounded-full border-white border-[1px] border-solid w-full p-1  box-border ${teamLogo}  pink-shadow aspect-square`}>
          <img className="" src={`/images/team-logos/${teamLogo}logo.webp`} alt="" />
        </div>
      </div>
    </>
  );
}
