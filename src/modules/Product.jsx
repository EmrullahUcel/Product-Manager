import Products from "/src/components/Products";
import Sales from "/src/components/Sales";
import Scanner from "/src/components/Scanner";
import Navbar from "/src/layouts/Navbar";
import "./product.css";

const Product = () => {
  return (
    <div className="mainDiv">
      <Navbar />
      <div className="Container">
        <Products />
        <Sales />
        <Scanner />
      </div>
    </div>
  );
};

export default Product;
