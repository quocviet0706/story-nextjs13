import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Montserrat } from 'next/font/google'
import { MediaQueryProvider } from '@/contexts/MediaQueryContext'


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

import 'react-loading-skeleton/dist/skeleton.css'
import { Suspense } from 'react'
import LoadingPage from '@/components/layout/LoadingPage'

import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-mont'
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const desc = "Truyện Hay - Nơi tinh hoa của những câu chuyện đẹp màu sắc đang chờ đón bạn. Chúng tôi tự hào giới thiệu một kho truyện tranh phong phú và đa dạng, hứa hẹn mang đến cho bạn những giây phút giải trí thú vị và tận hưởng những cung bậc cảm xúc đầy sắc màu."

    return (
        <html lang="en">
            <head>
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="keywords" content="truyện hay, truyện tranh hay, truyện tranh đủ thể loại" />
                <meta name="description" content={desc} />
                <meta property="og:description" content={desc} />
                <meta property='og:title' content='Truyện Hay - Nơi tinh hoa hội tụ' />
                <meta property='og:image' content='../../public/images/share-img-website.png' />

                <title>Truyện Hay - Nơi tinh hoa hội tụ</title>
            </head>
            <body
                className={clsx(montserrat.variable, 'font-mont bg-light w-full font-normal')}
                cz-shortcut-listen="true"
            >
                <Suspense fallback={<LoadingPage />}>
                    <MediaQueryProvider >
                        {children}
                    </MediaQueryProvider>
                </Suspense>
                <SpeedInsights />
            </body>
        </html>
    )
}
