import client from "@/apollo-client";
import { gql } from "@apollo/client";
import PokemonDisplay from "@/components/PokemonDisplay";
import React from "react";
import Loading from "@/components/Loading";
import Head from "next/head";

const PokemonTemplatePage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Pokédex – {data?.pokemon?.name}</title>
      </Head>
      {!data && <Loading />}
      <PokemonDisplay pokemon={data?.pokemon || null} />
    </>
  );
};

export default PokemonTemplatePage;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
        query GetPokemon {
          pokemon(name: "${params.url}") {
            id
            number
            name
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            classification
            types
            resistant
            attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
            }
            weaknesses
            fleeRate
            maxCP
            evolutions {
                id
                name
                image
            }
            evolutionRequirements {
                amount
                name
            }
            maxHP
            image
          }
        }
      `,
  });

  return {
    props: {
      data,
    },
  };
}
