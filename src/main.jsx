import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./global.css";
import "./assets/fonts/boxicons.css";
import StoreApp from "./StoreApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreApp />
    </BrowserRouter>
  </React.StrictMode>
);
