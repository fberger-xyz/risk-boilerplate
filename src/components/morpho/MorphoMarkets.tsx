'use client'

import { useQuery } from '@apollo/client'
import PreJson from '../common/PreJson'
import { GET_MORPHO_MARKETS } from '@/queries/get-morpho-markets.queries'
import { useEffect } from 'react'
import { Market } from '@morpho-org/blue-sdk'

export default function MorphoMarkets() {
    console.log('Render MorphoMarkets')
    // const [localData, setLocalData] = useState()
    const query = useQuery<Market[]>(GET_MORPHO_MARKETS, {
        onCompleted: (markets) => {
            console.log('completed', markets)
        },
        onError: (error) => {
            console.log('completed', error)
        },
        fetchPolicy: 'no-cache',
    })
    const handleRefetch = () => {
        console.log('Before refetch')
        query.refetch()
        console.log('After refetch')
    }
    useEffect(() => {
        console.log('> ----------')
        console.log('loading', query.loading)
        console.log('error', query.error)
        console.log('data', query.data)
        console.log('---------- <')
    }, [query.loading, query.error, query.data])
    return (
        <div className="flex gap-2">
            {query.loading ? (
                <p>Loading...</p>
            ) : query.error ? (
                <p>Error: {JSON.stringify(query.error)}</p>
            ) : query.data ? (
                <PreJson>{JSON.stringify(query.data, null, 2)}</PreJson>
            ) : (
                <p>No data...</p>
            )}
            <button onClick={() => handleRefetch()}>Refetch</button>
        </div>
    )
}
