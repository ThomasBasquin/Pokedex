import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Copyright from "../components/copyright";
import { iconPreload } from "../hooks/iconPreload";

function App() {
  const typeList = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  const setWindowHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setWindowHeight(); // Définir la hauteur initiale

    window.addEventListener("resize", setWindowHeight); // Mettre à jour la hauteur lors du redimensionnement

    iconPreload(typeList);

    // Supprimer l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("resize", setWindowHeight);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat bg-cover p-0 m-0 align-middle tracking-wide ">
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="
        w-64 mx-auto pt-16 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
      />

      <div
        className="
      w-full flex flex-col justify-center items-center absolute bottom-7 
      tab:bottom-14 
      laptop-sm:bottom-10 
      laptop-lg:bottom-10 
      desktop-xl:bottom-16"
      >
        <Link to="/pokedex">
          <img
            src="assets/pokeball.png"
            alt="pokeball"
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
      <Copyright />
    </div>
  );
}

export default App;
