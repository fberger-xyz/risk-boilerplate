'use client'

import { TokenListTokenInterface } from '@/interfaces'
import { cn, shortenAddress } from '@/utils'
import Image from 'next/image'
import LinkWrapper from './LinkWrapper'

export default function TokenWrapper({
    token,
    className,
    showNameRatherThanSymbol = false,
    showAddress = true,
}: {
    token?: TokenListTokenInterface
    className?: string
    showNameRatherThanSymbol?: boolean
    showAddress?: boolean
}) {
    if (token)
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <Image src={token.logoURI} width={20} height={20} alt={token.name} />
                <p className="w-12 truncate">{showNameRatherThanSymbol ? token.name : token.symbol}</p>
                {showAddress && (
                    <LinkWrapper href={`https://arbiscan.io/token/${token.address}`}>
                        <p className="hover:underline">{shortenAddress(token.address)}</p>
                    </LinkWrapper>
                )}
            </div>
        )
    return null
}
