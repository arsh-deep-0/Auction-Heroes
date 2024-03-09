export default function BuyerLogo({teamName, order}) {
  return (
    <>
      <div className="w-full">
        <p className="text-white text-center">#{order}</p>
        <div className={`rounded-full border-white border-2 border-solid w-full p-1 ${teamName}`}>
          <img className="" src={`/images/team-logos/${teamName}logo.webp`} alt="" />
        </div>
      </div>
    </>
  );
}
