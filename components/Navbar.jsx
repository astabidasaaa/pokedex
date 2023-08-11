import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterBox from "./FilterBox";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    setScrolled(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div
        className={`w-full px-4 sm:px-6 md:px-10 lg:px-14 2xl:px-20 ${
          scrolled
            ? "bg-white/75 backdrop-blur-sm drop-shadow-lg"
            : "bg-transparent"
        } transition-all duration-500`}
      >
        <nav
          className={`w-full h-12 md:h-16 lg:h-20 flex flex-row justify-between items-center text-[#1F3B70]`}
        >
          <Link href="/" className="hover:opacity-75 transition-all">
            <Image
              src="/pokedex-logo.png"
              alt="Pokedex Logo"
              width={554}
              height={227}
              className="w-16 md:w-24 lg:w-32 h-8 md:h-12 lg:h-16 object-contain object-center"
            />
          </Link>
          <FilterBox />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
