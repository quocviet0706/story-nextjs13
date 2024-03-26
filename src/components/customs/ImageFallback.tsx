'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import fallbackSrc from '../../../public/images/img-fallback.png';

interface ImageFallbackProps {
    src: string;
    alt: string
    [key: string]: any
    // Các props khác có thể được thêm vào ở đây
}

const ImageFallback: React.FC<ImageFallbackProps> = ({ src, ...rest }) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onLoadingComplete={(result: { naturalWidth: number }) => {
                if (result.naturalWidth === 0) {
                    // Hình ảnh bị lỗi
                    setImgSrc(fallbackSrc as any);
                }
            }}
            onError={() => {
                setImgSrc(fallbackSrc as any);
            }}
        />
    );
};

export default ImageFallback;
