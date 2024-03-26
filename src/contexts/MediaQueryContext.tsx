'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

interface MediaQueryProps {
    children: React.ReactNode
}

interface queryProps {
    lg?: boolean
    md?: boolean
    sm?: boolean
}

const MediaQueryContext = createContext<queryProps>({})

export const MediaQueryProvider = ({ children }: MediaQueryProps) => {
    const [domLoaded, setDomLoaded] = useState<boolean>(false);

    const isDesktop = useMediaQuery({ query: `(max-width: 1179px)` })
    const isTablet = useMediaQuery({ query: `(max-width: 1023px)` })
    const isMobile = useMediaQuery({ query: `(max-width: 739px)` })

    useEffect(() => {
        setDomLoaded(true)
    }, [])

    const breakpoint = {
        lg: isDesktop, md: isTablet, sm: isMobile
    }

    const initialBreakpoint = {
        lg: false, md: false, sm: false
    }

    return (
        <MediaQueryContext.Provider value={domLoaded ? breakpoint : initialBreakpoint}>
            {children}
        </MediaQueryContext.Provider>
    )

};

export const useMediaQueryContext = () => useContext(MediaQueryContext);