export default function Circumcision() {
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
    </div>
  );
}
