import { gql } from '@apollo/client'

export const GET_MORPHO_MARKETS = gql`
    query {
        markets {
            items {
                uniqueKey
                lltv
                oracleAddress
                irmAddress
                creatorAddress
                loanAsset {
                    address
                    symbol
                    decimals
                }
                collateralAsset {
                    address
                    symbol
                    decimals
                }
                state {
                    borrowApy
                    borrowAssets
                    borrowAssetsUsd
                    supplyApy
                    supplyAssets
                    supplyAssetsUsd
                    fee
                    utilization
                }
            }
        }
    }
`
