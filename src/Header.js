
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Header() {

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleClick = () => {
  setOpen(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
};


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
         

         <div
  className={`absolute left-1/2 transform -translate-x-1/2 text-center transition-all duration-500 overflow-hidden ${
    isScrolled ? "opacity-0 max-h-0" : "opacity-100 max-h-24"
  }`}
>
  <h1
    className="text-lg sm:text-2xl tracking-[4px] sm:tracking-[6px] font-light whitespace-nowrap"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    TIXHE DECOR
  </h1>

  <p
    className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-[#5a5a5a] whitespace-nowrap"
    style={{ fontFamily: "Cormorant Garamond, serif" }}
  >
    Luxury Weddings & Bespoke Design
  </p>
</div>
            <Link to="/login" className="text-2xl ml-3 inline-block">👤</Link>
 
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
<Link to="/" onClick={handleClick}>
  <h2 className="text-2xl tracking-[6px] font-light hover:opacity-60 cursor-pointer"
    style={{ fontFamily: "Playfair Display, serif" }}>
    HOME
  </h2>
</Link>



{/* ABOUT */}
<Link to="/about"onClick={handleClick}>
  <h2
    className="text-2xl tracking-[6px] font-light hover:opacity-60 cursor-pointer"
    style={{ fontFamily: "Playfair Display, serif" }}
  >
    ABOUT US
  </h2>
</Link>

           {/* Contact Us */}
<Link to="/contact"onClick={handleClick}>
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
    <Link to="/wedding" onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">Wedding</span>
    </Link>

    <Link to="/birthday" onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">Birthday</span>
    </Link>

    <Link to="/circumcision"onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">
        Circumcision Ceremony
      </span>
    </Link>

    <Link to="/baby-shower" onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">Baby </span>
    </Link>

    <Link to="/engagement-party" onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">Engagement </span>
    </Link>

    <Link to="/bride-to-be" onClick={handleClick}>
      <span className="hover:opacity-60 cursor-pointer">Bride to Be</span>
    </Link>


  </div>
</div>
          </nav>
        </div>
      </div>
    
    </>
  );
}