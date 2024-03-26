'use client';

import React, { FC, useState } from 'react'

interface props {
    desc: string
    className?: string
}

const CollapseDesc: FC<props> = ({ desc, className }) => {
    const [collapse, setCollapse] = useState<boolean>(true)

    return (
        <div className={className}>
            {
                desc.length > 250 ? (
                    <>
                        {collapse ? desc.slice(0, 250) : desc}
                        <button className='text-blue-700 font-medium outline-none hover:text-secondary' onClick={() => setCollapse(!collapse)}>
                            {collapse ? `...Xem thêm` : `...Thu gọn`}
                        </button>
                    </>
                ) : desc
            }
        </div>
    )
}

export default CollapseDesc