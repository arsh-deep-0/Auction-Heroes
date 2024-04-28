"use client";
import SplashScreen from "@/components/landing-page/splashscreen";
import { StartGame } from "@/components/landing-page/start-game";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/landing-page/heading";
import Subheading from "@/components/landing-page/subheading";
import Buttons from "@/components/landing-page/buttons";
import Navbar from "@/components/landing-page/navabr";
import UI from "@/components/landing-page/ui";
import Contact from "@/components/landing-page/contact";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  gsap.registerPlugin(ScrollTrigger);
  const appt = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call it initially
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the listener on unmount
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".start", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "sineout",
        stagger: 0.1,
        delay: 0,
      });
    }, appt);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appt}>
      <main className="flex min-h-screen flex-col items-center gap-4 text-black p-2 bg-light-blue">
        <Navbar />
        <Heading />
        <Subheading />
        <Buttons name1={"Create Room"} name2={"Join Room"} />
        <UI />
        <Contact />
      </main>
    </div>
  );
}
