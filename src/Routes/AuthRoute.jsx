// AuthorRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const AuthorRoute = ({ children }) => {
  const [auth] = useAuth();
  const location = useLocation();

  // if (auth?.user?.role === 2 || auth?.user?.role === 1) {
  // Role 2 is Author, and Role 1 is Admin
  return children;
  // }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthorRoute;
