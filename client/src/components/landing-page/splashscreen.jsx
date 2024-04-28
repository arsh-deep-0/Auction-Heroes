import { useEffect, useState } from "react";
import { gsap } from "gsap";

function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Define the animation timeline

    tl.to(".box", { duration: 0.5, y: -350, ease: "back.inOut" })
      .to(".box", { duration: 0.2, width: 455, ease: "sine.out" }, "+=0.1")
      .to(
        ".box",
        { duration: 0.2, height: 36, y: -332, ease: "sine.out" },
        "+=0.1"
      )
      .to(".box-text", { duration: 0.5, opacity: 1, ease: "back.inOut" }, "<")

      .to(
        ".box-subtext",
        { duration: 1.8, opacity: 1, ease: "ease.out" },
        "+=0.5"
      )
      .to(
        ".splash",
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setShowSplash(false);
          },
        },
        "+=1"
      );

    return () => {
      tl.kill(); // Kill the animation when the component unmounts (optional)
    };
  }, []);

  return (
    <div
      className={` splash flex flex-col items-center justify-end gap-2 ${
        showSplash ? "" : "splashHidden"
      }`}
    >
      <div className="box bg-white rounded-full  w-1 h-1  flex items-center justify-center p-1 gap-2">
        <img className="box-text opacity-0 h-6" src="logo.svg" alt="" />
        <p className="box-text text-center  opacity-0 text-xl bodoni">
          <span className="blue-text">Shine</span>Spots
        </p>
      </div>
      <h2 className="box box-subtext text-lg jose text-center opacity-0 text-white">
        {" "}
        Brightening Housing Enterprises{" "}
      </h2>
    </div>
  );
}

export default SplashScreen;
