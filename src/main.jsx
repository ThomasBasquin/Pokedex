import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/Accueil";
import Pokedex from "./routes/Pokedex";
import "./tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found</div>,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
    errorElement: <div>Page not found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-nunito">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
