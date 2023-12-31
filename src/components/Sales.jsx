import { useSelector, useDispatch } from "react-redux";
import {
  decrease,
  deleteProduct,
  increase,
  selling,
} from "../redux/SalesSlice";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, message } from "antd";
import "/src/css/sales.css";
import { databases } from "../db/appwrite";
import { ID } from "appwrite";

const Sales = () => {
  const selectedProducts = useSelector((state) => state.sales.selectedProducts);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const totalprice = selectedProducts.reduce(
    (total, product) => total + parseInt(product.price) * product.quantity,
    0
  );
  const handleSale = async () => {
    try {
      let canSell = true;
      let remainingStockMessage = "";

      for (const product of selectedProducts) {
        const newStock = product.stock - product.quantity;
        if (newStock < 0) {
          canSell = false;
          remainingStockMessage = `${product.name} için maksimum satış miktarı: ${product.stock}`;
          break;
        }
      }

      if (canSell) {
        for (const product of selectedProducts) {
          const newStock = product.stock - product.quantity;

          await databases.updateDocument(
            "658166408e44e25319c9",
            "6581664ba658775f0067",
            product.$id,
            {
              stock: newStock,
            }
          );
        }

        await Promise.all(
          selectedProducts.map(async (product) => {
            return databases.createDocument(
              "658166408e44e25319c9",
              "658f29d133d275238bc9",
              ID.unique(),
              {
                user: user.name,
                total: totalprice,
                products: selectedProducts.map((item) => item.name),
              }
            );
          })
        );

        dispatch(selling({ total: totalprice, user: user.name }));
        message.success("Stoklar güncellendi ve satış işlemi tamamlandı.");
      } else {
        message.warning(
          `Stok yetersiz, ${remainingStockMessage} kadar satış yapabilirsiniz.`
        );
      }
    } catch (error) {
      message.error("Stok güncelleme veya satış işlemi hatası:", error);
    }
  };
  

  return (
    <div className="salesWrapper">
      <div className="totalPrice">Toplam :{totalprice}₺</div>
      <div className="sales">
        {selectedProducts &&
          selectedProducts.map((product) => {
            return (
              <Card
                title={product.name}
                bordered={false}
                className="listWrapper"
                key={uuidv4()}
              >
                <div className="list-container">
                  <div className="listITem">
                    <Button
                      onClick={() => dispatch(increase(product))}
                      type="primary"
                      shape="circle"
                    >
                      +
                    </Button>
                    <div>{product.quantity} adet</div>
                    <Button
                      onClick={() => dispatch(decrease(product))}
                      type="primary"
                      shape="circle"
                      danger
                    >
                      -
                    </Button>
                  </div>
                  <Button
                    onClick={() => dispatch(deleteProduct(product))}
                    type="primary"
                    danger
                  >
                    Ürünü temizle
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>

      <Button
        className="saleButton"
        disabled={selectedProducts.length < 1}
        type="primary"
        danger
        onClick={handleSale}
      >
        Satış{" "}
      </Button>
    </div>
  );
};

export default Sales;
