import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Copyright from "../components/copyright";

const MemoizedCopyright = React.memo(Copyright);

function App() {
  const [windowHeight, setWindowHeight] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowHeight(window.innerHeight * 0.01);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat bg-cover p-0 m-0 align-middle tracking-wide "
      style={windowHeight !== null ? { "--vh": `${windowHeight}px` } : {}}
    >
      <Image
        src="/assets/Pokedex.png"
        alt="Pokedex"
        width={192}
        height={72}
        quality={100}
        className="
        w-64 mx-auto pt-16 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
        priority
      />

      <div
        className="
      w-full flex flex-col justify-center items-center absolute bottom-7 
      tab:bottom-14 
      laptop-sm:bottom-10 
      laptop-lg:bottom-10 
      desktop-xl:bottom-16"
      >
        <Link href="/pokedex">
          <Image
            src="/assets/pokeball.png"
            alt="pokeball"
            width={96}
            height={96}
            className="
              w-24 bottom-12 animate-bounce transition-all duration-200 
              laptop-sm:w-20 laptop-sm:hover:w-24 laptop-sm:bottom-6 
              laptop-lg:w-24 laptop-lg:hover:w-28 
              desktop-xl:w-28 desktop-xl:hover:w-32"
          />
        </Link>
        <h2 className="tab:hidden text-white mt-2 font-semibold text-lg hover:text-gray-200 hover:scale-110 hover:tracking-wider hover:cursor-default transition-all duration-200">
          Appuyer sur la Pokeball pour entrer
        </h2>
        <h2
          className="
        hidden 
        text-white mt-2 font-semibold text-lg hover:text-gray-200 hover:scale-110 hover:tracking-wider hover:cursor-default transition-all duration-200
        tab:inline 
        tab:text-lg 
        laptop-sm:mt-2 laptop-sm:text-lg 
        laptop-lg:text-xl desktop-xl:text-2xl  "
        >
          Cliquer sur la Pokeball pour entrer
        </h2>
      </div>
      <MemoizedCopyright />
    </div>
  );
}

export default App;
