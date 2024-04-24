'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import createTeams from '@/utils/createOfflineTeams';

function JoinRoom() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // Validate input here if necessary
    if (input.length === 6 && !isNaN(input)) {
        if(input==666666){
            createTeams(roomID)
            router.push(`/auction-center/auction?roomID=${roomID}`);
        }
        else{
            alert('Wrong secret code')
        }
     
    } else {
      alert('Please enter a valid 6-digit number.');
    }
  };

  return (
    <div className='h-full flex flex-col items-center justify-center gap-2'>
        <div>Enter the secret code</div>
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
