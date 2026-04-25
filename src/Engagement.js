import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function Engagement() {
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [invite, setInvite] = useState({
    couple: "",
    date: "",
    time: "",
    location: "",
    message: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const inviteRef = useRef(null);

  const photos = [
    { url: "/fejesa/f6.jpeg", title: { full: "Fillimi i dashurisë", short: "Fillimi" } },
    { url: "/fejesa/f1.jpeg", title: { full: "Momente romantike", short: "Romantike" } },
    { url: "/fejesa/f2.jpeg", title: { full: "Elegancë çiftësh", short: "Çiftësh" } },
    { url: "/fejesa/f3.jpeg", title: { full: "Dekor i dashuruar", short: "Dashuruar" } },
    { url: "/fejesa/f4.jpeg", title: { full: "Stil i pastër për çiftin", short: "Stil" } },
    { url: "/fejesa/f5.jpeg", title: { full: "Luks dhe romantikë", short: "Luks" } },
    { url: "/fejesa/f0.jpeg", title: { full: "Detaje që flasin dashuri", short: "Detaje" } },
    { url: "/fejesa/f7.jpeg", title: { full: "Ambient i ngrohtë çiftësh", short: "Ambient" } },
    { url: "/fejesa/f8.jpeg", title: { full: "Magjia e fejesës", short: "Magji" } },
    { url: "/fejesa/f9.jpeg", title: { full: "Elegancë moderne", short: "Elegancë" } },
    { url: "/fejesa/f10.jpeg", title: { full: "Romancë në çdo kënd", short: "Romancë" } },
    { url: "/fejesa/f11.jpeg", title: { full: "Prekje luksi familjare", short: "Familjare" } },
    { url: "/fejesa/f12.jpeg", title: { full: "Festë e dashurisë", short: "Festë" } },
    { url: "/fejesa/f13.jpeg", title: { full: "Bukuri çiftësh", short: "Bukuri" } },
    { url: "/fejesa/f14.jpeg", title: { full: "Perfeksion romantik", short: "Perfeksion" } },
    { url: "/fejesa/f15.jpeg", title: { full: "Momente të paharrueshme", short: "Momente" } },
  ];

  const toggleSelected = (index) => {
    const isSelected = selectedDecors.includes(index);
    if (isSelected) {
      setSelectedDecors(selectedDecors.filter((id) => id !== index));
    } else {
      setSelectedDecors([...selectedDecors, index]);
    }
  };

  const scrollToGallery = () =>
    document
      .getElementById("engagement-gallery")
      ?.scrollIntoView({ behavior: "smooth" });

  const scrollToInvite = () =>
    document
      .getElementById("engagement-invite")
      ?.scrollIntoView({ behavior: "smooth" });

  const updateInvite = (key, value) =>
    setInvite((prev) => ({ ...prev, [key]: value }));

  const safeInvite = {
    couple: invite.couple || "Emri i Çiftit",
    date: invite.date || "Data",
    time: invite.time || "Ora",
    location: invite.location || "Lokacioni",
    message:
      invite.message ||
      "Ju ftojmë ta ndajmë gëzimin e fejesës së dashurisë sonë.",
  };

  const handleDownloadInvite = async () => {
    if (!inviteRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(inviteRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "Ftese-Fejesa.png";
      link.click();
    } catch (error) {
      console.error("Error downloading invitation:", error);
      alert("Pati një gabim gjatë shkarkimit të ftesës.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#fdf6f0] min-h-screen relative overflow-hidden">
      {/* HERO */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#8b5a3a]" />
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60"
            style={{ backgroundImage: "url(/fejesa/f0.jpeg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8b5a3a]/70 via-[#8b5a3a]/55 to-[#fdf6f0]" />
        </div>

        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#f8c8dc]/25 blur-[60px] pointer-events-none" />
        <div className="absolute top-[30%] -right-28 w-[520px] h-[520px] rounded-full bg-[#fde68a]/25 blur-[70px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-last lg:order-first">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/fejesa/f1.jpeg"
                alt="Fejesa romantike"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-[11px] tracking-[0.3em] uppercase backdrop-blur-sm">
              Fejesa
              <span className="opacity-70">•</span>
              Dashuri e përjetshme
            </div>

            <h1
              className="mt-6 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Një premtim dashurie,
              <span className="block text-[#fde68a] italic">
                dekoruar me elegancë
              </span>
            </h1>

            <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
              Te <span className="font-semibold text-white">Tixhe Dekor</span>{" "}
              krijojmë dekorime romantike dhe të paharrueshme për fejesën tuaj.
              Nga detajet e vogla deri te ambientet e mëdha – çdo gjë plot dashuri dhe stil.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={scrollToGallery}
                className="px-8 py-4 rounded-full bg-[#fde68a] text-[#8b5a3a] font-semibold tracking-wide shadow-[0_20px_40px_rgba(253,230,138,0.25)] hover:shadow-[0_25px_50px_rgba(253,230,138,0.32)] hover:-translate-y-0.5 transition-all duration-500"
              >
                Shiko dekorët
              </button>
              <button
                type="button"
                onClick={scrollToInvite}
                className="px-8 py-4 rounded-full bg-[#f8c8dc]/20 text-white border border-white/20 backdrop-blur-sm font-semibold tracking-wide hover:bg-[#f8c8dc]/25 hover:-translate-y-0.5 transition-all duration-500 text-center"
              >
                Krijo ftesë
              </button>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm font-semibold tracking-wide hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-500 text-center"
              >
                Na kontakto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="engagement-gallery" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#8b5a3a] mb-12">
            Dekorët për Fejesën
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
            {photos.map((photo, index) => {
              const isSelected = selectedDecors.includes(index);
              return (
                <div key={index} className="group relative">
                  <div
                    onClick={() => toggleSelected(index)}
                    className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-8 transition-all duration-700 cursor-pointer ${
                      isSelected
                        ? "shadow-2xl scale-[1.02]"
                        : "shadow-lg group-hover:shadow-xl"
                    }`}
                    style={{
                      borderColor: "#ffd700",
                      borderWidth: isSelected ? "3px" : "0px",
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title.full}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />

                    <div className="absolute top-4 right-4 z-10">
                      <button
                        type="button"
                        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                          isSelected
                            ? "bg-[#0ea5e9] text-white hover:bg-[#0284c7] scale-110"
                            : "bg-white/90 text-gray-400 hover:bg-white hover:text-[#0ea5e9] hover:scale-110"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill={isSelected ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 w-full bg-[#8b5a3a]/90 text-white py-3 text-center transition-all duration-500 z-20 ${
                        isSelected
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
                    >
                      <p className="text-[10px] tracking-[0.3em] uppercase font-bold">
                        Zgjedhur
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                      <div className="text-center px-2 md:px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <h3
                          className="text-lg md:text-2xl lg:text-3xl text-white mb-2 md:mb-3 drop-shadow-lg font-bold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          <span className="block md:hidden">
                            {photo.title.short}
                          </span>
                          <span className="hidden md:block">
                            {photo.title.full}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}