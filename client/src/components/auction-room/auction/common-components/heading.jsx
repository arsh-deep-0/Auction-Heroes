export default function Heading({ title }) {
  return (
    <>
      <div className="flex justify-center ">
        <p className="bg-black border-2 border-white border-solid rounded-md pink-shadow px-4 min-w-[80%] text-center aoboshi py-1 text-xs">{title}</p>
      </div>
    </>
  );
}
