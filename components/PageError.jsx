import Link from "next/link";
import React from "react";

const PageError = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">Pokemon data not found.</p>
      <Link href="/" className="underline hover:no-underline">
        Back to home
      </Link>
    </div>
  );
};

export default PageError;
