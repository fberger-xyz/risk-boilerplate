'use client'

// https://www.dhiwise.com/post/a-comprehensive-guide-to-nextjs-apollo-client-integration

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://blue-api.morpho.org/graphql',
        credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
})

export default client
