import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "/src/redux/SalesSlice";
import { Button, Card } from "antd";
import { productsList } from "./productsList"; 
import '../modules/product.css'

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsList);
  const dispatch = useDispatch();

  const filterProductsByCategory = (category) => {
    const filtered = productsList.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const showAllProducts = () => {
    setFilteredProducts(productsList);
  };

  return (
    <div className="product-container">
      <div className="category-buttons">
        <Button danger ghost onClick={() => filterProductsByCategory("food")}>Food</Button>
        <Button danger ghost  onClick={() => filterProductsByCategory("drink")}>Drink</Button>
        <Button danger ghost  onClick={() => filterProductsByCategory("smoke")}>Smoke</Button>
        <Button danger ghost  onClick={showAllProducts}>Show All</Button>
      </div>

      <div className="productWrapper">
        {filteredProducts.map((product) => (
          <Card
            onClick={() => dispatch(selectProduct(product))}
            key={product.name}
            className="productCart"
            hoverable
          >
            <img className="card-image" src={product.image} alt={product.name} />
            <hr />
            <p>{product.name}</p>
            <hr />
            <p>{product.price} ₺</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;

