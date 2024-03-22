'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHIstoryList from './_components/BookingHIstoryList'
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_services/GlobalApi';


function MyBookings() {
    const [bookingHistory, setBookingHistory] = useState([]);
    const {user} = useUser();
    useEffect(()=>{
        user&&getUserBookingHistory();
    },[user])
    const getUserBookingHistory = () => {
        GlobalApi.getUserBookingHistory(user?.emailAddresses).then(resp=>{
            setBookingHistory(resp.bookings)
        })
    }
    const filteredData = (type) => {
        const result = bookingHistory.filter(item=>
            type=='booked'?
            new Date(item.date)>new Date()
            : new Date(item.date) < new Date());
            
            return result;
    }
  return (
    <div className='my-10 mx-5 md:mx-36'>
        <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
        <Tabs defaultValue="booked" className="w-full">
  <TabsList className="w-full justify-start">
    <TabsTrigger value="booked">Booked</TabsTrigger>
    <TabsTrigger value="completed">Completed</TabsTrigger>
  </TabsList>
  <TabsContent value="booked">
    <BookingHIstoryList bookingHistory={filteredData('booked')}/>
  </TabsContent>
  <TabsContent value="completed">
  <BookingHIstoryList bookingHistory={filteredData('completed')}/>
  </TabsContent>
</Tabs>

    </div>
  )
}

export default MyBookings