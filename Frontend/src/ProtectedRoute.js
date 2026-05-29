import { Navigate } from "react-router-dom";
import { hasRole } from "./api";

export default function ProtectedRoute({ children, requiredRole }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const role = sessionStorage.getItem("role");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  if (requiredRole && !requiredRoles.some((item) => hasRole(role, item))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
