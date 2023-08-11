import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import PokemonTypes from "./PokemonTypes";
import Link from "next/link";
import PageError from "./PageError";

const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

const PokemonList = ({ filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [pokemonsData, setPokemonsData] = useState([]);

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { first: 15 },
  });

  useEffect(() => {
    if (data) {
      setPokemonsData(
        filter
          ? data.pokemons.filter((pokemon) => pokemon.types.includes(filter))
          : data.pokemons
      );
    }
  }, [filter, data]);

  useEffect(() => {
    if (isLoading) {
      const delayFetchMore = setTimeout(() => {
        if (data?.pokemons?.length) {
          fetchMore({
            variables: {
              first: data.pokemons.length + 15,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              setLoading(false);
              if (!fetchMoreResult) return prev;

              return fetchMoreResult;
            },
          });
        }
      }, 100);

      return () => clearTimeout(delayFetchMore);
    }
  }, [isLoading]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    setLoading(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <PageError />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
        {data &&
          pokemonsData.map(({ id, name, image, number, types }) => {
            return (
              <Link
                key={id}
                href={`/${name.toLowerCase()}`}
                className="bg-white rounded-xl overflow-hidden shadow-md w-full max-w-xs hover:scale-105 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col justify-center items-center gap-4 py-6 px-16 sm:px-4 sm:py-4 lg:px-10 lg:py-6">
                  <div className="relative w-[180px] h-[240px] lg:w-[180px] lg:h-[240px]">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 33vw"
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center sm:items-start w-full text-center sm:text-start">
                    <p className="text-black/40">#{number}</p>
                    <span className="font-bold text-lg mb-1">{name}</span>
                    <PokemonTypes types={types} />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      {isLoading && (
        <div className="fixed left-8 bottom-8 animate-spin opacity-70">
          <Image
            src="/pokedex-icon-sm.png"
            alt="Pokedex Icon"
            height={60}
            width={60}
            className="object-contain object-center opacity-80"
          />
        </div>
      )}
    </>
  );
};

export default PokemonList;
