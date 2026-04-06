import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f6f1e8]/70 backdrop-blur-md text-[#2b2b2b] transition-all duration-300">
        <div className={`flex items-start justify-between px-6 transition-all duration-300 ${isScrolled ? "py-4" : "py-4"}`}>

          {/* BURGER */}
          <button
            onClick={() => setOpen(true)}
            className="text-3xl font-light leading-[1]"
          >
            ☰
          </button>

          {/* LOGO */}
          <div className={`text-center flex-1 transition-all duration-500 overflow-hidden ${isScrolled ? "opacity-0 max-h-0" : "opacity-100 max-h-24"}`}>
            <h1
              className="text-2xl tracking-[6px] font-light"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              TIXHE DECOR
            </h1>

            <p
              className="text-xs tracking-[3px] text-[#5a5a5a]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Luxury Weddings & Bespoke Design
            </p>
          </div>

          <div className="w-8"></div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] md:w-[480px] bg-[#f6f1e8] text-[#2b2b2b] z-50 transform transition-transform duration-500 overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* CLOSE */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setOpen(false)}
            className="text-2xl font-light hover:opacity-60"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <div className="relative px-10">
          <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-[#c9c1b5]" />

          <nav className="flex flex-col gap-6 pl-6 pb-24">

           {/* HOME */}
<Link to="/"onClick={() => setOpen(false)}>
  <h2
    className="text-2xl tracking-[6px] font-light hover:opacity-60 cursor-pointer"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    HOME
  </h2>
</Link>


{/* ABOUT */}
<Link to="/about"onClick={() => setOpen(false)}>
  <h2
    className="text-2xl tracking-[6px] font-light hover:opacity-60 cursor-pointer"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    ABOUT US
  </h2>
</Link>

           {/* Contact Us */}
<Link to="/contact"onClick={() => setOpen(false)}>
  <h2
    className="text-2xl tracking-[6px] font-light hover:opacity-60 cursor-pointer"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    CONTACT US
  </h2>
</Link>

{/* EVENTS (JO LINK - vetem title) */}
<div className="flex flex-col gap-4">
  <h2
    className="text-2xl tracking-[6px] font-light"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    EVENTS
  </h2>

  {/* LINKS brenda EVENTS */}
  <div
    className="flex flex-col gap-4 text-base tracking-[2px]"
    style={{ fontFamily: "Cormorant Garamond, serif" }}
  >
    <Link to="/wedding" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Wedding</span>
    </Link>

    <Link to="/birthday" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Birthday</span>
    </Link>

    <Link to="/circumcision" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">
        Circumcision Ceremony
      </span>
    </Link>

    <Link to="/baby-shower" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Baby Shower</span>
    </Link>

    <Link to="/engagement-party" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Engagement Party</span>
    </Link>

    <Link to="/bride-to-be" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Bride to Be</span>
    </Link>

    <Link to="/engagement" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Engagement</span>
    </Link>

    <Link to="/car-decoration" onClick={() => setOpen(false)}>
      <span className="hover:opacity-60 cursor-pointer">Car Decoration</span>
    </Link>
  </div>
</div>

          </nav>
        </div>
      </div>
    </>
  );
}