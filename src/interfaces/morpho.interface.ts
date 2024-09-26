// dataset
export interface IMorphoDatasetRow {
    timestamp: number
    hash: string
    logIndex: number
    blockNumber: number
    assets: number
    type: string
    address: string
    name: string
    'asset.symbol': string
    'asset.decimals': number
    'asset.address': string
    uniqueKey: string
    irmAddress: string
    oracleAddress: string
    lltv: number | string
    'loanAsset.symbol': string
    'loanAsset.address': string
    'collateralAsset.symbol': string
    'collateralAsset.address': string
    'totalSupplyAssets (t)': number
    'totalSupplyShares (t)': number
    'totalBorrowAssets (t)': number
    'totalBorrowShares (t)': number
    'lastUpdate (t)': number
    'fee (t)': number
    'totalSupplyAssets (t-1)': number | string
    'totalSupplyShares (t-1)': number | string
    'totalBorrowAssets (t-1)': number
    'totalBorrowShares (t-1)': number | string
    'lastUpdate (t-1)': number
    'fee (t-1)': number
    'borrow rate (t)': number | string
    'borrow rate (t-1)': number | string
}

// https://docs.morpho.org/apis/morpho/#morpho-markets

export interface MorphoMarket {
    uniqueKey: string
    lltv: number | string
    oracleAddress: string
    irmAddress: string
    'loanAsset.address': string
    'loanAsset.symbol': string
    'loanAsset.decimals': number
    'collateralAsset.address'?: string
    'collateralAsset.symbol'?: string
    'collateralAsset.decimals'?: number
    'state.borrowApy': number
    'state.borrowAssets': number | string
    'state.borrowAssetsUsd': null | number
    'state.supplyApy': number
    'state.supplyAssets': number | string
    'state.supplyAssetsUsd': null | number
    'state.fee': number
    'state.utilization': number
    collateralAsset?: null
}

// https://docs.morpho.org/apis/morpho-vaults/#morpho-vaults-and-their-current-states
export interface MorphoVault {
    address: string
    symbol: string
    name: string
    creationBlockNumber: number
    creationTimestamp: number
    creatorAddress: string
    whitelisted: boolean
    'asset.id': string
    'asset.address': string
    'asset.decimals': number
    'chain.id': number
    'chain.network': string
    'state.id': string
    'state.apy': number
    'state.netApy': number
    'state.totalAssets': number | string
    'state.totalAssetsUsd': null | number
    'state.fee': number
    'state.timelock': number
}
