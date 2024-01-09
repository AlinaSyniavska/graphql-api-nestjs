import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
import nextWithApollo from 'next-with-apollo';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// setting configuration for http connect for Query and Mutation
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql', //backend link, check backend console for link
});

// setting configuration for websocket connect for subscription
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql', // backend link, check backend console for link
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // web socket connection for subscriptions
  httpLink, // http connection for query and mutation
);

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: splitLink,
      headers: {
        ...(headers as Record<string, string>),
      },
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  },
);

export default withApollo;
