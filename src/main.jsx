import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter, Routes } from "react-router-dom";
import RoutesComp from "./routes/RoutesComp.jsx";
import Sign from "./pages/Sign.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutesComp />
    </BrowserRouter>
  </Provider>
);
