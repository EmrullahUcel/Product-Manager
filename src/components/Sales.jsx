import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProcut, selling } from "../redux/SalesSlice";
import { v4 as uuidv4 } from "uuid";
import Receipt from "./Receipt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Sales = () => {
  const selectedProducts = useSelector((state) => state.sales.seletedProducts);
  const whoLogin = useSelector((state) => state.sales.whoLogin);
  const dispatch = useDispatch();
  const notify = () => toast("Wow so easy!");
  const totalprice = selectedProducts.reduce(
    (total, product) => total + parseInt(product.price),
    0
  );
  return (
    <div className="salesWrapper">
      <ToastContainer />
      <div>Şuanki kullanıcı : {whoLogin} </div>
      <div className="sales">
        {selectedProducts &&
          selectedProducts.map((product) => {
            return (
              <div
                className="listWrapper"
                onClick={() => dispatch(deleteProcut(product))}
                key={uuidv4()}
              >
                <div className="listITem">
                  <span>{product.name}</span>
                  <span>{product.price}₺</span>
                </div>
              </div>
            );
          })}
        <button onClick={() => dispatch(selling(totalprice))}>Satış </button>
        <span>{totalprice}₺</span>
      </div>
      <Receipt />
    </div>
  );
};

export default Sales;
