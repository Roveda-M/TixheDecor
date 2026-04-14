import { useState } from "react";
import Ftesa from "./Ftesa";

export default function Wedding() {
  const [view, setView] = useState("main");
  const [selectedDecors, setSelectedDecors] = useState([]);

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
        <br />
        <br />

      </div>
    );
  }

  /* ================== MAIN VIEW ================== */
  return (
    <section className="bg-[#fdfaf6] py-16 px-8">

      {/* VIDEO */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[100vh] overflow-hidden -mt-20">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/v1.1.mp4" type="video/mp4" />
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
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 mb-16 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {photos.map((photo, index) => {
            const isSelected = selectedDecors.includes(index);
            return (
              <div
                key={index}
                className="group relative"
              >
                <div
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDecors(selectedDecors.filter(id => id !== index));
                    } else {
                      setSelectedDecors([...selectedDecors, index]);
                    }
                  }}
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-8 transition-all duration-700 cursor-pointer ${isSelected ? 'shadow-2xl scale-[1.02]' : 'shadow-lg group-hover:shadow-xl'}`}
                  style={{ borderColor: '#8c734b', borderWidth: isSelected ? '3px' : '0px' }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title.full}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4 z-10">
                    <button
                      className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isSelected ? 'bg-red-500 text-white hover:bg-red-600 scale-110' : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className={`absolute bottom-0 left-0 w-full bg-black/70 text-white py-3 text-center transition-all duration-500 z-20 ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                  </div>

                  <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                    <div className="text-center px-2 md:px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-xl md:text-3xl text-white mb-2 md:mb-3 drop-shadow-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="block md:hidden">{photo.title.short}</span>
                        <span className="hidden md:block">{photo.title.full}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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