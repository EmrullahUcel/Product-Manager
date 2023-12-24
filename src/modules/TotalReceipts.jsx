import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "/src/css/totalReceipts.css";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../layouts/Navbar";

const TotalReceipts = () => {
  const totalReceipts = useSelector((state) => state.sales.totalReceipts);
  return (
    <Navbar>
      <div className="receit-container">
        {totalReceipts.map((receipt) => (
          <Card hoverable className="productCart receipt-cart" key={uuidv4()}>
            {receipt.products.map((product) => (
              <div key={uuidv4()}>
                <p>{product.name}</p>
              </div>
            ))}
            <p>Total: {receipt.total} ₺</p>
            <p>Kasiyer : {receipt.user} </p>
          </Card>
        ))}
      </div>
    </Navbar>
  );
};

export default TotalReceipts;
