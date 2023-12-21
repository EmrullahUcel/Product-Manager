import React from "react";
import "./Navbar.css";
import { account } from "/src/db/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { setUser } from "/src/redux/auth";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const handleLogout = async () => {
    await account.deleteSession("current");
    dispatch(setUser(null));
  };
  const whoLogin = useSelector((state) => state.auth.whoLogin);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div>Şuanki kullanıcı : {whoLogin} </div>
      <Button danger onClick={handleLogout}>
        Çıkış yap
      </Button>
      <NavLink to="/receipts">Son Fişler</NavLink>
    </div>
  );
};

export default Navbar;
