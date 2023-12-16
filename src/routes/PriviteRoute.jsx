import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const login = useSelector((state) => state.sales.login);
  return login ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
