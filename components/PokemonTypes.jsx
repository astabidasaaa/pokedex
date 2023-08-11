import React from "react";

const PokemonTypes = ({ types }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center sm:justify-start items-start gap-2">
      {types.map((type, index) => {
        return (
          <span
            style={{
              backgroundColor: `rgb(var(--types-${type.toLowerCase()}))`,
            }}
            className={`py-1 px-4 rounded-full bg-zinc-300 text-xs font-semibold text-white min-w-[72px] text-center shadow`}
            key={index}
          >
            {type}
          </span>
        );
      })}
    </div>
  );
};

export default PokemonTypes;
