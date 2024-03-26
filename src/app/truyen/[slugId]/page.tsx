
import ImageFallback from '@/components/customs/ImageFallback'
import RankingComics from '@/components/sidebar/RankingComics'
import { comicsDetailsProps } from '@/types/typeProps'
import Link from 'next/link'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { FaEye, FaFileAlt, FaGrinHearts, FaTags, FaUser } from 'react-icons/fa'
import { IoMdBarcode, IoMdWifi } from 'react-icons/io'
import CollapseDesc from '@/components/comicDetail/CollapseDesc'
import ListChapters from '@/components/comicDetail/ListChapters'
import RootLayout from '@/components/layout/RootLayout'
import { shortNumber } from '@/utils/shortNumber'


interface pageProps {
    params: {
        slugId: string
    }
}

const getComicDetail = async (id: string) => {

    try {
        const res = await fetch(`https://comics-api.vercel.app/comics/${id}`)
        const data = await res.json();
        return data;

    } catch (error) {
        new Error('Error');
    }

}

// or Dynamic metadata
export async function generateMetadata({ params }: pageProps) {
    const data = await getComicDetail(params.slugId) as comicsDetailsProps
    return {
        title: `${data.title} - Truyện tranh hay`,
        description: data.description.slice(0, 150) + '...',
    }
}


const ComicsDetail: FC<pageProps> = async ({ params }) => {

    const data = await getComicDetail(params.slugId) as comicsDetailsProps

    return (
        <RootLayout>
            <main className={`overflow-x-hidden bg-white min-h-[80vh]`}>
                <div className='container flex items-start justify-center relative flex-wrap'>
                    <div className='xl:w-[70%] w-full lg:pr-2 md:pr-0'>
                        <div className="relative w-full my-5">
                            <div className='relative rounded-md w-full mt-2 md:bg-[#f6f3ee] md:p-4 p-0'>
                                <div className='flex items-center font-semibold text-sm'>
                                    <Link href="/" className='hover:underline text-slate-600 whitespace-nowrap'>Trang chủ</Link>
                                    <div className="text-sm mx-2 "><BsChevronRight /></div>
                                    <Link href="/the-loai?type=all" className='hover:underline text-slate-600'>Truyện</Link>
                                    <div className="text-sm mx-2 "><BsChevronRight /></div>
                                    <span className='text-slate-600 line-clamp-1'>{data.title}</span>
                                </div>
                            </div>
                            <div className='flex items-start w-full md:mt-7 mt-2 flex-wrap'>
                                <div className='w-full md:w-[35%] md:pr-2 pr-0 hidden md:block'>
                                    <ImageFallback
                                        src={data?.thumbnail as string}
                                        alt={data?.id as string}
                                        className='w-full h-full object-cover z-0 duration-300 transition-all rounded-md border-2 border-slate-300'
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                </div>
                                <div className='w-full md:w-[65%] md:pl-2 pl-0'>
                                    <h1 className='mt-3 lg:text-[28px] md:text-[22px] text-[26px] font-bold text-[#ed7a00] leading-8 md:text-left text-center mb-2'>{data?.title}</h1>
                                    <h3 className='mt-2 font-medium text-slate-500 md:text-left text-center md:text-base text-sm mb-2'>{data?.other_names.join(', ')}</h3>
                                    <hr className='w-full md:my-4 my-2 border-t-2 border-slate-200' />
                                    <ImageFallback
                                        src={data?.thumbnail as string}
                                        alt={data?.id as string}
                                        className='w-[60%] h-full object-cover z-0 duration-300 transition-all rounded-md md:hidden block mt-4 mb-5 mx-auto'
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                    <ul className='overflow-hidden relative'>
                                        <li className='flex items-center mb-2'>
                                            <p className='w-[33%] text-slate-600 text-base font-semibold flex items-center gap-1 leading-[27px]'><FaUser /> Tác giả: </p>
                                            <p className='w-[67%] leading-[27px] text-slate-600 text-base font-semibold'>{data?.authors.replace("Updating", "Đang cập nhật")}</p>
                                        </li>
                                        <li className='flex items-center mb-2'>
                                            <p className='w-[33%] text-slate-600 text-base font-semibold flex items-center gap-1 leading-[27px]'><IoMdWifi /> Tình trạng: </p>
                                            <p className='w-[67%] leading-[27px] text-slate-600 text-base font-semibold'>{data?.status.replace("Ongoing", "Đang ra chương")}</p>
                                        </li>
                                        <li className='flex items-start mb-3'>
                                            <p className='w-[33%] text-slate-600 text-base font-semibold flex items-center gap-1 leading-[27px]'><FaTags /> Thể loại: </p>
                                            <div className='w-[67%] leading-[27px] text-slate-600 text-base font-semibold'>
                                                {data?.genres.map((item, index) => (
                                                    <React.Fragment key={item.id}>
                                                        <Link
                                                            href={`/the-loai?type=${item.id}`}
                                                            className='inline-block text-thirdary hover:underline'>
                                                            {item.name}
                                                        </Link>
                                                        {index !== data.genres.length - 1 && <span className="mx-1"> - </span>}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </li>
                                        <li className='flex items-center mb-2'>
                                            <p className='w-[33%] text-slate-600 text-base font-semibold flex items-center gap-1 leading-[27px]'><FaEye /> Lượt xem: </p>
                                            <p className='w-[67%] leading-[27px] text-slate-600 text-base font-semibold'>{shortNumber(data?.total_views)}</p>
                                        </li>
                                        <li className='flex items-center mb-2'>
                                            <p className='w-[33%] text-slate-600 text-base font-semibold flex items-center gap-1 leading-[27px]'><FaGrinHearts />Yêu Thích:</p>
                                            <p className='w-[67%] leading-[27px] text-slate-600 text-base font-semibold'>{shortNumber(data?.followers)}</p>
                                        </li>
                                    </ul>
                                    <div className='my-4 flex items-center md:justify-start justify-center'>
                                        <div className='w-[33%] lg:block hidden'></div>
                                        <div className='flex items-center gap-4'>
                                            <Link
                                                href={`/truyen/${data?.id}/${data?.chapters.slice().reverse()[0].id}`}
                                                className='hover:shadow-md inline-block md:px-5 md:py-3 px-3 py-2  rounded-md border-2 border-[#ed9500] bg-[#ed9500] text-slate-50 font-bold'>
                                                Đọc từ đầu
                                            </Link>
                                            <Link
                                                href={`/truyen/${data?.id}/${data?.chapters[0].id}`}
                                                className='hover:shadow-md inline-block md:px-5 md:py-3 px-3 py-2 rounded-md border-2 border-[#ed9500] text-[#ed9500] font-bold'>
                                                Đọc chương mới
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative w-full my-6'>
                                <div className='relative rounded-md w-full mb-3 bg-[#f6f3ee] p-4'>
                                    <div className='flex items-center font-semibold md:text-base text-sm'>
                                        <h3 className='text-lg font-bold text-slate-700 inline-flex items-center gap-2'><FaFileAlt /> Mô tả truyện</h3>
                                    </div>
                                </div>
                                <div className='text-slate-500 text-base px-2 md:px-0'>
                                    <CollapseDesc desc={data.description.replace(/NComics/g, `"Truyện hay"`)} />
                                </div>
                            </div>
                            <div className='relative w-full mb-6'>
                                <div className='relative rounded-md w-full mb-3 bg-[#f6f3ee] p-4'>
                                    <div className='flex items-center font-semibold md:text-base text-sm'>
                                        <h3 className='text-lg font-bold text-slate-700 inline-flex items-center gap-2'><IoMdBarcode /> Danh sách chương</h3>
                                    </div>
                                </div>
                                <ListChapters paramsCurrent={data.id} data={data.chapters.slice().reverse()} />
                            </div>
                        </div>
                    </div>
                    <div className='xl:w-[30%] w-full lg:pl-2 md:pl-0'>
                        <RankingComics limitNumber={10} />
                    </div>
                </div>
            </main>
        </RootLayout>
    )
}


export default ComicsDetail