import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";

import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Wedding from "./Wedding";
import Birthday from "./Birthday";
import BrideToBe from "./BrideToBe";
import Circumcision from "./Circumcision";
import BabyShower from "./BabyShower";
import Engagement from "./Engagement";
import Dashboard from "./Dashboard/Dashboard";

export default function App() {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/wedding" element={<><Wedding /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<><Profile /><Footer /></>} />
        <Route path="/birthday" element={<><Birthday /><Footer /></>} />
        <Route path="/bride-to-be" element={<><BrideToBe /><Footer /></>} />
        <Route path="/circumcision" element={<><Circumcision /><Footer /></>} />
        <Route path="/baby-shower" element={<><BabyShower /><Footer /></>} />
        <Route path="/engagement-party" element={<><Engagement /><Footer /></>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}