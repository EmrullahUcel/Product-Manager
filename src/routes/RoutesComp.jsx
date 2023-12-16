// RoutesComp.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sign from "../pages/Sign";
import PublicRoute from "./PublicRoute";
import PriviteRoute from "./PriviteRoute";
import App from "../App";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<Sign />} />
      </Route>
      <Route path="/product" element={<PriviteRoute/>} >
        <Route path="/product" element={<App/>} />
      </Route>
    </Routes>
  );
};

export default RoutesComp;
