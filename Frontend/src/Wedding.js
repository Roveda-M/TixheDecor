import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Ftesa from "./Ftesa";
import { api, formatApiError } from "./api";

const normalizePhotoUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `/${url}`;
};

const defaultPhotos = [
  { url: "/darsma1.jpeg", title: { full: "Momente të Paharrueshme", short: "Momente" } },
  { url: "/darsma1detaje.jpeg", title: { full: "Eleganca në Detaje", short: "Detaje" } },
  { url: "/darsma2.jpeg", title: { full: "Atmosferë Dasme Magjike", short: "Atmosferë" } },
  { url: "/darsma2detaje.jpeg", title: { full: "Detaje që Flasin Dashuri", short: "Dashuri" } },
  { url: "/darsma3.jpeg", title: { full: "Natë Plot Romancë", short: "Romancë" } },
  { url: "/darsma4tavolinaqiftit.jpeg", title: { full: "Tavolina e Çiftit – Moment Special", short: "Çifti" } },
  { url: "/darsma4detaje.jpeg", title: { full: "Dekor Luksoz & Elegant", short: "Luksoz" } },
  { url: "/darsma4detaje1.jpeg", title: { full: "Stil & Perfeksion në Çdo Cep", short: "Stil" } },
  { url: "/darsma4detaje2.jpeg", title: { full: "Magjia e Detajeve të Vogla", short: "Magji" } },
  { url: "/darsma4mireseerdhe.jpeg", title: { full: "Mirëseardhje Plot Ngrohtësi", short: "Mirëseardhje" } },
  { url: "/darsma4tavolina.jpeg", title: { full: "Ambient Dasme i Krijuar me Kujdes", short: "Ambient" } },
  { url: "/darsma5tavolinaqiftit.jpeg", title: { full: "Dashuri e Reflektuar në Dekor", short: "Dashuri" } },
  { url: "/darsma4pjata.jpeg", title: { full: "Elegancë në çdo detaj të tryezës", short: "Elegancë" } },
  { url: "/darsma4tavolina2.jpeg", title: { full: "Prekje romantike në çdo kënd", short: "Romancë" } },
  { url: "/a1.png", title: { full: "Udhëtimi i dashurisë fillon këtu", short: "Fillimi" } },
  { url: "/a2.png", title: { full: "Stili që bie në sy që nga larg", short: "Stil" } },
];

const pillars = [
  {
    icon: "✦",
    title: "Vizion i Personalizuar",
    text: "Çdo dasmë fillon me dëgjim — transformojmë ëndrrat tuaja në një ambient që flet për historinë tuaj.",
  },
  {
    icon: "❋",
    title: "Detaje Luksoze",
    text: "Lule, ndriçim, tekstile dhe tavolina — çdo element i kuruar me precizion artistik dhe elegancë.",
  },
  {
    icon: "♡",
    title: "Eksperiencë e Plotë",
    text: "Nga koncepti deri te dita e madhe, ju udhëheqim me kujdes që të shijoni çdo moment pa stres.",
  },
];

const timelineSteps = [
  { step: "01", title: "Konsultë & Vizion", desc: "Njihim stilin, ngjyrat dhe atmosferën që dëshironi për ditën tuaj." },
  { step: "02", title: "Dizajn & Propozim", desc: "Krijojmë konceptin vizual dhe përzgjedhim elementet që përshtaten me buxhetin." },
  { step: "03", title: "Përgatitje & Instalim", desc: "Ekipi ynë realizon dekorin me kujdes — ju relaksoheni, ne punojmë." },
  { step: "04", title: "Dita e Madhe", desc: "Ambient magjik, momente të paharrueshme dhe një dasme që mbetet në zemër." },
];

const testimonials = [
  {
    quote:
        "Tixhe Dekor e ktheu dasmën tonë në një përvojë magjike. Çdo mysafir foli për elegancën e ambientit.",
    names: "Hatixhe dhe Naser",
    adornment: "❤️ ∞",
    detail: "Dasme, Prishtinë",
  },
  {
    quote:
        "Profesionalizëm, kreativitet dhe shumë dashuri në detaje. Nuk mund të kishim zgjedhur më mirë.",
    names: "Eliza dhe Ardit ❤️ (Kysmet <3)",
    detail: "Dasme, Ferizaj",
  },
  {
    quote:
        "Nga takimi i parë deri te dita e dasmës — gjithçka ishte perfekte, e ngrohtë dhe luksoze.",
    names: "Erza dhe Arben ❤️ (Kysmet <3)",
    detail: "Dasme, Gjilan",
  },
];

const COUNTDOWN_KEY = "weddingCountdownDate";

function getStoredCountdownDate() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(COUNTDOWN_KEY) || "";
  } catch {
    return "";
  }
}

function persistCountdownDate(value) {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(COUNTDOWN_KEY, value);
    else window.localStorage.removeItem(COUNTDOWN_KEY);
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

function getCountdownTarget(value) {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, year, month, day] = match.map(Number);
  const target = new Date(year, month - 1, day, 23, 59, 59, 999);
  return Number.isNaN(target.getTime()) ? null : target;
}

function useCountdown(targetDate) {
  const [parts, setParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, past: true });

  useEffect(() => {
    if (!targetDate) {
      setParts({ days: 0, hours: 0, minutes: 0, seconds: 0, past: true });
      return undefined;
    }

    const tick = () => {
      const target = getCountdownTarget(targetDate);
      if (!target) {
        setParts({ days: 0, hours: 0, minutes: 0, seconds: 0, past: true });
        return;
      }

      const end = target.getTime();
      const diff = end - Date.now();
      if (diff <= 0) {
        setParts({ days: 0, hours: 0, minutes: 0, seconds: 0, past: true });
        return;
      }
      setParts({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        past: false,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return parts;
}

function GallerySkeleton({ count = 8 }) {
  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="aspect-[3/4] rounded-xl md:rounded-3xl bg-[#e8dfd4] dark:bg-[#fff6e8] animate-pulse"
                aria-hidden
            />
        ))}
      </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
      <div className="flex flex-col items-center min-w-[4.5rem] sm:min-w-[5.5rem]">
        <div
            className="w-full aspect-square max-w-[5.5rem] rounded-2xl flex items-center justify-center
        bg-white/80 dark:bg-[#fff6e8] border border-[#d4c4b0]/50 dark:border-[#d8bea0]
        shadow-[0_12px_40px_rgba(107,78,55,0.08)] dark:shadow-[0_12px_40px_rgba(107,78,55,0.12)]
        backdrop-blur-sm"
        >
        <span
            className="text-2xl sm:text-4xl font-light text-[#6f4e37] dark:text-[#4b3524] tabular-nums"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {String(value).padStart(2, "0")}
        </span>
        </div>
        <span className="mt-2 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#8b6a4a]/80 dark:text-[#8b6a4a]/70 font-semibold">
        {label}
      </span>
      </div>
  );
}

export default function Wedding() {
  const [view, setView] = useState("main");
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [dynamicPhotos, setDynamicPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [countdownDate, setCountdownDate] = useState(getStoredCountdownDate);
  const [coupleName, setCoupleName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPhone, setEventPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const countdown = useCountdown(countdownDate);

  useEffect(() => {
    const loadWeddingPhotos = async () => {
      setPhotosLoading(true);
      try {
        const res = await fetch("/api/fotografite/lloji/wedding");
        if (!res.ok) return;
        const items = await res.json();
        const mapped = items
            .filter((item) => item.shtegu)
            .map((item) => ({
              url: normalizePhotoUrl(item.shtegu),
              title: {
                full: item.pershkrimi || "Dekor dasme",
                short: item.pershkrimi || "Dasme",
              },
            }));
        setDynamicPhotos(mapped);
      } catch (error) {
        console.error("Gabim gjate ngarkimit te fotove te dasmes:", error);
      } finally {
        setPhotosLoading(false);
      }
    };

    loadWeddingPhotos();
  }, []);

  const photos = useMemo(() => [...defaultPhotos, ...dynamicPhotos], [dynamicPhotos]);

  const toggleSelected = useCallback((index) => {
    setSelectedDecors((prev) =>
        prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCountdownDate = (value) => {
    setCountdownDate(value);
    persistCountdownDate(value);
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const lightboxPhoto = useMemo(
      () => (lightboxIndex !== null ? photos[lightboxIndex] : null),
      [lightboxIndex, photos]
  );

  const goLightbox = (dir) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + photos.length) % photos.length;
    setLightboxIndex(next);
  };

  const handleSubmitRequest = async () => {
    if (selectedDecors.length === 0) {
      setRequestStatus("Zgjidhni të paktën një dekor nga galeria.");
      scrollTo("wedding-gallery");
      return;
    }
    if (!coupleName.trim() || !eventDate || !eventTime || !eventLocation.trim() || !eventPhone.trim()) {
      setRequestStatus("Plotësoni emrin e çiftit, datën, orën, lokacionin dhe numrin e telefonit.");
      scrollTo("wedding-request");
      return;
    }

    const selectedDecorText = selectedDecors
        .map((index) => {
          const photo = photos[index];
          return `${photo.title.full} (${photo.url})`;
        })
        .join(", ");

    try {
      setIsSubmittingRequest(true);
      const phone = eventPhone.trim();
      const userEmail = await api.getLoggedInUserEmail();
      await api.createBrideToBeRequest({
        brideName: `Wedding - ${coupleName.trim()}`,
        eventDate,
        eventTime,
        location: eventLocation.trim(),
        telefoni: phone,
        email: userEmail,
        selectedDecors: selectedDecorText,
      });
      setSubmittedPhone(phone);
      setRequestStatus("Kërkesa u dërgua. Admini e sheh te Menaxhimi i Klientëve, Projektet e Dekorimit dhe Kërkesat Wedding.");
      setSelectedDecors([]);
      setEventPhone("");
    } catch (error) {
      setRequestStatus(formatApiError(error));
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  /* ================== FTESA VIEW ================== */
  if (view === "ftesa") {
    return (
        <div className="min-h-screen bg-[#fdfaf6] dark:bg-[#fffaf2] transition-colors duration-500">
          <Ftesa />
          <div className="flex justify-center pb-16 px-6">
            <button
                type="button"
                onClick={() => {
                  setView("main");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold tracking-wide
            bg-[#6f4e37] dark:bg-[#d8b982] text-white
            shadow-[0_20px_50px_rgba(107,78,55,0.22)] dark:shadow-[0_20px_50px_rgba(107,78,55,0.18)]
            hover:bg-[#8b5e3c] dark:hover:bg-[#c49a6c] hover:-translate-y-0.5 transition-all duration-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
              Kthehu te dasma
            </button>
          </div>
        </div>
    );
  }

  /* ================== MAIN VIEW ================== */
  return (
      <div className="min-h-screen bg-[#fdfaf6] dark:bg-[#fffaf2] text-[#3d3228] dark:text-[#4b3524] overflow-x-hidden transition-colors duration-500">
        <WeddingStyles />

        {/* ——— HERO ——— */}
        <section className="relative w-full min-h-[100svh] flex items-end md:items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <video
                className="w-full h-full object-cover scale-105"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
            >
              <source src="/v2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#6f4e37]/28 to-[#fdfaf6] dark:to-[#fffaf2]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(253,230,138,0.12),transparent_55%)]" />
          </div>

          <div className="absolute top-[18%] -left-32 w-[380px] h-[380px] rounded-full bg-[#fde68a]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[20%] -right-24 w-[420px] h-[420px] rounded-full bg-[#f8c8dc]/10 blur-[70px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20 md:pb-28">
            <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left wedding-fade-up">
              <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 dark:bg-white/5 border border-white/20 text-white/95
              text-[10px] sm:text-[11px] tracking-[0.35em] uppercase backdrop-blur-md"
              >
                <span className="text-[#fde68a]">★</span>
                Dasme Premium
                <span className="opacity-50">•</span>
                Tixhe Decor
              </div>

              <h1
                  className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Dashuria juaj meriton
                <span className="block italic text-[#fde68a] mt-1">një dasmë perfekte</span>
              </h1>

              <p
                  className="mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Te <span className="font-semibold text-white">Tixhe Dekor</span> krijojmë ambiente
                elegante, romantike dhe të paharrueshme — ku çdo detaj tregon historinë tuaj të
                dashurisë.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center md:justify-start items-stretch sm:items-center max-w-lg mx-auto md:mx-0 md:max-w-none">
                <button
                    type="button"
                    onClick={() => scrollTo("wedding-gallery")}
                    className="inline-flex items-center justify-center min-h-[3.25rem] w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full
                bg-[#fde68a] text-[#5c4030] text-sm sm:text-base font-semibold tracking-wide leading-normal
                shadow-[0_20px_40px_rgba(253,230,138,0.28)] hover:-translate-y-0.5 transition-all duration-500"
                >
                  Eksploro dekorët
                </button>
                <button
                    type="button"
                    onClick={() => {
                      setView("ftesa");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center min-h-[3.25rem] w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full
                bg-white/10 text-white border border-white/25 backdrop-blur-sm text-sm sm:text-base font-semibold
                tracking-wide leading-normal hover:bg-white/18 hover:-translate-y-0.5 transition-all duration-500"
                >
                  Krijo ftesën
                </button>
                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center min-h-[3.25rem] w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full
                text-center bg-transparent text-white border border-white/15 text-sm sm:text-base font-semibold
                tracking-wide leading-normal hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-500"
                >
                  Na kontakto
                </Link>
              </div>
            </div>
          </div>

          <button
              type="button"
              onClick={() => scrollTo("wedding-countdown")}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
              aria-label="Lëviz poshtë"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Zbulo</span>
            <span className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-[weddingBounce_2s_ease-in-out_infinite]" />
          </button>
        </section>

        {/* ——— COUNTDOWN ——— */}
        <section
            id="wedding-countdown"
            className="relative py-16 md:py-20 px-6 md:px-12 border-y border-[#e8dfd4]/80 dark:border-[#ead7bd]"
        >
          <div className="absolute inset-0 bg-[#f7f3ec]/60 dark:bg-[#fff6e8]/90 pointer-events-none" />
          <div className="relative max-w-5xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#a67c52] dark:text-[#8b6a4a] font-semibold mb-3">
              Deri në ditën tuaj
            </p>
            <h2
                className="text-2xl md:text-4xl text-[#6f4e37] dark:text-[#4b3524] mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Numërimi mbrapsht i dashurisë
            </h2>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8">
              {countdownDate && !countdown.past ? (
                  <>
                    <CountdownUnit value={countdown.days} label="Ditë" />
                    <CountdownUnit value={countdown.hours} label="Orë" />
                    <CountdownUnit value={countdown.minutes} label="Min" />
                    <CountdownUnit value={countdown.seconds} label="Sek" />
                  </>
              ) : (
                  <p className="text-[#8b6a4a] dark:text-[#8b6a4a]/80 text-sm md:text-base max-w-md leading-relaxed">
                    {countdownDate && countdown.past
                        ? "Urime! Dita juaj e madhe ka arritur — shpresojmë të ishte magjike. ✦"
                        : "Vendosni datën e dasmës për të parë numërimin mbrapsht personal."}
                  </p>
              )}
            </div>

            <label className="inline-flex flex-col sm:flex-row items-center gap-3 text-sm">
            <span className="text-[#8b6a4a] dark:text-[#8b6a4a]/70 tracking-wide">
              Data e dasmës
            </span>
              <input
                  type="date"
                  value={countdownDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onInput={(e) => handleCountdownDate(e.currentTarget.value)}
                  onChange={(e) => handleCountdownDate(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-[#d4c4b0] dark:border-[#d8bea0]
              bg-white/90 dark:bg-[#fff6e8] text-[#5c4030] dark:text-[#4b3524]
              outline-none focus:ring-2 focus:ring-[#a67c52]/40 transition-shadow cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* ——— PILLARS ——— */}
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <p
                  className="text-xs tracking-[0.3em] uppercase text-[#a67c52] dark:text-[#8b6a4a] mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Pse dasma me Tixhe Decor
              </p>
              <h2
                  className="text-3xl md:text-5xl text-[#6f4e37] dark:text-[#4b3524] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Arti i krijimit të një
                <span className="block italic text-[#a67c52] dark:text-[#a67c52]">
                dasme të paharrueshme
              </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {pillars.map((item, i) => (
                  <article
                      key={item.title}
                      className="group relative p-8 md:p-10 rounded-[2rem]
                bg-white/70 dark:bg-white/90 border border-[#e8dfd4]/90 dark:border-[#ead7bd]
                shadow-[0_20px_60px_rgba(107,78,55,0.06)] dark:shadow-[0_20px_60px_rgba(107,78,55,0.08)]
                hover:shadow-[0_28px_70px_rgba(107,78,55,0.12)] dark:hover:shadow-[0_28px_70px_rgba(107,78,55,0.13)]
                hover:-translate-y-1 transition-all duration-500 wedding-fade-up"
                      style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <div
                        className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#fde68a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        aria-hidden
                    />
                    <span className="text-2xl text-[#a67c52] dark:text-[#a67c52]" aria-hidden>
                  {item.icon}
                </span>
                    <h3
                        className="mt-5 text-xl md:text-2xl text-[#5c4030] dark:text-[#4b3524]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[#8b6a4a] dark:text-[#8b6a4a]/85 leading-relaxed text-sm md:text-base">
                      {item.text}
                    </p>
                  </article>
              ))}
            </div>
          </div>
        </section>

        {/* ——— FEATURED MOSAIC ——— */}
        <section className="py-6 md:py-8 px-4 md:px-12 max-w-7xl mx-auto">
          {/* Mobile: 3 foto kompakte në rresht */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:hidden">
            {[
              { src: photos[0]?.url || "/darsma1.jpeg", label: "Koleksioni" },
              { src: photos[2]?.url || "/darsma2.jpeg", label: null },
              { src: photos[4]?.url || "/darsma3.jpeg", label: null },
            ].map((item) => (
                <div
                    key={item.src}
                    className="relative h-24 sm:h-32 rounded-xl overflow-hidden group"
                >
                  <img
                      src={item.src}
                      alt={item.label || "Dekor dasme"}
                      className="w-full h-full object-cover"
                  />
                  {item.label && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end p-2">
                        <p
                            className="text-[9px] sm:text-[10px] text-white leading-tight line-clamp-2"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.label}
                        </p>
                      </div>
                  )}
                </div>
            ))}
          </div>

          {/* Desktop: mosaic me lartësi të kufizuar */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 md:gap-6 rounded-[2rem] overflow-hidden max-h-[400px] lg:max-h-[440px]">
            <div className="md:col-span-7 relative h-full min-h-[280px] max-h-[440px] rounded-3xl overflow-hidden group">
              <img
                  src={photos[0]?.url || "/darsma1.jpeg"}
                  alt="Dekor dasme premium"
                  className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/80 mb-1">Koleksioni</p>
                <p
                    className="text-xl lg:text-3xl text-white leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Elegancë që mbetet në kujtesë
                </p>
              </div>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-6 h-full min-h-[280px] max-h-[440px]">
              {[photos[2]?.url || "/darsma2.jpeg", photos[4]?.url || "/darsma3.jpeg"].map((src) => (
                  <div key={src} className="relative min-h-0 rounded-3xl overflow-hidden group">
                    <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— GALLERY ——— */}
        <section id="wedding-gallery" className="py-14 sm:py-20 md:py-28 px-3 sm:px-4 md:px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#a67c52] dark:text-[#8b6a4a] font-semibold mb-3">
                  Galeria
                </p>
                <h2
                    className="text-3xl md:text-5xl text-[#6f4e37] dark:text-[#4b3524]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Dekorë dasme
                </h2>
                <p className="mt-4 text-[#8b6a4a] dark:text-[#8b6a4a]/80 max-w-lg text-sm md:text-base leading-relaxed">
                  Prekni fotot për të zgjedhur dekorët, pastaj plotësoni formularin më poshtë që
                  të na kontaktoni — admini merr kërkesën automatikisht.
                </p>
              </div>
              {selectedDecors.length > 0 && (
                  <div
                      className="px-5 py-3 rounded-full bg-[#6f4e37]/10 dark:bg-[#d8b982]/15 border border-[#a67c52]/25
                text-[#6f4e37] dark:text-[#4b3524] text-sm font-semibold tracking-wide"
                  >
                    {selectedDecors.length} stil{selectedDecors.length > 1 ? "e" : ""} i zgjedhur
                  </div>
              )}
            </div>

            {photosLoading && dynamicPhotos.length === 0 ? (
                <GallerySkeleton />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 lg:gap-12">
                  {photos.map((photo, index) => {
                    const isSelected = selectedDecors.includes(index);
                    return (
                        <div key={`${photo.url}-${index}`} className="group relative">
                          <div
                              role="button"
                              tabIndex={0}
                              onClick={() => toggleSelected(index)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggleSelected(index);
                                }
                              }}
                              className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-4 md:mb-8
                      transition-all duration-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a67c52]
                      ${isSelected ? "shadow-2xl scale-[1.02] ring-2 ring-[#8c734b] dark:ring-[#d8b982]" : "shadow-lg group-hover:shadow-xl"}`}
                          >
                            <img
                                src={photo.url}
                                alt={photo.title.full}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />

                            <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLightbox(index);
                                }}
                                className="absolute bottom-4 left-4 z-20 p-2.5 rounded-full bg-black/40 text-white/90
                        backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300
                        hover:bg-black/55"
                                aria-label="Shiko në ekran të plotë"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>

                            <div className="absolute top-4 right-4 z-10">
                        <span
                            className={`inline-flex p-3 rounded-full shadow-lg transition-all duration-300 ${
                                isSelected
                                    ? "bg-[#a67c52] text-white scale-110"
                                    : "bg-white/90 dark:bg-[#fff6e8] text-gray-400 dark:text-[#8b6a4a]/50 group-hover:text-[#a67c52] group-hover:scale-110"
                            }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </span>
                            </div>

                            <div
                                className={`absolute bottom-0 left-0 w-full bg-[#6f4e37]/95 dark:bg-[#d8b982]/95 text-white py-3 text-center transition-all duration-500 z-20 ${
                                    isSelected ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                                }`}
                            >
                              <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                            </div>

                            <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                              <div className="text-center px-2 md:px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <h3
                                    className="text-lg md:text-2xl lg:text-3xl text-white drop-shadow-lg font-bold"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
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
            )}
          </div>
        </section>

        {/* ——— KËRKESË / KONTAKT ——— */}
        <section id="wedding-request" className="py-16 md:py-24 px-4 md:px-12">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-white/80 dark:bg-white/90 border border-[#e8dfd4] dark:border-[#ead7bd] p-8 md:p-12 shadow-[0_24px_60px_rgba(107,78,55,0.08)]">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#a67c52] font-semibold mb-3 text-center">
              Na kontaktoni
            </p>
            <h2
                className="text-2xl md:text-4xl text-[#6f4e37] text-center mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dërgoni kërkesën për dasmin tuaj
            </h2>
            <p className="text-center text-[#8b6a4a] text-sm md:text-base mb-8 max-w-xl mx-auto">
              {selectedDecors.length > 0
                  ? `${selectedDecors.length} dekor të zgjedhur — plotësoni detajet dhe dërgoni.`
                  : "Zgjidhni dekorët nga galeria, pastaj plotësoni formularin."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-[#a67c52] font-semibold">Emri i çiftit</label>
                <input
                    type="text"
                    value={coupleName}
                    onChange={(e) => setCoupleName(e.target.value)}
                    placeholder="psh. Arta & Naser"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-[#d4c4b0] bg-white/90 outline-none focus:ring-2 focus:ring-[#a67c52]/30"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#a67c52] font-semibold">Data e dasmës</label>
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-[#d4c4b0] bg-white/90 outline-none focus:ring-2 focus:ring-[#a67c52]/30"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#a67c52] font-semibold">Ora</label>
                <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-[#d4c4b0] bg-white/90 outline-none focus:ring-2 focus:ring-[#a67c52]/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-[#a67c52] font-semibold">Lokacioni / Adresa</label>
                <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="psh. Prishtinë, Hotel ..."
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-[#d4c4b0] bg-white/90 outline-none focus:ring-2 focus:ring-[#a67c52]/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-[#a67c52] font-semibold">Numri i telefonit</label>
                <input
                    type="tel"
                    value={eventPhone}
                    onChange={(e) => setEventPhone(e.target.value)}
                    placeholder="psh. +383 44 123 456"
                    className="mt-2 w-full px-4 py-3 rounded-xl border border-[#d4c4b0] bg-white/90 outline-none focus:ring-2 focus:ring-[#a67c52]/30"
                    required
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                  type="button"
                  onClick={handleSubmitRequest}
                  disabled={isSubmittingRequest}
                  className="px-10 py-4 rounded-full bg-[#6f4e37] text-white font-semibold tracking-wide hover:bg-[#8b5e3c] transition disabled:opacity-60"
              >
                {isSubmittingRequest ? "Duke dërguar..." : "Dërgo kërkesën"}
              </button>
              <Link
                  to="/contact"
                  className="px-10 py-4 rounded-full text-center border border-[#6f4e37]/25 text-[#6f4e37] font-semibold hover:bg-[#6f4e37]/5 transition"
              >
                Kontakt i drejtpërdrejtë
              </Link>
            </div>

            {requestStatus && (
                <div className="mt-6 text-sm text-center text-[#5c4030] bg-[#f7f3ec] border border-[#e8dfd4] rounded-xl px-4 py-3 space-y-1">
                  <p>{requestStatus}</p>
                  {submittedPhone && (
                      <p className="font-medium">
                        Telefoni i regjistruar: <span className="text-[#6f4e37]">{submittedPhone}</span>
                      </p>
                  )}
                </div>
            )}
          </div>
        </section>

        {/* ——— TIMELINE ——— */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#f7f3ec]/80 dark:bg-[#fff6e8]/90 border-y border-[#e8dfd4]/60 dark:border-[#ead7bd]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#a67c52] dark:text-[#8b6a4a] font-semibold mb-3">
                Udhëtimi juaj
              </p>
              <h2
                  className="text-3xl md:text-4xl text-[#6f4e37] dark:text-[#4b3524]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nga ëndrra te dita e madhe
              </h2>
            </div>

            <ol className="relative space-y-0">
              <div
                  className="absolute left-[1.35rem] md:left-1/2 md:-translate-x-px top-4 bottom-4 w-px bg-gradient-to-b from-[#a67c52]/40 via-[#d4c4b0] to-transparent dark:from-[#c4a882]/30 dark:via-[#4a3d32]"
                  aria-hidden
              />
              {timelineSteps.map((item, i) => (
                  <li
                      key={item.step}
                      className={`relative flex flex-col md:flex-row gap-4 md:gap-12 pb-12 last:pb-0 ${
                          i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:ml-auto"}`}>
                  <span className="text-[#a67c52] dark:text-[#a67c52] text-xs tracking-[0.2em] font-bold">
                    {item.step}
                  </span>
                      <h3
                          className="mt-2 text-xl md:text-2xl text-[#5c4030] dark:text-[#4b3524]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-[#8b6a4a] dark:text-[#8b6a4a]/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div
                        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center
                  bg-[#fdfaf6] dark:bg-white border-2 border-[#a67c52]/40 dark:border-[#d8bea0] text-[#a67c52] dark:text-[#a67c52] text-xs font-bold shadow-md z-10"
                        aria-hidden
                    >
                      {item.step}
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ——— TESTIMONIALS ——— */}
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#a67c52] dark:text-[#8b6a4a] font-semibold mb-3">
                Dëshmi dashurie
              </p>
              <h2
                  className="text-3xl md:text-4xl text-[#6f4e37] dark:text-[#4b3524]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Çiftet që na besuan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((t) => (
                  <blockquote
                      key={t.names}
                      className="relative p-8 md:p-10 rounded-[2rem]
                bg-white/60 dark:bg-white/85 border border-[#e8dfd4]/80 dark:border-[#ead7bd]
                shadow-[0_16px_50px_rgba(107,78,55,0.05)] dark:shadow-[0_16px_50px_rgba(107,78,55,0.08)]"
                  >
                <span className="text-4xl text-[#fde68a]/80 leading-none" aria-hidden>
                  "
                </span>
                    <p
                        className="mt-2 text-[#5c4030] dark:text-[#4b3524]/90 leading-relaxed italic text-sm md:text-base"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {t.quote}
                    </p>
                    <footer className="mt-6 pt-6 border-t border-[#e8dfd4] dark:border-[#ead7bd]">
                      <cite className="not-italic inline-flex items-center gap-2 font-semibold text-[#6f4e37] dark:text-[#4b3524] text-sm">
                        {t.names}
                        {t.adornment && (
                            <span className="text-xl leading-none text-red-600 dark:text-red-400" aria-label="zemër dhe pafundësi">
                        {t.adornment}
                      </span>
                        )}
                      </cite>
                      <p className="text-xs text-[#8b6a4a] dark:text-[#8b6a4a]/70 mt-1 tracking-wide">
                        {t.detail}
                      </p>
                    </footer>
                  </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ——— CTA ——— */}
        <section className="px-4 md:px-12 pb-24 md:pb-32">
          <div
              className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden
          bg-gradient-to-br from-[#b9905c] via-[#d8b982] to-[#f4dfb8]
          dark:from-[#d8b982] dark:via-[#ead7bd] dark:to-[#fff6e8]
          border border-[#d8b982]/45 dark:border-[#d8bea0]
          shadow-[0_40px_100px_rgba(107,78,55,0.25)] dark:shadow-[0_40px_100px_rgba(107,78,55,0.18)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(253,230,138,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(248,200,220,0.12),transparent_45%)]" />

            <div className="relative z-10 px-8 py-14 md:py-20 md:px-16 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#5c4030]/80 mb-4">
                Gati për ditën tuaj
              </p>
              <h2
                  className="text-3xl md:text-5xl text-[#4b3524] leading-tight max-w-2xl mx-auto"
                  style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Le të krijojmë së bashku dasmin që keni ëndërruar
              </h2>
              <p className="mt-5 text-[#5c4030]/85 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Krijoni ftesën tuaj elegante ose na kontaktoni për një konsultë personalizuese —
                pa detyrim.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    type="button"
                    onClick={() => {
                      setView("ftesa");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-10 py-4 rounded-full bg-white text-[#5c4030] font-semibold tracking-wide
                hover:bg-white hover:text-[#6f4e37] hover:-translate-y-0.5 transition-all duration-500
                shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                >
                  Krijo ftesë perfekte
                </button>
                <Link
                    to="/contact"
                    className="px-10 py-4 rounded-full bg-[#6f4e37]/10 text-[#5c4030] border border-[#6f4e37]/20 font-semibold
                tracking-wide backdrop-blur-sm hover:bg-[#6f4e37]/15 hover:-translate-y-0.5 transition-all duration-500"
                >
                  Rezervo konsultën
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ——— STICKY SELECTION BAR ——— */}
        {selectedDecors.length > 0 && (
            <div
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-wrap items-center justify-center gap-3 px-6 py-3.5 rounded-full
          bg-[#6f4e37] dark:bg-[#fff6e8] text-white border border-[#a67c52]/30 dark:border-[#d8bea0]
          shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md animate-[weddingSlideUp_0.5s_ease-out]"
            >
          <span className="text-sm font-medium tracking-wide">
            {selectedDecors.length} dekor të zgjedhur
          </span>
              <button
                  type="button"
                  onClick={() => scrollTo("wedding-request")}
                  className="text-xs uppercase tracking-wider text-[#fde68a] hover:underline font-semibold"
              >
                Kontakto / Dërgo
              </button>
            </div>
        )}

        {/* ——— LIGHTBOX ——— */}
        {lightboxIndex !== null && lightboxPhoto && (
            <div
                className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                role="dialog"
                aria-modal="true"
                aria-label="Parapamje foto"
            >
              <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
                  aria-label="Mbyll"
              >
                ✕
              </button>
              <button
                  type="button"
                  onClick={() => goLightbox(-1)}
                  className="absolute left-2 md:left-8 text-white/80 hover:text-white text-4xl p-2"
                  aria-label="Foto e mëparshme"
              >
                ‹
              </button>
              <button
                  type="button"
                  onClick={() => goLightbox(1)}
                  className="absolute right-2 md:right-8 text-white/80 hover:text-white text-4xl p-2"
                  aria-label="Foto tjetër"
              >
                ›
              </button>
              <figure className="max-w-4xl w-full">
                <img
                    src={lightboxPhoto.url}
                    alt={lightboxPhoto.title.full}
                    className="w-full max-h-[80vh] object-contain rounded-2xl"
                />
                <figcaption
                    className="mt-4 text-center text-white/90 text-lg md:text-2xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {lightboxPhoto.title.full}
                </figcaption>
              </figure>
            </div>
        )}
      </div>
  );
}

function WeddingStyles() {
  return (
      <style>{`
      @keyframes weddingFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes weddingBounce {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50% { transform: translateY(8px); opacity: 1; }
      }
      @keyframes weddingSlideUp {
        from { opacity: 0; transform: translate(-50%, 16px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      .wedding-fade-up {
        animation: weddingFadeUp 1s ease-out forwards;
      }
    `}</style>
  );
}
