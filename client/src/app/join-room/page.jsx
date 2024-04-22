'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function JoinRoom() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // Validate input here if necessary
    if (input.length === 6 && !isNaN(input)) {
      router.push(`/waiting-room?roomID=${input}`);
    } else {
      alert('Please enter a valid 6-digit number.');
    }
  };

  return (
    <div className='h-full flex flex-col items-center justify-center gap-2'>
      <input className='pink-shadow gray-border rounded-md'
        type="text"
        value={input}
        onChange={handleChange}
        maxLength={6} // Limit input to 6 characters
      />
      <button className="bg-blue text-white" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default JoinRoom;
