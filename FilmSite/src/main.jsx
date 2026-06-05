import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/Routes/Routes.jsx";
import UnderConstructionModal from "./components/assets/UnderConstruction";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UnderConstructionModal />
    <App />
  </BrowserRouter>,
);
