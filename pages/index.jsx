"use client";

import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import InfiniteLoading from "@/components/InfiniteLoading";
import DataFetch from "@/components/DataFetch";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Home = ({ query }) => {
  // console.log(pokemons);
  const router = useRouter();

  // console.log(query);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      Test
      {/* {pokemons.map((item, index) => {
        return (
          <div key={index}>
            <Image src={item.image} alt={item.name} fill />
            <p>{item.name}</p>
            <p>{item.image}</p>
          </div>
        );
      })} */}
      <DataFetch filter={query} />
    </main>
  );
};

export default Home;

export const getServerSideProps = async ({ query }) => {
  // const { data } = await client.query({
  //   query: gql`
  //     query Pokemons {
  //       pokemons(first: 10) {
  //         id
  //         name
  //         image
  //       }
  //     }
  //   `,
  // });

  return {
    props: {
      query: query?.types || null,
    },
  };
};
