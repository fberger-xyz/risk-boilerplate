'use client'

import Button from '@/components/common/Button'
import PageWrapper from '@/components/common/PageWrapper'
import HeaderButton from '@/components/layouts/HeaderButton'
import { AppPagePaths } from '@/enums'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <PageWrapper>
            <div className="m-auto flex flex-col items-center gap-10">
                <h2>Something went wrong!</h2>
                <Button onClickFn={() => reset()} text="Reload page" />
                <HeaderButton pagePath={AppPagePaths.HOME} />
            </div>
        </PageWrapper>
    )
}
