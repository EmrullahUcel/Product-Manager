import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sign from "./modules/Sign";
import PublicRoute from "./routes/PublicRoute";
import PriviteRoute from "./routes/PriviteRoute";
import Product from "./modules/Product";
import { setUser } from "./redux/auth";
import { account } from "./db/appwrite";
import { useDispatch, useSelector } from "react-redux";
import TotalReceipts from "./modules/TotalReceipts";
import { databases } from "./db/appwrite";
import { getData, setCheckSell } from "./redux/SalesSlice";
import Stocks from "./modules/Stocks";
import Summary from "./modules/Summary";
import NewPRoduct from "./components/NewPRoduct";
import { Query } from "appwrite";

const App = () => {
  const receipt = useSelector((state) => state.sales.receipt);
  const totalReceipts = useSelector((state) => state.sales.totalReceipts);

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
  const fetchData = async () => {
    const getProduct = await databases.listDocuments(
      "658166408e44e25319c9",
      "6581664ba658775f0067"
    );
    dispatch(getData(getProduct.documents));
  };
  const checkSell = async () => {
    let offset = 0;
    const limit = 25;

    let allDocuments = [];

    try {
      while (true) {
        const getProduct = await databases.listDocuments(
          "658166408e44e25319c9",
          "658f29d133d275238bc9",
          [Query.limit(limit), Query.offset(offset)]
        );

        const documents = getProduct.documents;

        if (documents.length === 0) {
          break;
        }

        allDocuments = allDocuments.concat(documents);

        offset += limit;
      }
      dispatch(setCheckSell(allDocuments));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  useEffect(() => {
    fetchData();
  }, [receipt]);
  useEffect(() => {
    checkSell();
  }, [totalReceipts]);

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
      <Route path="/stocks" element={<PriviteRoute />}>
        <Route path="/stocks" element={<Stocks />} />
      </Route>
      <Route path="/summary" element={<PriviteRoute />}>
        <Route path="/summary" element={<Summary />} />
      </Route>
      <Route path="/addproduct" element={<PriviteRoute />}>
        <Route path="/addproduct" element={<NewPRoduct />} />
      </Route>
    </Routes>
  );
};

export default App;
