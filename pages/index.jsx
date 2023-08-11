import React from "react";
import PokemonList from "@/components/PokemonList";
import Head from "next/head";

const Home = ({ query }) => {
  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>
      <PokemonList filter={query} />
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query: query?.types || null,
    },
  };
};
