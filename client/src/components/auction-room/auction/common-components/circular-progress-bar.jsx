import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressBarDiv({
  value,
  percentage,
  circleColor,
  progressBarColor,
  textColor,
  valueAfter = "",
  valueBefore = "",
  radius = 2}
) {
  
  
  
  return (
    <>
      <CircularProgressbar
        value={percentage}
        background={true}
        text={`${valueBefore} ${value} ${valueAfter}`}
        strokeWidth={5}
        styles={buildStyles({
          strokeLinecap: "round",

          textSize: "clamp(10px,18px,32px)",

          pathTransitionDuration: 0.5,

          // Colors
          pathColor: `${progressBarColor}`,
          textColor: `${textColor}`,
          trailColor: "#ffffff",
          backgroundColor: `${circleColor}`,
        })}
      />
    </>
  );
}
