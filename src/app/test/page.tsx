import { MorphoDatasetAnalysis } from '@/components/morpho/Test/MorphoDatasetAnalysis'
import { IMorphoDatasetRow, MorphoMarket, MorphoVault } from '@/interfaces'
import { promises as fs } from 'fs'

export default async function Page() {
    // load dataset
    const datasetPath = process.cwd() + '/src/data/morpho-dataset.json'
    const datasetFile = await fs.readFile(datasetPath, 'utf8')
    const morphoDataset = JSON.parse(datasetFile) as IMorphoDatasetRow[]

    // load api calls
    const morphoMarketsPath = process.cwd() + '/src/data/api-morpho-markets.json'
    const morphoMarketsFile = await fs.readFile(morphoMarketsPath, 'utf8')
    const morphoMarkets = JSON.parse(morphoMarketsFile) as MorphoMarket[]
    const morphoVaultsPath = process.cwd() + '/src/data/api-morpho-vaults.json'
    const morphoVaultsFile = await fs.readFile(morphoVaultsPath, 'utf8')
    const morphoVaults = JSON.parse(morphoVaultsFile) as MorphoVault[]

    return <MorphoDatasetAnalysis dataset={morphoDataset} morphoMarkets={morphoMarkets} morphoVaults={morphoVaults} />
}
