// AdminRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminRoute = ({ children }) => {
  const [auth] = useAuth();
  const location = useLocation();

  if (auth?.user?.role === 1) {
    // Role 1 is assumed to be Admin
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
