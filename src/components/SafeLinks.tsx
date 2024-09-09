'use client'

import Image from 'next/image'
import PageWrapper from './common/PageWrapper'
import { cn } from '@/utils'
import { useAppStore } from '@/stores/app.store'
import { linksGroupedByCategories, linkWithAddress } from '@/data/links'
import IconWrapper from './common/IconWrapper'
import LinkWrapper from './common/LinkWrapper'
import { platformIndexes } from '@/config/app.config'
import { IconIds } from '@/enums'

export default function SafeLinks({ urlAddress }: { urlAddress: string | null }) {
    const { address, actions } = useAppStore()
    return (
        <PageWrapper>
            <div className="flex w-full flex-col gap-1">
                <p className="text-xs">Safe address</p>
                <input
                    type="text"
                    defaultValue={urlAddress ?? address}
                    placeholder="Enter a safe address"
                    className="h-10 w-full border border-gray-100 bg-gray-200 py-0.5 pl-2 text-sm dark:rounded-sm dark:border-gray-600 dark:bg-gray-800"
                    min={0}
                    step={1}
                    onChange={(event) => actions.setAddress(String(event.target.value.trim()))}
                />
            </div>

            {/* categories */}
            <div className="flex w-full flex-col gap-5">
                {linksGroupedByCategories.map((category, categoryIndex) => (
                    <div key={`${categoryIndex}-${category.name}`} className="flex w-full flex-col gap-2 border-gray-100 dark:border-gray-800">
                        {/* links */}
                        <div className="flex flex-col gap-1">
                            <p className="text-xs">{category.name}</p>
                            {category.links.map((link, linkIndex) => (
                                <div
                                    key={`${linkIndex}-${link.name}`}
                                    className="group relative flex w-full items-center justify-between gap-3 overflow-hidden border border-gray-200 bg-white p-1.5 transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-600"
                                >
                                    <div
                                        className="group:hover:blur-0 absolute inset-0 h-full w-full blur-[1px] transition-all group-hover:blur-none"
                                        style={{
                                            backgroundImage: `url('${link.bannerUrl}')`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            // filter: 'blur(8px)',
                                        }}
                                    />
                                    <div className="absolute inset-0 z-10 h-full w-full bg-gray-200/90 transition-all group-hover:bg-gray-200/80 dark:bg-gray-950/95 dark:group-hover:bg-gray-950/80" />
                                    <div className="z-20 flex items-center gap-3">
                                        <Image src={link.iconUrl} width={30} height={30} alt={link.name} />
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-0.5">
                                                <p className="pr-2 text-sm font-bold text-black dark:text-white">{link.name}</p>
                                                {link.socialProfiles
                                                    .sort((curr, next) => platformIndexes[curr.platform] - platformIndexes[next.platform])
                                                    .map((socialProfile) => (
                                                        <LinkWrapper
                                                            key={`${linkIndex}-${link.name}-${socialProfile.platform}`}
                                                            // data-tooltip-id={`${category.name}-${link.name}-${socialProfile.platform}`}
                                                            className="rounded-md p-0.5 text-gray-600 hover:bg-gray-100  group-hover:text-gray-700/50 dark:hover:bg-gray-800 dark:group-hover:text-gray-300/50"
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
                                                                            : IconIds.WEBSITE
                                                                }
                                                                className={cn('h-3.5 w-3.5')}
                                                            />
                                                            {/* <Tooltip id={`${category.name}-${link.name}-${socialProfile.platform}`} className="z-50">
                                                            <p className="text-xs text-primary">{socialProfile.url}</p>
                                                        </Tooltip> */}
                                                        </LinkWrapper>
                                                    ))}
                                            </div>
                                            <p className="text-xs opacity-50 group-hover:opacity-100">{link.description}</p>
                                        </div>
                                    </div>
                                    <LinkWrapper
                                        href={linkWithAddress(link, address)}
                                        // data-tooltip-id={`${category.name}-${link.name}-url`}
                                        className="z-20 rounded-sm p-1 hover:text-white group-hover:bg-gray-400/50 dark:group-hover:bg-gray-600/50"
                                        target="_blank"
                                    >
                                        <IconWrapper icon={IconIds.IC_BASELINE_OPEN_IN_NEW} className={cn('h-4 w-4')} />
                                    </LinkWrapper>
                                    {/* <Tooltip id={`${category.name}-${link.name}-url`} className="z-50">
                                        <p className="text-xs">{linkWithAddress(link, address)}</p>
                                    </Tooltip> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    )
}
