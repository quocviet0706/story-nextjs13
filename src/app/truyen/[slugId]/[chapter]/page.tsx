import NextPrevChapter from '@/components/comicDetail/NextPrevChapter'
import NestedLayout from '@/components/layout/NestedLayout'
import { singleComic } from '@/types/typeProps'
import { getChapter } from '@/utils/nextprevchapter'
import { FC } from 'react'

interface ChapterProps {
    params: {
        chapter: string
        slugId: string
    }
}


// or Dynamic metadata
export async function generateMetadata({ params }: ChapterProps) {
    const data = await getChapter(params.slugId, params.chapter) as singleComic;
    return {
        title: `${data.comic_name} - ${data.chapter_name}`,
        description: 'Truyện Hay - Nơi tinh hoa của những câu chuyện đẹp màu sắc đang chờ đón bạn. Chúng tôi tự hào giới thiệu một kho truyện tranh phong phú và đa dạng, hứa hẹn mang đến cho bạn những giây phút giải trí thú vị và tận hưởng những cung bậc cảm xúc đầy sắc màu.',
    }
}

const ChapterComic: FC<ChapterProps> = async ({ params }) => {

    const data = await getChapter(params.slugId, params.chapter) as singleComic;

    return (
        <NestedLayout>
            <div className='min-h-screen w-full bottom-0 bg-[#a8a8a8]'>
                <div className='w-full h-full overflow-y-auto text-slate-800 element-scrollbar'>
                    <NextPrevChapter data={data} slug={params.slugId} chapter={params.chapter} />
                </div>
            </div>
        </NestedLayout>
    )
}
export default ChapterComic