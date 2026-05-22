import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
    const accessToken = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
}