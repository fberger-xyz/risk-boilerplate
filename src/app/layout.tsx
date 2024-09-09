import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { APP_METADATA } from '../config/app.config'
import { cn } from '../utils'
import Header from '../components/layouts/Header'
import { Suspense } from 'react'
import Footer from '../components/layouts/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: APP_METADATA.SITE_NAME,
    description: APP_METADATA.SITE_DESCRIPTION,
    applicationName: APP_METADATA.SITE_NAME,
    metadataBase: new URL(APP_METADATA.SITE_URL),
    manifest: '/manifest.json',
    appleWebApp: {
        title: APP_METADATA.SITE_NAME,
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    openGraph: {
        type: 'website',
        title: APP_METADATA.SITE_NAME,
        siteName: APP_METADATA.SITE_NAME,
        description: APP_METADATA.SITE_DESCRIPTION,
        url: APP_METADATA.SITE_URL,
        images: '/opengraph-image',
    },
    twitter: {
        card: 'summary_large_image',
        site: APP_METADATA.SOCIAL_TWITTER,
        title: APP_METADATA.SITE_NAME,
        description: APP_METADATA.SITE_DESCRIPTION,
        images: '/opengraph-image',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.className, 'h-screen w-screen overflow-hidden')}>
                <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                    <main className="relative flex h-full w-full flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-400">
                        <Header className="p-2 text-xs md:px-6 md:text-sm" />
                        <Suspense
                            fallback={
                                <div className="flex h-full w-full items-center justify-center">
                                    <p className="text-orange-400">App loading...</p>
                                </div>
                            }
                        >
                            <div className="h-full overflow-scroll">{children}</div>
                        </Suspense>
                        <Footer className="px-2 py-1.5 text-xs md:px-6" />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    )
}
