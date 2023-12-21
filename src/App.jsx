// RoutesComp.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sign from "./modules/Sign";
import PublicRoute from "./routes/PublicRoute";
import PriviteRoute from "./routes/PriviteRoute";
import Product from "./modules/Product";
import { setUser } from "./redux/auth";
import { account } from "./db/appwrite";
import { useDispatch } from "react-redux";
import TotalReceipts from "./modules/TotalReceipts";

const App = () => {
  const dispatch = useDispatch();
  const checkLogin = async () => {
    try {
      const data = await account.get();
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<Sign />} />
      </Route>
      <Route path="/product" element={<PriviteRoute />}>
        <Route path="/product" element={<Product />} />
      </Route>
      <Route path="/receipts" element={<PriviteRoute />}>
        <Route path="/receipts" element={<TotalReceipts />} />
      </Route>
    </Routes>
  );
};

export default App;
