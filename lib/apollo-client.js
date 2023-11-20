import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createApolloClient () {
    return new ApolloClient({
        uri:'http://172.19.128.128:1337/graphql',
        cache: new InMemoryCache()
    })
}