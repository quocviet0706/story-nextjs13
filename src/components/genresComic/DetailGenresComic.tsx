'use client'
import { comicsProps } from '@/types/typeProps'
import { FC, useEffect, useState } from 'react'
import CardComic from '../customs/CardComic'
import Pagination from '../customs/Pagination'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/navigation'

interface DetailGenresComicProps {
    type: string
    page: string
    data?: dataComiscProps
}

interface dataComiscProps {
    comics: comicsProps[]
    total_pages: number
    current_page: number
}

const DetailGenresComic: FC<DetailGenresComicProps> = ({ page, type, data }) => {
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
        router.push(`/the-loai?type=${type}&page=${numberPage}`)
    }


    return (
        <div className='relative bg-white py-3'>
            <div className='flex items-start justify-start flex-wrap'>
                {(data?.comics && data?.comics.length > 0) ? data?.comics.map((item: comicsProps) => (
                    <div className='2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 lg:px-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]' key={item.id}>
                        <CardComic type='normal' data={item} />
                    </div>
                )) : (
                    Array.from(Array(12).keys()).map(item => (
                        <div key={item} className='2xl:w-1/6 xl:w-1/5 lg:w-1/4 w-1/3 md:pb-6 pb-3 lg:px-3 md:px-2 px-1 lg:h-[360px] sm:h-[280px] h-[185px]'>
                            <Skeleton containerClassName='w-full h-full flex' />
                        </div>
                    ))
                )}
            </div>
            <Pagination totalPage={data?.total_pages} data={data?.comics} handlePageClick={handleChangePage} current_page={parseInt(page) - 1} />
        </div>
    )
}
export default DetailGenresComic