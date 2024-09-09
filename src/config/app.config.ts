import { SafePlatforms } from '@/enums'

export const APP_METADATA = {
    EMOJI: '🔗',
    SITE_NAME: 'safe-links',
    SITE_INFO: "Everything's Safe",
    SITE_DESCRIPTION: "Everything's Safe",
    SITE_URL: 'https://safe-links.vercel.app/',
    SOCIAL_TWITTER: 'fran6brg',
}

export const platformIndexes: Record<SafePlatforms, number> = {
    [SafePlatforms.TWITTER]: 1,
    [SafePlatforms.DISCORD]: 2,
    [SafePlatforms.GITHUB]: 3,
    [SafePlatforms.WEBSITE]: 4,
}
