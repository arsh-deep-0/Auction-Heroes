export default function Heading({ title, background = "#000", font = "poppins-medium", border=0 ,fontcolor="black" , fontSize="stat"}) {
  return (
    <>
      <div className="flex justify-center">
        <p className={`text-${fontcolor} rounded-md  min-w-[80%] text-center ${font} text-lg  py-1 ${fontSize}-text border-[${border}px]`} >
          {title}
        </p>
      </div>
    </>
  );
}
