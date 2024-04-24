import React from 'react'
import SellingSection from './selling-section'
import Heading from '@/components/auction-room/auction/common-components/heading'
import Navigator from './navigator'

export default function Biddingsection() {
  return (
    <div className='w-full flex flex-col gap-8 '>
         <div className="h-[5%] w-full ">
          <Heading title="Bidding Section" fontSize="heading" />
        </div>
        
        <SellingSection/>
        <Navigator/>
    </div>
  )
}
