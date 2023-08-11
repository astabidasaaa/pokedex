import React from "react";
import Image from "next/image";
import PokemonTypes from "./PokemonTypes";
import PageError from "./PageError";
import PokedexDataTable from "./PokedexDataTable";
import PokemonEvolutions from "./PokemonEvolutions";

const PokemonDisplay = ({ pokemon }) => {
  if (!pokemon) return <PageError />;

  return (
    <div
      style={{
        backgroundColor: `rgba(var(--types-${pokemon.types[0].toLowerCase()}), 0.1)`,
      }}
      className="pokemon_main_container w-full max-w-6xl flex flex-col gap-6 justify-start items-start p-4 md:p-8 rounded-2xl"
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative w-full flex justify-center items-center p-8 bg-white rounded-lg shadow-md">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            priority={true}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 60vw"
            quality={95}
            className="!relative object-contain object-center !w-full !h-[unset] !max-h-[400px]"
          />
        </div>
        <div className="flex flex-col justify-start gap-8">
          <div className="description_item_container">
            <h1>
              {pokemon.name}{" "}
              <span className="text-lg text-black/40 font-light">
                #{pokemon.number}
              </span>
            </h1>
            <span className="mb-2">{pokemon.classification}</span>
            <PokemonTypes types={pokemon.types} />
          </div>
          <h2>Pokédex Data</h2>
          <PokedexDataTable pokemon={pokemon} />
        </div>
        <div className="description_main_container">
          <div className="description_item_container ">
            <h2>Resistant</h2>
            <PokemonTypes types={pokemon.resistant} />
          </div>
          <div className="description_item_container ">
            <h2>Weaknesses</h2>
            <PokemonTypes types={pokemon.weaknesses} />
          </div>
        </div>
        {pokemon.evolutions && <PokemonEvolutions pokemon={pokemon} />}
      </div>
    </div>
  );
};

export default PokemonDisplay;
