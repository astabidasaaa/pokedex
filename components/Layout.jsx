import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Inter, Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AnimatePresence initial={false} mode="wait">
        <motion.main
          className={`flex min-h-screen w-full flex-col items-center justify-start px-4 sm:px-6 md:px-10 lg:px-14 2xl:px-20 py-16 md:py-20 lg:py-24 ${roboto.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            duration: 1,
          }}
          key={router.asPath}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
