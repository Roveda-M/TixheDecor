import {  Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Contact from "./Contact";
export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<><Home/><Footer/></>} />
        <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>

     
    </>
  );
}