import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = () => {
  const login = useSelector((state) => state.sales.login);
  return login ? <Navigate to="/product" /> : <Navigate to="/" />;
};

export default PublicRoute;
