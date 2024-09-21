// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli'
import { BLUE_API_GRAPHQL_URL } from '@morpho-org/morpho-ts'

const config: CodegenConfig = {
    overwrite: true,
    schema: BLUE_API_GRAPHQL_URL,
    documents: ['src/graphql/**/*.{graphql,gql}'],
    generates: {
        'src/graphql/types.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                avoidOptionals: {
                    field: true,
                    inputValue: false,
                    defaultValue: true,
                },
                scalars: {
                    BigInt: {
                        input: `Types.Scalars["BigInt"]["input"]`,
                        output: `Types.Scalars["BigInt"]["output"]`,
                    },
                    HexString: {
                        input: `Types.Scalars["HexString"]["input"]`,
                        output: `Types.Scalars["HexString"]["output"]`,
                    },
                    Address: {
                        input: `Types.Scalars["Address"]["input"]`,
                        output: `Types.Scalars["Address"]["output"]`,
                    },
                    MarketId: {
                        input: `Types.Scalars["MarketId"]["input"]`,
                        output: `Types.Scalars["MarketId"]["output"]`,
                    },
                },
            },
        },
    },
}

export default config
