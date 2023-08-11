import React from "react";
import { ApolloProvider } from "@apollo/client";
import "@/styles/globals.css";
import client from "@/apollo-client";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
