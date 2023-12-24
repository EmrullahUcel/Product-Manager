import React, { useEffect, useState } from "react";
import { Menu, Button, Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "/src/redux/auth";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { DownOutlined } from "@ant-design/icons";
import { account } from "../db/appwrite";

const Navbar = ({ children }) => {
  const handleLogout = async () => {
    await account.deleteSession("current");
    dispatch(setUser(null));
  };

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    {
      label: (
        <NavLink to="/product">
          <>Satış İşlemleri</>
        </NavLink>
      ),
      key: 0,
    },
    {
      label: (
        <NavLink to="/receipts">
          <>Son Fişler</>
        </NavLink>
      ),
      key: 1,
    },
    {
      label: (
        <NavLink to="/stocks">
          <>Stok durumu</>
        </NavLink>
      ),
      key: 2,
    },
    {
      label: (
        <NavLink to="/summary">
          <>Kasa Özeti</>
        </NavLink>
      ),
      key: 3,
    },
    {
      label: (
        <NavLink to="/addproduct">
          <>Yeni ürün ekleme</>
        </NavLink>
      ),
      key: 4,
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-links">
            {!showDropdown && (
              <>
                <NavLink to="/product">
                  <Button>Satış İşlemleri</Button>
                </NavLink>
                <NavLink to="/receipts">
                  <Button>Son Fişler</Button>
                </NavLink>
                <NavLink to="/stocks">
                  <Button>Stok durumu</Button>
                </NavLink>
                <NavLink to="/summary">
                  <Button>Kasa Özeti</Button>
                </NavLink>
                <NavLink to="/addproduct">
                  <Button>Yeni Ürün ekleme</Button>
                </NavLink>
              </>
            )}
            {showDropdown && (
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                className="dropdown-menu"
              >
                <Space>
                  <Button onClick={(e) => e.preventDefault()}>
                    Menü <DownOutlined />
                  </Button>
                </Space>
              </Dropdown>
            )}
          </div>
          <div className="user-info">
            <h3>Şuanki kullanıcı: {user.name}</h3>
            <Button danger onClick={handleLogout}>
              Çıkış yap
            </Button>
          </div>
        </div>
        <div className="children">{children}</div>
      </nav>
    </>
  );
};

export default Navbar;
