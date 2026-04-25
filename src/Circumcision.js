import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function Circumcision() {
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [invite, setInvite] = useState({
    djali: "",
    familja: "",
    date: "",
    time: "",
    location: "",
    message: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const inviteRef = useRef(null);

  const heroInfo = useMemo(
    () => [
      {
        t: "Konsultë para eventit",
        d: "Planifikojmë së bashku stilin, hapësirën dhe buxhetin sipas nevojës suaj.",
      },
      {
        t: "Përshtatje për sallën",
        d: "Dekori ndërtohet sipas formës së sallës dhe vendosjes së tryezave.",
      },
      {
        t: "Montim në kohë",
        d: "Ekipi ynë instalon para mbërritjes së mysafirëve që gjithçka të jetë gati.",
      },
    ],
    []
  );

  const photos = useMemo(
    () => [
      {
        url: "/syneti/p1.jpeg",
        title: { full: "Mirëseardhje për mysafirët", short: "Mirëseardhje" },
      },
      {
        url: "/syneti/f3.jpeg",
        title: { full: "Detaje blu & gold", short: "Detaje" },
      },
      {
        url: "/syneti/t1.jpeg",
        title: { full: "Elegancë në tryezë", short: "Tryeza" },
      },
      {
        url: "/syneti/h1.jpeg",
        title: { full: "Hyrje që lë përshtypje", short: "Hyrja" },
      },
      {
        url: "/syneti/t2.jpeg",
        title: { full: "Stil i pastër dhe i rafinuar", short: "Stil" },
      },
      {
        url: "/syneti/t5.jpeg",
        title: { full: "Prekje luksi në çdo detaj", short: "Luks" },
      },
      {
        url: "/syneti/f8.jpeg",
        title: { full: "Dekor modern për foto-kënd", short: "Foto-kënd" },
      },
      {
        url: "/syneti/f4.jpeg",
        title: { full: "Atmosferë e ngrohtë familjare", short: "Atmosferë" },
      },
      {
        url: "/syneti/f1.jpeg",
        title: { full: "Dekor i pastër dhe modern", short: "Modern" },
      },
      {
        url: "/syneti/f2.jpeg",
        title: { full: "Luks dhe elegancë familjare", short: "Elegancë" },
      },
      {
        url: "/syneti/f6.jpeg",
        title: { full: "Dhoma e djalit", short: "Dhoma" },
      },
      {
        url: "/syneti/f7.jpeg",
        title: { full: "Festë familjare e ngrohtë", short: "Festë" },
      },
    ],
    []
  );

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
      .getElementById("circumcision-gallery")
      ?.scrollIntoView({ behavior: "smooth" });

  const scrollToInvite = () =>
    document
      .getElementById("circumcision-invite")
      ?.scrollIntoView({ behavior: "smooth" });

  const updateInvite = (key, value) =>
    setInvite((prev) => ({ ...prev, [key]: value }));

  const safeInvite = {
    djali: invite.djali || "Emri i Djalit",
    familja: invite.familja || "Familja",
    date: invite.date || "Data",
    time: invite.time || "Ora",
    location: invite.location || "Lokacioni",
    message:
      invite.message ||
      "Ju ftojmë ta ndajmë gëzimin së bashku në ceremoninë e synetisë.",
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
      link.download = "Ftese-Synetia.png";
      link.click();
    } catch (error) {
      console.error("Error downloading invitation:", error);
      alert("Pati një gabim gjatë shkarkimit të ftesës.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#f7fbff] min-h-screen relative overflow-hidden">
      {/* HERO */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#061a2b]" />
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60"
            style={{ backgroundImage: "url(/syneti/test.jpeg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061a2b]/70 via-[#061a2b]/55 to-[#f7fbff]" />
        </div>

        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#7dd3fc]/25 blur-[60px] pointer-events-none" />
        <div className="absolute top-[30%] -right-28 w-[520px] h-[520px] rounded-full bg-[#fde68a]/25 blur-[70px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-[11px] tracking-[0.3em] uppercase backdrop-blur-sm">
              Ceremonia e synetisë
              <span className="opacity-70">•</span>
              Elegancë me shije
            </div>

            <h1
              className="mt-6 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Një ditë e veçantë,
              <span className="block text-[#fde68a] italic">
                e dekoruar me dashuri
              </span>
            </h1>

            <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
              Te <span className="font-semibold text-white">Tixhe Dekor</span>{" "}
              krijojmë ambient modern dhe të pastër për ceremoninë e synetisë.
              Nga hyrja dhe foto-këndi, deri te tryezat dhe detajet – çdo gjë
              delikate, e harmonizuar dhe e paharrueshme.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={scrollToGallery}
                className="px-8 py-4 rounded-full bg-[#fde68a] text-[#061a2b] font-semibold tracking-wide shadow-[0_20px_40px_rgba(253,230,138,0.25)] hover:shadow-[0_25px_50px_rgba(253,230,138,0.32)] hover:-translate-y-0.5 transition-all duration-500"
              >
                Shiko dekorët
              </button>
              <button
                type="button"
                onClick={scrollToInvite}
                className="px-8 py-4 rounded-full bg-[#0ea5e9]/20 text-white border border-white/20 backdrop-blur-sm font-semibold tracking-wide hover:bg-[#0ea5e9]/25 hover:-translate-y-0.5 transition-all duration-500 text-center"
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

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
              {heroInfo.map((item) => (
                <div
                  key={item.t}
                  className="rounded-2xl bg-white/90 border border-white/60 shadow-[0_18px_45px_rgba(6,26,43,0.18)] p-4 text-[#061a2b] backdrop-blur-sm"
                >
                  <div className="text-sm font-semibold">{item.t}</div>
                  <div className="text-xs mt-1 text-[#1f3b55]/80 leading-relaxed">
                    {item.d}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#7dd3fc]/25 via-[#fde68a]/15 to-transparent blur-2xl" />
            <div className="relative rounded-[2.25rem] overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(6,26,43,0.35)] bg-white/5 backdrop-blur-sm">
              <div className="aspect-[4/5]">
                <img
                  src="/syneti/t3.jpeg"
                  alt="Dekor për ceremoninë e synetisë"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-gradient-to-b from-[#061a2b]/0 to-[#061a2b]/35">
                <div className="text-white/90 text-sm tracking-wide">
                  Ide dekorimi që kombinon pastërti, shkëlqim dhe ngrohtësi.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="circumcision-gallery"
        className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 py-16"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div
            className="text-4xl md:text-5xl text-[#061a2b] font-normal"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Zgjedh stilin tënd
          </div>
          <p className="mt-3 text-sm md:text-base text-[#1f3b55]/80 max-w-2xl leading-relaxed">
            Kliko fotot për t’i shënuar si të preferuara. Mund t’i përdorim si
            inspirim për dekorin final dhe ta përshtatim sipas sallës dhe buxhetit.
          </p>
        </div>

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
                    borderColor: "#fde68a",
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
                    className={`absolute bottom-0 left-0 w-full bg-[#061a2b]/80 text-white py-3 text-center transition-all duration-500 z-20 ${
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

        <div className="max-w-4xl mx-auto mt-4">
          <div className="rounded-3xl border border-[#0ea5e9]/15 bg-white p-6 md:p-10 shadow-[0_30px_80px_rgba(6,26,43,0.08)]">
            <div
              className="text-2xl md:text-3xl text-[#061a2b]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Çka përfshin dekorimi?
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  t: "Hyrje & mirëseardhje",
                  d: "Tabela emrit, lule dhe elemente pritëse.",
                },
                {
                  t: "Tryezat & qendra",
                  d: "Kompozime elegante që nuk e ngarkojnë ambientin.",
                },
                {
                  t: "Foto-kënd & detaje",
                  d: "Sfond i bukur, ndriçim dhe elemente dekorative.",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-[#f7fbff] p-5">
                  <div className="text-sm font-semibold text-[#061a2b]">
                    {x.t}
                  </div>
                  <div className="mt-2 text-sm text-[#1f3b55]/80 leading-relaxed">
                    {x.d}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-[#1f3b55]/80">
                {selectedDecors.length > 0 ? (
                  <>
                    Ke zgjedhur{" "}
                    <span className="font-semibold text-[#061a2b]">
                      {selectedDecors.length}
                    </span>{" "}
                    dekorë si inspirim.
                  </>
                ) : (
                  <>Zgjidh disa dekorë për ta bërë ofertën më të saktë.</>
                )}
              </div>
              <a
                href="/contact"
                className="px-7 py-3 rounded-full bg-[#061a2b] text-white font-semibold tracking-wide hover:bg-[#0b2942] transition-colors"
              >
                Kërko ofertë
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INVITE BUILDER */}
      <section
        id="circumcision-invite"
        className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pb-24"
      >
        <div className="rounded-[2.25rem] bg-white border border-[#0ea5e9]/15 shadow-[0_30px_90px_rgba(6,26,43,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: FORM */}
            <div className="p-8 md:p-12 lg:p-14">
              <div
                className="text-3xl md:text-4xl text-[#061a2b]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Krijo ftesën e synetisë
              </div>
              <p className="mt-3 text-sm md:text-base text-[#1f3b55]/80 max-w-xl leading-relaxed">
                Plotëso të dhënat dhe shkarko ftesën si foto (PNG). Mund ta dërgosh
                direkt në Viber/WhatsApp ose ta postosh në rrjete sociale.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Emri i djalit
                  </label>
                  <input
                    value={invite.djali}
                    onChange={(e) => updateInvite("djali", e.target.value)}
                    placeholder="p.sh. Ardi"
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors placeholder:text-[#8aa6bb]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Familja
                  </label>
                  <input
                    value={invite.familja}
                    onChange={(e) => updateInvite("familja", e.target.value)}
                    placeholder="p.sh. Berisha"
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors placeholder:text-[#8aa6bb]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={invite.date}
                    onChange={(e) => updateInvite("date", e.target.value)}
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Ora
                  </label>
                  <input
                    type="time"
                    value={invite.time}
                    onChange={(e) => updateInvite("time", e.target.value)}
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Lokacioni
                  </label>
                  <input
                    value={invite.location}
                    onChange={(e) => updateInvite("location", e.target.value)}
                    placeholder="p.sh. Arzo Event, Prishtinë"
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors placeholder:text-[#8aa6bb]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#1f3b55]/70 font-semibold mb-2">
                    Mesazhi (opsionale)
                  </label>
                  <input
                    value={invite.message}
                    onChange={(e) => updateInvite("message", e.target.value)}
                    placeholder="p.sh. Ju mirëpresim me gëzim..."
                    className="w-full border-b border-[#cfe9f7] focus:border-[#0ea5e9] outline-none pb-3 pt-3 text-[#061a2b] bg-transparent text-base transition-colors placeholder:text-[#8aa6bb]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadInvite}
                disabled={isDownloading}
                className={`mt-10 inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 ${
                  isDownloading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#061a2b] text-white hover:bg-[#0b2942] hover:-translate-y-0.5 shadow-[0_20px_50px_rgba(6,26,43,0.18)]"
                }`}
              >
                {isDownloading ? "Duke shkarkuar..." : "Shkarko ftesën (PNG)"}
              </button>
            </div>

            {/* RIGHT: PREVIEW */}
            <div className="p-8 md:p-12 lg:p-14 bg-gradient-to-b from-[#f7fbff] to-white flex items-center justify-center">
              <div className="relative w-full max-w-[420px]">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#7dd3fc]/35 via-[#fde68a]/25 to-transparent blur-2xl" />

                <div
                  ref={inviteRef}
                  className="relative w-full aspect-[4/5.6] rounded-[2.25rem] overflow-hidden shadow-[0_30px_90px_rgba(6,26,43,0.18)] bg-white"
                >
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,0.35),transparent_55%),radial-gradient(circle_at_90%_30%,rgba(253,230,138,0.35),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(6,26,43,0.05),rgba(6,26,43,0.0),rgba(6,26,43,0.06))]" />
                  </div>

                  <div className="relative z-10 h-full p-10 flex flex-col items-center text-center">
                    <div className="text-[10px] tracking-[0.38em] uppercase font-semibold text-[#0b2942]/70">
                      Ftesë • Syneti
                    </div>

                    <div className="mt-8 w-full">
                      <div
                        className="text-4xl md:text-5xl italic text-[#061a2b]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {safeInvite.djali}
                      </div>
                      <div className="mt-2 text-xs tracking-[0.28em] uppercase text-[#1f3b55]/70">
                        {safeInvite.familja}
                      </div>
                    </div>

                    <div className="mt-8 text-sm text-[#1f3b55]/80 leading-relaxed max-w-[280px]">
                      {safeInvite.message}
                    </div>

                    <div className="mt-10 w-full flex flex-col items-center gap-3">
                      <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#fde68a] to-transparent" />
                      <div className="flex items-center gap-4 px-5 py-3 rounded-full border border-[#0ea5e9]/20 bg-white/70 backdrop-blur-sm">
                        <div className="text-[11px] tracking-[0.2em] uppercase text-[#061a2b] font-semibold">
                          {safeInvite.date}
                        </div>
                        <div className="text-[#fde68a] opacity-80 text-xs">
                          ✦
                        </div>
                        <div className="text-[11px] tracking-[0.2em] uppercase text-[#061a2b] font-semibold">
                          {safeInvite.time}
                        </div>
                      </div>
                      <div className="text-xs text-[#1f3b55]/70">
                        {safeInvite.location}
                      </div>
                    </div>

                    <div className="mt-auto w-full">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#0ea5e9]/25 to-transparent" />
                      <div className="mt-4 text-[10px] tracking-[0.35em] uppercase text-[#1f3b55]/60">
                        Tixhe Decor
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-[#fde68a]/60 opacity-70" />
                  <div className="absolute -bottom-7 -right-7 w-24 h-24 rounded-full border border-[#0ea5e9]/25 opacity-60" />
                </div>

                <div className="mt-6 text-center text-xs text-[#1f3b55]/70">
                  Parapamje e ftesës. Plotëso fushat majtas dhe shkarko.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
