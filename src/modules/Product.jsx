import Products from "../components/Products";
import Sales from "../components/Sales";
import Scanner from "../components/Scanner";
import Navbar from "../layouts/Navbar";
import "./product.css";

const Product = () => {
  return (
    <div className="mainDiv">
      <Navbar />
      <div className="Container">
        <div className="productWrapper">
          <Products />
        </div>
        <Sales />
        <Scanner />
      </div>
    </div>
  );
};

export default Product;
