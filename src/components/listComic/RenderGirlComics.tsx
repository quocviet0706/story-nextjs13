'use client'
import { comicsProps } from '@/types/typeProps'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import CardComic from '../customs/CardComic'
import Skeleton from 'react-loading-skeleton'
import Pagination from '../customs/Pagination'

interface pageProps {
    data: comicsProps[]
    total_pages: number
    params: string
}

const RenderGirlComics: FC<pageProps> = ({ data, total_pages, params }) => {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.location.search === "") {
                router.push('?page=1')
            }
        }
    }, [])

    const handleChangePage = (data: { selected: number }) => {
        let numberPage = data.selected + 1
        router.push(`/con-gai?page=${numberPage}`)
    }


    return (
        <div className='relative bg-white py-3'>
            <div className='flex items-start justify-start flex-wrap'>
                {(data && data.length > 0) ? data.map((item: comicsProps) => (
                    <div className='relative 2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]' key={item.id}>
                        <CardComic type='normal' data={item} badge='updated_at' />
                    </div>
                )) : (
                    Array.from(Array(12).keys()).map(item => (
                        <div key={item} className='2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]'>
                            <Skeleton containerClassName='w-full h-full flex' />
                        </div>
                    ))
                )}
            </div>
            <Pagination totalPage={total_pages} data={data} handlePageClick={handleChangePage} current_page={parseInt(params) - 1} />
        </div>
    )
}

export default RenderGirlComics