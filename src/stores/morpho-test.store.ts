import { IMorphoDatasetRow } from '@/interfaces'
import { create } from 'zustand'

export type DatasetAnalysis = { blockNumber: number; ts: number; entries: { name: string; entries: IMorphoDatasetRow[] }[] }[]
export const useMorphoTestStore = create<{
    dataset: IMorphoDatasetRow[]
    selectedVaults: string[]
    selectedMarkets: string[]
    actions: {
        selectVaults: (selectedVaults: string[]) => void
        selectMarkets: (selectedMarkets: string[]) => void
    }
    computeds: {
        analysis: () => DatasetAnalysis
    }
}>((set) => ({
    dataset: [],
    selectedVaults: [],
    selectedCollats: [],
    selectedLoans: [],
    selectedMarkets: [],
    actions: {
        selectVaults: (selectedVaults) => set(() => ({ selectedVaults })),
        selectMarkets: (selectedMarkets) => set(() => ({ selectedMarkets })),
    },
    computeds: {
        analysis: () => [],
    },
}))
