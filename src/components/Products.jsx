import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "/src/redux/SalesSlice";
import { Button, Card } from "antd";
import '/src/css/product.css'

const Products = () => {
  const productList = useSelector(state => state.sales.productList)
 
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const dispatch = useDispatch();
  
  const filterProductsByCategory = (category) => {
    const filtered = productList.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const showAllProducts = () => {
    setFilteredProducts(productList);
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
            <img className="card-image" src={product.imageUrl} alt={product.name} />
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

