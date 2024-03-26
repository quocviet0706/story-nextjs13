
import BannerComics from '@/components/comon/BannerComics';
import SectionFullComics from '@/components/comon/SectionFullComics';
import SectionRecentlyRead from '@/components/comon/SectionRecentlyRead';
import SectionTopComics from '@/components/comon/SectionTopComics';
import SectionUpdatedComics from '@/components/comon/SectionUpdatedComics';
import RootLayout from '@/components/layout/RootLayout';
import ListGenres from '@/components/sidebar/ListGenres';
import RankingComics from '@/components/sidebar/RankingComics';
import { comicsProps } from '@/types/typeProps';

const fetchDataBanner = async (page: string, limit: number) => {

    try {
        const res = await fetch(`https://comics-api.vercel.app/trending-comics${page ? `?page=${page}` : ''}`, {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        const { comics } = await res.json()

        const newData = limit ? comics.filter((item: comicsProps, index: number) => index < limit) : comics;

        return newData
    } catch (error) {
        console.log("Invalited Error - ", error);
    }
}

export default async function Home() {
    const dataBanner = await fetchDataBanner('', 15)

    return (
        <RootLayout>
            <main className={` overflow-x-hidden bg-white`}>
                <BannerComics dataTrending={dataBanner} />
                <div className='container flex items-start justify-center relative flex-wrap'>
                    <div className='xl:w-[70%] w-full xl:pr-2 md:pr-0'>
                        <div className="relative w-full">
                            <SectionTopComics />
                            <SectionFullComics />
                            <SectionUpdatedComics />
                            <SectionRecentlyRead />
                        </div>
                    </div>
                    <div className='xl:w-[30%] w-full lg:pl-2 md:pl-0'>
                        <RankingComics />
                        <ListGenres />
                    </div>
                </div>
            </main>
        </RootLayout>
    )
}