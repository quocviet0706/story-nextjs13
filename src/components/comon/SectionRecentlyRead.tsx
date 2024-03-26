'use client'

import Image from 'next/image'
import React from 'react'
import GifBookCate from '../../../public/images/cate-book.gif';

const SectionRecentlyRead = () => {
    return (
        <section className="w-full mt-5 bg-[#f6f3ee] rounded-md overflow-hidden sm:px-4 sm:py-5 p-2 border md:mb-[40px] mb-5">
            <div className="flex items-end justify-between border-b-[3px] border-secondary pb-2 mb-2">
                <div className="text-gray-700 capitalize font-bold sm:text-2xl text-lg flex items-end gap-2 mb-3 sm:mb-0">
                    <Image src={GifBookCate} alt='icon-title' width={45} height={45} className='sm:w-[50px] sm:h-[50px] w-[35px] h-[35px] ' />
                    <h2>Truyện đang đọc</h2>
                </div>
            </div>
            <div className="overflow-hidden rounded-md mt-5 relative">
                <div className='relative p-4 rounded-md bg-white w-full border-none sm:border sm:border-solid overflow-hidden'>
                    <div className='py-5 text-center text-xs font-semibold text-slate-400'>Chưa có truyện đang đọc</div>
                </div>
            </div>
        </section>
    )
}

export default SectionRecentlyRead