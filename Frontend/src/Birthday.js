import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

import img1 from "./1.jpeg";
import img2 from "./2.jpeg";
import img3 from "./3.jpeg";
import img4 from "./DFemra/d4.jpeg";
import img5 from "./DFemra/t4.jpeg";
import img6 from "./DFemra/5.jpeg";
import img7 from "./DFemra/T1.jpeg";
import img8 from "./DFemra/d1.jpeg";
import img9 from "./DFemra/d2.jpeg";
import img10 from "./DFemra/d3.jpeg";
import img11 from "./DFemra/6.jpeg";
import img12 from "./Dmeshkuj/d1.1.jpeg";
import img14 from "./Dmeshkuj/d2.jpeg";
import img15 from "./Dmeshkuj/d3.jpeg";
import img16 from "./Dmeshkuj/d4.jpeg";


const normalizePhotoUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `/${url}`;
};


const decors = [
  { id: "f1", name: "Elegant dhe i paharrueshëm", desc: "Stil i sofistikuar për çdo moshë", image: img1, category: "adults" },
  { id: "f2", name: "Thjeshtësi që shkëlqen", desc: "Minimalizëm me shkëlqim", image: img2, category: "adults" },
  { id: "f3", name: "Magji momenti", desc: "Atmosferë magjike", image: img3, category: "kids" },
  { id: "f4", name: "Elegancë mbretërore", desc: "Luks për festa speciale", image: img4, category: "luxury" },
  { id: "f5", name: "Festë me stil", desc: "Dekor modern dhe elegant", image: img5, category: "teens" },
  { id: "f6", name: "Shkëlqim i artë", desc: "Detaje që ndriçojnë", image: img3, category: "kids" },
  { id: "f7", name: "Stil i përkryer", desc: "Harmoni në çdo element", image: img6, category: "luxury" },
  { id: "f8", name: "Kujtime të arta", desc: "Momente që mbeten", image: img7, category: "adults" },
  { id: "f9", name: "Bukuri në çdo detaj", desc: "Kujdes në çdo cep", image: img8, category: "teens" },
  { id: "f10", name: "Gëzim që ndriçon natën", desc: "Energji festive", image: img9, category: "teens" },
  { id: "f11", name: "Stil, klas dhe dashuri", desc: "Elegancë e ngrohtë", image: img10, category: "adults" },
  { id: "f12", name: "Momente që vlejnë përjetë", desc: "Kujtime të paharrueshme", image: img11, category: "adults" },
  { id: "f13", name: "Elegant dhe i paharrueshëm", desc: "Dekor për meshkuj", image: img12, category: "adults" },
  { id: "f15", name: "Magji momenti", desc: "Surprizë vizuale", image: img14, category: "luxury" },
  { id: "f16", name: "Elegancë mbretërore", desc: "Festë premium", image: img15, category: "luxury" },
  { id: "f17", name: "Festë me stil", desc: "Stil unik", image: img16, category: "teens" },
];

const processSteps = [
  { num: "01", title: "Zgjidh stilin", desc: "Shfleto galerinë dhe shëno dekorët që të pëlqejnë." },
  { num: "02", title: "Krijo ftesën", desc: "Personalizo ftesat digjitale për mysafirët." },
  { num: "03", title: "Festoje", desc: "Ne realizojmë dekorin — ju shijoni çdo moment." },
];

const experienceTypes = [
  {
    symbol: "✦",
    title: "Fëmijë",
    desc: "Ngjyra të gjalla, balona dhe magji — pa humbur elegancën.",
    accent: "from-[#93c5fd]/20 via-[#c7d2fe]/16 to-[#f9a8d4]/20",
    category: "kids",
  },
  {
    symbol: "◇",
    title: "Të rinj & Adoleshentë",
    desc: "Trendy, dinamik dhe plot energi për festa memorabile.",
    accent: "from-[#93c5fd]/20 via-[#c7d2fe]/16 to-[#f9a8d4]/20",
    category: "teens",
  },
  {
    symbol: "○",
    title: "Të rritur",
    desc: "Sofistikim, lule dhe ndriçim për një natë elegante.",
    accent: "from-[#93c5fd]/20 via-[#c7d2fe]/16 to-[#f9a8d4]/20",
    category: "adults",
  },
  {
    symbol: "◆",
    title: "Luxury Birthday",
    desc: "Dekor luksoz me detaje arti për festat më speciale.",
    accent: "from-[#93c5fd]/20 via-[#c7d2fe]/16 to-[#f9a8d4]/20",
    category: "luxury",
  },
];

const highlights = [
  { icon: "◆", title: "Personalizim i plotë", text: "Ngjyra, tema dhe detaje sipas personalitetit të festuarit." },
  { icon: "◇", title: "Instalim profesional", text: "Ekipi ynë kujdeset për çdo element — ju shijoni festën." },
  { icon: "○", title: "Ftesa digjitale", text: "Krijoni dhe shkarkoni ftesa elegante për çdo mysafir." },
];

const testimonials = [
  {
    quote: "Dekori ishte mahnitës — fëmija im nuk e harroi kurrë ditëlindjen e 5-të!",
    names: "Rinor B.",
    detail: "Ditelindje fëmijësh, Ferizaj",
  },
  {
    quote: "Elegant, modern dhe plot energi. Mysafirët ishin të impresionuar.",
    names: "Said .R",
    detail: "Ditelindje 30-vjeçare, Prishtinë",
  },
  {
    quote: "Ftesat e shkarkuara ishin super — dhe dekorimi perfekt deri në detaj.",
    names: "Turisina ❤️",
    detail: "Ditelindje familjare, Gjilan",
  },
];

const fontSerif = { fontFamily: "'Playfair Display', serif" };
const fontSans = { fontFamily: "'Montserrat', sans-serif" };
const fontCursive = { fontFamily: "'Great Vibes', cursive" };

/** Butona/linke hero — tekst i centruar vertikalisht */
const heroCtaClass =
    "inline-flex w-full items-center justify-center min-h-[2.75rem] sm:min-h-[3.25rem] px-2 sm:px-5 md:px-8 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-sm md:text-base font-semibold tracking-wide leading-tight sm:leading-normal text-center transition-all duration-500";

function GallerySkeleton({ count = 8 }) {
  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="aspect-[3/4] rounded-xl md:rounded-3xl bg-[#dbeafe] dark:bg-white animate-pulse"
                aria-hidden
            />
        ))}
      </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
      <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${className}`}
          style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      >
        {children}
      </div>
  );
}

function ConfettiLayer() {
  const pieces = useMemo(
      () =>
          Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: `${(i * 17 + 5) % 100}%`,
            delay: `${(i % 6) * 0.7}s`,
            duration: `${4 + (i % 4)}s`,
            size: 6 + (i % 4) * 2,
            color: i % 4 === 0 ? "#38bdf8" : i % 4 === 1 ? "#c7d2fe" : i % 4 === 2 ? "#99f6e4" : "#f9a8d4",
          })),
      []
  );

  return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {pieces.map((p) => (
            <span
                key={p.id}
                className="absolute rounded-sm opacity-40 dark:opacity-25 animate-[birthdayConfettiFall_linear_infinite]"
                style={{
                  left: p.left,
                  top: "-10%",
                  width: p.size,
                  height: p.size * 1.4,
                  backgroundColor: p.color,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
            />
        ))}
      </div>
  );
}

export default function Birthday() {
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [dynamicDecors, setDynamicDecors] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [step, setStep] = useState("selection");
  const [formData, setFormData] = useState({ name: "", date: "", location: "", message: "" });
  const [showInvite, setShowInvite] = useState(false);
  const [inviteThemeColor, setInviteThemeColor] = useState("#7c3aed");
  const [inviteBgColor, setInviteBgColor] = useState("#f9f5ff");
  const [isGenerating, setIsGenerating] = useState(false);
  const [inviteStyle, setInviteStyle] = useState("elegant");
  const [inviteBgImage, setInviteBgImage] = useState(null);
  const [lightboxDecor, setLightboxDecor] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const inviteRef = useRef(null);

  const filteredDecors = useMemo(() => {
    const allDecors = [...dynamicDecors, ...decors];

    if (activeCategory === "all") {
      return allDecors;
    }

    return allDecors.filter(
        (decor) => decor.category === activeCategory
    );
  }, [dynamicDecors, activeCategory]);

  useEffect(() => {
    const loadBirthdayPhotos = async () => {
      setPhotosLoading(true);
      try {
        const res = await fetch("/api/fotografite/lloji/birthday");
        if (!res.ok) return;
        const items = await res.json();
        const mapped = items
            .filter((item) => item.shtegu)
            .map((item) => ({
              id: `photo-${item.fotografiaId}`,
              name: item.pershkrimi || "Dekor ditelindjeje",
              desc: "",
              image: normalizePhotoUrl(item.shtegu),
              category: "all",
            }));
        setDynamicDecors(mapped);
      } catch (error) {
        console.error("Gabim gjate ngarkimit te fotove te ditelindjes:", error);
      } finally {
        setPhotosLoading(false);
      }
    };
    loadBirthdayPhotos();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleDecor = useCallback((id) => {
    setSelectedDecors((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setInviteBgImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateInvite = (e) => {
    e.preventDefault();
    setShowInvite(true);
  };

  const handleDownloadInvite = async () => {
    if (!inviteRef.current) return;
    const names = formData.name.split("\n").map((n) => n.trim()).filter(Boolean);
    if (names.length === 0) return;

    setIsGenerating(true);
    const nameNode = document.getElementById(`invite-guest-name-${inviteStyle}`);
    const originalText = nameNode ? nameNode.innerText : "";

    try {
      for (let i = 0; i < names.length; i++) {
        const guestName = names[i];
        if (nameNode) nameNode.innerText = guestName;
        await new Promise((res) => setTimeout(res, 100));
        const canvas = await html2canvas(inviteRef.current, { scale: 3, useCORS: true });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `Ftese_${guestName.replace(/\s+/g, "_")}.png`;
        link.click();
        await new Promise((res) => setTimeout(res, 400));
      }
    } catch (err) {
      console.error("Failed to download invitations", err);
    } finally {
      if (nameNode) nameNode.innerText = originalText;
      setIsGenerating(false);
    }
  };

  const getImageSrc = (decor) =>
      typeof decor.image === "string" ? decor.image : decor.image;

  /* ——— INVITE BUILDER STEP ——— */
  if (step === "form") {
    return (
        <div
            className="min-h-screen bg-[#f9f5ff] dark:bg-[#f9f5ff] text-[#2b2b2b] dark:text-[#2b2b2b] transition-colors duration-500"
            style={fontSans}
        >
          <BirthdayStyles />
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-24 animate-[birthdayFadeUp_0.6s_ease-out]">
            <button
                type="button"
                onClick={() => setStep("selection")}
                className="mb-8 flex items-center text-[10px] md:text-[11px] uppercase tracking-[0.2em]
            text-[#52708f] dark:text-[#7c3aed]/80 hover:text-[#1e3a5f] dark:hover:text-[#1e3a5f]
            transition-colors font-semibold group"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
              Kthehu te dekorët
            </button>

            <div
                className="rounded-[2rem] overflow-hidden
            bg-white/90 dark:bg-white/95 border border-[#dbeafe] dark:border-[#dbeafe]
            shadow-[0_30px_90px_rgba(190,90,140,0.1)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#dbeafe] dark:border-[#dbeafe]">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#38bdf8] font-semibold mb-2">
                    Ftesa digjitale
                  </p>
                  <h2 className="text-3xl md:text-4xl text-[#1e3a5f] dark:text-[#1e3a5f] mb-4" style={fontSerif}>
                    Krijo ftesën e festës
                  </h2>
                  <p className="text-sm text-[#52708f] dark:text-[#52708f]/80 leading-relaxed mb-10">
                    Plotësoni të dhënat dhe shkarkoni ftesa elegante për çdo mysafir — në stil luksoz ose me foto.
                  </p>

                  <form onSubmit={handleCreateInvite} className="space-y-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                        Emrat e të ftuarve (një në çdo rresht)
                      </label>
                      <textarea
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border-b border-[#bae6fd] dark:border-[#bae6fd] bg-transparent
                      outline-none focus:border-[#7c3aed] py-3 text-lg text-[#1e3a5f] dark:text-[#2b2b2b] resize-none h-24"
                          placeholder={"Filan Fisteku\nFilane Fisteku"}
                          style={fontSerif}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                          Koha e festës
                        </label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full border-b border-[#bae6fd] dark:border-[#bae6fd] bg-transparent
                        outline-none focus:border-[#7c3aed] py-3 text-sm text-[#1e3a5f] dark:text-[#2b2b2b]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                          Lokacioni
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full border-b border-[#bae6fd] dark:border-[#bae6fd] bg-transparent
                        outline-none focus:border-[#7c3aed] py-3 text-base text-[#1e3a5f] dark:text-[#2b2b2b]"
                            placeholder="Arzo Event"
                            style={fontSerif}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                        Mesazhi i ftesës
                      </label>
                      <input
                          type="text"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full border-b border-[#bae6fd] dark:border-[#bae6fd] bg-transparent
                      outline-none focus:border-[#7c3aed] py-3 text-lg text-[#1e3a5f] dark:text-[#2b2b2b]"
                          placeholder="Ju mirëpresim të ngrini një dolli me ne..."
                          style={fontSerif}
                      />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-gradient-to-r from-[#60a5fa] via-[#c7d2fe] to-[#f9a8d4] text-[#0f2f4f] font-semibold
                    tracking-wide uppercase text-[11px] shadow-[0_16px_40px_rgba(124,58,237,0.18)]
                    hover:-translate-y-0.5 transition-all duration-500"
                    >
                      Krijo ftesën
                    </button>
                  </form>
                </div>

                <div className="p-8 lg:p-14 bg-gradient-to-b from-[#eef7ff] via-[#f7fbff] to-[#fff1f7] dark:from-[#eef7ff] dark:via-[#f7fbff] dark:to-[#fff1f7] flex flex-col items-center justify-center">
                  <InvitePreview
                      showInvite={showInvite}
                      inviteRef={inviteRef}
                      inviteStyle={inviteStyle}
                      setInviteStyle={setInviteStyle}
                      inviteBgImage={inviteBgImage}
                      handleImageUpload={handleImageUpload}
                      inviteThemeColor={inviteThemeColor}
                      setInviteThemeColor={setInviteThemeColor}
                      inviteBgColor={inviteBgColor}
                      setInviteBgColor={setInviteBgColor}
                      formData={formData}
                      isGenerating={isGenerating}
                      handleDownloadInvite={handleDownloadInvite}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  /* ——— MAIN SELECTION VIEW ——— */
  return (
      <div
          className="min-h-screen bg-[#f9f5ff] dark:bg-[#f9f5ff] text-[#2b2b2b] dark:text-[#2b2b2b] overflow-x-hidden transition-colors duration-500"
          style={fontSans}
      >
        <BirthdayStyles />

        {/* HERO */}
        <section className="relative min-h-[92svh] flex items-center overflow-hidden">
          <ConfettiLayer />
          <div className="absolute inset-0">
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${img1})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/46 via-[#c7d2fe]/38 to-[#f9a8d4]/42 dark:to-[#f9f5ff]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f9a8d4]/20 via-transparent to-[#bae6fd]/28" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(191,219,254,0.35),transparent_50%)]" />
          </div>

          <div className="absolute top-[20%] -right-20 w-[400px] h-[400px] rounded-full bg-[#bae6fd]/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[10%] -left-16 w-[320px] h-[320px] rounded-full bg-[#f9a8d4]/22 blur-[60px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left birthday-fade-up">
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/15 border border-white/25 text-white text-[10px] sm:text-[11px]
                tracking-[0.35em] uppercase backdrop-blur-md"
                >
                  <span className="text-[#f9a8d4]">✦</span>
                  Ditëlindje
                  <span className="opacity-50">•</span>
                  Festë me stil
                </div>

                <h1
                    className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#bfdbfe] drop-shadow-[0_3px_16px_rgba(15,47,79,0.55)]"
                    style={fontSerif}
                >
                  Festo me
                  <span className="block italic text-[#f9a8d4] drop-shadow-[0_3px_16px_rgba(124,58,237,0.45)]">gëzim & elegancë</span>
                </h1>

                <p
                    className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Te <span className="font-semibold text-white">Tixhe Dekor</span> krijojmë ambiente
                  festive, moderne dhe plot energi — nga ditëlindjet e vogla deri te festat luksoze të
                  të rriturve.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 w-full max-w-md sm:max-w-xl mx-auto lg:mx-0 lg:max-w-2xl">
                  <button
                      type="button"
                      onClick={() => scrollTo("birthday-gallery")}
                      className={`${heroCtaClass} bg-gradient-to-r from-white via-[#eef7ff] to-[#fff1f7] text-[#1e3a5f]
                  shadow-[0_20px_40px_rgba(124,58,237,0.16)] hover:-translate-y-0.5`}
                  >
                    <span className="sm:hidden">Dekor</span>
                    <span className="hidden sm:inline">Zgjidh dekorin</span>
                  </button>
                  <button
                      type="button"
                      onClick={() => selectedDecors.length > 0 && setStep("form")}
                      disabled={selectedDecors.length === 0}
                      className={`${heroCtaClass} border ${
                          selectedDecors.length > 0
                              ? "bg-gradient-to-r from-[#60a5fa]/35 to-[#f9a8d4]/35 text-white border-white/35 hover:from-[#60a5fa]/45 hover:to-[#f9a8d4]/45 hover:-translate-y-0.5"
                              : "bg-white/5 text-white/50 border-white/10 cursor-not-allowed"
                      }`}
                  >
                    <span className="sm:hidden">Ftesë</span>
                    <span className="hidden sm:inline">Krijo ftesën</span>
                  </button>
                  <Link
                      to="/contact"
                      className={`${heroCtaClass} text-white border border-white/25
                  bg-gradient-to-r from-white/10 to-[#f9a8d4]/18 hover:from-white/16 hover:to-[#60a5fa]/24 hover:-translate-y-0.5`}
                  >
                    Rezervo
                  </Link>
                </div>
              </div>

              <div className="relative max-w-sm mx-auto lg:max-w-none birthday-fade-up" style={{ animationDelay: "0.15s" }}>
                <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#bae6fd]/28 via-[#c7d2fe]/20 to-[#f9a8d4]/24 blur-2xl" />
                <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 translate-y-4 sm:translate-y-8">
                    <img src={img5} alt="Dekor ditelindjeje" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20">
                    <img src={img9} alt="Festë me stil" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
              type="button"
              onClick={() => scrollTo("birthday-experiences")}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
              aria-label="Scroll poshtë"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Zbulo</span>
            <span className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-[birthdayBounce_2s_ease-in-out_infinite]" />
          </button>
        </section>

        {/* EXPERIENCE TYPES */}
        <section id="birthday-experiences" className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-14">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#7c3aed] font-semibold mb-3">
                  Për çdo moshë
                </p>
                <h2 className="text-3xl md:text-5xl text-[#1e3a5f] dark:text-[#1e3a5f]" style={fontSerif}>
                  Eksperienca që përshtaten
                  <span className="block italic text-[#7c3aed] dark:text-[#7c3aed]">me ju</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
              {experienceTypes.map((exp, i) => (
                  <Reveal key={exp.title} delay={i * 80} className="h-full">
                    <button
                        type="button"
                        onClick={() => {
                          setActiveCategory(exp.category);
                          scrollTo("birthday-gallery");
                        }}
                        className={`group relative w-full h-full min-h-[14.5rem] text-left p-6 md:p-8 rounded-[1.75rem] overflow-hidden
                  bg-white/78 dark:bg-white/90 border transition-all duration-500
                  ${
                            activeCategory === exp.category
                                ? "border-[#a78bfa] shadow-[0_24px_60px_rgba(124,58,237,0.16)] -translate-y-1"
                                : "border-[#dbeafe] dark:border-[#dbeafe] hover:border-[#a78bfa]/70 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(124,58,237,0.12)]"
                        }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.accent} opacity-60 dark:opacity-45`} />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/0 via-[#c7d2fe]/0 to-[#f9a8d4]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#60a5fa]/24 group-hover:via-[#c7d2fe]/20 group-hover:to-[#f9a8d4]/26" />
                      <div className="relative flex h-full flex-col">
                    <span className="text-2xl text-[#38bdf8] dark:text-[#1e3a5f]" aria-hidden>
                      {exp.symbol}
                    </span>
                        <h3 className="mt-4 text-lg font-semibold text-[#1e3a5f] dark:text-[#1e3a5f]" style={fontSerif}>
                          {exp.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#52708f] dark:text-[#52708f]/85 leading-relaxed">{exp.desc}</p>
                        <span className="mt-auto pt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity">
                      Shiko galerinë →
                    </span>
                      </div>
                    </button>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-16 md:py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                {processSteps.map((s, i) => (
                    <div key={s.num} className="text-center relative">
                      {i < processSteps.length - 1 && (
                          <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#38bdf8]/40 to-transparent" aria-hidden />
                      )}
                      <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#38bdf8]/50 flex items-center justify-center text-[#38bdf8] text-xs font-bold">
                        {s.num}
                      </div>
                      <h3 className="mt-4 text-lg text-[#1e3a5f] dark:text-[#1e3a5f]" style={fontSerif}>
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#52708f] dark:text-[#52708f]/80 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* MEMORIES BENTO */}
        <section className="py-8 md:py-12 px-4 md:px-12 max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:hidden">
              {[img4, img11, img16].map((src, idx) => (
                  <div
                      key={idx}
                      className="relative h-24 sm:h-32 rounded-xl overflow-hidden group"
                  >
                    <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-12 gap-4 rounded-[2rem] overflow-hidden max-h-[420px]">
              <div className="md:col-span-7 h-full min-h-[280px] max-h-[420px] rounded-3xl overflow-hidden group">
                <img src={img4} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              </div>
              <div className="md:col-span-5 grid grid-rows-2 gap-4 h-full min-h-[280px] max-h-[420px]">
                <div className="rounded-3xl overflow-hidden group min-h-0">
                  <img src={img11} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                </div>
                <div className="rounded-3xl overflow-hidden group min-h-0">
                  <img src={img16} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-[10px] tracking-[0.35em] uppercase text-[#52708f] dark:text-[#52708f]/70">
              Momente që vlejnë për jetë
            </p>
          </Reveal>
        </section>

        {/* HIGHLIGHTS */}
        <section className="py-12 px-6 md:px-12 bg-white/50 dark:bg-white/50 border-y border-[#dbeafe]/60 dark:border-[#dbeafe]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {highlights.map((h) => (
                <div key={h.title} className="text-center md:text-left">
                  <span className="text-[#38bdf8] text-lg">{h.icon}</span>
                  <h3 className="mt-3 text-lg text-[#1e3a5f] dark:text-[#1e3a5f] font-semibold" style={fontSerif}>
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#52708f] dark:text-[#52708f]/80 leading-relaxed">{h.text}</p>
                </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section id="birthday-gallery" className="py-14 sm:py-20 md:py-28 px-3 sm:px-4 md:px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#7c3aed] font-semibold mb-3">
                  Galeria
                </p>
                <h2 className="text-3xl md:text-5xl text-[#1e3a5f] dark:text-[#1e3a5f]" style={fontSerif}>
                  Zgjidh stilin tënd
                </h2>
                <p className="mt-4 text-[#52708f] dark:text-[#52708f]/80 max-w-lg text-sm md:text-base leading-relaxed">
                  Kliko për të shënuar favoritet — pastaj vazhdo për të krijuar ftesën.
                </p>
              </div>
              {selectedDecors.length > 0 && (
                  <div className="px-5 py-3 rounded-full bg-gradient-to-r from-[#93c5fd]/25 to-[#f9a8d4]/25 border border-[#c7d2fe]/70 text-[#1e3a5f] dark:text-[#1e3a5f] text-sm font-semibold">
                    {selectedDecors.length} zgjedhur
                  </div>
              )}
            </div>

            {photosLoading && dynamicDecors.length === 0 ? (
                <GallerySkeleton />
            ) : filteredDecors.length === 0 ? (
                <p className="text-center py-16 text-[#52708f] dark:text-[#52708f]/80">
                  Nuk ka dekor në këtë kategori — provo &quot;Të gjitha&quot;.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                  {filteredDecors.map((decor) => {
                    const isSelected = selectedDecors.includes(decor.id);
                    const src = getImageSrc(decor);
                    return (
                        <div key={decor.id} className="group relative">
                          <div
                              role="button"
                              tabIndex={0}
                              onClick={() => toggleDecor(decor.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggleDecor(decor.id);
                                }
                              }}
                              className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-4 md:mb-8
                      transition-all duration-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]
                      ${isSelected ? "shadow-2xl scale-[1.02] ring-2 ring-[#38bdf8]" : "shadow-lg group-hover:shadow-xl"}`}
                          >
                            <img
                                src={src}
                                alt={decor.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />

                            <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxDecor(decor);
                                }}
                                className="absolute bottom-4 left-4 z-20 p-2.5 rounded-full bg-black/40 text-white/90
                        backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:bg-black/55"
                                aria-label="Parapamje"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </button>

                            <div className="absolute top-4 right-4 z-10">
                        <span
                            className={`inline-flex p-3 rounded-full shadow-lg transition-all duration-300 ${
                                isSelected
                                    ? "bg-gradient-to-r from-[#60a5fa] to-[#f9a8d4] text-white scale-110"
                                    : "bg-white/90 dark:bg-white/90 text-gray-400 group-hover:text-[#38bdf8] group-hover:scale-110"
                            }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </span>
                            </div>

                            <div
                                className={`absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#2563eb]/95 to-[#f472b6]/95 dark:from-[#93c5fd]/95 dark:to-[#f9a8d4]/95 text-white py-3 text-center transition-all duration-500 z-20 ${
                                    isSelected ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                                }`}
                            >
                              <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                            </div>

                            <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                              <div className="text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-lg md:text-2xl text-white drop-shadow-lg font-bold" style={fontSerif}>
                                  {decor.name}
                                </h3>
                                {decor.desc && (
                                    <p className="text-white/90 text-xs md:text-sm mt-2">{decor.desc}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}

            {selectedDecors.length > 0 && (
                <div className="mt-16 flex justify-center birthday-fade-up">
                  <button
                      type="button"
                      onClick={() => {
                        setStep("form");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group inline-flex items-center gap-3 px-10 py-5 rounded-full
                bg-gradient-to-r from-[#1e3a5f] via-[#7c3aed] to-[#f472b6] dark:from-[#60a5fa] dark:via-[#c7d2fe] dark:to-[#f9a8d4] text-white dark:text-[#0f2f4f] font-semibold
                tracking-wide uppercase text-[11px] shadow-[0_20px_50px_rgba(124,45,109,0.25)]
                hover:-translate-y-0.5 transition-all duration-500"
                  >
                    Vazhdo me {selectedDecors.length} zgjedhje
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
            )}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#7c3aed] font-semibold mb-3">
                Kujtime të gëzuara
              </p>
              <h2 className="text-3xl md:text-4xl text-[#1e3a5f] dark:text-[#1e3a5f]" style={fontSerif}>
                Çfarë thonë klientët
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                  <blockquote
                      key={t.names}
                      className="p-8 rounded-[2rem] bg-white/60 dark:bg-white/80 border border-[#dbeafe] dark:border-[#dbeafe]
                shadow-[0_16px_50px_rgba(56,189,248,0.06)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.2)]"
                  >
                    <p className="text-[#1e3a5f] dark:text-[#2b2b2b]/90 italic leading-relaxed text-sm md:text-base" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      "{t.quote}"
                    </p>
                    <footer className="mt-6 pt-4 border-t border-[#dbeafe] dark:border-[#dbeafe]">
                      <cite className="not-italic font-semibold text-[#2563eb] dark:text-[#1e3a5f] text-sm">{t.names}</cite>
                      <p className="text-xs text-[#52708f] dark:text-[#52708f]/70 mt-1">{t.detail}</p>
                    </footer>
                  </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 md:px-12 pb-28 sm:pb-32">
          <div
              className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden
          bg-gradient-to-br from-[#60a5fa] via-[#c7d2fe] to-[#f9a8d4]
          dark:from-[#60a5fa] dark:via-[#c7d2fe] dark:to-[#f9a8d4]
          border border-white/40 shadow-[0_40px_100px_rgba(56,189,248,0.18)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.45),transparent_50%)]" />
            <div className="relative z-10 px-8 py-14 md:py-20 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/90 mb-4">Gati për festë?</p>
              <h2 className="text-3xl md:text-5xl text-white leading-tight max-w-2xl mx-auto" style={fontSerif}>
                Le ta bëjmë ditëlindjen tuaj të paharrueshme
              </h2>
              <p className="mt-5 text-white/85 max-w-xl mx-auto text-sm md:text-base">
                Zgjidh dekorin, krijo ftesat dhe na kontakto për ofertë personalizuese.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    type="button"
                    onClick={() => scrollTo("birthday-gallery")}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-white via-[#eef7ff] to-[#fff1f7] text-[#1e3a5f] font-semibold hover:-translate-y-0.5 transition-all duration-500"
                >
                  Shiko galerinë
                </button>
                <Link
                    to="/contact"
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-white/16 to-[#f9a8d4]/22 text-white border border-white/30 font-semibold
                hover:from-white/24 hover:to-[#60a5fa]/26 hover:-translate-y-0.5 transition-all duration-500"
                >
                  Na kontakto
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY BAR */}
        {selectedDecors.length > 0 && (
            <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3.5 rounded-full
          bg-gradient-to-r from-[#93c5fd] to-[#f9a8d4] dark:from-[#93c5fd] dark:to-[#f9a8d4] text-[#0f2f4f] dark:text-[#1e3a5f] border border-white/50
          shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md animate-[birthdaySlideUp_0.5s_ease-out]"
            >
              <span className="text-sm font-semibold">{selectedDecors.length} zgjedhur</span>
              <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs uppercase tracking-wider underline hover:no-underline"
              >
                Krijo ftesën →
              </button>
            </div>
        )}

        {/* LIGHTBOX */}
        {lightboxDecor && (
            <div
                className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
            >
              <button
                  type="button"
                  onClick={() => setLightboxDecor(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white text-xl hover:bg-white/20"
                  aria-label="Mbyll"
              >
                ✕
              </button>
              <figure className="max-w-4xl w-full text-center">
                <img
                    src={getImageSrc(lightboxDecor)}
                    alt={lightboxDecor.name}
                    className="w-full max-h-[80vh] object-contain rounded-2xl mx-auto"
                />
                <figcaption className="mt-4 text-white text-xl" style={fontSerif}>
                  {lightboxDecor.name}
                </figcaption>
              </figure>
            </div>
        )}
      </div>
  );
}

function InvitePreview({
                         showInvite,
                         inviteRef,
                         inviteStyle,
                         setInviteStyle,
                         inviteBgImage,
                         handleImageUpload,
                         inviteThemeColor,
                         setInviteThemeColor,
                         inviteBgColor,
                         setInviteBgColor,
                         formData,
                         isGenerating,
                         handleDownloadInvite,
                       }) {
  return (
      <div className="w-full flex flex-col items-center max-w-[400px]">
        {showInvite ? (
            <>
              <div
                  ref={inviteRef}
                  className="w-full aspect-[4/5.5] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative rounded-2xl overflow-hidden animate-[birthdayFadeUp_0.6s_ease-out]"
                  style={{ backgroundColor: inviteBgColor }}
              >
                {inviteStyle === "photo" && (
                    <div
                        className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
                        style={{
                          backgroundColor: inviteBgColor,
                          backgroundImage: inviteBgImage ? `url(${inviteBgImage})` : "none",
                        }}
                    >
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                      <div className="relative z-10 w-full h-full border-[1.5px] border-white/50 p-6 flex flex-col items-center justify-center backdrop-blur-[1px] rounded-xl">
                  <span className="text-[10px] uppercase tracking-[0.4em] mb-6 font-bold text-white drop-shadow-md">
                    Ftesë Ditëlindjeje
                  </span>
                        <h2
                            id="invite-guest-name-photo"
                            className="text-[54px] leading-tight text-white drop-shadow-lg text-center"
                            style={fontCursive}
                        >
                          {formData.name ? formData.name.split("\n")[0].trim() : "Emri i Ftuarit"}
                        </h2>
                        <p className="text-[14px] italic text-white drop-shadow-md mx-4 leading-relaxed mt-4 mb-8 text-center" style={fontSerif}>
                          "{formData.message}"
                        </p>
                        <div className="w-full flex flex-col items-center">
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-white drop-shadow-md mb-2">
                            {formData.date
                                ? new Date(formData.date).toLocaleString("sq-AL", { dateStyle: "long", timeStyle: "short" })
                                : "Data e Festimit"}
                          </p>
                          <div className="w-6 h-px bg-white/50 my-3" />
                          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-white drop-shadow-md">
                            {formData.location}
                          </p>
                        </div>
                        <p className="mt-auto text-xs text-[#bae6fd] italic tracking-[4px] pt-8">✦ Tixhe Decor ✦</p>
                      </div>
                    </div>
                )}

                {inviteStyle === "elegant" && (
                    <div className="w-full h-full p-5 relative overflow-hidden flex flex-col items-center justify-center text-center" style={{ backgroundColor: "#f9f5ff" }}>
                      <div className="absolute inset-2 border rounded-xl pointer-events-none" style={{ borderColor: "#38bdf8", opacity: 0.6 }} />
                      <div className="absolute inset-3 border-[0.5px] rounded-xl pointer-events-none" style={{ borderColor: "#38bdf8", opacity: 0.3 }} />

                      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-6 px-4">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] mb-8 font-semibold text-[#0ea5e9]">Ftesë Ditëlindjeje</h4>
                        <h2
                            id="invite-guest-name-elegant"
                            className="text-[46px] leading-tight mb-6 text-center"
                            style={{ ...fontCursive, color: "#2563eb" }}
                        >
                          {formData.name ? formData.name.split("\n")[0].trim() : "Emri i Ftuarit"}
                        </h2>
                        <p className="text-[13px] italic mb-8 px-2 leading-relaxed text-center" style={{ ...fontSerif, color: "#1e3a5f" }}>
                          "{formData.message}"
                        </p>
                        <div className="w-full flex flex-col items-center text-[#1e3a5f]">
                          <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Koha e Festimit</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-center">
                            {formData.date
                                ? new Date(formData.date)
                                    .toLocaleString("sq-AL", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                    .toUpperCase()
                                    .replace(",", " NË")
                                : ""}
                          </p>
                          <div className="w-12 h-[1.5px] my-4" style={{ background: "linear-gradient(to right, transparent, #38bdf8, transparent)" }} />
                          <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Vendi i Eventit</p>
                          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold">{formData.location}</p>
                        </div>
                        <p className="mt-8 text-xs text-[#2563eb] italic tracking-[4px]">✦ Tixhe Decor ✦</p>
                      </div>
                    </div>
                )}
              </div>

              <div className="mt-8 w-full flex flex-col gap-5">
                <div className="flex flex-wrap justify-center gap-2 p-1 rounded-xl bg-white/80 dark:bg-white border border-[#dbeafe] dark:border-[#dbeafe]">
                  <button
                      type="button"
                      onClick={() => setInviteStyle("elegant")}
                      className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${
                          inviteStyle === "elegant" ? "bg-gradient-to-r from-[#60a5fa] to-[#f9a8d4] text-white shadow-md" : "text-[#52708f] dark:text-[#52708f]/70"
                      }`}
                  >
                    Luksoze
                  </button>
                  <button
                      type="button"
                      onClick={() => setInviteStyle("photo")}
                      className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${
                          inviteStyle === "photo" ? "bg-gradient-to-r from-[#1e3a5f] to-[#7c3aed] dark:from-[#60a5fa] dark:to-[#f9a8d4] text-white shadow-md" : "text-[#52708f] dark:text-[#52708f]/70"
                      }`}
                  >
                    Me foto
                  </button>
                </div>

                {inviteStyle === "photo" && (
                    <div className="text-center">
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                        Ngarko fotografi
                      </label>
                      <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="text-[11px] w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#c7d2fe] file:text-[#0f2f4f] file:font-semibold cursor-pointer"
                      />
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                      Ngjyra tekstit
                    </label>
                    <input
                        type="color"
                        value={inviteThemeColor}
                        onChange={(e) => setInviteThemeColor(e.target.value)}
                        className="w-full h-12 rounded-lg border border-[#dbeafe] dark:border-[#dbeafe] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70 font-semibold mb-2">
                      Ngjyra sfondit
                    </label>
                    <input
                        type="color"
                        value={inviteBgColor}
                        onChange={(e) => setInviteBgColor(e.target.value)}
                        className="w-full h-12 rounded-lg border border-[#dbeafe] dark:border-[#dbeafe] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                    type="button"
                    onClick={handleDownloadInvite}
                    disabled={isGenerating}
                    className={`w-full py-4 rounded-full font-semibold uppercase text-[11px] tracking-wider flex items-center justify-center gap-2 transition-all ${
                        isGenerating
                            ? "bg-gray-400 cursor-not-allowed text-gray-200"
                            : "bg-gradient-to-r from-[#1e3a5f] via-[#7c3aed] to-[#f472b6] dark:from-[#60a5fa] dark:via-[#c7d2fe] dark:to-[#f9a8d4] text-white dark:text-[#0f2f4f] hover:-translate-y-0.5 shadow-lg"
                    }`}
                >
                  {isGenerating ? "Duke gjeneruar..." : "Shkarko ftesat"}
                </button>
              </div>
            </>
        ) : (
            <div
                className="w-full aspect-[4/5.5] rounded-2xl border border-dashed border-[#bae6fd] dark:border-[#bae6fd]
          flex flex-col items-center justify-center p-12 text-center bg-white/50 dark:bg-white/60"
            >
              <span className="text-3xl mb-4 text-[#38bdf8] opacity-80">✦</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#52708f] dark:text-[#52708f]/70">
                Parapamja e ftesës shfaqet këtu
              </p>
            </div>
        )}
      </div>
  );
}

function BirthdayStyles() {
  return (
      <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&family=Great+Vibes&display=swap');

    @keyframes birthdayFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes birthdayBounce {
      0%, 100% { transform: translateY(0); opacity: 0.6; }
      50% { transform: translateY(8px); opacity: 1; }
    }
    @keyframes birthdaySlideUp {
      from { opacity: 0; transform: translate(-50%, 16px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes birthdayConfettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.5; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
    .birthday-fade-up {
      animation: birthdayFadeUp 0.9s ease-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .birthday-fade-up,
      [class*="animate-["] {
        animation: none !important;
      }
      .transition-all, .transition-transform, .transition-opacity {
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
  );
}