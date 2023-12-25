import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import Navbar from "../layouts/Navbar";

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
  const dataSource = productList.map((item) => ({
    ...item,
    key: item.$id,
  }));

  return (
    <Navbar>
      <div className="stock-container">
        <Table dataSource={dataSource} columns={columns} size="middle" />
      </div>
    </Navbar>
  );
};

export default Stocks;
