"use client"

import { guidelines } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav className='flex items-center fixed top-0 bg-[#0C1A1A] text-gray-50 left-0 w-full z-[80]'>
                <div className='wrapper py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <h1 className='font-bold md:text-[28px] text-[20px] text-[#6ACFC7]'>﻿文法</h1>
                        <h2 className='md:text-[28px] text-[20px] font-semibold -ml-1'><span className='text-[#6ACFC7]'>Singo</span>Bungsu</h2>
                    </div>

                    <div className='lg:flex items-center gap-2 hidden'>
                        <button className='font-medium text-gray-300 text-[17px]' onClick={() => setIsOpen(true)}>Petunjuk Penggunaan</button>
                    </div>
                    <div className='flex items-center gap-2 lg:hidden'>
                        <button className='font-medium text-gray-300 text-[17px]' onClick={() => setIsOpen(true)}>Guide</button>
                    </div>
                </div>
            </nav>

            <div className={`flex items-center justify-center min-h-screen w-full bg-black/40 absolute ${isOpen ? 'opacity-100 z-[99]' : 'opacity-0'}`}>
                <div className={`flex flex-col fixed bg-gray-50 rounded-[12px] z-[99] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} transition-all duration-500 ease-in-out px-8 py-6 gap-4`}>
                    <div className='flex items-center gap-2 absolute right-6'>
                        <button className='text-gray-500 font-medium md:text-[18px] text-[14px]' onClick={() => setIsOpen(false)}>Close</button>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Image src='/icons/user-guide.png' alt='' width={40} height={40} className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
                        <h1 className='md:text-[28px] text-[20px] font-bold'>Petunjuk Penggunaan</h1>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <ul className='md:ml-[75px] ml-[20px]'>
                            {guidelines.map((guide) => (
                                <li key={guide.id} className='md:text-[20px] text-[14px] px-2 font-medium lg:max-w-2xl md:max-w-lg max-w-md list-disc'>
                                    {guide.desc}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href='https://wa.link/ku9atz' className='text-blue-500 md:text-[20px] text-[14px] font-medium mt-4' target='blank'>
                        Butuh bantuan?
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar