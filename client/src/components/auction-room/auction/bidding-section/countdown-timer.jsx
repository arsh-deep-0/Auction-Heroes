import React from "react";
import CircularProgressBarDiv from "../common-components/circular-progress-bar";

export default function CountdownTimer() {
  return (
    <>
      <div className="bg-white aspect-[3/2] rounded-lg pink-shadow mx-1  pt-1 pb-[2px] box-border flex flex-col justify-between items-center">
        <div className="w-[45%] relative flex items-center justify-center">
          <div className="absolute flex justify-center items-center flex-col text-white">
            <p
              className="poppins-light"
              style={{ fontSize: "clamp(1.2rem,4vw,2rem)" }}
            >
              11s
            </p>
          </div>
          <CircularProgressBarDiv
            percentage={75}
            circleColor={"#7d54f2"}
            progressBarColor={"black"}
          />
        </div>

        <p className="poppins-light bar-text text-black ">Timer</p>
      </div>
    </>
  );
}
