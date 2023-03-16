import { Link } from "react-router-dom";

function App() {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <div className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat bg-cover p-0 m-0 align-middle">
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="w-64 mx-auto pt-8 md:w-80 md:pt-11 xl:w-80 xl:pt-10 2xl:w-4/12 "
      />
      <div className="w-full flex flex-col justify-center items-center absolute bottom-7 md:bottom-14 xl:bottom-10 2xl:bottom-10">
        <Link to="/pokedex">
          <img
            src="assets/pokeball.png"
            alt="pokeball"
            className="w-24 bottom-12 animate-bounce xl:w-24 xl:bottom-6 2xl:w-28"
          />
        </Link>
        <Link to="/pokedex">
          <h2 className="text-white mt-2 hover:text-gray-200 md:text-lg xl:mt-2 xl:text-lg 2xl:text-2xl">
            Cliquer sur la Pokeball pour entrer
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default App;
