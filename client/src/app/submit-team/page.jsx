import Players from '@/components/create-final-team/players'
import PlayersTable from '@/components/submit-team/players-table'
import React from 'react'

export default function page() {
  return (
    <div className='h-full w-full p-4 flex flex-col justify-between items-center poppins-regular bg-light-blue'>
        <div className='poppins-medium px-4 py-1 bg-blue text-white flex justify-center rounded-md w-56'>
             Final team 
        </div>
        
        {/* <PlayersTable/> */}
        <Players/>
        <div className='flex justify-between gap-8'>
            <div className='gray-border rounded-md px-2' >Room ID: 838 442</div>
            <button className='bg-blue text-white button px-2 rounded-md'>Submit Team</button>
        </div>
        </div>
  )
}
