// npm install @apollo/client
// apollo provider provides our apollo client to our application to connect to graphql server
import React from 'react';
import App from './App';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const authLink = setContext((req, pre) => {
  const token = localStorage.getItem('jwtToken');
  // will merge with existing headers
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
