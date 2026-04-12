import { useState } from "react";
import Ftesa from "./Ftesa";

export default function Wedding() {
  const [view, setView] = useState("main");

  const photos = [
    {
      url: "/darsma1.jpeg",
      title: { full: "Momente të Paharrueshme", short: "Momente" }
    },
    {
      url: "/darsma1detaje.jpeg",
      title: { full: "Eleganca në Detaje", short: "Detaje" }
    },
    {
      url: "/darsma2.jpeg",
      title: { full: "Atmosferë Dasme Magjike", short: "Atmosferë" }
    },
    {
      url: "/darsma2detaje.jpeg",
      title: { full: "Detaje që Flasin Dashuri", short: "Dashuri" }
    },
    {
      url: "/darsma3.jpeg",
      title: { full: "Natë Plot Romancë", short: "Romancë" }
    },
    {
      url: "/darsma4tavolinaqiftit.jpeg",
      title: { full: "Tavolina e Çiftit – Moment Special", short: "Çifti" }
    },
    {
      url: "/darsma4detaje.jpeg",
      title: { full: "Dekor Luksoz & Elegant", short: "Luksoz" }
    },
    {
      url: "/darsma4detaje1.jpeg",
      title: { full: "Stil & Perfeksion në Çdo Cep", short: "Stil" }
    },
    {
      url: "/darsma4detaje2.jpeg",
      title: { full: "Magjia e Detajeve të Vogla", short: "Magji" }
    },
    {
      url: "/darsma4mireseerdhe.jpeg",
      title: { full: "Mirëseardhje Plot Ngrohtësi", short: "Mirëseardhje" }
    },
    {
      url: "/darsma4tavolina.jpeg",
      title: { full: "Ambient Dasme i Krijuar me Kujdes", short: "Ambient" }
    },
    {
      url: "/darsma5tavolinaqiftit.jpeg",
      title: { full: "Dashuri e Reflektuar në Dekor", short: "Dashuri" }
    },
    {
      url: "/darsma4pjata.jpeg",
      title: { full: "Elegancë në çdo detaj të tryezës", short: "Elegancë" }
    },
    {
      url: "/darsma4tavolina2.jpeg",
      title: { full: "Prekje romantike në çdo kënd", short: "Romancë" }
    },
    {
      url: "/a1.png",
      title: { full: "Udhëtimi i dashurisë fillon këtu", short: "Fillimi" }
    },
    {
      url: "/a2.png",
      title: { full: "Stili që bie në sy që nga larg", short: "Stil" }
    }
  ];

  /* ================== FTFESA VIEW ================== */
  if (view === "ftesa") {
    return (
      <div>
        <Ftesa />

        {/* BACK BUTTON */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setView("main")}
            className="px-6 py-3 rounded-xl font-serif tracking-wide shadow-md 
            bg-[#6f4e37] text-white hover:bg-[#8b5e3c]"
          >
           Kthehu një hap para
          </button>
        </div>
        <br/>
        <br/>
        
      </div>
    );
  }

  /* ================== MAIN VIEW ================== */
  return (
    <section className="bg-[#fdfaf6] py-16 px-8">

      {/* VIDEO */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[90vh] overflow-hidden -mt-20">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/v2.mp4" type="video/mp4" />
        </video>
      </section>

      {/* TEXT */}
      <div className="max-w-4xl mx-auto text-center mt-12 px-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#7a5a3a] mb-5 leading-tight">
          Dashuria juaj meriton një dasmë perfekte
        </h2>

        <p className="text-base md:text-lg text-[#8b6a4a] leading-relaxed">
          Te <span className="font-semibold text-[#7a5a3a]">Tixhe Dekor</span> krijojmë dekorime elegante dhe unike.
        </p>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={photo.url}
              alt={photo.title.full}
              className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <span className="text-white text-lg font-serif">
                <span className="block md:hidden">
                  {photo.title.short}
                </span>
                <span className="hidden md:block">
                  {photo.title.full}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            setView("ftesa");
            window.scrollTo(0, 0);
          }}
          className="px-6 py-3 rounded-xl font-serif tracking-wide shadow-md 
          bg-[#a67c52] text-white hover:bg-[#8b5e3c]"
        >
         Krijo ftese përfekte
        </button>
      </div>

    </section>
  );
}