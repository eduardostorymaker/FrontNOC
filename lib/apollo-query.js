import { gql } from "@apollo/client"

export default async function ApolloQuery(client, query) {
    
    const { data } = await client.query({
        query: gql`${query}`
    })
    return data
}