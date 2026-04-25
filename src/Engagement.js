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
      
    </div>
  );
}