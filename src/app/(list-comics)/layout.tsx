import LoadingPage from '@/components/layout/LoadingPage'
import RootLayout from '@/components/layout/RootLayout'
import { FC, Suspense } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
    return (
        <RootLayout>
            <main className={` overflow-x-hidden bg-white`}>
                <div className='container'>
                    {children}
                </div>
            </main>
        </RootLayout>
    )
}
export default layout