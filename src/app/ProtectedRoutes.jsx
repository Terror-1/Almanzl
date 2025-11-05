import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../pages/authentication/context/AuthContext";

const ProtectedRoutes = ({ adminOnly = false, userOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.log("asas");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (userOnly && user.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
