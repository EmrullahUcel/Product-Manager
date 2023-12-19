import React from "react";
import './Navbar.css'
import { account } from "../db/appwrite";
import { useDispatch ,useSelector} from "react-redux";
import { Button } from "antd";
const Navbar = () => {
  const handleLogout = async () => {
    await account.deleteSession("current");
    dispatch(setUser(null));
  };
  const whoLogin = useSelector((state) => state.auth.whoLogin);
  const dispatch = useDispatch();
  return <div className="navbar">
     <div>Şuanki kullanıcı : {whoLogin} </div>
        <Button danger onClick={handleLogout}>
          Çıkış yap
        </Button>
  </div>;
};

export default Navbar;
