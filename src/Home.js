import { useState } from "react";

export default function Home() {
  return (
    <>
      <section className="w-full bg-[#f7f3ec] py-12">
        {/* 🔥 VIDEO HERO */}
        <section className="w-full overflow-hidden mt-5 aspect-video max-h-[80vh]">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
        </section>

        {/* FOTO POSHTË FTESAVE */}
        <br />
        <br />

      <div className="w-full flex justify-center px-4">
  <div className="w-full max-w-7xl">
    <img
      src="/programi.png"
      alt="Banner Ftesa"
      className="w-full h-auto md:h-[110vh] lg:h-[130vh] object-contain rounded-2xl shadow-2xl"
    />
  </div>
</div>
      </section>

      {/* NEW COLLECTION */}
      <NewCollection />
    </>
  );
}

function NewCollection() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const slides = [
    { img: "/natyrbardh.jpeg", title: "New Collection 2026/2027" },
    { img: "/ebardha.jpeg", title: "New Collection 2026/2027" },
    { img: "/qirat.jpeg", title: "New Collection 2026/2027" },
    { img: "/natyrkrem.jpeg", title: "New Collection 2026/2027" },
    { img: "/erza.jpeg", title: "New Collection 2026/2027" },
  ];

  const openImage = (index) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-12 uppercase">
        NEW COLLECTION
      </h2>

      {/* SLIDER */}
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-[scroll_18s_linear_infinite] gap-5">
          {[...slides, ...slides].map((item, i) => (
            <div
              key={i}
              onClick={() => openImage(i % slides.length)}
              className="w-[200px] sm:w-[260px] md:w-[340px] h-[160px] sm:h-[220px] relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-3 text-white text-sm md:text-base">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          {/* CLOSE */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>

          {/* PREV */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-3xl"
          >
            ‹
          </button>

          {/* IMAGE */}
          <img
            src={slides[currentIndex].img}
            alt=""
            className="max-w-full max-h-full object-contain rounded-xl"
          />

          {/* NEXT */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-3xl"
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}