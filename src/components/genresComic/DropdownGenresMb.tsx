'use client'
import { backupDataGenres } from '@/constants/backupDataGenres'
import { genresProps } from '@/types/typeProps'
import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import OutsideClickHandler from 'react-outside-click-handler'
import DropdownMenu from '../customs/DropdownMenu'
import Link from 'next/link'

interface dropdownProps {
    data: genresProps[]
}

const DropdownGenresMb: FC<dropdownProps> = ({ data }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [collapse, setCollapse] = useState<boolean>(true)

    const initialData = data.length === 0 ? backupDataGenres : data

    const handleCollapse = () => {
        setVisible(!visible)
        setCollapse(!collapse)
    }


    return (
        <div className='md:hidden block relative'>
            <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <button
                    onClick={handleCollapse}
                    className={clsx(
                        collapse ? "rotate-0" : "rotate-180",
                        'text-slate-500 text-lg transition-all duration-200 w-8 h-8 flex items-center justify-center'
                    )}>
                    <BsFillCaretDownFill />
                </button>
                <div className={clsx(
                    'absolute top-[50px] right-0 bg-white rounded-md shadow-md p-2 z-10 min-w-[150px] w-[85vw] invisible animate-hidden-dropdown-mb',
                    { '!visible animate-show-dropdown-mb': visible }
                )}>
                    <div className='flex items-center justify-start flex-wrap gap-2'>
                        {initialData.map(item => (
                            <Link key={item.id} href={`/the-loai?type=${item.id}`} className='text-xs rounded-sm border bg-slate-50 p-1' onClick={() => { setVisible(false); setCollapse(!collapse) }}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </OutsideClickHandler>

        </div>
    )
}

export default DropdownGenresMb