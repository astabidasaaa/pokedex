import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useQuery, gql } from "@apollo/client";

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

const DataFetch = ({ filter }) => {
  const [isLoading, setLoading] = useState(false);
  const [pokemonsData, setPokemonsData] = useState([]);
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { first: 15 },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      setPokemonsData(
        filter
          ? data.pokemons.filter((pokemon) => pokemon.types.includes(filter))
          : data.pokemons
      );
    }
    // const queriedData = filter
    //   ? pokemons_data.filter((pokemon) => pokemon.types.includes(filter))
    //   : pokemons_data;
  }, [data]);

  useEffect(() => {
    console.log(pokemonsData);
  }, [pokemonsData]);

  //   const containerRef = useRef();

  useEffect(() => {
    // console.log(isLoading);
    if (isLoading && data.pokemons.length) {
      fetchMore({
        variables: {
          first: data.pokemons.length + 15,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setLoading(false);
          if (!fetchMoreResult) return prev;

          //   const prevData = prev.pokemons;
          //   const moreData = fetchMoreResult.pokemons;

          //   fetchMoreResult.data = [...prevData, ...moreData];
          //   console.log(fetchMoreResult);
          return fetchMoreResult;
        },
      });
    }
  }, [isLoading]);

  //

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 20
    ) {
      //   return;
      //   handleClick();
      setLoading(true);

      //   console.log("data:");
      //   console.log(data);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   const pokemons_data = data?.pokemons || [];
  //   const queriedData = filter
  //     ? pokemons_data.filter((pokemon) => pokemon.types.includes(filter))
  //     : pokemons_data;

  //   useEffect(() => {
  //     if (queriedData === []) {
  //       setLoading(true);
  //     }
  //   }, []);

  //   console.log(pokemons_data);
  //   console.log(queriedData);

  //   if (error) return <p>Error loading data.</p>;
  //   const windowHeight = window.screen.height - 200;

  //   ref={containerRef} className="h-[98vh] pb-40 overflow-auto"
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="grid grid-cols-3 gap-16">
      {data &&
        pokemonsData.map((pokemon) => {
          //   console.log(pokemon.types);
          return (
            <div
              key={pokemon.id}
              className="flex flex-col justify-center items-center"
            >
              <div className="relative w-[180px] h-[240px] lg:w-[240px] lg:h-[320px] xl:w-[270px] xl:h-[360px] 2xl:w-[300px] 2xl:h-[400px]">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 33vw"
                  className="object-contain object-center"
                />
              </div>
              <p className="text-black/40">#{pokemon.number}</p>
              <h2>{pokemon.name}</h2>
              <div>
                {pokemon.types.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </div>
              {/* <p>Type: {pokemon.type}</p> */}
              {/* <p>Abilities: {pokemon.abilities.join(", ")}</p> */}
            </div>
          );
        })}
      {/* <button onClick={handleClick}>LOAD MORE</button> */}
      {isLoading && <div>Loading...</div>}
    </div>
    // <div>TEST 2</div>
  );
};

export default DataFetch;

//  const handleClick = () => {
//     if (data.pokemons.length) {
//       fetchMore({
//         variables: {
//           first: data.pokemons.length + 15,
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult) return prev;

//           //   const prevData = prev.pokemons;
//           //   const moreData = fetchMoreResult.pokemons;

//           //   fetchMoreResult.data = [...prevData, ...moreData];
//           console.log(fetchMoreResult);
//           return fetchMoreResult;
//         },
//       });
//     }
//   };
