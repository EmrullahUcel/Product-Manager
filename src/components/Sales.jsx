import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrease, deleteProduct, increase, selling } from "../redux/SalesSlice";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card } from "antd";
import { account } from "../db/appwrite";
import "../modules/pages.css";
import { setUser } from "../redux/auth";

const Sales = () => {
  const selectedProducts = useSelector((state) => state.sales.selectedProducts);
  const whoLogin = useSelector((state) => state.sales.whoLogin);
  const user = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    await account.deleteSession("current");
    dispatch(setUser(null));
  };

  const dispatch = useDispatch();
  const notify = () => toast(`Hoşgeldin ${whoLogin}`);
  const totalprice = selectedProducts.reduce(
    (total, product) => total + parseInt(product.price) * product.quantity,
    0
  );
  useEffect(() => {
    if (user) {
      notify();
    }
  }, []);

  return (
    <div className="salesWrapper">
      
      
      <div className="user-logout-container">
        <div>Şuanki kullanıcı : {whoLogin} </div>
        <Button danger onClick={handleLogout}>
          Çıkış yap
        </Button>
      </div>
      <div className="sales">
      <span>{totalprice}₺</span>
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
                    <Button onClick={() => dispatch(decrease(product))} type="primary" shape="circle" danger>
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
     
      <Button className="saleButton" disabled={selectedProducts.length < 1} type="primary" danger onClick={() => dispatch(selling(totalprice))}>
          Satış{" "}
        </Button>
        <ToastContainer />
    </div>
  );
};

export default Sales;
