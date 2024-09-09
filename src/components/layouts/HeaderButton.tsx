'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import LinkWrapper from '../common/LinkWrapper'
import { useAppStore } from '@/stores/app.store'
import { AppPagePaths } from '@/enums'

export default function HeaderButton(props: { pagePath: AppPagePaths }) {
    const { links } = useAppStore()
    const pathname = usePathname()
    const isCurrentPath = () => {
        if (props.pagePath === '/') return pathname === props.pagePath
        else return pathname.startsWith(props.pagePath)
    }
    return (
        <LinkWrapper href={props.pagePath} className="rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            <p className={cn({ 'text-primary': isCurrentPath() })}>{links.find((link) => link.path === props.pagePath)?.name ?? 'Not found'}</p>
        </LinkWrapper>
    )
}
