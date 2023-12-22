import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Receipt = () => {
  const receipt = useSelector((state) => state.sales.receipt);

  return (
    <div>
      {receipt && (
        <div>
          <h3>Son satılan ürünler:</h3>
          <ul>
            {receipt.receipts.map((product, productIndex) => (
              <li key={productIndex}>
                {product.name} - {product.price}₺
              </li>
            ))}
          </ul>
          <p>Toplam Tutar: {receipt.total}₺</p>
        </div>
      )}
    </div>
  );
};

export default Receipt;
