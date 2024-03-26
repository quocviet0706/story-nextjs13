export const dynamic = "force-dynamic"

import RenderTopComics from '@/components/listComic/RenderTopComics'
import Link from 'next/link'
import { FC } from 'react'
import { BsChevronRight } from 'react-icons/bs'

interface pageProps {
    searchParams: {
        page: string
        status: string
        type: 'all' | 'daily' | 'weekly' | 'monthly' | 'chapter' | 'follow' | 'comment'
    }
}

const fetchDataTopComics = async (type?: string, status?: string, page?: string) => {
    try {
        const res = await fetch(`https://comics-api.vercel.app/top${type !== 'all' ? `/${type}` : ''}?page=${page ? page : '1'}${status ? `&status=${status}` : ''}`) // Call API lấy truyện full trending
        const data = res.json()
        return data
    } catch (error) {
        console.log('Error');
    }
}

// Generate metadata
export async function generateMetadata(page: pageProps) {

    return {
        title: `Truyện Top - Trang ${page.searchParams.page ?? '1'} | Truyện tranh hay`,
        description: 'Truyện Hay - Nơi tinh hoa của những câu chuyện đẹp màu sắc đang chờ đón bạn. Chúng tôi tự hào giới thiệu một kho truyện tranh phong phú và đa dạng, hứa hẹn mang đến cho bạn những giây phút giải trí thú vị và tận hưởng những cung bậc cảm xúc đầy sắc màu.',
    }
}

const TopComics: FC<pageProps> = async ({ searchParams }) => {

    const { comics, total_pages } = await fetchDataTopComics(searchParams.type, searchParams.status, searchParams.page)

    const renderTitle = () => {
        switch (searchParams.type) {
            case 'all':
                return 'Top truyện tranh'
            case 'daily':
                return 'Top truyện ngày'
            case 'weekly':
                return 'Top truyện tuần'
            case 'monthly':
                return 'Top truyện tháng'
            case 'chapter':
                return 'Top chương '
            case 'follow':
                return 'Top người theo dõi'
            case 'comment':
                return 'Top bình luận'
            default:
                break
        }
    }

    return (
        <section className="overflow-x-hidden bg-white">
            <div className='relative'>
                <div className='relative rounded-md md:mt-5 mt-3 w-full bg-[#f6f3ee] md:p-5 p-3'>
                    <div className='flex items-center font-semibold sm:text-lg text-xs'>
                        <Link href="/" className='hover:underline text-slate-700'>Trang chủ</Link>
                        <div className="text-sm mx-2 "><BsChevronRight /></div>
                        <Link href="/the-loai?type=all" className='hover:underline text-slate-700'>
                            {renderTitle()}
                        </Link>
                        <div className="text-sm mx-2 "><BsChevronRight /></div>
                        <span className='text-slate-700'>Trang {searchParams.page ?? '1'}</span>
                    </div>
                </div>
                <div className='w-full relative md:mt-0 mt-5'>
                    <div className='relative md:bg-[#f6f3ee] bg-white rounded-md md:py-5 md:px-3 md:mt-5 xl:mb-12 mb-5'>
                        <RenderTopComics data={comics} total_pages={total_pages} params={searchParams} />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TopComics