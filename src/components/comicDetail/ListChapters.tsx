'use client'

import Link from 'next/link'
import React, { FC, useState } from 'react'
import { paginateArray } from '../../utils/paginateArray';
import clsx from 'clsx';

interface listChapterProps {
    data: {
        id: number
        name: string
    }[]
    paramsCurrent: string
}

const itemsPerPage = 50; // Số lượng mục trên mỗi trang

const ListChapters: FC<listChapterProps> = ({ data, paramsCurrent }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(0)
    const [pageNumber, setPageNumber] = useState<number>(1);
    const paginatedItems = paginateArray(data, pageNumber, itemsPerPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


    const handlePageClick = (page: number, index: number) => {
        setPageNumber(page);
        setIsActive(index)
    };


    return (
        <React.Fragment>
            <div className='my-6'>
                <div className='flex items-center justify-start gap-3 flex-wrap'>
                    {pages.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(page, index)}
                            className={clsx(
                                isActive === index && "!bg-secondary",
                                "bg-slate-100 rounded-md px-2 py-1 text-sm font-medium border border-slate-300",
                            )}
                        >
                            {index * itemsPerPage + 1} - {Math.min((index + 1) * itemsPerPage, data.length)}
                        </button>
                    ))}
                </div>
            </div>
            <ul className='grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2'>
                {paginatedItems.map((item: any, index) => (
                    <li title={item.name} key={index} className='w-full border-2 border-slate-300 rounded-md md:p-3 p-2 
                     lg:hover:bg-[#ffd25b] transition-all duration-20'>
                        <Link
                            href={`/truyen/${paramsCurrent}/${item.id.toString()}`}
                            className=' line-clamp-1 font-semibold text-slate-600'
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default ListChapters