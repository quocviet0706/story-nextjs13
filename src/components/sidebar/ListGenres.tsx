import { FC, memo } from 'react'
import Link from 'next/link'
import Image from "next/image";
import IconGenres from '../../../public/images/genres.gif'
import { genresProps } from '@/types/typeProps';
import LoadingBook from '../customs/LoadingBook';
import clsx from 'clsx';
import { backupDataGenres } from '@/constants/backupDataGenres';

interface listGenresProps {
    className?: string
    itemClassName?: string
    wrapItemClassName?: string
    size?: 'md' | "lg"
    type?: string
    toggleButton?: boolean
}

const ListGenres: FC<listGenresProps> = async ({ className, size = "lg", type, itemClassName, wrapItemClassName, toggleButton = false }) => {

    const fetchData = async () => {
        try {
            const res = await fetch(`https://comics-api.vercel.app/genres`)
            const data = await res.json()

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const dataGenres = await fetchData()

    return (
        <aside className={clsx(className, 'w-full my-2 bg-[#f6f3ee] rounded-md overflow-hidden border')}>
            {size === "lg" && <div className='py-5 px-4 pb-0'>
                <h2 className={clsx('pb-2 font-bold text-xl capitalize text-gray-700 border-b-[3px] border-secondary border-solid flex items-center')}>
                    <Image src={IconGenres} alt='book' width={40} height={40} className='mr-3' />
                    Thể loại truyện
                </h2>
            </div>}
            <div className={clsx(wrapItemClassName,
                'p-4 flex items-center flex-wrap justify-start gap-2',
                { "!md:gap-2 !gap-1": (size === "md") }
            )}>
                {(dataGenres && dataGenres.length > 0)
                    ? dataGenres.map((item: genresProps) => (
                        <Link
                            key={item.id}
                            title={item.description}
                            href={`/the-loai?type=${item.id}`}
                            className={clsx(
                                itemClassName,
                                { "!py-2 !px-2 text-xs hover:bg-secondary transition hover:text-slate-700 ": size === "md" },
                                { "!bg-secondary !text-slate-700": (item.id === type && type) },
                                'sm:py-2 py-2 sm:px-3 px-2 sm:rounded-xl rounded-[5px] bg-white text-[10px] sm:text-xs font-medium border border-[#d7d7d7] leading-none hover:bg-thirdary transition hover:text-white'
                            )}
                        >
                            {item.name}
                        </Link>
                    )) : dataGenres.length === 0
                        ? backupDataGenres.map((item: genresProps) => (
                            <Link
                                key={item.id}
                                title={item.description}
                                href={`/the-loai?type=${item.id}`}
                                className={clsx(
                                    itemClassName,
                                    { "!py-2 !px-2 text-xs hover:bg-secondary transition hover:text-slate-700 ": size === "md" },
                                    { "!bg-secondary !text-slate-700": (item.id === type && type) },
                                    'sm:py-2 py-2 sm:px-3 px-2 sm:rounded-xl rounded-[5px] bg-white text-[10px] sm:text-xs font-medium border border-[#d7d7d7] leading-none hover:bg-thirdary transition hover:text-white'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))
                        : <LoadingBook />}
            </div>
        </aside>
    )
}

export default memo(ListGenres)