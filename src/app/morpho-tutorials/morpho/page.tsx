import IconWrapper from '@/components/common/IconWrapper'
import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import PreJson from '@/components/common/PreJson'
import MorphoMarkets from '@/components/morpho/MorphoMarkets'
import { ZRO_USDC_CONFIG } from '@/config/zro-usdc.config'
import { IconIds } from '@/enums'

export default function Page() {
    return (
        <PageWrapper>
            <LinkWithIcon href="https://docs.morpho.org/morpho/tutorials/deploy-an-oracle">
                <p>Documentation</p>
            </LinkWithIcon>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Deploy an oracle ✅</p>
                <p className="text-primary">base ZRO/USDC</p>
                <LinkWithIcon href={`https://basescan.org/address/${ZRO_USDC_CONFIG.baseZRO}`}>
                    <IconWrapper icon={IconIds.CONTRACT} className="h-4 w-4" />
                    <p>ZRO</p>
                </LinkWithIcon>
                <LinkWithIcon href={`https://basescan.org/address/${ZRO_USDC_CONFIG.baseUSDC}`}>
                    <IconWrapper icon={IconIds.CONTRACT} className="h-4 w-4" />
                    <p>USDC</p>
                </LinkWithIcon>
                <PreJson>
                    {JSON.stringify(
                        {
                            // mainnet: sDAI/USDC oracle
                            // sDAI https://etherscan.io/address/0x83f20f44975d03b1b09e64809b757c47f942beea
                            // USDC https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
                            // baseVault: '0x83F20F44975D03b1b09e64809B757c47f942BEeA', // mainnet sDAI
                            // baseVaultConversionSample: 1000000000000000000, // 1e18
                            // baseFeed1: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9', // chainlink mainnet DAI/USD
                            // baseFeed2: '0x0000000000000000000000000000000000000000',
                            // baseTokenDecimals: 18, // sDAI decimals
                            // quoteVault: '0x0000000000000000000000000000000000000000',
                            // quoteVaultConversionSample: 1,
                            // quoteFeed1: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // chainlink mainnet USDC/USD
                            // quoteFeed2: '0x0000000000000000000000000000000000000000',
                            // quoteTokenDecimals: 6,
                            // salt: '0x',

                            // base: ZRO/USDC
                            // ZRO https://basescan.org/token/0x6985884C4392D348587B19cb9eAAf157F13271cd
                            // USDC https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913
                            baseVault: ZRO_USDC_CONFIG.baseZRO, // base ZRO
                            baseVaultConversionSample: 1000000000000000000, // 1e18 ?
                            baseFeed1: '0xdc31a4CCfCA039BeC6222e20BE7770E12581bfEB', // chainlink base ZRO/USD
                            baseFeed2: '0x0000000000000000000000000000000000000000', // let as it is
                            baseTokenDecimals: 18, // base ZRO decimals
                            quoteVault: '0x0000000000000000000000000000000000000000',
                            quoteVaultConversionSample: 1,
                            quoteFeed1: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B', // chainlink base USDC/USD
                            quoteFeed2: '0x0000000000000000000000000000000000000000',
                            quoteTokenDecimals: 6, // base USDC decimals
                            salt: '0x', // recommended
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x727523fcaee23bc1b43c23f91e81e335be3db0e09570ffe84f81902c05a80597">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>createMorphoChainlinkOracleV2 tx hash</p>
                </LinkWithIcon>
                <LinkWithIcon href={`https://basescan.org/address/${ZRO_USDC_CONFIG.baseZROUSDCMorphoChainlinkOracleV2}`}>
                    <IconWrapper icon={IconIds.CONTRACT} className="h-4 w-4" />
                    <p>ZRO/USDC MorphoChainlinkOracleV2</p>
                </LinkWithIcon>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Create a market ✅</p>
                <p className="text-primary">base ZRO/USDC market</p>
                <PreJson>
                    {JSON.stringify(
                        {
                            loanToken: ZRO_USDC_CONFIG.baseUSDC, // base USDC
                            collateralToken: ZRO_USDC_CONFIG.baseZRO,
                            oracle: ZRO_USDC_CONFIG.baseZROUSDCMorphoChainlinkOracleV2,
                            irm: ZRO_USDC_CONFIG.baseAdaptiveCurveIrm,
                            lltv: '625000000000000000',
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x73686f363c296d53d051a8915e751309c4212dffab3299558b64aede4c1f5b73">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>createMarket tx hash</p>
                </LinkWithIcon>
                <p className="text-primary">ZRO/USDC market id = {ZRO_USDC_CONFIG.marketId}</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Getting started ✅</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Track positions ✅</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">...</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">📝 API</p>
                <p className="text-primary">Morpho data</p>
                <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                    <MorphoMarkets />
                </div>
                <p className="text-primary">Rewards</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">📝 Morpho SDK</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">🚧 Using Etherscan</p>
            </div>
        </PageWrapper>
    )
}
