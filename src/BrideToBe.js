import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function BrideToBe() {
    const [inviteName, setInviteName] = useState("");
    const [inviteDate, setInviteDate] = useState("");
    const [inviteTime, setInviteTime] = useState("");
    const [selectedDecors, setSelectedDecors] = useState([]);
    const cardRef = useRef(null);


    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "Ftesa-BrideToBe.png";
            link.click();
        } catch (error) {
            console.error("Error downloading invitation:", error);
            alert("Pati një gabim gjatë shkarkimit të ftesës.");
        }
    };

    const formatDisplayDate = (dateString) => {
        if (!dateString) return "DATA";
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
    };

    const photos = [
        { url: "bridetobe/10.jpeg", title: { full: "Momente Magjike", short: "Magjike" } },
        { url: "bridetobe/11.jpeg", title: { full: "Elegancë Supreme", short: "Suprem" } },
        { url: "bridetobe/5.jpeg", title: { full: "Detaje Mbretërore", short: "Mbretërore" } },
        { url: "bridetobe/6.jpeg", title: { full: "Shkëlqim dhe Klas", short: "Shkëlqim" } },
        { url: "bridetobe/7.jpeg", title: { full: "Lule dhe Perfeksion", short: "Lule" } },
        { url: "bridetobe/8.jpeg", title: { full: "Dekore Profesionale", short: "Profesionale" } },
        { url: "/bridetobe/1.jpeg", title: { full: "Festa e Vajzave", short: "Vajzat" } },
        { url: "/bridetobe/2.jpeg", title: { full: "Detaje Romancë", short: "Detaje" } }
    ];

    return (
        <div className="bg-[#f7f3ec] min-h-screen relative font-sans text-gray-800 overflow-hidden break-words selection:bg-[#fbcfe8]">
            <section className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 lg:px-24 pt-24 lg:pt-0 pb-20 mt-10 lg:mt-0">

                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mt-20 lg:mt-0">
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 transform scale-105" style={{ backgroundImage: "url('bridetobe/4.jpeg')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5]/70 via-[#f7f3ec]/90 to-[#f7f3ec]"></div>
                </div>

                <div className="absolute top-[10%] -left-[5%] w-[400px] h-[400px] opacity-30 pointer-events-none transform -rotate-12 blur-[1px] z-0">
                    <img src="bridetobe/5.jpeg" alt="Decorative Floral" className="w-full h-full object-contain" />
                </div>

                <div className="w-full lg:w-[45%] flex flex-col items-start justify-center z-10 relative mt-10 md:mt-0 lg:ml-8">
                    <h1 className="text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] tracking-tight text-[#4a3b32] font-normal leading-[1.05] mb-4 animate-[fadeIn_1s_ease-out_forwards]">
                        <br />
                        <span className="italic text-[#c2b092] pr-6 block mt-2 whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Bride to Be
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-[1.35rem] text-[#6b655f] font-light max-w-sm lg:max-w-lg leading-relaxed mb-12 opacity-90 animate-[fadeIn_1.4s_ease-out_forwards]">
                        Ne krijojmë dekorin perfekt për ditën më të rëndësishme në jetën tuaj.
                    </p>

                    <button
                        onClick={() => document.getElementById('bridetobe-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 md:px-10 py-4 border border-[#e8dada] bg-transparent text-[#3e3e3e] uppercase tracking-[0.2em] text-xs md:text-sm font-semibold rounded-full hover:bg-[rgba(251,207,232,0.3)] hover:border-[#fbcfe8] hover:shadow-[0_15px_30px_rgba(251,207,232,0.2)] hover:-translate-y-1 transition-all duration-500 animate-[fadeIn_1.8s_ease-out_forwards]"
                    >
                        Zgjidh Dekorin
                    </button>
                </div>

                <div className="w-full lg:w-[45%] relative mt-24 lg:mt-0 flex justify-end z-10 mr-4 md:mr-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-[#fbcfe8]/50 to-[#d89ba3]/30 blur-[60px] rounded-full pointer-events-none z-0 animate-pulse"></div>

                    <div className="relative w-[85%] lg:w-[85%] aspect-[3/4] object-cover z-10 shadow-[0_20px_60px_rgba(107,74,83,0.15)] transition-transform duration-1000 hover:-translate-y-2 rounded-xl border border-[#fff0f5] overflow-hidden bg-white">
                        <img src="/bridetobe/2.jpeg" alt="Festa Bride To Be" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
                    </div>

                    <div className="absolute -bottom-10 lg:-bottom-16 -right-6 lg:-right-12 w-[60%] aspect-[4/3] rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(107,74,83,0.2)] z-20 border-[6px] border-[#fff0f5] bg-white hover:scale-105 hover:rotate-[-2deg] transition-all duration-[800ms]">
                        <img src="/bridetobe/1.jpeg" alt="Detaje romancë" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000" />
                    </div>
                </div>
            </section>



            <div id="bridetobe-gallery" className="pt-20 bg-transparent relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-[#f9a8d4] text-xl mb-4">🌸</span>
                    <h2 className="text-4xl md:text-5xl text-[#5c4a3d] font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Zgjedh dekorin</h2>
                </div>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                        {photos.map((photo, index) => {
                            const isSelected = selectedDecors.includes(index);
                            return (
                                <div key={index} className="group relative">
                                    <div
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedDecors(selectedDecors.filter(id => id !== index));
                                            } else {
                                                setSelectedDecors([...selectedDecors, index]);
                                            }
                                        }}
                                        className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-8 transition-all duration-700 cursor-pointer ${isSelected ? 'shadow-2xl scale-[1.02]' : 'shadow-lg group-hover:shadow-xl'}`}
                                        style={{ borderColor: '#d89ba3', borderWidth: isSelected ? '3px' : '0px' }}
                                    >
                                        <img
                                            src={photo.url}
                                            alt={photo.title.full}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        />

                                        <div className="absolute top-4 right-4 z-10">
                                            <button
                                                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isSelected ? 'bg-[#d89ba3] text-white hover:bg-[#c9838c] scale-110' : 'bg-white/90 text-[#a68f7c] hover:bg-white hover:text-[#d89ba3] hover:scale-110'}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className={`absolute bottom-0 left-0 w-full bg-[#5c4a3d]/80 text-white py-3 text-center transition-all duration-500 z-20 ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                            <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                                        </div>

                                        <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                                            <div className="text-center px-2 md:px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <h3 className="text-lg md:text-2xl lg:text-3xl text-white mb-2 md:mb-3 drop-shadow-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                </div>
            </div>

            <div className="w-full flex justify-center py-10 opacity-70 relative z-10">
                <span className="text-3xl opacity-50">💌</span>
            </div>

            <section className="relative z-10 py-16 px-6 lg:px-20 mb-20">
                <div className="max-w-[1100px] mx-auto bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-[0_20px_50px_rgba(235,215,220,0.4)] flex flex-col md:flex-row items-center gap-16 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(235,215,220,0.6)]">

                    <div className="w-full md:w-1/2 flex flex-col gap-8">
                        <div>
                            <h3 className="text-3xl md:text-5xl text-[#5c4a3d] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Personalizo Ftesën</h3>
                            <p className="text-[#8e786b] text-base md:text-lg font-light leading-relaxed">
                                Plotëso të dhënat dhe ndaj gëzimin me shoqet tuaja.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 w-full">
                            <input type="text" placeholder="Emri yt (Nusja)" value={inviteName} onChange={(e) => setInviteName(e.target.value)} className="w-full border-b border-[#ebd2da] focus:border-[#d89ba3] focus:ring-0 outline-none pb-3 pt-4 text-[#5c4a3d] bg-transparent text-lg transition-colors placeholder:text-[#c4aeb4]" />
                            <div className="flex gap-6 w-full">
                                <div className="w-1/2 relative">
                                    <label className="text-[10px] text-[#a68f7c] absolute top-1 left-0 uppercase tracking-widest pointer-events-none">Data</label>
                                    <input type="date" value={inviteDate} onChange={(e) => setInviteDate(e.target.value)} className="w-full border-b border-[#ebd2da] focus:border-[#d89ba3] outline-none pb-2 pt-6 text-[#5c4a3d] bg-transparent text-lg transition-colors cursor-pointer" />
                                </div>
                                <div className="w-1/2 relative">
                                    <label className="text-[10px] text-[#a68f7c] absolute top-1 left-0 uppercase tracking-widest pointer-events-none">Ora</label>
                                    <input type="time" value={inviteTime} onChange={(e) => setInviteTime(e.target.value)} className="w-full border-b border-[#ebd2da] focus:border-[#d89ba3] outline-none pb-2 pt-6 text-[#5c4a3d] bg-transparent text-lg transition-colors cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="mt-4 self-start px-10 py-4 rounded-full bg-[#d89ba3] text-white font-medium uppercase tracking-[0.15em] text-sm shadow-[0_10px_20px_rgba(216,155,163,0.3)] hover:shadow-[0_15px_30px_rgba(216,155,163,0.5)] transition-all duration-300 hover:scale-105"
                        >
                            Shkarko Ftesën
                        </button>
                    </div>

                    <div className="w-full md:w-1/2 relative group flex justify-center mt-10 md:mt-0">
                        <div className="absolute inset-x-8 inset-y-0 bg-gradient-to-r from-[#f9a8d4] via-[#fbcfe8] to-[#d89ba3] rounded-2xl transform rotate-3 group-hover:rotate-[6deg] group-hover:scale-105 transition-all duration-1000 blur-2xl opacity-40 group-hover:opacity-70 animate-pulse"></div>

                        <div ref={cardRef} style={{
                            width: '100%', maxWidth: 400,
                            padding: '52px 40px',
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(45,35,32,0.18)',
                            zIndex: 10,
                            transition: 'transform 0.6s ease',
                            borderRadius: '1.5rem',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = ''}>

                            <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bridetobe/4.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.85 }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(253,247,240,0.88) 0%, rgba(253,247,240,0.72) 50%, rgba(253,247,240,0.92) 100%)' }} />

                            {[
                                { top: 14, left: 14, transform: 'rotate(0deg)' },
                                { top: 14, right: 14, transform: 'rotate(90deg)' },
                                { bottom: 14, right: 14, transform: 'rotate(180deg)' },
                                { bottom: 14, left: 14, transform: 'rotate(270deg)' },
                            ].map((s, i) => (
                                <svg key={i} width="20" height="20" style={{ position: 'absolute', opacity: 0.5, ...s }} viewBox="0 0 20 20">
                                    <path d="M2 2 L2 10 M2 2 L10 2" stroke="#c9a86c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                </svg>
                            ))}

                            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a86c', textTransform: 'uppercase', marginBottom: 20 }}>
                                    ✦ &nbsp; Ftesë e Veçantë &nbsp; ✦
                                </div>

                                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#8c6b73', textTransform: 'uppercase', marginBottom: 28 }}>
                                    Je e ftuar në festën
                                </div>

                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '3.2rem', color: '#4a3b32', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.01em' }}>
                                    Bride to Be
                                </h2>

                                <div className="w-full mb-8 mt-4 flex justify-center" style={{ opacity: 0.5 }}>
                                    <span style={{ fontSize: '0.65rem', color: '#c9a86c' }}>✦</span>
                                </div>

                                <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: inviteName ? '2.8rem' : '2rem', color: '#d89ba3', marginBottom: 32, minHeight: 60, fontWeight: 700, lineHeight: 1.1 }}>
                                    {inviteName || <span style={{ opacity: 0.3, fontSize: '1.5rem', fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Emri yt këtu</span>}
                                </div>

                                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 300, color: '#8c6b73', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
                                    Le të festojmë së bashku<br />para ditës më të madhe
                                </p>

                                <div style={{ display: 'flex', gap: 20, alignItems: 'center', background: 'rgba(253,247,240,0.7)', padding: '10px 24px', backdropFilter: 'blur(6px)', border: '1px solid rgba(201,168,108,0.25)', borderRadius: '100px' }}>
                                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a3b32', textTransform: 'uppercase' }}>{formatDisplayDate(inviteDate)}</span>
                                    <span style={{ color: '#c9a86c', opacity: 0.6, fontSize: '0.5rem' }}>✦</span>
                                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#4a3b32', textTransform: 'uppercase' }}>{inviteTime || "Ora"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
