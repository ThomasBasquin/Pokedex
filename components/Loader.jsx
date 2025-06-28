import React from "react";

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <img
        src="/assets/loading.gif"
        alt="loading"
        width={250}
        height={250}
        className=""
      />
    </div>
  );
}

export default Loader;
