import { Navigate } from "react-router-dom";
import { hasRole } from "./api";
import Home from "./Home";
import Footer from "./Footer";

export default function HomeRoute() {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");

    if (token && hasRole(role, "ROLE_ADMIN")) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <>
            <Home />
            <Footer />
        </>
    );
}



