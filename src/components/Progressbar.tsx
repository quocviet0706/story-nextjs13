'use client'

import { useEffect, useState } from "react"

const Progressbar = () => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => prev >= 100 ? 0 : prev + 10)
        }, 600)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#f2f2f2]">
            <div
                className="h-full bg-secondary"
                style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
            >
            </div>
        </div>
    )
}

export default Progressbar