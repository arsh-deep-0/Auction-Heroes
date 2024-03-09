
import { useState,useEffect } from "react";
export default function CircularProgressBar({
  value,
  percentage,
  circleColor,
  progressBarColor,
  textColor,
  valueAfter = "",
  valueBefore = "",
  radius = 2,
}) {
  const [percent, setPercent] = useState(0);
  const [myValue, setmyValue] = useState(0);
  const circumference = radius * 16 * 2 * Math.PI; // multiplied by 16 because radius is in rem
  const textSizeAfter = 0.375 * radius;
  const textSize = radius / 2;

  useEffect(
    () => {
      setPercent(percentage);
      setmyValue(value);
    },
    [percentage],
    [value]
  );

  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full ">
      <svg
        className=" -rotate-90 "
        style={{ width: radius * 2 + "rem", aspectRatio: "1" }}
      >
        <circle
          className=""
          style={{ color: circleColor }}
          strokeWidth="0"
          stroke="currentColor"
          fill="currentColor"
          r={radius * 16 - 3}
          cx={radius * 16 + ""}
          cy={radius * 16 + ""}
        />
        <circle
          className=""
          style={{ color: progressBarColor }}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius * 16}
          cx={radius * 16 + ""}
          cy={radius * 16 + ""}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className=" text-base leading-3"
          style={{ color: textColor, fontSize: textSize.toFixed(2) + "rem" }}
        >
          <span className="text-xs">{`${valueBefore}`}</span>
          {`${myValue}`}
        </span>
        {valueAfter && (
          <span
            className={`leading-3`}
            style={{
              color: textColor,
              fontSize: textSizeAfter.toFixed(2) + "rem",
            }}
          >{`${valueAfter}`}</span>
        )}
      </div>
    </div>
  );
}
