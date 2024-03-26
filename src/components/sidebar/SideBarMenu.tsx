'use client';

import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { IoIosMenu } from 'react-icons/io'
import { MdOutlineClose } from 'react-icons/md'
import { genresProps } from '@/types/typeProps';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/images/truyen-logo-2.png'
import { BsFacebook, BsGithub, BsGoogle, BsTelegram } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { backupDataGenres } from '@/constants/backupDataGenres';


interface sidebarProps {
    data: genresProps[]
}


const SideBarMenu = ({ data }: sidebarProps) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [collapseGenres, setCollapseGenres] = useState<boolean>(true)
    const [collapseList, setCollapseList] = useState<boolean>(true)

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [visible])


    return (
        <div className='relative'>
            <button
                className='text-2xl p-2 rounded-md bg-linearPrimary text-white border mr-2'
                onClick={() => setVisible(true)}
            >
                {visible ? <MdOutlineClose /> : <IoIosMenu />}
            </button>
            <div className={clsx(
                { "!opacity-100 !visible": visible },
                'fixed top-0 left-0 z-[1000] w-full h-full opacity-0 invisible transition-all duration-500 ease-in-out, flex'
            )}>
                <div className='absolute w-full h-full top-0 left-0 z-0 bg-[rgba(0,0,0,0.3)]' onClick={() => setVisible(false)}></div>
                <div className={clsx(
                    { "transition-all duration-500 delay-100 !right-0 ease-in-out": visible },
                    ' bg-white shadow-md w-full md:w-[50%] h-screen z-10 absolute pt-5 p-5 overflow-y-auto element-no-scrollbar top-0 right-[-100%] transition-all duration-500'
                )}>
                    <button className='absolute right-6 top-5 text-4xl text-slate-400' onClick={() => setVisible(false)}><IoClose /></button>
                    <div className="flex items-start mx-1 w-full flex-col pb-4">
                        <Link href="/" className="py-1 w-[150px]">
                            <Image src={Logo} alt="Logo" height={50} className="w-full h-full" priority />
                        </Link>
                        <span className='text-slate-400 text-sm inline-block text-center w-full'>Web truyện hay - Đủ thể loại - Cập nhật mới nhất</span>
                        <ul className='mt-5 w-full'>
                            <li>
                                <Link href="/" className='border-b py-4 px-2 font-bold flex items-center gap-3 text-base text-slate-600'>Trang chủ</Link>
                            </li>
                            <li>
                                <Link href="" onClick={() => setCollapseGenres(!collapseGenres)} className='border-b py-4 px-2 font-bold flex items-center justify-between gap-3 text-base text-slate-600'>
                                    Thể loại
                                    <FaChevronDown className={clsx("text-sm text-slate-400 transition-all duration-150", collapseGenres ? "rotate-0" : "rotate-180")} />
                                </Link>
                                {!collapseGenres && <ul className='pl-3'>
                                    {(data && data?.length > 0) ? data?.map((item: genresProps) => (
                                        <Link
                                            title={item.description}
                                            key={item.id}
                                            href={`the-loai?type=${item.id}`}
                                            className="border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500"
                                        >
                                            <FaChevronRight className="text-xs text-slate-400 " />{item.name}
                                        </Link>
                                    ))
                                        : data?.length === 0
                                        && backupDataGenres.map((item: genresProps) => (
                                            <Link
                                                title={item.description}
                                                key={item.id}
                                                href={`the-loai?type=${item.id}`}
                                                className="border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500"
                                            >
                                                <FaChevronRight className="text-xs text-slate-400 " />{item.name}
                                            </Link>
                                        ))}
                                </ul>}
                            </li>
                            <li>
                                <Link href="" onClick={() => setCollapseList(!collapseList)} className='border-b py-4 px-2 font-bold flex items-center justify-between gap-3 text-base text-slate-600'>
                                    Danh sách truyện
                                    <FaChevronDown className={clsx("text-sm text-slate-400 transition-all duration-150", collapseList ? "rotate-0" : "rotate-180")} />
                                </Link>
                                {!collapseList && <ul className='pl-3'>
                                    <li>
                                        <Link href="/truyen-full?page=1" className='border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500'><FaChevronRight className="text-xs text-slate-400 " />Truyện Full</Link>
                                    </li>
                                    <li>
                                        <Link href="/truyen-moi?page=1" className='border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500'><FaChevronRight className="text-xs text-slate-400 " />Truyện mới</Link>
                                    </li>
                                    <li>
                                        <Link href="/dang-cap-nhat?page=1" className='border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500'><FaChevronRight className="text-xs text-slate-400 " />Truyện đang cập nhật</Link>
                                    </li>
                                    <li>
                                        <Link href="/con-trai?page=1" className='border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500'><FaChevronRight className="text-xs text-slate-400 " />Truyện con trai</Link>
                                    </li>
                                    <li>
                                        <Link href="/con-gai?page=1" className='border-b py-3 px-2 font-semibold flex items-center gap-3 text-sm text-slate-500'><FaChevronRight className="text-xs text-slate-400 " />Truyện con gái</Link>
                                    </li>
                                </ul>}

                            </li>
                            <li>
                                <Link href="/truyen-hot?page=1" className='border-b py-4 px-2 font-bold flex items-center gap-3 text-base text-slate-600'>Truyện hot</Link>
                            </li>
                            <li>
                                <Link href="/truyen-top?type=all" className='border-b py-4 px-2 font-bold flex items-center gap-3 text-base text-slate-600'>Truyện top</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full text-center mb-4 text-sm text-slate-400'>
                        <p>Copyrights &copy; {new Date().getFullYear()} by Gavin Dev</p>
                    </div>
                    <div className='flex items-center w-full justify-center gap-3'>
                        <Link href="https://www.facebook.com/vvtruong.1007" className='text-4xl px-1 text-blue-500'><BsFacebook /></Link>
                        <Link href="https://github.com/vocantruong" className='text-4xl px-1 text-gray-900'><BsGithub /></Link>
                        <Link href="https://t.me/Gavin_Vo" className='text-4xl px-1 text-cyan-500'><BsTelegram /></Link>
                        <Link href="https://google.com" className='text-4xl px-1 text-orange-600'><BsGoogle /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SideBarMenu