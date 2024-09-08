'use client'

import Image from 'next/image'
import PageWrapper from './common/PageWrapper'
import { useTheme } from 'next-themes'
import { cn } from '@/utils'
import { AppThemes, IconIds } from '@/enums'
import { useAppStore } from '@/stores/app.store'
import { linksGroupedByCategories, linkWithAddress } from '@/data/links'
import IconWrapper from './common/IconWrapper'
import { Tooltip } from 'react-tooltip'
import LinkWrapper from './common/LinkWrapper'

export default function SafeLinks() {
    const { resolvedTheme } = useTheme()
    const { address, actions } = useAppStore()
    return (
        <PageWrapper className="w-full items-center justify-center">
            <div className="flex w-full flex-col gap-1">
                <p className="text-xs">Multisig address</p>
                <input
                    type="text"
                    defaultValue={address}
                    placeholder="Enter a safe address"
                    className={cn('h-10 w-full py-0.5 pl-2 border', {
                        'bg-gray-200 border-gray-100': resolvedTheme === AppThemes.LIGHT,
                        'bg-gray-800 border-gray-600 rounded-sm': resolvedTheme === AppThemes.DARK,
                    })}
                    min={0}
                    step={1}
                    onChange={(event) => actions.setAddress(String(event.target.value.trim()))}
                />
            </div>

            {/* categories */}
            <div className="flex w-full flex-col gap-5">
                {linksGroupedByCategories.map((category, categoryIndex) => (
                    <div
                        key={`${categoryIndex}-${category.name}`}
                        className={cn('flex flex-col gap-2 w-full', {
                            'border-gray-100': resolvedTheme === AppThemes.LIGHT,
                            'border-gray-800': resolvedTheme === AppThemes.DARK,
                        })}
                    >
                        {/* links */}
                        <div className="flex flex-col gap-1">
                            <p className="text-xs">{category.name}</p>
                            {category.links.map((link, linkIndex) => (
                                <div
                                    key={`${linkIndex}-${link.name}`}
                                    className={cn(
                                        'flex items-center justify-between px-2 py-1.5 gap-3 border w-full relative overflow-hidden group transition-all',
                                        {
                                            'bg-gray-100 border-gray-200 hover:bg-gray-200': resolvedTheme === AppThemes.LIGHT,
                                            'bg-gray-900 border-gray-800 hover:bg-gray-800': resolvedTheme === AppThemes.DARK,
                                        },
                                    )}
                                >
                                    <div
                                        className="group:hover:blur-0 absolute inset-0 h-full w-full blur-sm transition-all group-hover:blur-none"
                                        style={{
                                            backgroundImage: `url('${link.bannerUrl}')`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            // filter: 'blur(8px)',
                                        }}
                                    />
                                    <div
                                        className={cn('absolute inset-0 z-10 h-full w-full transition-all', {
                                            'bg-gray-200/90 group-hover:bg-gray-200/80': resolvedTheme === AppThemes.LIGHT,
                                            'bg-gray-950/95 group-hover:bg-gray-950/80': resolvedTheme === AppThemes.DARK,
                                        })}
                                    />
                                    <div className="z-20 flex items-center gap-3">
                                        <Image src={link.iconUrl} width={35} height={35} alt={link.name} />
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1">
                                                <p
                                                    className={cn('font-bold pr-2', {
                                                        'text-black': resolvedTheme === AppThemes.LIGHT,
                                                        'text-white': resolvedTheme === AppThemes.DARK,
                                                    })}
                                                >
                                                    {link.name}
                                                </p>
                                                {link.socialProfiles.map((socialProfile) => (
                                                    <>
                                                        <LinkWrapper
                                                            data-tooltip-id={`${category.name}-${link.name}-${socialProfile.platform}`}
                                                            className={cn('p-0.5 text-gray-600 hover:text-primary', {
                                                                'group-hover:text-gray-800': resolvedTheme === AppThemes.LIGHT,
                                                                'group-hover:text-gray-300': resolvedTheme === AppThemes.DARK,
                                                            })}
                                                            href={socialProfile.url}
                                                            target="_blank"
                                                        >
                                                            <IconWrapper
                                                                icon={
                                                                    socialProfile.platform === 'TWITTER'
                                                                        ? IconIds.X
                                                                        : socialProfile.platform === 'DISCORD'
                                                                          ? IconIds.DISCORD
                                                                          : socialProfile.platform === 'GITHUB'
                                                                            ? IconIds.GITHUB
                                                                            : IconIds.CARBON_OVERFLOW_MENU_VERTICAL
                                                                }
                                                                className={cn('h-4 w-4')}
                                                            />
                                                        </LinkWrapper>
                                                        <Tooltip id={`${category.name}-${link.name}-${socialProfile.platform}`} className="z-50">
                                                            <p className="text-xs text-primary">{socialProfile.url}</p>
                                                        </Tooltip>
                                                    </>
                                                ))}
                                            </div>
                                            <p className="text-xs">{link.description}</p>
                                        </div>
                                    </div>
                                    <LinkWrapper
                                        href={linkWithAddress(link, address)}
                                        data-tooltip-id={`${category.name}-${link.name}-url`}
                                        className={cn('z-20 p-2 rounded-sm text-primary', {
                                            'group-hover:bg-gray-300': resolvedTheme === AppThemes.LIGHT,
                                            'group-hover:bg-gray-700': resolvedTheme === AppThemes.DARK,
                                        })}
                                        target="_blank"
                                    >
                                        <IconWrapper icon={IconIds.IC_BASELINE_OPEN_IN_NEW} className={cn('h-5 w-5')} />
                                    </LinkWrapper>
                                    <Tooltip id={`${category.name}-${link.name}-url`} className="z-50">
                                        <p className="text-xs">{linkWithAddress(link, address)}</p>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    )
}
