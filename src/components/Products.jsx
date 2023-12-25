import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "/src/redux/SalesSlice";
import { Button, Card } from "antd";
import "/src/css/product.css";

const Products = () => {
  const productList = useSelector((state) => state.sales.productList);

  const [filteredProducts, setFilteredProducts] = useState(productList);
  const dispatch = useDispatch();

  const filterProductsByCategory = (category) => {
    const filtered = productList.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  };

  const showAllProducts = () => {
    setFilteredProducts(productList);
  };

  return (
    <div className="product-container">
      <div className="category-buttons">
        <Button danger ghost onClick={() => filterProductsByCategory("food")}>
          Food
        </Button>
        <Button danger ghost onClick={() => filterProductsByCategory("drink")}>
          Drink
        </Button>
        <Button danger ghost onClick={() => filterProductsByCategory("smoke")}>
          Smoke
        </Button>
        <Button danger ghost onClick={showAllProducts}>
          Show All
        </Button>
      </div>

      <div className="productWrapper">
        {filteredProducts.map((product) => (
          <Button
            onClick={() => dispatch(selectProduct(product))}
            key={product.name}
            hoverable
            className="product-wrapper-button"
            disabled={product.stock < 1}
          >
            {product.stock > 1 && (
              <img
                className="card-image"
                src={product.imageUrl}
                alt={product.name}
              />
            )}
            {product.stock < 1 && (
              <h3 className="no-stock-alert">Stokta Yok!</h3>
            )}
            <hr />
            <p className="product-name">{product.name}</p>
            <hr />
            <p>{product.price} ₺</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Products;
