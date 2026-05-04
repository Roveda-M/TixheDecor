import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Ftesa() {
  const previewRef = useRef();

  const [form, setForm] = useState({
    bride: "",
    groom: "",
    date: "",
    time: "",
    restaurant: "",
    address: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("invitationForm");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("invitationForm", JSON.stringify(form));
  }, [form]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const safe = {
    bride: form.bride || "Emri i Nuses",
    groom: form.groom || "Emri i Dhëndrit",
    date: form.date || "30 October 2026",
    time: form.time || "15:00",
    restaurant: form.restaurant || "Grand Hotel",
    address: form.address || "Prishtinë, Kosovë",
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("ftesa.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f7f3ec]">

      {/* LEFT */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 mt-16">
        <div className="w-full max-w-md space-y-8">

          <h1 className="text-4xl md:text-5xl font-serif tracking-wide">
            Krijo Ftesën
          </h1>

          <div className="bg-white/90 p-5 rounded-2xl shadow-xl space-y-3">
            <Input placeholder="Emri i nuses" value={form.bride} onChange={(e) => update("bride", e.target.value)} />
            <Input placeholder="Emri i dhëndrit" value={form.groom} onChange={(e) => update("groom", e.target.value)} />

            {/* Data & Ora në një rresht */}
            <div className="flex gap-3">
              <input
                type="date"
                className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6b4f3b]/40"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
              <input
                type="time"
                className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6b4f3b]/40"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              />
            </div>

            <Input placeholder="Restoranti" value={form.restaurant} onChange={(e) => update("restaurant", e.target.value)} />
            <Input placeholder="Adresa" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>

          <button
            onClick={downloadPDF}
            className="w-full py-3 bg-[#6b4f3b] text-white rounded-xl hover:bg-[#5a3f2f] transition font-serif tracking-wide"
          >
            DOWNLOAD PDF
          </button>

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-2">
        <div
          ref={previewRef}
          className="relative w-[320px] md:w-[380px] h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1523438885200-e635ba2c371e)",
            }}
          />

          <div className="absolute inset-0 bg-white/70" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 font-serif">
            <p className="text-xs tracking-[6px] text-gray-500 uppercase">
              Ftesë Dasme
            </p>

            <h1 className="text-3xl mt-6">{safe.bride}</h1>
            <h2 className="text-xl text-gray-600">& {safe.groom}</h2>

            <div className="mt-6 text-sm text-gray-700 space-y-1">
              <p>📅 {safe.date}</p>
              <p>🕒 {safe.time}</p>
              <p>🍽 {safe.restaurant}</p>
              <p>📍 {safe.address}</p>
            </div>
            <div className="w-full text-center mt-8">
  <p className="text-xs text-[#8B5E3C] italic tracking-[4px]">
    ✦ Tixhe Decor ✦
  </p>
</div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* INPUT COMPONENT */
function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6b4f3b]/40"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
