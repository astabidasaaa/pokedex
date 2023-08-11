import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center animate-spin">
        <Image
          src="/pokedex-icon-sm.png"
          alt="Pokedex Icon"
          height={60}
          width={60}
          className="object-contain object-center opacity-80"
        />
      </div>
    </div>
  );
};

export default Loading;
