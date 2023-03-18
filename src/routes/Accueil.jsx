import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Copyright from "../components/copyright";

function App() {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    // Baisse du volume de la page à 50%
    document.body.volume = 0.1;
  }, []);

  function handleAudio() {
    setPlayAudio(true);
  }

  return (
    <div
      className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat bg-cover p-0 m-0 align-middle tracking-wide"
      onClick={handleAudio}
    >
      {playAudio && (
        <audio src="assets/pokemon-theme.mp3" autoPlay loop></audio>
      )}
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="
        w-64 mx-auto pt-10 
        tab:w-80 tab:pt-11 
        laptop-sm:w-80 laptop-sm:pt-10 
        laptop-lg:w-3/12 "
      />
      <div
        className="
      w-11/12 mx-auto h-60 bg-white bg-opacity-40 rounded-lg mt-4 p-4
      "
      >
        <h2
          className="
        text-center text-xl font-semibold text-gray-800 mb-3
        "
        >
          Le saviez-vous ?
        </h2>
        <p
          className="
         text-gray-800 text-base text-justify tracking-normal
          "
        >
          Le Pokémon le plus puissant est Mewtwo, un Pokémon de type Psy. Il est
          capable de battre n'importe quel Pokémon. Il est aussi capable de
          battre Mew, le Pokémon le plus rare de tous les temps.
        </p>
      </div>
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
            className="w-24 bottom-12 animate-bounce transition-all duration-200
            laptop-sm:w-20 laptop-sm:hover:w-24 laptop-sm:bottom-6 
            laptop-lg:w-24 laptop-lg:hover:w-28 
            desktop-xl:w-28 desktop-xl:hover:w-32"
          />
        </Link>
        <h2
          className="
        text-white mt-2 font-semibold text-lg hover:text-gray-200 hover:scale-110 hover:tracking-wider transition-all duration-200 
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
