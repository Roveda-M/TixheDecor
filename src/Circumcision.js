import { useMemo, useState } from "react";

export default function Circumcision() {
  const [selectedDecors, setSelectedDecors] = useState([]);

  const photos = useMemo(
    () => [
      {
        url: "/syneti/f2.jpeg",
        title: { full: "Mirëseardhje për mysafirët", short: "Mirëseardhje" },
      },
      {
        url: "/syneti/f3.jpeg",
        title: { full: "Detaje blu & gold", short: "Detaje" },
      },
      {
        url: "/syneti/f4.jpeg",
        title: { full: "Elegancë në tryezë", short: "Tryeza" },
      },
      {
        url: "/syneti/f5.jpeg",
        title: { full: "Hyrje që lë përshtypje", short: "Hyrja" },
      },
      {
        url: "/syneti/f6.jpeg",
        title: { full: "Stil i pastër dhe i rafinuar", short: "Stil" },
      },
      {
        url: "/syneti/f7.jpeg",
        title: { full: "Prekje luksi në çdo detaj", short: "Luks" },
      },
      {
        url: "/syneti/f8.jpeg",
        title: { full: "Dekor modern për foto-kënd", short: "Foto-kënd" },
      },
      {
        url: "/syneti/f9.jpeg",
        title: { full: "Atmosferë e ngrohtë familjare", short: "Atmosferë" },
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

  return (
    <div className="bg-[#f7fbff] min-h-screen relative overflow-hidden">
      {/* HERO */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center pt-24 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="w-full h-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/v2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#061a2b]/65 via-[#061a2b]/45 to-[#f7fbff]" />
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
              {[
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
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm p-4 text-white"
                >
                  <div className="text-sm font-semibold">{item.t}</div>
                  <div className="text-xs mt-1 text-white/80 leading-relaxed">
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
                  src="/syneti/f1.jpeg"
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
    </div>
  );
}
