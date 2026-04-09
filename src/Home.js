import { useState } from "react";
import {FaUser} from "react-icons/fa";
export default function Home() {
  return (
    <>
     <section className="w-full bg-[#f7f3ec] py-12">
  
      {/* 🔥 VIDEO HERO */}
      <section className="w-full h-[77vh] overflow-hidden mt-7">
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
      <br/>
      <br/>
     
        <div className="max-w-6xl mx-auto px-4">
          <img
            src="/programi.png"
            alt="Banner Ftesa"
            className="w-full h-[1400px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* NEW COLLECTION */}
      <NewCollection />

   < button className="absolute top-5 right-10 text-3xl text-black p-1 rounded-full z-50">
  <FaUser />
</button>
    </>
  );
}

function NewCollection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const slides = [
    { img: "/natyrbardh.jpeg", title: "New Collection 2026/2027" },
    { img: "/ebardha.jpeg", title: "New Collection 2026/2027" },
    { img: "/qirat.jpeg", title: "New Collection 2026/2027" },
    { img: "/natyrkrem.jpeg", title: "New Collection 2026/2027" },
    { img: "/erza.jpeg", title: "New Collection 2026/2027" },
  ];

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-12 uppercase">
        NEW COLLECTION
      </h2>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-[scroll_18s_linear_infinite] gap-5">
          {[...slides, ...slides].map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(item.img)}
              className="w-[260px] md:w-[340px] h-[220px] relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-3 text-white">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt=""
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
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