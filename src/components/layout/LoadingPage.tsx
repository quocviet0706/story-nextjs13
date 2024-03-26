import Progressbar from '@/components/Progressbar'
import React from 'react'


function LoadingPage() {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full'>
            <Progressbar />
            <main className='w-full h-screen bg-primary'>
                <div className='flex items-center justify-center relative h-full'>
                    <span
                        className='loader-spin'>
                    </span>
                </div>
            </main>
        </div>
    )
}

export default LoadingPage