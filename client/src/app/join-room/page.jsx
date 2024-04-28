"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function JoinRoom() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // Validate input here if necessary
    if (input.length === 6 && !isNaN(input)) {
      router.push(`/waiting-room?roomID=${input}`);
    } else {
      alert("Please enter a valid 6-digit number.");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 bg-light-blue">
      
      <div className="bg-white p-8 flex-col gap pink-shadow rouded-lg flex items-center gap-4 ">
      <span className="text-blue poppins-regular">Enter Room ID</span>
        <input
          className="pink-shadow gray-border rounded-md text-center"
          type="text"
          value={input}
          onChange={handleChange}
          maxLength={6}
        />
        <button className="bg-blue text-white" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
