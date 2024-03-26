'use client'
import { FC, useEffect, useState, useRef } from 'react'
import IconTitle from '../../../public/images/icon-full-book.png';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Grid } from 'swiper/modules';
import CardComic from '@/components/customs/CardComic'
import { comicsProps } from '@/types/typeProps';
import { getFullComics } from '@/utils/services';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface SectionFullComicsProps { }

const SectionFullComics: FC<SectionFullComicsProps> = ({ }) => {
    const [dataFullComics, setDataFullComic] = useState<comicsProps[]>([])
    const swiperRef = useRef() as any;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFullComics({ page: 1 })
                setDataFullComic(data)
            } catch (error) {
                console.log('Error');
            }
        }
        fetchData()
    }, [])

    return (
        <div className="w-full mt-5 bg-[#f6f3ee] rounded-md overflow-hidden sm:px-4 sm:py-5 p-2 border">
            <div className="flex items-end justify-between border-b-[3px] border-secondary pb-2 mb-2">
                <div className="text-gray-700 capitalize font-bold text-lg sm:text-2xl flex items-end gap-2">
                    <Image src={IconTitle} alt='icon-title' width={30} height={30} className='w-[30px] h-[30px]' />
                    <h2>Truyện full</h2>
                </div>
                <Link href="/truyen-full?page=1" className='text-sm underline text-[#6e60ee] font-medium italic'>Xem tất cả</Link>
            </div>
            <div className="overflow-hidden rounded-md mt-5 relative group/full">
                <div className='relative rounded-md bg-white w-full border-none sm:border sm:border-solid overflow-hidden'>
                    {(dataFullComics && dataFullComics.length > 0) ? (
                        <Swiper
                            ref={swiperRef}
                            slidesPerView={4}
                            freeMode={true}
                            className='!pb-5'
                            grid={{
                                rows: 2,
                                fill: "row"
                            }}
                            pagination={{
                                clickable: true,
                                clickableClass: clsx("sec-full-pagination"),
                                bulletActiveClass: clsx("sec-full__active")
                            }}
                            modules={[Grid, Pagination, FreeMode]}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 1,
                                    grid: {
                                        rows: 3,
                                        fill: "row"
                                    }
                                },
                                768: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 1,
                                    grid: {
                                        rows: 2,
                                        fill: "row"
                                    }
                                },
                                1024: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 1,
                                    grid: {
                                        rows: 2,
                                        fill: "row"
                                    }
                                },
                            }}
                        >
                            {
                                dataFullComics.map(item => (
                                    <SwiperSlide key={item.id} className='h-full w-full py-2 px-2'>
                                        <div className='h-[200px] sm:h-[320px] rounded-md border'>
                                            <CardComic type='normal' data={item} badge='full' />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    ) : (
                        <LoadingSkeleton />
                    )}
                </div>
                {(dataFullComics && dataFullComics.length > 0) && (
                    <div className='absolute left-0 right-0 top-[45%] -translate-y-[50%] w-full z-10 lg:opacity-0 transition-all duration-300 group-hover/full:opacity-100 
                        sm:block hidden opacity-100'>
                        <button
                            onClick={() => swiperRef.current.swiper.slidePrev()}
                            className='absolute left-3 lg:left-0 text-white w-12 h-12 lg:rounded-full rounded-md bg-[#eec041ab] flex items-center justify-center border border-secondary 
                            lg:group-hover/full:left-7 transition-all duration-500 shadow-lg'
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={() => swiperRef.current.swiper.slideNext()}
                            className='absolute right-3 lg:right-0 text-white w-12 h-12 lg:rounded-full rounded-md bg-[#eec041ab] flex items-center justify-center border border-secondary 
                            lg:group-hover/full:right-7 transition-all duration-500 shadow-lg'
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className='flex items-center justify-center flex-wrap sm:h-[640px] h-[600px] overflow-hidden'>
            {
                Array.from(Array(8).keys()).map(item => (
                    <div key={item} className='w-1/2 sm:w-1/3 lg:w-1/4 h-[200px] sm:h-[320px] p-2'>
                        <Skeleton containerClassName='w-full h-full flex' />
                    </div>
                ))
            }
        </div>
    )
}


export default SectionFullComics