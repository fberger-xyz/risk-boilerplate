'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import LinkWrapper from '../common/LinkWrapper'
import { useAppStore } from '@/stores/app.store'
import { AppPagePaths } from '@/enums'
import { InterfaceAppLink } from '@/interfaces'

export default function HeaderButton(props: { pagePath: AppPagePaths; disabled?: boolean }) {
    const { links } = useAppStore()
    const pathname = usePathname()
    const isCurrentPath = () => {
        if (props.pagePath === '/') return pathname === props.pagePath
        else return pathname.startsWith(props.pagePath)
    }
    let link: undefined | InterfaceAppLink = undefined
    // todo: put this fn in recursive mode
    for (let linkIndex = 0; linkIndex < links.length && !link; linkIndex++) {
        if (links[linkIndex].path === props.pagePath) link = links[linkIndex]
        for (let sublinkIndex = 0; sublinkIndex < links[linkIndex].sublinks.length && !link; sublinkIndex++) {
            if (links[linkIndex].sublinks[sublinkIndex].path === props.pagePath) link = links[linkIndex].sublinks[sublinkIndex]
        }
    }
    return (
        <LinkWrapper
            href={props.disabled ? pathname : props.pagePath}
            className={cn('rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700', {
                'text-gray-500 opacity-50 cursor-not-allowed': props.disabled,
            })}
        >
            <p className={cn({ 'text-secondary': isCurrentPath() })}>{link?.name ?? 'Not found'}</p>
        </LinkWrapper>
    )
}
