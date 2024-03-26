'use client'
import Image from "next/image";
import Link from "next/link"
import Logo from '../../../public/images/truyen-logo-2.png'
import SearchBox from "../customs/SearchBox";
import SideBarMenu from "../sidebar/SideBarMenu";
import { useEffect, useState } from "react";
import clsx from "clsx";
import DropdownMenu from "../customs/DropdownMenu";
import { genresProps } from "@/types/typeProps";
import LoadingBook from '../customs/LoadingBook';
import useSWR from 'swr';
import { useMediaQueryContext } from '@/contexts/MediaQueryContext';
import { backupDataGenres } from "@/constants/backupDataGenres";

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Header = () => {
    const [dropGenres, setDropGenres] = useState(false)
    const [dropListComics, setDropListComics] = useState(false)
    const [scroll, setScroll] = useState(false)

    const { md } = useMediaQueryContext()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 125) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])


    const { data } = useSWR(`/api/genres`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })


    return (
        <header
            className={clsx(
                "bg-primary border-b",
                { "pt-16": scroll },
            )}
        >
            <div className={clsx("wrapper", scroll ? "fixed w-full left-0 top-0 z-[100] transition-all shadow-md animate-sticky-head md:px-4 px-0 bg-primary" : "")}>
                <div className="container">
                    <div className={clsx("flex items-center w-full justify-between h-[70px] lg:gap-0 gap-3 ",)}>
                        {/* Logo */}
                        <div className="md:w-max flex items-center mx-1 w-full">
                            <Link href="/" className="py-1">
                                <Image src={Logo} alt="Logo" height={40} className="w-full h-full" priority />
                            </Link>
                        </div>
                        {/* Navbar */}
                        {!md && <nav className="flex-1 lg:block hidden">
                            <ul className="flex items-center flex-wrap justify-center   ">
                                <li className="relative mx-4 flex items-center">
                                    <DropdownMenu
                                        title="Thể Loại"
                                        titleClassName="h-[70px]"
                                        wrapperClassName="lg:w-[450px] overflow-hidden border"
                                        visible={dropGenres}
                                        setVisible={setDropGenres}
                                    >
                                        <div className="w-full flex flex-wrap gap-1 text-[10px] text-gray-600 rounded-md">
                                            {(data && data?.length > 0) ? data?.map((item: genresProps) => (
                                                <Link
                                                    title={item.description}
                                                    key={item.id}
                                                    href={`the-loai?type=${item.id}`}
                                                    onClick={() => setDropGenres(false)}
                                                    className="px-3 py-1 mb-1 inline-block border rounded-md hover:bg-slate-200 bg-primary font-medium"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))
                                                : data?.length === 0
                                                    ? backupDataGenres.map((item: genresProps) => (
                                                        <Link
                                                            title={item.description}
                                                            key={item.id}
                                                            href={`the-loai?type=${item.id}`}
                                                            onClick={() => setDropGenres(false)}
                                                            className="px-3 py-1 mb-1 inline-block border rounded-md hover:bg-slate-200 bg-primary font-medium"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))
                                                    : <LoadingBook />}
                                        </div>
                                    </DropdownMenu>
                                </li>
                                <li className="relative mx-4 flex items-center">
                                    <DropdownMenu
                                        title="Danh Sách"
                                        titleClassName="h-[70px]"
                                        wrapperClassName="lg:w-[220px] px-3 py-2 border"
                                        visible={dropListComics}
                                        setVisible={setDropListComics}
                                    >
                                        <div className="text-sm font-medium" onClick={() => setDropListComics(false)}>
                                            <Link href="/truyen-full?page=1" className="block leading-8 border-b hover:bg-[#ffda0b41] px-2">Truyện full</Link>
                                            <Link href="/truyen-moi?page=1" className="block leading-8 border-b hover:bg-[#ffda0b41] px-2">Truyện mới</Link>
                                            <Link href="/dang-cap-nhat?page=1" className="block leading-8 border-b hover:bg-[#ffda0b41] px-2">Truyện đang cập nhật</Link>
                                            <Link href="/con-trai?page=1" className="block leading-8 border-b hover:bg-[#ffda0b41] px-2">Truyện con trai</Link>
                                            <Link href="/con-gai?page=1" className="block leading-8 border-b hover:bg-[#ffda0b41] px-2">Truyện con gái</Link>
                                        </div>
                                    </DropdownMenu>
                                </li>
                                <li className="relative mx-4 flex items-center">
                                    <Link
                                        href="/truyen-hot?page=1"
                                        className="font-semibold text-sm h-20 leading-20 flex items-center relative text-heading capitalize"
                                    >
                                        Truyện Hot
                                    </Link>
                                </li>
                                <li className="relative mx-4 flex items-center">
                                    <Link
                                        href="/truyen-top?type=all&page=1"
                                        className="font-semibold text-sm h-20 leading-20 flex items-center relative text-heading capitalize"
                                    >
                                        Top truyện
                                    </Link>
                                </li>
                            </ul>
                        </nav>}
                        {/* Search component */}
                        <SearchBox />
                        {md && <SideBarMenu data={data} />}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header