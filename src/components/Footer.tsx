import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full bg-[#0C1A1A]'>
        <div className='wrapper py-3 flex items-center justify-center'>
            <h3 className='text-gray-50 font-semibold'>© 2024 <Link  href='mailto:207006045@student.unsil.ac.id' className='text-[#6ACFC7]'>Singo Bungsu</Link>. All rights reserved.</h3>
        </div>
    </div>
  )
}

export default Footer