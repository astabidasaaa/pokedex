import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonEvolutions = ({ pokemon }) => {
  return (
    <div className="description_main_container">
      <div className="description_item_container ">
        <h2>Evolutions</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {pokemon.evolutions.map((evolution) => {
            return (
              <Link
                key={evolution.id}
                href={`/${evolution.name.toLowerCase()}`}
                className=" bg-white p-2 rounded-lg shadow-md hover:scale-95 hover:shadow-none transition-all"
              >
                <div className="relative w-[75px] h-[100px] lg:w-[120px] lg:h-[160px]">
                  <Image
                    src={evolution.image}
                    alt={evolution.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 40vw"
                    quality={95}
                    className="object-contain object-center"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {pokemon.evolutionRequirements && (
        <div className="description_item_container ">
          <h2>Evolution Requirement</h2>
          <span>
            {pokemon.evolutionRequirements.amount}x{" "}
            {pokemon.evolutionRequirements.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default PokemonEvolutions;
