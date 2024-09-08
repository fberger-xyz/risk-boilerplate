// see https://docs.pmnd.rs/zustand/getting-started/introduction

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
    address: string
    actions: {
        setAddress: (address: string) => void
    }
}>((set) => ({
    name: APP_METADATA.SITE_NAME,
    version: '0.0.0',
    env: String(process.env.NEXT_PUBLIC_APP_ENV),
    debug: process.env.NEXT_PUBLIC_APP_DEBUG === 'true',
    loading: false,
    initialized: false,
    links: [
        {
            name: 'Safe Links',
            path: AppPagePaths.HOME,
            enabled: true,
            sublinks: [],
        },
    ],
    address: '0xC234E41AE2cb00311956Aa7109fC801ae8c80941',
    actions: {
        setAddress: (address: string) => set(() => ({ address })),
    },
}))
