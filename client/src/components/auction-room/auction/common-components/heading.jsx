export default function Heading({ title, background = "#000", font = "aoboshi",border=2 }) {
  return (
    <>
      <div className="flex justify-center">
        <p className={`  border-white border-solid rounded-md pink-shadow  min-w-[80%] text-center ${font} py-1 stat-text`} style={{background:background,borderWidth:`${border}px`,}}>
          {title}
        </p>
      </div>
    </>
  );
}
