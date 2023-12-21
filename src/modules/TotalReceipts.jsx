import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import '../modules/product.css'

const TotalReceipts = () => {
  const totalReceipts = useSelector((state) => state.sales.totalReceipts);

  return (
    <div className="receit-container">
      {totalReceipts?.map((receipt) => (
        <Card hoverable className="productCart receipt-cart" key={receipt.id}>
          {receipt.products.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
            </div>
          ))}
          <p>Total: {receipt.total} ₺</p>
         
        </Card>
      ))}
    </div>
  );
};

export default TotalReceipts;
