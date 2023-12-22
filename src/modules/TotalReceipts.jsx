import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import '../modules/product.css'
import { v4 as uuidv4 } from "uuid";

const TotalReceipts = () => {
  const totalReceipts = useSelector((state) => state.sales.totalReceipts);

  return (
    <div className="receit-container">
      {totalReceipts.map((receipt) => (
        <Card hoverable className="productCart receipt-cart" key={uuidv4()}>
          {receipt.products.map((product) => (
            <div key={uuidv4()}>
              <p>{product.$createdAt} </p>
              <p>{product.name}</p>
            </div>
          ))}
          <p>Total: {receipt.total} ₺</p>
         <p>Kasiyer : {receipt.user} </p>
        </Card>
      ))}
    </div>
  );
};

export default TotalReceipts;
