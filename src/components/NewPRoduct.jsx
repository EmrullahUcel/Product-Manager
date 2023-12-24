import React, { useEffect, useState } from "react";
import { databases } from "../db/appwrite";
import { ID } from "appwrite";
import { Form, Input, Button, message, Space } from "antd";
import "/src/css/newproduct.css";
import Navbar from "../layouts/Navbar";

const NewProduct = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  const SubmitButton = ({ form }) => {
    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          }
        );
    }, [values]);
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Submit
      </Button>
    );
  };
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: null,
    category: "",
    stock: null,
    barcode: "",
    imageUrl: "",
  });

  const addProduct = async () => {
    try {
      const { name, price, category, stock, barcode, imageUrl } = newProduct;

      await databases.createDocument(
        "658166408e44e25319c9",
        "6581664ba658775f0067",
        ID.unique(),
        {
          name,
          price,
          category,
          stock,
          barcode,
          imageUrl,
        }
      );

      form.resetFields();

      message.success("Ürün başarıyla eklendi");
    } catch (error) {
      message.error("Ürün eklenirken bir hata oluştu:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <Navbar>
      <div className="newProduct">
        <Form
          size="small"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={addProduct}
          form={form}
          requiredMark={true}
          layout="horizontal"
        >
          <Form.Item
            label="Ürün İsmi"
            name="name"
            rules={[{ required: true, message: "Ürün ismi boş olamaz" }]}
          >
            <Input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Ürün Fiyatı"
            name="price"
            rules={[{ required: true, message: "Ürün fiyatı boş olamaz" }]}
          >
            <Input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Kategori"
            name="category"
            rules={[{ required: true, message: "Ürün kategorisi boş olamaz" }]}
          >
            <Input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true, message: "Ürün stoğu boş olamaz" }]}
          >
            <Input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Barkod"
            name="barcode"
            rules={[{ required: true, message: "Ürün barkodu boş olamaz" }]}
          >
            <Input
              type="text"
              name="barcode"
              value={newProduct.barcode}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Resim Url"
            name="imageUrl"
            rules={[{ required: true, message: "Ürün resmi boş olamaz" }]}
          >
            <Input
              type="text"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <SubmitButton form={form} />
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Navbar>
  );
};

export default NewProduct;
