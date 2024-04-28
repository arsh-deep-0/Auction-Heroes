import Link from "next/link";
import React from "react";

export default function Contact() {
  return (
    <div className="flex gap-2">
      <span className="poppins-regular text-black">
        Liked my work? Find more...
      </span>
      <Link href={"https://github.com/arsh-deep-0"} src="">
        <img src="/images/components/github.svg" alt="" />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/arshdeep-singh-a57444226/"}
        src=""
      >
        <img src="/images/components/linkedin.svg" alt="" />
      </Link>
    </div>
  );
}
