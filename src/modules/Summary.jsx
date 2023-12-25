import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Table } from "antd";
import Navbar from "../layouts/Navbar";

const Summary = () => {
  const totalReceipts = useSelector((state) => state.sales.totalReceipts);
  const columns = [
    {
      title: "Kullanıcı",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Toplam Tutar",
      dataIndex: "total",
      key: "total",
    },
  ];

  const adminReceipts = totalReceipts.filter(
    (receipt) => receipt.user === "admin"
  );
  const user1Receipts = totalReceipts.filter(
    (receipt) => receipt.user === "user1"
  );
  const user2Receipts = totalReceipts.filter(
    (receipt) => receipt.user === "user2"
  );

  const dataSource = [
    {
      key: "admin",
      user: "Admin",
      total: adminReceipts.reduce((total, receipt) => total + receipt.total, 0),
    },
    {
      key: "user1",
      user: "User 1",
      total: user1Receipts.reduce((total, receipt) => total + receipt.total, 0),
    },
    {
      key: "user2",
      user: "User 2",
      total: user2Receipts.reduce((total, receipt) => total + receipt.total, 0),
    },
  ];

  const totalSales = totalReceipts.reduce(
    (total, receipt) => total + receipt.total,
    0
  );

  return (
    <Navbar>
      <Table columns={columns} dataSource={dataSource} />
      <div>
        <h3>Toplam Satış Tutarı: {totalSales}</h3>
      </div>
    </Navbar>
  );
};

export default Summary;
