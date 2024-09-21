import IconWrapper from '@/components/common/IconWrapper'
import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import PreJson from '@/components/common/PreJson'
import { ZRO_USDC_CONFIG } from '@/config/zro-usdc.config'
import { IconIds } from '@/enums'

export default function Page() {
    return (
        <PageWrapper>
            <LinkWithIcon href="https://docs.morpho.org/morpho-vaults/tutorials/become-a-curator/creation">
                <p>Documentation</p>
            </LinkWithIcon>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Become a curator / vault creation ❌</p>
                <p className="text-primary">base ZRO/USDC vault</p>
                <PreJson>
                    {JSON.stringify(
                        {
                            initialOwner: ZRO_USDC_CONFIG.me,
                            initialTimelock: 86500,
                            asset: ZRO_USDC_CONFIG.baseZRO,
                            name: 'LayerZero vault by fran6.eth',
                            symbol: 'ZRO | fran6.eth',
                            salt: '0x', // recommended
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x29cc9daad3b83d17a7c83052bd1c647c9d5cdda32532b9e529c3a3e4abbe9156">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>createMetaMorpho tx hash</p>
                </LinkWithIcon>
                <LinkWithIcon href={`https://basescan.org/address/${ZRO_USDC_CONFIG.baseVaultFailed}`}>
                    <IconWrapper icon={IconIds.CONTRACT} className="h-4 w-4" />
                    <p>ZRO/USDC MetaMorpho</p>
                </LinkWithIcon>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Become a curator / vault creation ✅</p>
                <p className="text-primary">base ZRO/USDC vault</p>
                <PreJson>
                    {JSON.stringify(
                        {
                            initialOwner: ZRO_USDC_CONFIG.me,
                            initialTimelock: 86500,
                            asset: ZRO_USDC_CONFIG.baseUSDC,
                            name: 'LayerZero vault by fran6.eth',
                            symbol: 'ZRO | fran6.eth',
                            salt: '0x', // recommended
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x99c2b627b431458f8a6d729fb8282090a76dae0698aaaffaf7aa78d950666960">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>createMetaMorpho tx hash</p>
                </LinkWithIcon>
                <LinkWithIcon href={`https://basescan.org/address/${ZRO_USDC_CONFIG.baseVaultOk}`}>
                    <IconWrapper icon={IconIds.CONTRACT} className="h-4 w-4" />
                    <p>ZRO/USDC MetaMorpho</p>
                </LinkWithIcon>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Become a curator / setup ✅</p>
                {/* 1 */}
                <p className="text-primary">1 - Submit the cap</p>
                <PreJson>
                    {JSON.stringify(
                        {
                            marketParams: {
                                loanToken: ZRO_USDC_CONFIG.baseUSDC,
                                collateralToken: ZRO_USDC_CONFIG.baseZRO,
                                oracle: ZRO_USDC_CONFIG.baseZROUSDCMorphoChainlinkOracleV2,
                                irm: ZRO_USDC_CONFIG.baseAdaptiveCurveIrm,
                                lltv: '625000000000000000',
                            },
                            newSupplyCap: 100000000000000000000, // 100 ZRO
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x0905e958cb3616a6e064eb223e65326fe45d3a04c2582d3cd320c5859be668a2">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>submitCap tx hash</p>
                </LinkWithIcon>

                {/* 2 */}
                <p className="text-primary">2 - Accept the cap ⌛ (end of timelock sunday afternoon)</p>
                <PreJson>
                    {JSON.stringify(
                        {
                            loanToken: ZRO_USDC_CONFIG.baseUSDC,
                            collateralToken: ZRO_USDC_CONFIG.baseZRO,
                            oracle: ZRO_USDC_CONFIG.baseZROUSDCMorphoChainlinkOracleV2,
                            irm: ZRO_USDC_CONFIG.baseAdaptiveCurveIrm,
                            lltv: '625000000000000000',
                        },
                        null,
                        2,
                    )}
                </PreJson>
                <LinkWithIcon href="https://basescan.org/tx/0x28e43dc1402cbc6675836a89ae8b9a21a12450ac8e0b68cfb266e5c0797d4194">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>acceptCap tx hash</p>
                </LinkWithIcon>
                <p className="text-red-500">Error Message: TimelockNotElapsed[]</p>
                <p className="text-red-500">if (block.timestamp {'<'} validAt) revert ErrorsLib.TimelockNotElapsed();</p>
                <p className="text-red-500">
                    https://dashboard.tenderly.co/tx/base/0x28e43dc1402cbc6675836a89ae8b9a21a12450ac8e0b68cfb266e5c0797d4194
                </p>

                {/* 3 */}
                <p className="text-primary">3 - Set the Supply Queue ⌛</p>
                <PreJson>{JSON.stringify([ZRO_USDC_CONFIG.marketId], null, 2)}</PreJson>
                {/* <LinkWithIcon href="https://basescan.org/tx/tba">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>setSupplyQueue tx hash</p>
                </LinkWithIcon> */}

                {/* 4 */}
                <p className="text-primary">4 - Deposit ⌛</p>
                {/* <PreJson>{JSON.stringify([marketId], null, 2)}</PreJson> */}
                {/* <LinkWithIcon href="https://basescan.org/tx/tba">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>deposit tx hash</p>
                </LinkWithIcon> */}
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">...</p>
            </div>
        </PageWrapper>
    )
}
