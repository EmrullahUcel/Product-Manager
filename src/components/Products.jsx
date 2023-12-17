import React from "react";
import { productsList } from "./productsList";
import { useDispatch } from "react-redux";
import { selectProduct } from "../redux/SalesSlice";
import { Card } from "antd";
const {Meta} = Card
const Products = () => {
  const dispatch = useDispatch();
  return (
    <>
      {productsList.map((product) => {
        return (
          <Card
            onClick={() => dispatch(selectProduct(product))}
            key={product.name}
            className="productCart"
            hoverable            
          >
            <img className="card-image" src={product.image} />
            <hr/>
            <p>{product.name} </p>
            <hr />
            <p>{product.price} ₺</p>
          </Card>
        );
      })}
    </>
  );
};

export default Products;
