import IconWrapper from '@/components/common/IconWrapper'
import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import JsonField from '@/components/common/JsonField'
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
                <JsonField>
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
                </JsonField>
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
                <JsonField>
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
                </JsonField>
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
                <JsonField>
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
                </JsonField>
                <LinkWithIcon href="https://basescan.org/tx/0x0905e958cb3616a6e064eb223e65326fe45d3a04c2582d3cd320c5859be668a2">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>submitCap tx hash</p>
                </LinkWithIcon>

                {/* 2 */}
                <p className="text-primary">2 - Accept the cap ✅</p>
                <JsonField>
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
                </JsonField>
                <LinkWithIcon href="https://basescan.org/tx/0x5d4786d103f471c0f5b1e3bdc1e7449d2748d5026605f6b6e9b47429753ef042">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>acceptCap tx hash</p>
                </LinkWithIcon>

                {/* 3 */}
                <p className="text-primary">3 - Set the Supply Queue ⌛</p>
                <JsonField>{JSON.stringify([ZRO_USDC_CONFIG.marketId], null, 2)}</JsonField>
                <LinkWithIcon href="https://basescan.org/tx/0x492047f0d183490d091844dcf88b19de2201c06d8bbde5a973c566764e7270b7">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>setSupplyQueue tx hash</p>
                </LinkWithIcon>

                {/* 4 */}
                <p className="text-primary">4 - Deposit ✅</p>
                <p className="text-secondary">YT tutorial: https://www.youtube.com/watch?v=ljfKw-oadQ4&t=63s</p>
                <LinkWithIcon href="https://basescan.org/tx/0xd602eb5961a56916569f79b737eebe7f2b8977abcb3ab43f35e2397066bd223d">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>Approve vault for 10 ZRO tx hash</p>
                </LinkWithIcon>
                <LinkWithIcon href="https://basescan.org/tx/0x50cc4ce7e9bb98e3f3016968f30212e36c1d3b81e73abdfa0d73b04f29b59e47">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>Approve vault for 10 USDC tx hash</p>
                </LinkWithIcon>
                <LinkWithIcon href="https://basescan.org/tx/0x7d22d362ecc03506f846e22b439e69f2a700bc26bef7ec178a43c8c94196251c">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>deposit 1 USDC tx hash</p>
                </LinkWithIcon>

                {/* 5 */}
                <p className="text-primary">[...] - Supply ZRO</p>
                <LinkWithIcon href="https://basescan.org/tx/0xa75ee0ece0c59cf77787c431b04d690740cccc6fd978f9357fc4ddbb29051750">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>Approve Morpho for 10 ZRO tx hash</p>
                </LinkWithIcon>
                <JsonField>
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
                </JsonField>
                <LinkWithIcon href="https://basescan.org/tx/0x8c5f334be56bcd339ff0f9653f2a5b23472deb7db84d160875a1fb5e31a377d4">
                    <IconWrapper icon={IconIds.TRANSACTION} className="h-4 w-4" />
                    <p>Supply 10 ZRO tx hash</p>
                </LinkWithIcon>
                <p>Borrow tx reverted</p>
            </div>

            {/* step */}
            <div className="flex w-full flex-col gap-1 border border-gray-500 p-2">
                <p className="font-bold">Become a curator / ...</p>
            </div>
        </PageWrapper>
    )
}
