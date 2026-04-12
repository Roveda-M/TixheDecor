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
export default function App() {
  const location = useLocation();

  // këtu zgjedhim ku mos me u shfaq Header
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/wedding" element={<><Wedding /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<><Profile /><Footer /></>} />
      </Routes>
    </>
  );
}