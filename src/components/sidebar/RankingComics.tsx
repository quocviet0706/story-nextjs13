import { FC, memo } from 'react'
import GifBookCate from '../../../public/images/cate-book.gif';
import Image from 'next/image'
import { FaCrown } from 'react-icons/fa'
import IconRankingTop1 from '../../../public/images/ranking-top-1.png'
import IconRankingTop2 from '../../../public/images/ranking-top-2.png'
import IconRankingTop3 from '../../../public/images/ranking-top-3.png'
import { FaRegEye, FaComments } from 'react-icons/fa'
import Link from 'next/link';
import { comicsProps } from '@/types/typeProps';
import Skeleton from 'react-loading-skeleton';
import { AiFillHeart } from 'react-icons/ai';
import { shortNumber } from '@/utils/shortNumber';
import { BsFillBookmarksFill } from 'react-icons/bs';

interface rankingComicsProps {
    limitNumber?: number
}

const RankingComics: FC<rankingComicsProps> = async ({ limitNumber = 7 }) => {


    const fetchData = async () => {
        try {
            const res = await fetch(`https://comics-api.vercel.app/top`, { next: { revalidate: 60 } })
            const dataFetch = await res.json()
            const dataLimit = dataFetch.comics.filter((item: comicsProps, index: number) => index < limitNumber)

            return dataLimit;
        } catch (error) {
            console.log(error);
        }
    }
    const dataTopRanking = await fetchData()

    return (
        <aside className='w-full mt-5 mb-4 bg-[#f6f3ee] rounded-md overflow-hidden border'>
            <div className='py-5 px-4 pb-0'>
                <div className='relative pb-2 capitalize text-gray-700 border-b-[3px] border-secondary border-solid flex items-center'>
                    <Image src={GifBookCate} alt='book' width={40} height={40} className='mr-3' />
                    <h2 className='relative inline-block font-bold text-xl'>
                        Bảng xếp hạng
                        <span className='text-secondary rotate-45 absolute -top-2 -right-4 text-2xl'><FaCrown /></span>
                    </h2>
                </div>
            </div>
            <div className='p-4 flex items-center flex-wrap justify-start gap-2 overflow-hidden'>
                <div className='overflow-hidden flex flex-col w-full items-start bg-white rounded-xl text-sm font-medium border border-[#d7d7d7] py-2'>
                    {(dataTopRanking && dataTopRanking.length > 0) ? (
                        dataTopRanking.map(((item: comicsProps, key: number) => (
                            <div key={item.id} className='group py-2 px-4 border-b border-[#d7d7d7] w-full flex items-start gap-2 last:border-b-0' title={`Truyện tranh ${item.title}`}>
                                {
                                    key <= 2 ? (
                                        <Link href={`/truyen/${item.id}`} className='w-[50px] h-[50px] rounded-fullflex items-center justify-center'>
                                            {key === 0 && <Image src={IconRankingTop1} alt='top-1' className='w-auto h-auto' priority />}
                                            {key === 1 && <Image src={IconRankingTop2} alt='top-2' className='w-auto h-auto' priority />}
                                            {key === 2 && <Image src={IconRankingTop3} alt='top-3' className='w-auto h-auto' priority />}
                                        </Link>
                                    ) : (
                                        <div className='flex items-center justify-center text-lg font-bold text-gray-400 w-[50px] 
                                        h-[50px] rounded-full'
                                        >
                                            {key + 1}
                                        </div>
                                    )
                                }
                                <div className='flex-1 w-full'>
                                    <Link href={`/truyen/${item.id}`} className='hover:text-secondary transition-all font-bold text-base capitalize line-clamp-1'>{item.title}</Link>
                                    <div className='flex items-center justify-between text-xs w-full pb-2'>
                                        <div className='flex items-center gap-1 text-slate-400'>
                                            <span><BsFillBookmarksFill /> </span>
                                            <Link href={`/truyen/${item.id}/${item.last_chapter.id}`} className='text-blue-400 underline font-medium'>
                                                {item.last_chapter.name}
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-1 text-gray-400'>{item.updated_at}</div>
                                    </div>
                                    <div className='flex items-center justify-end text-xs w-full lg:flex-wrap gap-1'>
                                        <div className='flex items-center justify-center gap-1 text-gray-400'>
                                            <AiFillHeart />
                                            <span>{shortNumber(item.followers)}</span>
                                        </div>
                                        <span className='text-gray-200 mx-1'>|</span>
                                        <div className='flex items-center justify-center gap-1 text-gray-400'>
                                            <FaRegEye />
                                            <span>{shortNumber(item.total_views)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )))
                    ) : (
                        <LoadingSkeleton />
                    )}
                </div>

            </div>
        </aside>
    )
}

function LoadingSkeleton() {
    return Array.from(Array(7).keys()).map(item => (
        <div key={item} className='py-2 px-4 border-b border-[#d7d7d7] w-full flex items-start gap-2 last:border-b-0'>
            <div className='w-[50px] h-[50px] overflow-hidden border rounded-md'>
                <Skeleton containerClassName='w-full h-full flex' />
            </div>
            <div className='flex-1 w-full'>
                <Skeleton containerClassName='w-full' />
                <div className='flex justify-between gap-5 pb-1'>
                    <Skeleton containerClassName='w-1/4' />
                    <Skeleton containerClassName='w-1/3' />
                </div>
                <div className='flex justify-between gap-5'>
                    <Skeleton containerClassName='w-2/4' />
                    <Skeleton containerClassName='w-1/3' />
                </div>
            </div>
        </div>
    ))
}

export default memo(RankingComics)