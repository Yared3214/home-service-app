import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { toast } from "sonner"
import moment from 'moment';

  

function BookingSection({children, business}) {
    const {user} = useUser();
    const [id, setId] = useState();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [bookedSlot, setBookedSlot] = useState();
    useEffect(()=>{
        getTime();
        // setDate('');
        // setSelectedTime('');
    },[])
    useEffect(()=>{
      date&&businessBookedSlot();
    },[date])
    const businessBookedSlot = () => {
      GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-yyyy')).then(resp=>{
       setBookedSlot(resp.bookings)
      })
    }

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i<= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for(let i =1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTime(timeList)
    }

    const saveBooking = () => {
        GlobalApi.saveBooking(moment(date).format('DD-MMM-yyyy'), selectedTime, user.emailAddresses, user.firstName, business.id).then(resp=>{
          setId(resp.createBooking.id)
          if(resp) {
            // Toast Msg
            toast("Service has been booked", {
              description: date.toString().split('2024')[0] + date.getFullYear() + ', at ' + selectedTime,
              action: {
                label: "Undo",
                // onClick: () => deleteBooking,
              },
            })
          }
          else{
            // Error Toast Msg
            toast('Error while booking service', {
              description: 'Please try again',
            })
          }
        })
    }
    // const deleteBooking = () => {
    //   GlobalApi.deleteBooking(id).then(resp=>{
    //     console.log(resp)
    //   })
    // }
    
    const isSlotbooked = (time) => {
      return bookedSlot?.find(item=>item.time === time);
      }
33
  return (
    <div>
        <Sheet>
  <SheetTrigger asChild>
    {children}
    </SheetTrigger>
  <SheetContent className="overflow-auto">
    <SheetHeader>
      <SheetTitle>Book Serivce</SheetTitle>
      <SheetDescription>
        Select Date and Time slot to book Service
        {/* Date Picker */}
        <div className='flex flex-col gap-5 items-baseline'>
            <h2 className='font-bold mt-5'>Select Date</h2>
            <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
        </div>
        {/* Time Slot Picker */}
        <h2 className='my-5 font-bold'>Select Time Slot</h2>
        <div className='grid grid-cols-3 gap-3'>
            {time.map((item, index)=>(
                <Button key={index} 
                disabled={isSlotbooked(item.time)}
                variant='outline' 
                className={`border rounded-full p-2 px-3
                hover:bg-primary hover:text-white
                ${selectedTime===item.time&&'bg-primary text-white'}`}
                onClick={()=> setSelectedTime(item.time)}>
                    {item.time}
                </Button>
            ))}
        </div>
      </SheetDescription>
    </SheetHeader>
    <SheetFooter className="mt-5">
              <SheetClose asChild>
                <div className='flex gap-5'>
                <Button variant="destructive">Cancel</Button>
                <Button disabled={!(selectedTime&&date)}
                onClick={()=> saveBooking()}>Book</Button>
                </div>
              </SheetClose>
            </SheetFooter>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default BookingSection