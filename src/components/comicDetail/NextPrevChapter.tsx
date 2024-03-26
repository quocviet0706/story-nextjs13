'use client'

import { singleComic } from '@/types/typeProps'
import React, { FC, memo, useState } from 'react'
import ImageFallback from '../customs/ImageFallback'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getNextChapter, getPrevChapter } from '@/utils/nextprevchapter'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";

interface dataProps {
    data: singleComic
    slug: string
    chapter: string
}

const NextPrevChapter: FC<dataProps> = ({ data, slug, chapter }) => {
    const [currentData, setCurrentData] = useState<singleComic>(data)
    const [hiddenScreen, setHiddenScreen] = useState<boolean>(false)

    const router = useRouter()

    const currentSlug = slug;
    const currentChapter = chapter;

    const dataChapter = currentData.chapters.slice().reverse()
    const currentIndex = dataChapter.findIndex(element => parseInt(element.id) === parseInt(currentChapter))
    const nextChapter = dataChapter[currentIndex + 1]
    const prevChapter = dataChapter[currentIndex - 1]

    const handleNextChapter = async () => {
        if (nextChapter === undefined) return

        router.push(`/truyen/${currentSlug}/${nextChapter.id}`)
        const { data, msg } = await getNextChapter(currentSlug, nextChapter)
        if (data !== null) {
            setCurrentData(data)
        }

    }

    const handlePrevChapter = async () => {
        if (prevChapter === undefined) return
        router.push(`/truyen/${currentSlug}/${prevChapter.id}`)
        const { data, msg } = await getPrevChapter(currentSlug, prevChapter)
        if (data !== null) {
            setCurrentData(data)
        }
    }

    console.log(hiddenScreen);



    return (
        <React.Fragment>
            <div className={clsx(
                'fixed top-0 left-0 select-none inset-x-0 bg-[rgba(0,0,0,0.61)] text-left py-3 px-2 text-gray-300 font-semibold duration-200 translate-y-0 opacity-1',
                { "!-translate-y-[50px]": hiddenScreen }
            )}>
                <div className='md:block hidden'>
                    <div className='flex items-center gap-4 md:flex-row flex-col'>
                        <Link
                            className='hover:text-secondary flex items-center gap-2 line-clamp-1'
                            href={`/truyen/${slug}`}>
                            <FaChevronLeft />{currentData.comic_name}
                        </Link>
                        <span className='md:block hidden'>-</span>
                        <span>{currentData.chapter_name}</span>
                    </div>
                </div>
                <div className='md:hidden block'>
                    <div className='flex items-center justify-between'>
                        <Link href={`/truyen/${slug}`} className='flex items-center gap-2'>
                            <FaChevronLeft /> Trở về
                        </Link>
                    </div>
                </div>
            </div>
            <button
                className={clsx(
                    'fixed right-4 bottom-[70px] flex items-center justify-center shadow-md w-10 h-10 rounded-[50%] text-white bg-[#c98d16] z-10 text-lg',
                    { '!opacity-50': hiddenScreen }
                )}
                onClick={() => setHiddenScreen(!hiddenScreen)}
            >
                {hiddenScreen ? <LuLightbulbOff /> : <LuLightbulb />}
            </button>
            <div className='container'>
                <div className='md:hidden block mt-20'>
                    <h3 className='text-center font-bold text-lg bg-primary text-slate-700 rounded-md p-4 shadow-sm'>
                        {currentData.comic_name} <br /> <span className='text-yellow-700 uppercase pt-2 block'> {currentData.chapter_name}</span>
                    </h3>
                </div>
                <div className='text-center max-w-[42rem] mx-auto mt-12 mb-16'>
                    {currentData.images.map((item) => (
                        <ImageFallback
                            key={item.src}
                            src={item.src ? item.src : item.backup_src}
                            alt={item.src}
                            width={2048}
                            height={100}
                            className='w-full h-auto'
                        />
                    ))}
                </div>
            </div>
            <div className={clsx(
                'fixed bottom-0 left-0 select-none inset-x-0 bg-[rgba(0,0,0,0.61)] text-left py-3 px-2 text-gray-300 font-semibold duration-200 translate-y-0 opacity-1',
                { "!translate-y-[70px]": hiddenScreen }
            )}>
                <div className='flex items-center justify-center md:gap-4 gap-2'>
                    <button
                        onClick={handlePrevChapter}
                        className={clsx(
                            prevChapter === undefined && '!bg-[#b7b7b7] cursor-no-drop !text-[#7e7e7e] !border-[#e3e3e3] hover:shadow-none',
                            'px-3 py-2 rounded-md border-2 border-[#ffbd6d] justify-center flex items-center gap-2',
                            'bg-[#ffe0bb] text-slate-800 font-semibold md:w-[200px] md:text-base text-xs hover:shadow-[0_0_10px_#ffc785]'
                        )}
                        disabled={prevChapter === undefined}
                    >
                        <FaChevronLeft />Chương trước
                    </button>
                    <button
                        onClick={handleNextChapter}
                        className={clsx(
                            nextChapter === undefined && '!bg-[#b7b7b7] cursor-no-drop !text-[#7e7e7e] !border-[#e3e3e3] hover:shadow-none',
                            'px-3 py-2 rounded-md border-2 border-secondary flex items-center',
                            'justify-center gap-2 bg-[#ffad4b] text-slate-800 font-semibold md:w-[200px] md:text-base text-xs hover:shadow-[0_0_10px_#ffc785]'
                        )}
                        disabled={nextChapter === undefined}
                    >
                        Chương tiếp <FaChevronRight />
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}


export default memo(NextPrevChapter)