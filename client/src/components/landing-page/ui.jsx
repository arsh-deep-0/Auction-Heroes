import gsap from "gsap";
import React, { useEffect } from "react";

export default function UI() {
  useEffect(() => {
    gsap.fromTo(".left", {
      x: -250,
      duration: 1,
      ease: "sine.in",
    },{
        x: 20,
        duration: 1,
        ease: "sine.inOut",
      });

    gsap.fromTo(
      ".right",
      {
        x: 250,
      },
      {
        x: -20,
        duration: 1,
        ease: "sine.inOut",
      }
    );
  }, []);

  return (
    <div className="flex w-full overflow-hidden justify-center lg:w-[50%]">
      <img className="left w-[50%]" src="/images/components/game.svg" alt="" />
      <img className="right w-[62%]" src="/images/components/waiting-room.svg" alt="" />
    </div>
  );
}
