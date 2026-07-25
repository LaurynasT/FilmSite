import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css"
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UnderConstructionModal from "./components/media/UnderConstruction";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <UnderConstructionModal />
    <App />
  </BrowserRouter>
  </React.StrictMode>
);
