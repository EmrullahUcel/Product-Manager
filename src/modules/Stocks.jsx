import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { NavLink } from "react-router-dom";

const Stocks = () => {
  const productList = useSelector((state) => state.sales.productList);

  const columns = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  return (
    <div className="stock-container">
      <div className="stock-navigate">
        <NavLink to="/product">Satış Ekranına Dön</NavLink>
      </div>
      <Table
        className=""
        key={uuidv4()}
        dataSource={productList}
        columns={columns}
      />
    </div>
  );
};

export default Stocks;
