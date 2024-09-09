'use client'

import { Suspense } from 'react'

export default function PageWrapper({ children, ...props }: { children: React.ReactNode }) {
    return (
        <Suspense
            fallback={
                <div className="flex h-full w-full items-center justify-center">
                    <p className="text-orange-400">Page loading...</p>
                </div>
            }
        >
            <div {...props} className="mx-auto mb-40 mt-20 flex max-w-[600px] flex-col items-start gap-3 overflow-auto px-4 md:gap-6 md:px-6 lg:px-8">
                {children}
            </div>
        </Suspense>
    )
}
