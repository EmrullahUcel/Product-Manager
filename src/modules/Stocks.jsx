import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

const Stocks = () => {
  const productList = useSelector(state => state.sales.productList);

  const columns = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  return (
    <Table dataSource={productList} columns={columns} />
  );
};

export default Stocks;
