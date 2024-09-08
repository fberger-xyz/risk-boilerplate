import { SafeLinkApps, SafeLinkCategoryNames } from '@/enums'
import { SafeLink } from '@/interfaces'

export const linkWithAddress = (link: SafeLink, address: string) => {
    if (link.app === SafeLinkApps.SAFE) return `https://app.safe.global/home?safe=eth:${address}`
    if (link.app === SafeLinkApps.AAVE) return `https://app.safe.global/apps/open?safe=eth:${address}&appUrl=https%3A%2F%2Fapp.aave.com`
    if (link.app === SafeLinkApps.COWSWAP) return `https://app.safe.global/apps/open?safe=eth:${address}&appUrl=https%3A%2F%2Fswap.cow.fi`
    if (link.app === SafeLinkApps.ONEINCH) return `https://app.safe.global/apps/open?safe=eth:${address}&appUrl=https%3A%2F%2Fapp.1inch.io`
    if (link.app === SafeLinkApps.ONCHAINDEN) return link.url
    if (link.app === SafeLinkApps.DEBANK) return `https://debank.com/profile/${address}`
    if (link.app === SafeLinkApps.ZERION) return `https://app.safe.global/apps/open?safe=eth:${address}&appUrl=https%3A%2F%2Fapp.zerion.io`
    if (link.app === SafeLinkApps.ZAPPER) return `https://zapper.xyz/fr/account/${address}`
    return '/'
}
export const linksGroupedByCategories: { name: SafeLinkCategoryNames; links: SafeLink[] }[] = [
    {
        name: SafeLinkCategoryNames.CUSTODY,
        links: [
            {
                app: SafeLinkApps.SAFE,
                url: 'https://app.safe.global',
                name: 'Safe',
                iconUrl: 'https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/8467082/1715770781/1080x360',
                description: 'Largest smart account ecosystem on the EVM',
                tags: ['Wallet', 'todo'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: 'todo',
                    },
                    {
                        platform: 'GITHUB',
                        url: 'todo',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/safe',
                    },
                ],
            },
        ],
    },
    {
        name: SafeLinkCategoryNames.DEFI,
        links: [
            {
                app: SafeLinkApps.AAVE,
                url: 'https://app.aave.com',
                name: 'Aave',
                iconUrl: 'https://pbs.twimg.com/profile_images/1808921860781821952/CmtvkzWo_400x400.png',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1719825249397604352/1698873437/1080x360',
                description: 'Building the future of DeFi',
                tags: ['DeFi', 'Lending/Borrowing'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: 'https://discord.com/invite/CvKUrqM',
                    },
                    {
                        platform: 'GITHUB',
                        url: 'https://github.com/aave',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://twitter.com/aaveaave',
                    },
                ],
            },
            {
                app: SafeLinkApps.ONEINCH,
                url: 'https://swap.cow.fi',
                name: '1inch',
                iconUrl: 'https://pbs.twimg.com/profile_images/1803771489025470466/JSzaEa9X_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1137038394503114753/1718887613/1080x360',
                description: 'User-protective products for Ethereum',
                tags: ['Aggregator', 'DAO Tooling', 'MEV Protection'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: 'todo',
                    },
                    {
                        platform: 'GITHUB',
                        url: 'todo',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/1inch',
                    },
                ],
            },
            {
                app: SafeLinkApps.COWSWAP,
                url: 'https://swap.cow.fi',
                name: 'CoW Swap',
                iconUrl: 'https://pbs.twimg.com/profile_images/1805606768266924032/nzzLCHXW_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1383143419128782848/1719325175/1080x360',
                description: 'User-protective products for Ethereum',
                tags: ['Aggregator', 'DAO Tooling', 'MEV Protection'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: 'https://discord.com/invite/cowprotocol',
                    },
                    {
                        platform: 'GITHUB',
                        url: 'https://github.com/cowprotocol',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://twitter.com/CoWSwap',
                    },
                ],
            },
        ],
    },
    {
        name: SafeLinkCategoryNames.COORDINATE,
        links: [
            {
                app: SafeLinkApps.ONCHAINDEN,
                url: 'https://www.onchainden.com/',
                name: 'Onchain Den',
                iconUrl: 'https://pbs.twimg.com/profile_images/1513620455021760515/pJj27OgP_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1475562072872304644/1649709735/1080x360',
                description: 'The fastest multisig for onchain teams',
                tags: ['todo'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: '',
                    },
                    {
                        platform: 'GITHUB',
                        url: '',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/OnChainDen',
                    },
                ],
            },
        ],
    },
    {
        name: SafeLinkCategoryNames.TRACK,
        links: [
            {
                app: SafeLinkApps.DEBANK,
                url: 'https://debank.com/',
                name: 'Debank',
                iconUrl: 'https://pbs.twimg.com/profile_images/1414880725921267716/YzVitob7_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1156037602488639490/1715323254/1080x360',
                description: 'The Real User Based Web3 Community',
                tags: ['todo'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: '',
                    },
                    {
                        platform: 'GITHUB',
                        url: '',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/DeBankDeFi',
                    },
                ],
            },
            {
                app: SafeLinkApps.ZERION,
                url: 'https://app.zerion.io',
                name: 'Zerion',
                iconUrl: 'https://pbs.twimg.com/profile_images/1639841598648512515/RXG5M-pv_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/895030804383969283/1687375429/1080x360',
                description: 'Your crypto wallet for everything onchain',
                tags: ['todo'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: '',
                    },
                    {
                        platform: 'GITHUB',
                        url: '',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/zerion',
                    },
                ],
            },
            {
                app: SafeLinkApps.ZAPPER,
                url: 'https://zapper.xyz',
                name: 'Zapper',
                iconUrl: 'https://pbs.twimg.com/profile_images/1681396816737181707/MZVvpTPr_400x400.jpg',
                bannerUrl: 'https://pbs.twimg.com/profile_banners/1208076242366283776/1704754033/1080x360',
                description: 'Track your DeFi and NFT portfolio',
                tags: ['todo'],
                socialProfiles: [
                    {
                        platform: 'DISCORD',
                        url: '',
                    },
                    {
                        platform: 'GITHUB',
                        url: '',
                    },
                    {
                        platform: 'TWITTER',
                        url: 'https://x.com/zapper_fi',
                    },
                ],
            },
        ],
    },
]
