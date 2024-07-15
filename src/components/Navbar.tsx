import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex items-center fixed top-0 bg-[#0C1A1A] text-gray-50 left-0 w-full'>
            <div className='wrapper py-3 flex items-center justify-between'>
                <div className='flex items-center'>
                    <h1 className='font-bold text-[28px] text-[#6ACFC7]'>【﻿文法】</h1>
                    <h2 className='text-[28px] font-semibold -ml-1'><span className='text-[#6ACFC7]'>Singo</span>Bungsu</h2>
                </div>

                <div className='flex items-center gap-2'>
                    <Link href='/' className='font-medium text-gray-300 text-[17px]'>Petunjuk Penyalahgunaan</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar