import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterBox = () => {
  const [showFilterBox, setShowFilterBox] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = () => setShowFilterBox(false);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      {router.asPath === "/" && (
        <div ref={ref}>
          <button
            className="hover:opacity-75"
            onClick={() => setShowFilterBox(!showFilterBox)}
          >
            <FaFilter />
          </button>
          {showFilterBox && (
            <div className="absolute top-12 md:top-16 lg:top-20 right-4 sm:right-6 md:right-10 lg:right-14 2xl:right-20 bg-white shadow-md w-full max-w-[240px] max-h-[400px] overflow-y-auto">
              <div className="flex flex-col p-4">
                <p className="font-semibold">Filter by type</p>
                {types.map((type) => {
                  return (
                    <Link href={`/?types=${type}`} className="py-2" key={type}>
                      {type}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterBox;

const types = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];
