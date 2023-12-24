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
  import { databases } from "./db/appwrite";
  import { getData, setCheckSell } from "./redux/SalesSlice";
import Stocks from "./modules/Stocks";
import Summary from "./modules/Summary";
import NewPRoduct from "./components/NewPRoduct";

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
    const fetchData = () =>{
      const getProduct = databases.listDocuments("658166408e44e25319c9" , "6581664ba658775f0067")
      getProduct.then(
        function(response){
        dispatch(getData(response.documents)); 
        },
        function(error){
          console.log(error);
        }
      )
    }
    const checkSell = () =>{
      const getProduct = databases.listDocuments("658166408e44e25319c9" , "6585d95136c31a10eba1")
      getProduct.then(
        function(response){

        dispatch(setCheckSell(response.documents)); 
        },
        function(error){
          console.log(error);
        }
      )
    }
    useEffect(() => {
      checkLogin();
      fetchData();
      checkSell();

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
