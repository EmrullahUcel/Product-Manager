import Products from "/src/components/Products";
import Sales from "/src/components/Sales";
import Scanner from "/src/components/Scanner";
import Navbar from "/src/layouts/Navbar";
import "../css/product.css";

const Product = () => {
  return (
    <Navbar>
      <div className="Container">
        <Products />
        <Sales />
        <Scanner />
      </div>
    </Navbar>
  );
};

export default Product;
