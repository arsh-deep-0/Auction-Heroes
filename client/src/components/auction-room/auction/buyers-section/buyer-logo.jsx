export default function BuyerLogo({teamLogo, order ,orderVisibility=""}) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between p-[0.15rem]">
        <span className={`${orderVisibility} text-black
         text-center poppins-regular text-xs`}>#{order}</span>
      <div className={`rounded-full border-white  border-[1px] border-solid w-full p-1  box-border ${teamLogo}  pink-shadow aspect-square`}>
          <img className="aspect-square" src={`/images/team-logos/${teamLogo}logo.webp`} alt="" />
        </div>
      </div>
    </>
  );
}
