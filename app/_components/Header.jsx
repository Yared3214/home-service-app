'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';


const Header = ({onAuthButtonClick}) => {
  const {user} = useUser();
  
  const SignOut = () => {
    const { isLoaded,signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <div>
        <div onClick={()=>{signOut();}}>
        <h2 className='text-[17px]'>Logout</h2>
        </div>
      </div>
    );
  };
  
  return (
    <div className='p-5 shadow-sm flex justify-between'>
        <div className="flex items-center gap-8">
            <Image src='/logo.svg' alt='logo' height={100}
            width={180}/>
            <div className="md:flex items-center gap-6 hidden">
                <Link href={'/'} className='hover:scale-105 hover:text-primary cursor-pointer font-medium'>Home</Link>
                <h2 className='hover:scale-105 hover:text-primary cursor-pointer font-medium'>Services</h2>
                <h2 className='hover:scale-105 hover:text-primary cursor-pointer font-medium'>About Us</h2>
            </div>      
        </div>
        <div>
          {user? 
          <DropdownMenu>
  <DropdownMenuTrigger>
    <Image src={user.imageUrl}
          alt='user'
          width={40}
          height={40}
          className='rounded-full hover:scale-105 cursor-pointer'/>
          </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={'/myBookings'}>My Booking</Link> 
      </DropdownMenuItem>
    <DropdownMenuItem>
      <SignOut/>
    </DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>
          :
          <Button onClick={onAuthButtonClick}>Login / Sign Up</Button>}
          
        </div>
    </div>
  )
}

export default Header