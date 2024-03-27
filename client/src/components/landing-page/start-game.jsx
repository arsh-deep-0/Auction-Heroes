import React from 'react'
import { JoinRoom } from './join-room'
import CreateRoom from './create-Room'

export const StartGame = () => {
  return (
    <div className='flex justify-between p-4 gap-4'>
        <CreateRoom/>
        <JoinRoom/>
    </div>
  )
}
