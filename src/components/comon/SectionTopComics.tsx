'use client'

import { comicsProps } from '@/types/typeProps'
import { FC, useEffect, useState } from 'react'
import CardComic from '@/components/customs/CardComic';
import IconTitle from '../../../public/images/light-book.png';
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';
import useSWR from 'swr';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

interface SectionTopComicsProps { }

const options: selectProps[] = [
    { value: 'all', label: 'Tất cả' },
    { value: 'daily', label: 'Top ngày' },
    { value: 'weekly', label: 'Top tuần' },
    { value: 'monthly', label: 'Top tháng' },
    { value: 'follow', label: 'Top theo dõi' },
    { value: 'comment', label: 'Top bình luận' },
    { value: 'chapter', label: 'Top chapter' },
];

const styleSelect = {
    control: (provided: any, state: any) => ({
        display: 'flex',
        height: '100%',
        width: '100%',
        cursor: 'text',
        overflow: 'hidden',
        "&:hover": {
            cursor: 'pointer'
        }
    }),
    indicatorSeparator: () => ({}),
    singleValue: (base: any) => ({
        ...base,
        fontWeight: "600",
        color: "#374157"
    })
}

interface selectProps {
    value: string
    label: string
}

type selectTopProps = selectProps | null

const SectionTopComics: FC<SectionTopComicsProps> = ({ }) => {
    const [shouldRunEffect, setShouldRunEffect] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<selectTopProps>(options[3]);

    const { sm } = useMediaQueryContext()

    const fetcherWithTrending = (url: string, headerValue: any) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(headerValue)
    }).then(res => res.json())

    const { data: dataTopComics, isLoading, mutate } = useSWR(`/api/top`, url => fetcherWithTrending(url, { type: selectedOption?.value, limit: 12, }), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    useEffect(() => {
        if (shouldRunEffect) {
            mutate({ ...dataTopComics })
        } else {
            setShouldRunEffect(true);
        }
    }, [selectedOption]);


    return (
        <section className="w-full mt-5 bg-[#f6f3ee] rounded-md overflow-hidden sm:px-4 sm:py-5 p-2 border">
            <div className="flex sm:items-end sm:justify-between border-b-[3px] border-secondary pb-2 mb-2 sm:flex-row flex-col justify-start items-start gap-2">
                <div className="text-gray-700 capitalize font-bold sm:text-2xl text-lg flex items-end gap-2 mb-3 sm:mb-0">
                    <Image src={IconTitle} alt='icon-title' width={50} height={50} className='sm:w-[50px] sm:h-[50px] w-[35px] h-[35px] ' />
                    <h2>Truyện đề cử</h2>
                </div>
                <Select
                    styles={styleSelect}
                    className='bg-white h-10 w-full sm:w-[240px] font-medium rounded-md border border-solid border-gray-200 outline-none z-10'
                    value={selectedOption}
                    defaultValue={selectedOption}
                    placeholder="Tất cả"
                    onChange={setSelectedOption}
                    options={options}
                    instanceId={"type-trend"}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#FFB31C',
                            primary25: "#ffeecb"
                        }
                    })}
                />
            </div>
            <div className='relative'>
                <div className="overflow-auto bg-white element-no-scrollbar md:overflow-hidden md:h-[416px] h-auto rounded-md mt-5 relative sm:block flex flex-wrap">
                    {
                        (dataTopComics && dataTopComics.length > 0) && (!isLoading) ? (
                            dataTopComics.map((item: comicsProps) => (
                                <div key={item.id} className='md:first:h-[396px] first:h-[200px] md:first:w-[260px] sm:first:w-1/4 2xl:first:w-[270px] first:w-1/3 float-left md:h-[192px] h-[200px] 2xl:w-[132px] relative  
                                md:mt-3 mt-0 md:ml-3 ml-0 lg:w-[155px] xl:w-[126px] md:w-[128px] sm:w-1/4 w-1/3 rounded-md transition group md:border-1 border-none md:pt-0 pt-2 md:pb-0 pb-2 md:px-0 px-1'
                                >
                                    <CardComic data={item} type='basic' badge='top' />
                                </div>
                            ))

                        ) : (
                            Array.from(Array(12).keys()).map(item => (
                                <div key={item} className='md:first:h-[396px] first:h-[200px] md:first:w-[260px] sm:first:w-1/4 2xl:first:w-[270px] first:w-1/3 float-left md:h-[192px] h-[200px] 2xl:w-[132px] relative 
                                md:mt-3 mt-0 md:ml-3 ml-0 lg:w-[155px] xl:w-[126px] md:w-[128px] sm:w-1/4 w-1/3 rounded-md overflow-hidden border-2 md:border-1 border-none md:pt-0 pt-2 md:pb-0 pb-2 md:px-0 px-2'
                                >
                                    <Skeleton containerClassName='w-full h-full flex' />
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default SectionTopComics