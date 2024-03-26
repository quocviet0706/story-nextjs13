import Image from 'next/image'
import { FC } from 'react'
import GifBookOpen from '../../../public/images/book-open.gif'
import clsx from 'clsx'

interface LoadingBookProps {
    className?: string
    imgClassName?: string
}

const LoadingBook: FC<LoadingBookProps> = ({ className, imgClassName }) => {
    return <div className={clsx(className, 'relative w-full p-10 flex flex-col items-center justify-center bg-[#f0f0eb]')}>
        <Image src={GifBookOpen} alt='loading' className={clsx(imgClassName, 'w-14 h-auto')} priority />
        <span className='text-sm font-medium'>Vui lòng chờ ...</span>
    </div>
}
export default LoadingBook