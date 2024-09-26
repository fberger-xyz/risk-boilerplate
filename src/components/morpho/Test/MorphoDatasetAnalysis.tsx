'use client'

import PageWrapper from '@/components/common/PageWrapper'
import JsonField from '@/components/common/JsonField'
import { VariationNumber } from '@/components/morpho/Test/VariationNumber'
import { IMorphoDatasetRow, MorphoMarket, MorphoVault } from '@/interfaces'
import { useMorphoTestStore } from '@/stores/morpho-test.store'
import { cn, formatNumberWithDecimals, prettify } from '@/utils'
import { useEffect, useState } from 'react'
import LinkWithIcon from '@/components/common/LinkWithIcon'

enum EnumReallocationType {
    REALLOCATE_SUPPLY = 'ReallocateSupply',
    REALLOCATE_WITHDRAW = 'ReallocateWithdraw',
}

type TypeGroupedByEntry = {
    blockNumber: number
    ts: number
    reallocations: { name: string; address: string; vaultReallocations: IMorphoDatasetRow[] }[]
    analysis: {
        done: boolean
        withdrawalsCount: number
        suppliesCount: number
        reallocatedCapital: number
        preWithdrawalsAPY: number
        postSuppliesAPY: number
        reallocationSeemsProfitable: boolean
    }
}

export function MorphoDatasetAnalysis(props: { dataset: IMorphoDatasetRow[]; morphoMarkets: MorphoMarket[]; morphoVaults: MorphoVault[] }) {
    // store
    const { selectedVaults, actions } = useMorphoTestStore()

    // prepare
    const debug = false
    const [reallocations, setReallocationsGroupedByBlockNumber] = useState<TypeGroupedByEntry[]>([])
    const [vaults, setVaults] = useState<{ value: string; occurence: number }[]>([])

    // loop
    const groupByFn = () => {
        // prepare
        const reallocationsGroupedBy: TypeGroupedByEntry[] = []
        const localUniqAddresses: { value: string; occurence: number }[] = []
        const localUniqMarkets: { value: string; occurence: number }[] = []

        // do some group by
        for (let rowIndex = 0; rowIndex < props.dataset.length; rowIndex++) {
            // address
            const address = props.dataset[rowIndex].address
            const addressIndex = localUniqAddresses.findIndex((entry) => entry.value === address)
            if (addressIndex < 0) localUniqAddresses.push({ value: address, occurence: 1 })
            else localUniqAddresses[addressIndex].occurence += 1

            // filter
            if (!selectedVaults.includes(address)) continue

            // market
            const market = props.dataset[rowIndex].uniqueKey
            const uniqMarketIndex = localUniqMarkets.findIndex((entry) => entry.value === market)
            if (uniqMarketIndex < 0) localUniqMarkets.push({ value: market, occurence: 1 })
            else localUniqMarkets[uniqMarketIndex].occurence += 1

            // nest level 1
            const blockNumber = props.dataset[rowIndex].blockNumber
            const ts = new Date(Number(props.dataset[rowIndex].timestamp)).getTime()
            let tsIndex = reallocationsGroupedBy.findIndex((entry) => entry.ts === ts)
            if (tsIndex < 0) {
                reallocationsGroupedBy.push({
                    ts,
                    blockNumber,
                    reallocations: [],
                    analysis: {
                        done: false,
                        withdrawalsCount: 0,
                        suppliesCount: 0,
                        reallocatedCapital: 0,
                        preWithdrawalsAPY: 0,
                        postSuppliesAPY: 0,
                        reallocationSeemsProfitable: false,
                    },
                })
                tsIndex = reallocationsGroupedBy.findIndex((entry) => entry.ts === ts)
            }

            // nest level 2
            const name = props.dataset[rowIndex].name
            let nameIndex = reallocationsGroupedBy[tsIndex].reallocations.findIndex((entry) => entry.name === name)
            if (nameIndex < 0) {
                reallocationsGroupedBy[tsIndex].reallocations.push({ name, address, vaultReallocations: [] })
                nameIndex = reallocationsGroupedBy[tsIndex].reallocations.findIndex((entry) => entry.name === name)
            }

            // store data
            reallocationsGroupedBy[tsIndex].reallocations[nameIndex].vaultReallocations.push(props.dataset[rowIndex])

            // sort data. to optimise later if need be
            reallocationsGroupedBy[tsIndex].reallocations[nameIndex].vaultReallocations = reallocationsGroupedBy[tsIndex].reallocations[
                nameIndex
            ].vaultReallocations.sort((curr, next) => curr.logIndex - next.logIndex)
        }

        // analysis
        for (let blockIndex = 0; blockIndex < reallocationsGroupedBy.length; blockIndex++) {
            for (let vaultIndex = 0; vaultIndex < reallocationsGroupedBy[blockIndex].reallocations.length; vaultIndex++) {
                // exclude other vaults
                const { address, vaultReallocations } = reallocationsGroupedBy[blockIndex].reallocations[vaultIndex]
                if (!selectedVaults.includes(address)) continue

                // to do. improve logic to handle multi selection vaults
                const withdrawals = vaultReallocations.filter((entry) => entry.type === EnumReallocationType.REALLOCATE_WITHDRAW)
                const supplies = vaultReallocations.filter((entry) => entry.type === EnumReallocationType.REALLOCATE_SUPPLY)

                // very naive analysis for now
                const reallocatedCapital = withdrawals.reduce((acc, curr) => (acc += curr.assets / 10 ** curr['asset.decimals']), 0)
                const preWithdrawalsAPY =
                    withdrawals.reduce(
                        (acc, curr) => (acc += (curr.assets / 10 ** curr['asset.decimals']) * (Number(curr['borrow rate (t-1)']) / 10 ** 8)),
                        0,
                    ) / reallocatedCapital
                const postSuppliesAPY =
                    supplies.reduce(
                        (acc, curr) => (acc += (curr.assets / 10 ** curr['asset.decimals']) * (Number(curr['borrow rate (t)']) / 10 ** 8)),
                        0,
                    ) / reallocatedCapital
                reallocationsGroupedBy[blockIndex].analysis = {
                    done: true,
                    withdrawalsCount: withdrawals.length,
                    suppliesCount: supplies.length,
                    reallocatedCapital,
                    preWithdrawalsAPY,
                    postSuppliesAPY,
                    reallocationSeemsProfitable: preWithdrawalsAPY < postSuppliesAPY,
                }
            }
        }

        return {
            vaults: localUniqAddresses.sort((curr, next) => next.occurence - curr.occurence),
            uniqMarkets: localUniqMarkets.sort((curr, next) => next.occurence - curr.occurence),
            reallocations: reallocationsGroupedBy.sort((curr, next) => curr.blockNumber - next.blockNumber),
        }
    }

    // helpers
    const getMarket = (id: string) => props.morphoMarkets.find((market) => market.uniqueKey === id)
    const getVault = (address: string) => props.morphoVaults.find((vault) => vault.address === address)

    useEffect(() => {
        const state = groupByFn()
        setReallocationsGroupedByBlockNumber(() => state.reallocations)
        setVaults(() => state.vaults)
    }, [selectedVaults])
    return (
        <PageWrapper>
            {/* vaults */}
            <div className="flex flex-col">
                <p>Author: fberger</p>
                <p>Problematic (within +/- 5h)</p>
                <p>- describe what's happening</p>
                <p>- how can you differentiate the different vault strategies</p>
                <p>- how could vaults improve their performance</p>
            </div>

            <div className="flex flex-col text-xs">
                <div className="flex items-center gap-2">
                    <p className="font-bold">Vaults</p>
                    {/* <button onClick={() => actions.selectVaults(vaults.map((entry) => entry.value))}>Select all</button>
                    <button onClick={() => actions.selectVaults([])}>Remove all</button> */}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    {vaults.map((entry) => (
                        <div
                            key={entry.value}
                            className={cn(
                                'flex items-center gap-1 bg-gray-200 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-md',
                            )}
                        >
                            <LinkWithIcon key={entry.value} href={`https://app.morpho.org/vault?vault=${entry.value}&network=mainnet`}>
                                <p className={cn({ 'text-primary': selectedVaults.includes(entry.value) })}>
                                    {entry.occurence}. {getVault(entry.value)?.name}{' '}
                                </p>
                            </LinkWithIcon>

                            <p>|</p>
                            <button
                                disabled={selectedVaults.includes(entry.value)}
                                // onClick={() => actions.selectVaults([...selectedVaults, entry.value])}
                                onClick={() => actions.selectVaults([entry.value])}
                                className={cn({ 'text-gray-700': selectedVaults.includes(entry.value) })}
                            >
                                Add
                            </button>
                            <button
                                disabled={!selectedVaults.includes(entry.value)}
                                onClick={() => actions.selectVaults(selectedVaults.filter((address) => address !== entry.value))}
                                className={cn({ 'text-gray-700': !selectedVaults.includes(entry.value) })}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* dataset */}
            <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                    <p>{reallocations.length} Reallocations</p>
                    <p className="text-green-600">
                        APY profitable: {reallocations.filter((curr) => curr.analysis.done && curr.analysis.reallocationSeemsProfitable).length}
                    </p>
                    <p className="text-red-600">
                        APY damaging: {reallocations.filter((curr) => curr.analysis.done && !curr.analysis.reallocationSeemsProfitable).length}
                    </p>
                </div>
                {reallocations.length ? (
                    reallocations.map((blockData, tsEntryIndex) => (
                        <div key={`${blockData.ts}`} className="flex flex-col border p-1">
                            <div className="flex items-center gap-2">
                                <p>{tsEntryIndex + 1}.</p>
                                <p>blockNumber={blockData.blockNumber}</p>
                                <p>ts={isNaN(Number(blockData.ts)) ? blockData.ts : new Date(Number(blockData.ts) * 1000).toISOString()}</p>
                            </div>
                            {blockData.reallocations.map((vault, nameEntriesIndex) => (
                                <div key={`${blockData.ts}-${vault.name}`} className="flex flex-col gap-1 bg-gray-800 p-1">
                                    <p>
                                        {tsEntryIndex + 1}.{nameEntriesIndex + 1}. {vault.name}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {vault.vaultReallocations.map((reallocationForVault, nameEntryIndex) => (
                                            <div
                                                key={`${blockData.ts}-${vault.name}-${nameEntryIndex}`}
                                                className="flex flex-col gap-1 bg-gray-700 p-1"
                                            >
                                                <div className="flex items-center gap-1">
                                                    <p>#{reallocationForVault.logIndex}.</p>
                                                    <LinkWithIcon href={`https://etherscan.io/tx/${reallocationForVault.hash}`}>
                                                        <p
                                                            className={cn({
                                                                'text-lime-500': reallocationForVault.type === EnumReallocationType.REALLOCATE_SUPPLY,
                                                                'text-cyan-500':
                                                                    reallocationForVault.type === EnumReallocationType.REALLOCATE_WITHDRAW,
                                                            })}
                                                        >
                                                            {reallocationForVault.type}
                                                        </p>
                                                    </LinkWithIcon>
                                                    <p>
                                                        {formatNumberWithDecimals(
                                                            reallocationForVault.assets,
                                                            reallocationForVault['asset.decimals'],
                                                            3,
                                                        )}{' '}
                                                        {reallocationForVault['asset.symbol']}
                                                    </p>
                                                    <p>on</p>
                                                    <LinkWithIcon
                                                        href={`https://app.morpho.org/market?id=${reallocationForVault.uniqueKey}&network=mainnet`}
                                                    >
                                                        <p>
                                                            {getMarket(reallocationForVault.uniqueKey)?.['collateralAsset.symbol']}/
                                                            {getMarket(reallocationForVault.uniqueKey)?.['loanAsset.symbol']} market (
                                                            {Number(String(getMarket(reallocationForVault.uniqueKey)?.lltv).slice(0, 4) ?? 0) / 100}%
                                                            lltv)
                                                        </p>
                                                    </LinkWithIcon>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex flex-col border-l pl-1">
                                                        <VariationNumber
                                                            keyName="totalSupplyAssets"
                                                            tminus1={reallocationForVault['totalSupplyAssets (t-1)']}
                                                            t={reallocationForVault['totalSupplyAssets (t)']}
                                                            decimals={reallocationForVault['asset.decimals']}
                                                            precision={3}
                                                        />
                                                        <VariationNumber
                                                            keyName="totalBorrowAssets"
                                                            tminus1={reallocationForVault['totalBorrowAssets (t-1)']}
                                                            t={reallocationForVault['totalBorrowAssets (t)']}
                                                            decimals={reallocationForVault['asset.decimals']}
                                                            precision={3}
                                                        />
                                                        <VariationNumber
                                                            keyName="borrow rate"
                                                            tminus1={reallocationForVault['borrow rate (t-1)']}
                                                            t={reallocationForVault['borrow rate (t)']}
                                                            decimals={8} // export hardcoded variable in config
                                                            precision={4}
                                                        />
                                                    </div>
                                                </div>
                                                {debug && (
                                                    <>
                                                        <div className="flex flex-col">
                                                            <LinkWithIcon
                                                                href={`https://app.morpho.org/vault?vault=${reallocationForVault.address}&network=mainnet`}
                                                            >
                                                                <p className="text-xs">vault</p>
                                                            </LinkWithIcon>
                                                            <JsonField className="h-16">{prettify(getVault(reallocationForVault.address))}</JsonField>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <LinkWithIcon
                                                                href={`https://app.morpho.org/market?id=${reallocationForVault.uniqueKey}&network=mainnet`}
                                                            >
                                                                <p className="text-xs">market</p>
                                                            </LinkWithIcon>
                                                            <JsonField className="h-16">
                                                                {prettify(getMarket(reallocationForVault.uniqueKey))}
                                                            </JsonField>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <p className="text-xs">Raw data</p>
                                                            <JsonField className="h-16">{prettify(reallocationForVault)}</JsonField>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className={cn('flex flex-col bg-gray-700 p-1', {
                                            'bg-green-600/50': blockData.analysis.reallocationSeemsProfitable,
                                            'bg-red-600/50': !blockData.analysis.reallocationSeemsProfitable,
                                        })}
                                    >
                                        <p className="text-xs">Analysis</p>
                                        <JsonField className="h-32 !bg-opacity-80">{prettify(blockData.analysis)}</JsonField>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-primary">Select a vault</p>
                )}
            </div>
        </PageWrapper>
    )
}
