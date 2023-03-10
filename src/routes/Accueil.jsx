import { Link } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-pokemon-bg bg-center bg-no-repeat p-0 m-0 align-middle">
      <img
        src="assets/Pokedex.png"
        alt="Pokedex"
        className="w-9/12 mx-auto pt-28 md:w-64 md:pt-11 lg:w-[33rem] lg:pt-20 xl:w-[36rem] xl:pt-13 2xl:w-[39] "
      />
      <div className="w-full flex flex-col justify-center items-center absolute bottom-10 ">
        <Link to="/pokedex">
          <img
            src="assets/pokeball.png"
            alt="pokeball"
            className="w-24 bottom-12 animate-bounce"
          />
        </Link>
        <Link to="/pokedex">
          <h2 className="text-white mt-2 hover:text-gray-200">
            Cliquer sur la Pokeball pour entrer
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default App;
