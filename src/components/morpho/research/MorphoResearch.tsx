'use client'

import { Tooltip } from 'react-tooltip'
import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import { MorphoMarket } from '@/interfaces'
import { cn, shortenAddress, shortenStr } from '@/utils'
import numeral from 'numeral'
import { ReactNode, useEffect, useState } from 'react'

type TypeGroupBy = { assetAddress: string; markets: MorphoMarket[] }[]
function MarketOverviewRow(props: {
    index: ReactNode
    supplyApy: ReactNode
    pair: ReactNode
    borrowApy: ReactNode
    utilisation: ReactNode
    lltv: ReactNode
}) {
    const SPANS = {
        index: 1,
        supplyApy: 1,
        pair: 3,
        borrowApy: 1,
        utilisation: 2,
        lltv: 1,
    }
    return (
        <div className={cn(`hover:text-primary grid w-full grid-cols-${Object.values(SPANS).reduce((acc, curr) => (acc += curr), 0)} gap-2 text-xs`)}>
            <div className={cn(`col-span-${SPANS.index} flex`)}>{props.index}</div>
            <div className={cn(`col-span-${SPANS.supplyApy} flex`)}>{props.supplyApy}</div>
            <div className={cn(`col-span-${SPANS.pair} flex`)}>{props.pair}</div>
            <div className={cn(`col-span-${SPANS.borrowApy} flex`)}>{props.borrowApy}</div>
            <div className={cn(`col-span-${SPANS.lltv} flex`)}>{props.lltv}</div>
            <div className={cn(`col-span-${SPANS.utilisation} flex`)}>{props.utilisation}</div>
        </div>
    )
}
export function MorphoResearch(props: { morphoMarkets: MorphoMarket[] }) {
    // prepare
    const [groupBy, setGroupBy] = useState<TypeGroupBy>([])

    // loop
    const groupByFn = () => {
        let groupBy: TypeGroupBy = []
        for (let marketIndex = 0; marketIndex < props.morphoMarkets.length; marketIndex++) {
            const groupedByKey = props.morphoMarkets[marketIndex]['loanAsset.address']
            if (!groupedByKey) continue
            let keyIndex = groupBy.findIndex((entry) => entry.assetAddress === groupedByKey)
            if (keyIndex < 0) {
                groupBy.push({ assetAddress: groupedByKey, markets: [] })
                keyIndex = groupBy.findIndex((entry) => entry.assetAddress === groupedByKey)
            }
            groupBy[keyIndex].markets.push(props.morphoMarkets[marketIndex])
        }
        groupBy = groupBy.sort((curr, next) => next.markets.length - curr.markets.length)
        return {
            groupBy,
        }
    }

    useEffect(() => {
        const state = groupByFn()
        setGroupBy(() => state.groupBy)
    }, [props.morphoMarkets])

    return (
        <PageWrapper>
            {/* <div className="flex flex-col">
                <p>Aave APIs: https://aave-api-v2.aave.com/</p>
                <p>Aave markets: https://app.aave.com/markets/</p>
                <p>Aave Dev hub: https://docs.aave.com/hub</p>
                <p>Aave parameters: https://github.com/WeAreNewt/config.fyi</p>
                <p>Morpho page on Gauntlet: https://app.gauntlet.xyz/protocols/metamorpho</p>
                <p>Morpho oracles: https://oracle-decoder.netlify.app/suggestor-page</p>
            </div> */}
            <p>Morpho markets grouped by loan asset</p>
            <div className="grid grid-flow-row-dense grid-cols-2 gap-2">
                {groupBy.map((key, keyIndex) => (
                    <div key={key.assetAddress} className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <LinkWithIcon href={`https://etherscan.io/address/${key.assetAddress}`}>
                                <p>
                                    {keyIndex + 1}. {key.markets.length ? key.markets[0]['loanAsset.symbol'] : shortenAddress(key.assetAddress)} (
                                    {key.markets.length} markets)
                                </p>
                            </LinkWithIcon>
                        </div>
                        <div className="flex h-40 flex-col overflow-scroll border p-2">
                            <MarketOverviewRow
                                index={<p className="opacity-50">#</p>}
                                supplyApy={<p className="opacity-50">spy. APY</p>}
                                pair={<p className="opacity-50">spy. / brw. pair</p>}
                                borrowApy={<p className="opacity-50">brw. APY</p>}
                                lltv={<p className="opacity-50">lltv</p>}
                                utilisation={<p className="opacity-50">spy. / brw. = utilisation</p>}
                            />
                            {key.markets
                                .filter((market) => Number(market['state.borrowAssetsUsd']) > 1000)
                                .sort((curr, next) => Number(next['state.utilization'] - Number(curr['state.utilization'])))
                                .map((market, marketIndex) => (
                                    <div key={market.uniqueKey} className="flex w-full">
                                        <div
                                            className="flex w-full"
                                            data-tooltip-id={`${market.uniqueKey}-${marketIndex}`}
                                            data-tooltip-place="bottom"
                                        >
                                            <MarketOverviewRow
                                                index={<p className="opacity-50">{marketIndex + 1}.</p>}
                                                supplyApy={<p>{numeral(Number(market['state.supplyApy'])).format('0,0.00%')}</p>}
                                                pair={
                                                    <LinkWithIcon href={`https://app.morpho.org/market?id=${market.uniqueKey}&network=mainnet`}>
                                                        <div className="flex">
                                                            <p>{shortenStr(market['collateralAsset.symbol'] ?? '', 16)}</p>
                                                            <p className="opacity-50">/{market['loanAsset.symbol']}</p>
                                                        </div>
                                                    </LinkWithIcon>
                                                }
                                                borrowApy={<p>{numeral(Number(market['state.borrowApy'])).format('0,0.00%')}</p>}
                                                utilisation={
                                                    <div className="flex gap-1">
                                                        <p className="text-right">
                                                            {numeral(
                                                                Number(market['state.borrowAssets']) / 10 ** Number(market['loanAsset.decimals']),
                                                            )
                                                                .divide(1000)
                                                                .format('0,0')}
                                                            k
                                                        </p>
                                                        <p className="opacity-50">/</p>
                                                        <p className="text-right">
                                                            {numeral(
                                                                Number(market['state.supplyAssets']) / 10 ** Number(market['loanAsset.decimals']),
                                                            )
                                                                .divide(1000)
                                                                .format('0,0')}
                                                            k
                                                        </p>
                                                        <p className="opacity-50">=</p>
                                                        <p>{numeral(Number(market['state.utilization'])).format('0,0%')}</p>
                                                    </div>
                                                }
                                                lltv={<p>{numeral(Number(market.lltv) / 10 ** 18).format('0,0%')}</p>}
                                            />
                                        </div>
                                        <Tooltip id={`${market.uniqueKey}-${marketIndex}`} className="z-50">
                                            <pre className="text-xs capitalize">{JSON.stringify(market, null, 2)}</pre>
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
