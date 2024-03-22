import GlobalApi from '@/app/_services/GlobalApi'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

function BookingHIstoryList({bookingHistory}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
       {bookingHistory.map((booking, index)=>(
        <div className='flex gap-5 mb-5 rounded-lg p-4 border'>
            <Image src={booking?.businessList?.images[0]?.url}
            alt='image'
            width={120}
            height={120}
            className='rounded-lg object-cover'/>
            <div className='flex flex-col gap-2'>
            <h2 className='font-bold'>{booking?.businessList?.name}</h2>
            <h2 className='flex gap-2 text-primary'><User/>{booking?.businessList?.contactPerson}</h2>
            <h2 className='flex gap-2 text-gray-500'><MapPin className='text-primary'/>{booking?.businessList?.address}</h2>
            <h2 className='flex gap-2 text-gray-500'><Calendar className='text-primary'/> Date : <span className='text-black'>{booking?.date}</span></h2>
            <h2 className='flex gap-2 text-gray-500'><Clock className='text-primary'/> Time : <span className='text-black'>{booking?.time}</span></h2>

                </div>
            </div>
       ))} 
    </div>
  )
}

export default BookingHIstoryList