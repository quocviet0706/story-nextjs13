'use client'

import React, { Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "../ScrollTop";
import { useMediaQueryContext } from "@/contexts/MediaQueryContext";
import { FaHeart } from "react-icons/fa";
import LoadingPage from "./LoadingPage";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapse, setCollapse] = useState(true);
    const { sm } = useMediaQueryContext()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        })
    }

    useEffect(() => {
        scrollToTop()
    }, [])


    const intro_text = "😍 Truyện Hay là điểm đến lý tưởng cho những người yêu thích truyện tranh với sự đa dạng về thể loại, từ hài hước đến phiêu lưu, hành động và tình cảm. Với bộ sưu tập truyện độc đáo và chất lượng, Truyện Hay mang đến trải nghiệm đọc đa chiều, kích thích trí tưởng tượng và khám phá mọi thế giới khác nhau thông qua nghệ thuật tranh và câu chuyện sâu sắc. Hãy đến với Truyện Hay và khám phá thế giới truyện tranh phong phú!"

    return (
        <>
            <Header />
            {sm && (
                <div className="container py-3 relative">
                    <p className="p-3 rounded-md text-sm border border-secondary text-secondary">
                        {collapse ? intro_text.slice(0, 100) + '...' : intro_text}
                        <button onClick={() => setCollapse(!collapse)} className="text-sm pl-2 font-bold">{collapse ? 'Xem tiếp' : ' Thu gọn'}</button>
                    </p>
                </div>
            )}
            {children}
            <Footer />
            <ScrollTop />
        </>
    );
};

export default RootLayout;