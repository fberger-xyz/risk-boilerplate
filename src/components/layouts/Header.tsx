'use client'

import React from 'react'
import HeaderButton from './HeaderButton'
import { AppPagePaths, AppThemes, IconIds } from '@/enums'
import { cn } from '@/utils'
import { useTheme } from 'next-themes'
import IconWrapper from '../common/IconWrapper'
// import { Tooltip } from 'react-tooltip'

export default function Header(props: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <div className={cn('fixed top-0 z-20 flex w-full items-center justify-between gap-2', props.className)}>
            <div className="flex gap-2">
                <HeaderButton pagePath={AppPagePaths.HOME} />
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setTheme(resolvedTheme === AppThemes.LIGHT ? AppThemes.DARK : AppThemes.LIGHT)}
                    // data-tooltip-id="theme-tooltip"
                    // data-tooltip-place="bottom"
                    className="rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <IconWrapper
                        icon={
                            resolvedTheme === AppThemes.LIGHT
                                ? IconIds.THEME_LIGHT
                                : resolvedTheme === AppThemes.DARK
                                  ? IconIds.THEME_DARK
                                  : IconIds.IC_BASELINE_OPEN_IN_NEW
                        }
                        className="h-5 w-5"
                    />
                </button>
                {/* <Tooltip id="theme-tooltip" className="z-50">
                    <p className="text-xs capitalize">{resolvedTheme}</p>
                </Tooltip> */}
            </div>
        </div>
    )
}
