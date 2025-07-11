import Link from "next/link";
import React, { useEffect, useState } from "react";

function App() {
  const [windowHeight, setWindowHeight] = useState(null);

  // Set vh variable for mobile devices
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
    return () => {};
  }, []);

  // Preload types images in http cache
  useEffect(() => {
    const images = [
      "/assets/bug.png",
      "/assets/dark.png",
      "/assets/dragon.png",
      "/assets/electric.png",
      "/assets/fairy.png",
      "/assets/fighting.png",
      "/assets/fire.png",
      "/assets/flying.png",
      "/assets/ghost.png",
      "/assets/grass.png",
      "/assets/ground.png",
      "/assets/ice.png",
      "/assets/normal.png",
      "/assets/poison.png",
      "/assets/psychic.png",
      "/assets/rock.png",
      "/assets/steel.png",
      "/assets/water.png",
    ];

    images.forEach((image) => {
      const link = document.createElement("link");
      link.href = image;
      link.rel = "prefetch";
      link.as = "image";
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div
      className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat bg-cover p-0 m-0 align-middle tracking-wide "
      style={windowHeight !== null ? { "--vh": `${windowHeight}px` } : {}}
    >
      <img
        src="/assets/Pokedex_bis.png"
        alt="Pokedex"
        width={192}
        height={72}
        className="
        w-72 mx-auto pt-16 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
      />

      <div
        className="
      w-full flex flex-col justify-center items-center absolute bottom-7 
      tab:bottom-14 
      laptop-sm:bottom-10 
      laptop-lg:bottom-12 
      desktop-xl:bottom-16"
      >
        <Link href="/pokedex">
          <img
            src="/assets/pokeball.png"
            alt="pokeball"
            width={96}
            height={96}
            className="
              w-24 bottom-12 animate-bounce transition-all duration-200 
              laptop-sm:w-16 laptop-sm:bottom-6 
              laptop-lg:w-28 
              desktop-xl:w-28 "
          />
        </Link>
        <h2 className="tab:hidden text-white mt-2 font-semibold text-sm hover:text-gray-200 hover:scale-110 hover:tracking-wider hover:cursor-default transition-all duration-200">
          Appuyer sur la Pokeball pour entrer
        </h2>
        <h2
          className="
        hidden 
        text-white mt-2 font-semibold text-lg hover:tracking-wider hover:cursor-default transition-all duration-200
        tab:inline 
        tab:text-lg 
        laptop-sm:mt-2 laptop-sm:text-lg 
        laptop-lg:text-2xl 
        desktop-xl:text-2xl  "
        >
          Cliquer sur la Pokeball pour entrer
        </h2>
      </div>
    </div>
  );
}

export default App;
