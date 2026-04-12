import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

import img1 from './1.jpeg';
import img2 from './2.jpeg';
import img3 from './3.jpeg';
import img4 from './DFemra/d4.jpeg';
import img5 from './DFemra/t4.jpeg';
import img6 from './DFemra/5.jpeg';
import img7 from './DFemra/T1.jpeg';
import img8 from './DFemra/d1.jpeg';
import img9 from './DFemra/d2.jpeg';
import img10 from './DFemra/d3.jpeg';
import img11 from './DFemra/6.jpeg';
import img12 from './Dmeshkuj/d1.1.jpeg';
import img14 from './Dmeshkuj/d2.jpeg';
import img15 from './Dmeshkuj/d3.jpeg';
import img16 from './Dmeshkuj/d4.jpeg';

const decors = [
  { id: 'f1', name: 'Elegant dhe i paharrueshëm', desc: '', image: img1 },
  { id: 'f2', name: 'Thjeshtësi që shkëlqen', desc: '', image: img2 },
  { id: 'f3', name: 'Magji momenti', desc: '', image: img3 },
  { id: 'f4', name: 'Elegancë mbretërore', desc: '', image: img4 },
  { id: 'f5', name: 'Festë me stil', desc: '', image: img5 },
  { id: 'f6', name: 'Shkëlqim i artë', desc: '', image: img3 },
  { id: 'f7', name: 'Stil i përkryer', desc: '', image: img6 },
  { id: 'f8', name: 'Kujtime të arta', desc: '', image: img7 },
  { id: 'f9', name: 'Bukuri në çdo detaj', desc: '', image: img8 },
  { id: 'f10', name: 'Gëzim që ndriçon natën', desc: '', image: img9 },
  { id: 'f11', name: 'Stil, klas dhe dashuri', desc: '', image: img10 },
  { id: 'f12', name: 'Momente që vlejnë përjetë', desc: '', image: img11 },
  { id: 'f13', name: 'Elegant dhe i paharrueshëm', desc: '', image: img12 },
  { id: 'f15', name: 'Magji momenti', desc: '', image: img14 },
  { id: 'f16', name: 'Elegancë mbretërore', desc: '', image: img15 },
  { id: 'f17', name: 'Festë me stil', desc: '', image: img16 }
];

export default function Birthday() {
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [step, setStep] = useState('selection');
  const [formData, setFormData] = useState({ name: '', date: '', location: '', message: '' });
  const [showInvite, setShowInvite] = useState(false);
  const [inviteThemeColor, setInviteThemeColor] = useState('#8c734b');
  const [inviteBgColor, setInviteBgColor] = useState('#fffdfa');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inviteStyle, setInviteStyle] = useState('elegant');
  const [inviteBgImage, setInviteBgImage] = useState(null);

  const inviteRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInviteBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fontSerif = { fontFamily: "'Playfair Display', serif" };
  const fontSans = { fontFamily: "'Montserrat', sans-serif" };
  const fontCursive = { fontFamily: "'Great Vibes', cursive" };

  const handleCreateInvite = (e) => {
    e.preventDefault();
    setShowInvite(true);
  };

  const handleDownloadInvite = async () => {
    if (!inviteRef.current) return;

    const names = formData.name.split('\n').map(n => n.trim()).filter(n => n);
    if (names.length === 0) return;

    setIsGenerating(true);
    const nameNode = document.getElementById(`invite-guest-name-${inviteStyle}`);
    const originalText = nameNode ? nameNode.innerText : '';

    try {
      for (let i = 0; i < names.length; i++) {
        const guestName = names[i];
        if (nameNode) nameNode.innerText = guestName;

        // Wait briefly for DOM to update
        await new Promise(res => setTimeout(res, 100));

        const canvas = await html2canvas(inviteRef.current, { scale: 3, useCORS: true });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `Ftese_${guestName.replace(/\s+/g, '_')}.png`;
        link.click();

        // Wait before next download
        await new Promise(res => setTimeout(res, 400));
      }
    } catch (err) {
      console.error("Failed to download invitations", err);
    } finally {
      if (nameNode) nameNode.innerText = originalText;
      setIsGenerating(false);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&family=Great+Vibes&display=swap');
          
          .luxury-input {
            border: none;
            border-bottom: 1px solid #d1d5db;
            background: transparent;
            padding: 10px 0;
            width: 100%;
            outline: none;
            transition: border-color 0.4s ease;
          }
          .luxury-input:focus {
            border-bottom: 1px solid #1f2937;
          }

          .slow-zoom:hover img {
            transform: scale(1.05);
          }
          
          /* Custom scrollbar to make it look clean */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f7f3ec; }
          ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        `}
      </style>

      <div className="w-full bg-[#f7f3ec] text-[#2b2b2b] min-h-screen py-20 overflow-hidden" style={fontSans}>
        <div className="text-center px-4 max-w-4xl mx-auto mb-16 md:mb-24">
          <h1 className="text-5xl md:text-5xl text-[#1c1c1c] mb-6 font-light" style={fontSerif}>
            Ditelindje
          </h1>
          <div className="w-[1px] h-16 bg-gray-400 mx-auto mt-8 mb-6"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
            {decors.map((decor) => {
              const isSelected = selectedDecors.includes(decor.id);
              return (
                <div
                  key={decor.id}
                  className="group relative"
                >
                  <div
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDecors(selectedDecors.filter(id => id !== decor.id));
                      } else {
                        setSelectedDecors([...selectedDecors, decor.id]);
                      }
                    }}
                    className={`relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-3xl mb-8 transition-all duration-700 cursor-pointer ${isSelected ? 'shadow-2xl scale-[1.02]' : 'shadow-lg group-hover:shadow-xl'}`}
                    style={{ borderColor: '#8c734b', borderWidth: isSelected ? '3px' : '0px' }}
                  >
                    <img
                      src={decor.image}
                      alt={decor.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />

                    <div className="absolute top-4 right-4 z-10">
                      <button
                        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isSelected ? 'bg-red-500 text-white hover:bg-red-600 scale-110' : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className={`absolute bottom-0 left-0 w-full bg-black/70 text-white py-3 text-center transition-all duration-500 z-20 ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                      <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                    </div>

                    <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-10">
                      <div className="text-center px-2 md:px-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-xl md:text-3xl text-white mb-2 md:mb-3 drop-shadow-lg font-bold" style={fontSerif}>{decor.name}</h3>
                        <p className="text-white text-xs md:text-sm font-medium leading-relaxed max-w-[280px] mx-auto drop-shadow-md">{decor.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {selectedDecors.length > 0 && step === 'selection' && (
          <div className="text-center mb-32 flex justify-center animate-[fadeInUp_0.5s_ease-out_forwards]">
            <button
              onClick={() => setStep('form')}
              className="bg-[#1c1c1c] text-white py-5 px-14 text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-all duration-500 shadow-2xl flex items-center gap-3 hover:scale-105 rounded-sm"
            >
              Vazhdo me {selectedDecors.length} Zgjedhje
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}

        {step === 'form' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 mb-32 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <button onClick={() => setStep('selection')} className="mb-8 flex items-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-[#1c1c1c] transition-colors duration-300 font-semibold group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kthehu Mbrapa tek Zgjedhjet
            </button>

            <div className="bg-white p-8 lg:p-20 shadow-2xl relative">
              <div className="absolute top-6 left-6 w-16 h-[1px] bg-gray-300 hidden md:block"></div>
              <div className="absolute top-6 left-6 w-[1px] h-16 bg-gray-300 hidden md:block"></div>
              <div className="absolute bottom-6 right-6 w-16 h-[1px] bg-gray-300 hidden md:block"></div>
              <div className="absolute bottom-6 right-6 w-[1px] h-16 bg-gray-300 hidden md:block"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div>
                  <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl text-[#1c1c1c] mb-4" style={fontSerif}>Ftesa e Eventit</h2>
                    <p className="text-gray-500 text-sm font-light tracking-wide leading-relaxed">Letra e ftesës është përshtypja juaj e parë. Plotësoni të dhënat dhe krijoni një ftesë që rrezaton klas të pashoq.</p>
                  </div>

                  <form onSubmit={handleCreateInvite} className="space-y-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">Emrat e të Ftuarve (Një në çdo rresht)</label>
                      <textarea
                        required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="luxury-input text-lg text-gray-800 resize-none h-24"
                        placeholder="Filan Fisteku&#10;Filane Fisteku"
                        style={fontSerif}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">Koha e Pritjes</label>
                        <input
                          type="datetime-local" required value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="luxury-input text-gray-800 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">Lokacioni Fiks</label>
                        <input
                          type="text" required value={formData.location}
                          onChange={e => setFormData({ ...formData, location: e.target.value })}
                          className="luxury-input text-gray-800 text-base"
                          placeholder="Arzo Event"
                          style={fontSerif}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">Rreshtat e Ftesës</label>
                      <input
                        type="text" required value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="luxury-input text-gray-800 text-lg"
                        placeholder="Ju mirëpresim të ngrini një dolli me ne..."
                        style={fontSerif}
                      />
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        className="w-full bg-[#1c1c1c] text-white py-5 px-8 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#333] transition-colors duration-500"
                      >
                        Krijo Ftesën
                      </button>
                    </div>
                  </form>
                </div>

                <div className="flex flex-col justify-center items-center h-full w-full">
                  {showInvite ? (
                    <div className="w-full flex flex-col items-center">
                      <div ref={inviteRef} className="w-full max-w-[400px] aspect-[4/5.5] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative transition-all duration-700 animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 hover:scale-[1.01]" style={{ backgroundColor: inviteBgColor }}>
                        {inviteStyle === 'photo' && (
                          <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundColor: inviteBgColor, backgroundImage: inviteBgImage ? `url(${inviteBgImage})` : 'none' }}>
                            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                            <div className="relative z-10 w-full h-full border-[1.5px] border-white/50 p-6 flex flex-col items-center justify-center text-center backdrop-blur-[1px]">
                              <div className="flex flex-col items-center justify-center mb-6">
                                <span className="text-[10px] uppercase tracking-[0.4em] mb-6 block font-bold text-white drop-shadow-md">Ftesë Ditëlindjeje</span>
                                <h2 id="invite-guest-name-photo" className="text-[54px] leading-tight font-normal text-white drop-shadow-lg text-center" style={fontCursive}>
                                  {formData.name ? formData.name.split('\n')[0].trim() : "Emri i Ftuarit"}
                                </h2>
                              </div>
                              <p className="text-[14px] italic font-medium text-white drop-shadow-md mx-4 leading-relaxed mt-4 mb-8 text-center" style={fontSerif}>
                                "{formData.message}"
                              </p>
                              <div className="w-full flex flex-col items-center justify-center">
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-white drop-shadow-md mb-2">
                                  {formData.date ? new Date(formData.date).toLocaleString('sq-AL', { dateStyle: 'long', timeStyle: 'short' }) : 'Data e Festimit'}
                                </p>
                                <div className="w-6 h-[1px] bg-white/50 my-3"></div>
                                <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-white drop-shadow-md">{formData.location}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {inviteStyle === 'elegant' && (
                          <div className="w-full h-full p-5 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-inner" style={{ backgroundColor: '#fdfbf7' }}>
                            <div className="absolute inset-2 border-[1px] pointer-events-none rounded-xl" style={{ borderColor: '#d4af37', opacity: 0.6 }}></div>
                            <div className="absolute inset-3 border-[0.5px] pointer-events-none rounded-xl" style={{ borderColor: '#d4af37', opacity: 0.3 }}></div>

                            <svg className="absolute -top-4 -left-2 drop-shadow-md opacity-90" width="80" height="120" viewBox="0 0 40 60" fill="none">
                              <ellipse cx="20" cy="20" rx="16" ry="19" fill="url(#goldGradient1)" />
                              <path d="M20 39 L18 43 L22 43 Z" fill="url(#goldGradient1)" />
                              <path d="M20 43 Q28 50 20 60" stroke="#d4af37" strokeWidth="0.8" fill="none" />
                              <defs>
                                <linearGradient id="goldGradient1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#F9E596" />
                                  <stop offset="0.5" stopColor="#D4AF37" />
                                  <stop offset="1" stopColor="#AA8529" />
                                </linearGradient>
                              </defs>
                            </svg>

                            <svg className="absolute top-4 -right-4 drop-shadow-sm opacity-80" width="70" height="100" viewBox="0 0 40 60" fill="none">
                              <ellipse cx="20" cy="20" rx="14" ry="17" fill="url(#goldGradient2)" />
                              <path d="M20 37 L18 41 L22 41 Z" fill="url(#goldGradient2)" />
                              <path d="M20 41 Q12 50 20 60" stroke="#d4af37" strokeWidth="0.8" fill="none" />
                              <defs>
                                <linearGradient id="goldGradient2" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#FFEFB8" />
                                  <stop offset="0.5" stopColor="#D4AF37" />
                                  <stop offset="1" stopColor="#8C6513" />
                                </linearGradient>
                              </defs>
                            </svg>

                            <svg className="absolute -bottom-6 -left-4 drop-shadow-md opacity-85" width="75" height="110" viewBox="0 0 40 60" fill="none">
                              <ellipse cx="20" cy="20" rx="15" ry="18" fill="url(#goldGradient3)" />
                              <path d="M20 38 L18 42 L22 42 Z" fill="url(#goldGradient3)" />
                              <path d="M20 42 Q25 50 18 60" stroke="#d4af37" strokeWidth="0.8" fill="none" />
                              <defs>
                                <linearGradient id="goldGradient3" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#F9E596" />
                                  <stop offset="0.5" stopColor="#C4A034" />
                                  <stop offset="1" stopColor="#9C7519" />
                                </linearGradient>
                              </defs>
                            </svg>

                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-6 px-4">
                              <h4 className="text-[10px] uppercase tracking-[0.4em] mb-8 font-semibold text-[#8c6513] drop-shadow-sm">Ftesë Ditëlindjeje</h4>

                              <h2 id="invite-guest-name-elegant" className="text-[46px] leading-tight mb-6 font-normal drop-shadow-sm text-center" style={{ ...fontCursive, color: '#aa8529' }}>
                                {formData.name ? formData.name.split('\n')[0].trim() : "Emri i Ftuarit"}
                              </h2>

                              <p className="text-[13px] italic mb-8 px-2 leading-relaxed text-center" style={{ ...fontSerif, color: '#5a461b' }}>
                                "{formData.message}"
                              </p>

                              <div className="w-full flex flex-col items-center justify-center text-[#5a461b]">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Koha e Festimit</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-center">
                                  {formData.date ? new Date(formData.date).toLocaleString('sq-AL', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase().replace(',', ' NË') : ''}
                                </p>
                                <div className="w-12 h-[1.5px] my-4" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }}></div>
                                <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Vendi i Eventit</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-center">{formData.location}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 w-full max-w-[400px] animate-[fadeInUp_1s_ease-out_forwards] opacity-0 flex flex-col gap-5">
                        <div className="w-full flex flex-col items-center mb-1">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2">Zgjidh Stil</label>
                          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <button
                              onClick={() => setInviteStyle('elegant')}
                              className={`px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded transition-all duration-300 ${inviteStyle === 'elegant' ? 'bg-[#d4af37] text-white shadow-md' : 'text-gray-500 hover:text-[#d4af37]'}`}
                            >Ftese Luksoze</button>
                            <button
                              onClick={() => setInviteStyle('photo')}
                              className={`px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded transition-all duration-300 ${inviteStyle === 'photo' ? 'bg-[#1c1c1c] text-white shadow-md' : 'text-gray-500 hover:text-[#1c1c1c]'}`}
                            >Ftese Me Foto</button>
                          </div>
                        </div>

                        {inviteStyle === 'photo' && (
                          <div className="w-full flex flex-col items-center animate-[fadeInUp_0.4s_ease-out_forwards]">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2">Ngarko Fotografi</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="text-[11px] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#1c1c1c] file:text-white hover:file:bg-[#333] cursor-pointer w-full text-center"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col h-full justify-end">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Ngjyra e Tekstit</label>
                            <input
                              type="color"
                              value={inviteThemeColor}
                              onChange={e => setInviteThemeColor(e.target.value)}
                              className="w-full h-12 p-1 border border-gray-300 rounded cursor-pointer bg-white"
                            />
                          </div>
                          <div className="flex flex-col h-full justify-end">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">Ngjyra e Sfondit</label>
                            <input
                              type="color"
                              value={inviteBgColor}
                              onChange={e => setInviteBgColor(e.target.value)}
                              className="w-full h-12 p-1 border border-gray-300 rounded cursor-pointer bg-white"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleDownloadInvite}
                          disabled={isGenerating}
                          className={`w-full text-white py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-colors duration-500 flex items-center justify-center gap-2 shadow-lg ${isGenerating ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1c1c1c] hover:bg-[#333]'}`}
                        >
                          {isGenerating ? (
                            <span>Duke Gjeneruar...</span>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Shkarko Ftesat
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-[360px] aspect-[4/5.5] border border-gray-200 flex flex-col items-center justify-center p-12 text-center bg-[#faf9f7] transition-all">
                      <div className="w-16 h-[1px] bg-gray-300 mb-6"></div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium leading-relaxed">Formati i Ftesës do të shfaqet këtu</p>
                      <div className="w-16 h-[1px] bg-gray-300 mt-6"></div>
                    </div>
                  )}
                  <style>
                    {`
                      @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                      }
                    `}
                  </style>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}