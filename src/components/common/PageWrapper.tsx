'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import GoBack from './GoBack'

export default function PageWrapper({ children, ...props }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <Suspense
            fallback={
                <div className="flex h-full w-full items-center justify-center">
                    <p className="text-orange-400">Page loading...</p>
                </div>
            }
        >
            <div
                {...props}
                className="mx-auto mb-40 mt-20 flex max-w-[600px] flex-col items-start gap-3 overflow-auto px-4 transition-all sm:max-w-[800px] md:max-w-[1000px] md:gap-6 md:px-6 lg:max-w-[1500px] lg:px-8"
            >
                {pathname !== '/' && <GoBack />}
                {children}
            </div>
        </Suspense>
    )
}
