import { lazy, Suspense } from "react";
import { Routes, Route, useLocation,Navigate } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";

const ForgotPassword = lazy(() => import("./ForgotPassword"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const HomeRoute = lazy(() => import("./HomeRoute"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Profile = lazy(() => import("./Profile"));
const Wedding = lazy(() => import("./Wedding"));
const Birthday = lazy(() => import("./Birthday"));
const BrideToBe = lazy(() => import("./BrideToBe"));
const Circumcision = lazy(() => import("./Circumcision"));
const BabyShower = lazy(() => import("./BabyShower"));
const Engagement = lazy(() => import("./Engagement"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

export default function App() {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeader && <Header />}

      <Suspense fallback={<div className="p-8 text-center text-gray-500">Duke ngarkuar...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<HomeRoute />} />
          <Route path="/about" element={<><About /><Footer /></>} />
          <Route path="/contact" element={<><Contact /><Footer /></>} />
          <Route path="/wedding" element={<><Wedding /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <><Profile /><Footer /></>
            </ProtectedRoute>
          } />
          <Route path="/birthday" element={<><Birthday /><Footer /></>} />
          <Route path="/bride-to-be" element={<><BrideToBe /><Footer /></>} />
          <Route path="/circumcision" element={<><Circumcision /><Footer /></>} />
          <Route path="/baby-shower" element={<><BabyShower /><Footer /></>} />
          <Route path="/engagement-party" element={<><Engagement /><Footer /></>} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </>
  );
}
