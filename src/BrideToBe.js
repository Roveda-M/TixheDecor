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
            <section className="relative w-full flex flex-row items-center justify-center gap-2 sm:gap-8 lg:justify-between px-3 sm:px-8 md:px-16 lg:px-24 pt-24 sm:pt-32 pb-10 lg:pb-0 lg:min-h-screen overflow-hidden">

                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 transform scale-105" style={{ backgroundImage: "url('bridetobe/4.jpeg')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5]/80 via-[#f7f3ec]/90 to-[#f7f3ec]"></div>
                </div>
                <br />
                <div className="absolute top-[15%] lg:top-[25%] -left-[15%] lg:-left-[5%] w-[150px] h-[150px] lg:w-[400px] lg:h-[400px] opacity-20 pointer-events-none transform -rotate-12 blur-[2px] z-0">
                    <img src="bridetobe/5.jpeg" alt="Decorative Floral" className="w-full h-full object-contain" />
                </div>

                <div className="w-[45%] lg:w-[45%] flex flex-col items-start text-left justify-center z-10 relative mb-0 pr-1 sm:pr-0">
                    <h1 className="text-[1.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] tracking-tight text-[#4a3b32] font-normal leading-tight mb-2 sm:mb-4 drop-shadow-sm animate-[fadeIn_1s_ease-out_forwards]">
                        <span className="italic text-[#c2b092] block pr-0 lg:pr-4 break-words" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Bride to Be
                        </span>
                    </h1>

                    <p className="text-[10px] sm:text-sm md:text-lg lg:text-[1.2rem] text-[#6b655f] font-light max-w-[140px] sm:max-w-[250px] lg:max-w-lg leading-snug lg:leading-relaxed mb-4 lg:mb-8 opacity-90 animate-[fadeIn_1.4s_ease-out_forwards]">
                        Ne krijojmë dekorin perfekt për ditën më të rëndësishme në jetën tuaj.
                    </p>

                    <button
                        onClick={() => document.getElementById('bridetobe-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-3 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 border border-[#e8dada] bg-transparent text-[#3e3e3e] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold sm:font-semibold rounded-full hover:bg-[rgba(251,207,232,0.3)] hover:border-[#fbcfe8] hover:shadow-[0_15px_30px_rgba(251,207,232,0.2)] hover:-translate-y-1 transition-all duration-500 animate-[fadeIn_1.8s_ease-out_forwards] w-fit whitespace-nowrap max-w-full overflow-hidden text-ellipsis"
                    >
                        Zgjidh Dekorin
                    </button>
                </div>

                <div className="w-[50%] lg:w-[45%] relative flex items-start justify-start z-10 max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[480px] ml-auto lg:mr-8 xl:mr-12 mb-8 sm:mb-12 lg:mb-20 pb-6 sm:pb-10 lg:pb-16 pr-4 sm:pr-8 lg:pr-12">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#fbcfe8]/40 to-[#d89ba3]/20 blur-[25px] md:blur-[60px] rounded-full pointer-events-none z-0"></div>

                    <div className="relative w-[90%] lg:w-[85%] aspect-[3/4] rounded-2xl lg:rounded-3xl shadow-[0_15px_30px_rgba(107,74,83,0.15)] border-[3px] sm:border-[5px] lg:border-[8px] border-[#fff0f5] bg-white overflow-hidden z-10 transition-transform duration-700 hover:scale-[1.02]">
                        <img src="/bridetobe/2.jpeg" alt="Festa Bride To Be" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute bottom-0 right-0 w-[75%] lg:w-[70%] aspect-[4/3] rounded-2xl lg:rounded-3xl shadow-[0_10px_20px_rgba(107,74,83,0.2)] z-20 border-[3px] sm:border-[5px] lg:border-[8px] border-[#fff0f5] bg-white overflow-hidden transition-transform duration-700 hover:scale-105 hover:-rotate-3">
                        <img src="/bridetobe/1.jpeg" alt="Detaje romancë" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>



            <div id="bridetobe-gallery" className="pt-20 bg-transparent relative z-10">
                <div className="flex flex-col items-center text-center mb-8 md:mb-12 px-4">
                    <span className="text-[#f9a8d4] text-xl mb-4">🌸</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#5c4a3d] font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>Zgjedh dekorin</h2>
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

            <section className="relative z-10 py-6 sm:py-12 px-3 sm:px-6 lg:px-20 mb-10 overflow-hidden">
                <div className="max-w-[1200px] mx-auto bg-white/70 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-16 shadow-[0_20px_40px_rgba(235,215,220,0.3)] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-all duration-700">

                    {/* FORM SECTION - ALWAYS ON TOP ON MOBILE */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-8 order-2 lg:order-1 pt-4 lg:pt-0 border-t border-[#f0e6e1] lg:border-none">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl sm:text-4xl lg:text-4xl text-[#5c4a3d] mb-2 lg:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Personalizo Ftesën</h3>
                            <p className="text-[#8e786b] text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                                Plotëso të dhënat e tua dhe ktheje në një ftesë mbretërore.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 sm:gap-8 w-full mt-2 lg:mt-4">
                            <div className="relative group">
                                <label className="text-[10px] font-bold text-[#a68f7c] uppercase tracking-widest absolute -top-2 lg:-top-3 left-4 lg:left-2 bg-white/90 px-1 z-10">Emri yt (Nusja)</label>
                                <input type="text" placeholder="psh. Vesa" value={inviteName} onChange={(e) => setInviteName(e.target.value)} className="w-full border-2 border-[#ebd2da] rounded-xl lg:rounded-2xl focus:border-[#d89ba3] outline-none px-4 lg:px-5 py-3 lg:py-4 text-[#5c4a3d] bg-white/50 focus:bg-white text-base shadow-sm transition-all relative z-0 placeholder:text-[#d7c9cc]" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">
                                <div className="w-full sm:w-1/2 relative group">
                                    <label className="text-[10px] font-bold text-[#a68f7c] uppercase tracking-widest absolute -top-2 lg:-top-3 left-4 lg:left-2 bg-white/90 px-1 z-10">Data e Festës</label>
                                    <input type="date" value={inviteDate} onChange={(e) => setInviteDate(e.target.value)} className="w-full border-2 border-[#ebd2da] rounded-xl lg:rounded-2xl focus:border-[#d89ba3] outline-none px-4 lg:px-5 py-3 lg:py-4 text-[#5c4a3d] bg-white/50 focus:bg-white text-base shadow-sm transition-all cursor-pointer relative z-0" />
                                </div>
                                <div className="w-full sm:w-1/2 relative group">
                                    <label className="text-[10px] font-bold text-[#a68f7c] uppercase tracking-widest absolute -top-2 lg:-top-3 left-4 lg:left-2 bg-white/90 px-1 z-10">Ora e Fillimit</label>
                                    <input type="time" value={inviteTime} onChange={(e) => setInviteTime(e.target.value)} className="w-full border-2 border-[#ebd2da] rounded-xl lg:rounded-2xl focus:border-[#d89ba3] outline-none px-4 lg:px-5 py-3 lg:py-4 text-[#5c4a3d] bg-white/50 focus:bg-white text-base shadow-sm transition-all cursor-pointer relative z-0" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="mt-6 lg:mt-8 w-full lg:w-fit px-8 py-4 rounded-xl lg:rounded-2xl bg-[#c2b092] text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs shadow-[0_15px_30px_rgba(194,176,146,0.3)] hover:bg-[#a69578] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(194,176,146,0.5)] transition-all duration-300"
                        >
                            Shkarko Ftesën
                        </button>
                    </div>

                    {/* CARD PREVIEW SECTION - SCALES ELEGANTLY */}
                    <div className="w-full lg:w-1/2 relative flex justify-center order-1 lg:order-2 mt-2 lg:mt-0 h-[450px] sm:h-[570px] lg:h-[600px]">
                        <div className="absolute inset-x-8 sm:inset-x-12 inset-y-0 bg-gradient-to-r from-[#f9a8d4] via-[#fbcfe8] to-[#d89ba3] rounded-3xl transform rotate-2 lg:rotate-3 blur-[20px] opacity-30 animate-pulse pointer-events-none"></div>

                        {/* SCALE WRAPPER: Top origin ensures no empty margin gaps on mobile scale down */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 transform-gpu scale-[0.75] sm:scale-95 lg:scale-100 origin-top transition-transform duration-500 w-[380px] h-[600px] flex-shrink-0 z-10 rounded-2xl shadow-[0_30px_80px_rgba(45,35,32,0.18)]">
                            <div ref={cardRef} style={{
                                width: '380px', height: '600px',
                                padding: '45px 24px',
                                background: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '1rem',
                            }}>
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

                                <div style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.35em', color: '#c9a86c', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                                        ✦ &nbsp; Ftesë e Veçantë &nbsp; ✦
                                    </div>

                                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#8c6b73', textTransform: 'uppercase', marginBottom: '1.8rem' }}>
                                        Je e ftuar në festën
                                    </div>

                                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '3.5rem', color: '#4a3b32', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                                        Bride to Be
                                    </h2>

                                    <div className="w-full flex justify-center mb-6 mt-4" style={{ opacity: 0.5 }}>
                                        <span style={{ fontSize: '0.7rem', color: '#c9a86c' }}>✦</span>
                                    </div>

                                    <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: inviteName ? '2.8rem' : '1.8rem', color: '#d89ba3', marginBottom: '2rem', minHeight: '60px', fontWeight: 700, lineHeight: 1.1, wordBreak: 'break-word', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
                                        {inviteName || <span style={{ opacity: 0.3, fontSize: '1.4rem', fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Emri yt këtu</span>}
                                    </div>

                                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 300, color: '#8c6b73', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                        Le të festojmë së bashku<br />para ditës më të madhe
                                    </p>

                                    <div style={{ display: 'flex', gap: 20, alignItems: 'center', background: 'rgba(253,247,240,0.8)', padding: '12px 28px', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,108,0.3)', borderRadius: '100px' }}>
                                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#4a3b32', textTransform: 'uppercase', fontWeight: 600 }}>{formatDisplayDate(inviteDate)}</span>
                                        <span style={{ color: '#c9a86c', opacity: 0.6, fontSize: '0.5rem' }}>✦</span>
                                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#4a3b32', textTransform: 'uppercase', fontWeight: 600 }}>{inviteTime || "Ora"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
