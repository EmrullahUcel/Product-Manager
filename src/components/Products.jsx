import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "/src/redux/SalesSlice";
import { Button } from "antd";
import "/src/css/product.css";
import { setLoading } from "../redux/SalesSlice";

const Products = () => {
  const productList = useSelector((state) => state.sales.productList);
  const loading = useSelector((state) => state.sales.loading);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(productList);

  useEffect(() => {
    setFilteredProducts(productList);
    if (filteredProducts) {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    }
  }, [productList]);

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
        {loading ? (
          <div>Ürünler Yükleniyor...</div>
        ) : (
          filteredProducts.map((product) => (
            <Button
              onClick={() => dispatch(selectProduct(product))}
              key={product.name}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
