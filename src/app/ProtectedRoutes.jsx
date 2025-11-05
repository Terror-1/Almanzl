import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ adminOnly = false, userOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
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
