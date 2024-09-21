'use client'

import PageWrapper from '@/components/common/PageWrapper'
import HeaderButton from '@/components/layouts/HeaderButton'
import { AppPagePaths } from '@/enums'
import { useAppStore } from '@/stores/app.store'

export default function Page() {
    const { links } = useAppStore()
    return (
        <PageWrapper>
            {links
                .find((link) => link.path === AppPagePaths.MORPHO_TUTORIALS)
                ?.sublinks.map((sublink) => <HeaderButton key={sublink.path} disabled={!sublink.enabled} pagePath={sublink.path} />)}
        </PageWrapper>
    )
}
