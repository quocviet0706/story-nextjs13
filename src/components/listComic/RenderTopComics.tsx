'use client'
import { comicsProps } from '@/types/typeProps'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import CardComic from '../customs/CardComic'
import Skeleton from 'react-loading-skeleton'
import Pagination from '../customs/Pagination'
import clsx from 'clsx'

interface pageProps {
    data: comicsProps[]
    total_pages: number
    params: {
        page: string
        status: string
        type: 'all' | 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment'
    }
}

const btnsType = [
    { id: 'all', name: 'Tất cả' },
    { id: 'daily', name: 'Top ngày' },
    { id: 'weekly', name: 'Top tuần' },
    { id: 'monthly', name: 'Top tháng' },
    { id: 'chapter', name: 'Top chương' },
    { id: 'follow', name: 'Top theo dõi' },
    { id: 'comment', name: 'Top bình luận' },
]

const btnsStatus = [
    { id: 'all', name: 'Tất cả' },
    { id: 'completed', name: 'Đã hoàn thành' },
    { id: 'ongoing', name: 'Đang ra' },
]

const RenderTopComics: FC<pageProps> = ({ data, total_pages, params }) => {
    const [forcePage, setForcePage] = useState<number | undefined>()
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.location.search === "") {
                router.push('?type=all')
            }
        }
    }, [])

    const handleChangePage = (data: { selected: number }) => {
        let numberPage = data.selected + 1
        router.push(`/truyen-top?type=${params.type}&page=${numberPage}${params.status ? `&status=${params.status}` : ''}`)
    }

    return (
        <>
            <div className='relative'>
                <div className='mb-5 flex items-center gap-2 xl:justify-center justify-start overflow-x-auto xl:pl-0 md:pl-5 pl-0 xl:pr-0 pr-8 element-no-scrollbar'>
                    {btnsType.map(item => (
                        <button
                            key={item.id}
                            className={clsx(
                                { '!bg-[#ffdb95]': params.type == item.id },
                                'border border-slate-200 shadow-sm bg-white rounded-md py-2 px-3 text-sm font-medium whitespace-nowrap'
                            )}
                            onClick={() => { router.push(`?type=${item.id}&page=1`); setForcePage(1) }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                <div className='mb-5 flex gap-2 items-center justify-center'>
                    {btnsStatus.map(item => (
                        <button
                            key={item.id}
                            className={clsx(
                                params.status === undefined ? { '!bg-[#ffdb95]': item.id === 'all' } : { '!bg-[#ffdb95]': params.status === item.id },
                                'border border-slate-200 shadow-sm bg-white rounded-md py-2 px-3 text-sm font-medium',
                            )}
                            onClick={() => router.push(`?type=${params.type}${params.page ? `&page=${params.page}` : ``}&status=${item.id}`)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className='relative bg-white py-3 rounded-md'>
                <div className='flex items-start justify-start flex-wrap'>
                    {(data && data.length > 0) ? data.map((item: comicsProps) => (
                        <div className='relative 2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]' key={item.id}>
                            <CardComic type='normal' data={item} badge='hot' />
                        </div>
                    )) : (
                        Array.from(Array(12).keys()).map(item => (
                            <div key={item} className='2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]'>
                                <Skeleton containerClassName='w-full h-full flex' />
                            </div>
                        ))
                    )}
                </div>
                <Pagination totalPage={total_pages} data={data} handlePageClick={handleChangePage} current_page={parseInt(params.page) - 1} />
            </div>
        </>
    )
}

export default RenderTopComics