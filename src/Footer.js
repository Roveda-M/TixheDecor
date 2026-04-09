import { Link } from "react-router-dom";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaPhone, FaMapMarkerAlt, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Footer() {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <footer className="relative bg-[#f6f1e8] text-[#2b2b2b]">


      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[60px] md:h-[90px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C300,120 900,0 1200,60 L1200,0 L0,0 Z"
            fill="#ffffff"
            opacity="1"
          />
        </svg>
      </div>


      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left z-10 relative">

        {/* LEFT - LOGO */}
        <div className="flex flex-col items-center text-center pt-4 md:pt-8">
          <img
            src="./logo.png"
            alt="Tixhe Decor Logo"
            className="h-28 w-auto mb-3"
          />
          <h2 className="text-xl font-serif font-bold tracking-wide">
            TIXHE DECOR
          </h2>
          <p className="text-xs mt-1 font-serif text-[#2b2b2b]/80">
            Luxury Weddings & Bespoke Design
          </p>
        </div>

        <div className="flex flex-col items-center pt-6 md:pt-12">
          <h3 className="text-lg font-serif font-semibold mb-4 text-[#a67c52]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm font-medium">
           <li><Link to="/"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#a67c52]"> Home </Link></li>
           <li><Link to="/about"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#a67c52]"> About Us </Link></li>
          <li><Link to="/contact"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-[#a67c52]"> Contact Us </Link></li>
          </ul>

          {/* Events dropdown */}
          <div className="mt-8 w-full max-w-xs mx-auto">
            <h2
              onClick={() => setShowEvents(!showEvents)}
              className="text-lg font-serif font-semibold mb-4 cursor-pointer flex items-center justify-center gap-2 hover:text-[#a67c52] transition-colors"
            >
              Events {showEvents ? <FaChevronUp /> : <FaChevronDown />}
            </h2>

            <div
              className={`overflow-hidden transition-all duration-500 ${showEvents ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-center">
                <ul className="space-y-2">
                  <li><Link to="/wedding" className="hover:text-[#a67c52]">Wedding</Link></li>
                  <li><Link to="/birthday" className="hover:text-[#a67c52]">Birthday</Link></li>
                  <li><Link to="/baby-shower" className="hover:text-[#a67c52]">Baby Shower</Link></li>
                  <li><Link to="/circumcision" className="hover:text-[#a67c52]">Circumcision</Link></li>
                </ul>

                <ul className="space-y-2">
                  <li><Link to="/engagement" className="hover:text-[#a67c52]">Engagement</Link></li>
                  <li><Link to="/engagement-party" className="hover:text-[#a67c52]">Engagement Party</Link></li>
                  <li><Link to="/bride-to-be" className="hover:text-[#a67c52]">Bride to Be</Link></li>
                  <li><Link to="/car-decoration" className="hover:text-[#a67c52]">Car Decoration</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-center pt-6 md:pt-12">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="w-full text-center text-lg font-serif font-semibold mb-4 text-[#a67c52]">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm font-medium w-full max-w-[220px] flex flex-col mx-auto md:mx-0">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#a67c52] text-lg shrink-0" />
                <a href="mailto:info@tixhedecor.com" className="hover:text-[#a67c52] transition-colors">info@tixhedecor.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-600 text-lg shrink-0" />
                <a href="tel:+38344937501" className="hover:text-green-600 transition-colors">+383 44 937 501</a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-500 text-lg shrink-0" />
                <span className="text-left">Ferizaj, Kosovo</span>
              </li>
            </ul>

            <div className="flex gap-4 mt-4 justify-center md:justify-start w-full">
              <a href="https://facebook.com/TixheDecor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://instagram.com/tixhe__decor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.tiktok.com/@tixhedecor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-black hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300">
                <FaTiktok className="text-xl" />
              </a>
            </div>
        </div>

      </div>
    </div>


      <div className="border-t border-[#a67c52]/20 mt-4 relative z-10 max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-[#2b2b2b]/70 font-serif">
          © {new Date().getFullYear()} TIXHE DECOR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}