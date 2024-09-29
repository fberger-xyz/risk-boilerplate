import { MorphoResearch } from '@/components/morpho/research/MorphoResearch'
import { MorphoMarket } from '@/interfaces'
import { promises as fs } from 'fs'

export default async function Page() {
    const morphoMarketsPath = process.cwd() + '/src/data/api-morpho-markets.json'
    const morphoMarketsFile = await fs.readFile(morphoMarketsPath, 'utf8')
    const morphoMarkets = JSON.parse(morphoMarketsFile) as MorphoMarket[]
    return <MorphoResearch morphoMarkets={morphoMarkets} />
}
