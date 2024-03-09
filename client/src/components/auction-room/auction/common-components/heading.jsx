export default function Heading({ title, background = "#000", font = "aoboshi",border=2 }) {
  return (
    <>
      <div className="flex justify-center">
        <p className={`bg-[${background}]  border-[${border}px]  border-white border-solid rounded-md pink-shadow px-4 min-w-[80%] text-center ${font} py-1 stat-text`}>
          {title}
        </p>
      </div>
    </>
  );
}
