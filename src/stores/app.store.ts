import { create } from 'zustand'
import { InterfaceAppLink } from '../interfaces'
import { AppPagePaths } from '../enums'
import { APP_METADATA } from '../config/app.config'

export const useAppStore = create<{
    name: string
    version: string
    env: string
    debug: boolean
    initialized: boolean
    loading: boolean
    links: InterfaceAppLink[]
    actions: Record<string, () => void>
    computeds: Record<string, () => void>
}>(() => ({
    name: APP_METADATA.SITE_NAME,
    version: '0.0.0',
    env: String(process.env.NEXT_PUBLIC_APP_ENV),
    debug: process.env.NEXT_PUBLIC_APP_DEBUG === 'true',
    loading: false,
    initialized: false,
    links: [
        {
            name: '🛠️',
            path: AppPagePaths.HOME,
            enabled: true,
            sublinks: [],
        },
        {
            name: 'Morpho Tutorials',
            path: AppPagePaths.MORPHO_TUTORIALS,
            enabled: true,
            sublinks: [
                {
                    name: '🚧 Morpho',
                    path: AppPagePaths.MORPHO_TUTORIALS_MORPHO,
                    enabled: true,
                    sublinks: [],
                },
                {
                    name: '🚧 Morpho Vaults',
                    path: AppPagePaths.MORPHO_TUTORIALS_MORPHO_VAULTS,
                    enabled: true,
                    sublinks: [],
                },
                {
                    name: '📝 Bundlers',
                    path: AppPagePaths.MORPHO_TUTORIALS_BUNDLERS,
                    enabled: false,
                    sublinks: [],
                },
                {
                    name: '📝 Public Allocator',
                    path: AppPagePaths.MORPHO_TUTORIALS_PUBLIC_ALLOCATOR,
                    enabled: false,
                    sublinks: [],
                },
                {
                    name: '📝 Rewards',
                    path: AppPagePaths.MORPHO_TUTORIALS_REWARDS,
                    enabled: false,
                    sublinks: [],
                },
                {
                    name: '📝 Optimizers',
                    path: AppPagePaths.MORPHO_TUTORIALS_OPTIMIZERS,
                    enabled: false,
                    sublinks: [],
                },
            ],
        },
        {
            name: 'Test',
            path: AppPagePaths.TEST,
            enabled: true,
            sublinks: [],
        },
    ],
    actions: {},
    computeds: {},
}))
