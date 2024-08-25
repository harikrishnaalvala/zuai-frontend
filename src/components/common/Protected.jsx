import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Protected = () => {
  const isAuthenticated = useAuth();

  console.log(isAuthenticated, "isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
