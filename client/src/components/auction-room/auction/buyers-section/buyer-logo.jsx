export default function BuyerLogo({teamName, order ,orderVisibility=""}) {
  return (
    <>
      <div className="w-full">
        <p className={`${orderVisibility} text-white text-center fredoka`}>#{order}</p>
      <div className={`rounded-full border-white border-[1px] border-solid w-full p-1 ${teamName}  pink-shadow`}>
          <img className="" src={`/images/team-logos/${teamName}logo.webp`} alt="" />
        </div>
      </div>
    </>
  );
}
