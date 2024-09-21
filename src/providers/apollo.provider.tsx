'use client'

import { ApolloProvider } from '@apollo/client'
import client from '../client/blue-morpho'
import { ReactNode } from 'react'

const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderWrapper
