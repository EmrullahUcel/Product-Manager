import React from "react";
import { productsList } from "./productsList";
import { useDispatch } from "react-redux";
import { selectProduct } from "../redux/SalesSlice";

const Products = () => {
  const dispatch = useDispatch();
  return (
    <>
      {productsList.map((product) => {
        return (
          <div
            onClick={() => dispatch(selectProduct(product))}
            key={product.name}
            className="productCart"
          >
            {product.name}
          </div>
        );
      })}
    </>
  );
};

export default Products;
