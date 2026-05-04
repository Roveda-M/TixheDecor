import React, { useState } from 'react';

const BabyShower = () => {
  const [cart, setCart] = useState([]);

  const collections = [
  { id: 1, name: "Dekor i bardhë", altName: "Stil i pastër dhe elegant", price: 250, image: "babyshower/1.jpeg" },
  { id: 2, name: "Gender reveal", altName: "Zbulimi i gjinisë", price: 180, image: "babyshower/2.jpeg" },
  { id: 3, name: "Dekor rozë", altName: "Me arush dhe lule", price: 320, image: "babyshower/3.jpeg" },
  { id: 4, name: "Dekor me flutur", altName: "Me balona dhe flutur", price: 85, image: "babyshower/4.jpeg" },
  { id: 5, name: "Dekor i veqante", altName: "Me drita dhe elemente të buta", price: 95, image: "babyshower/5.jpeg" },
  { id: 6, name: "Fjongo rozë", altName: "Kënd për foto", price: 110, image: "babyshower/6.jpeg" },
  { id: 7, name: "Dekor për bebe", altName: "Me detaje të lezetshme blu", price: 150, image: "babyshower/18.jpeg" },
  { id: 8, name: "Dekor krem", altName: "Stil i ngrohtë dhe i thjeshtë", price: 75, image: "babyshower/8.jpeg" },
  { id: 9, name: "Dekor blu", altName: "Detaje qe bejne diferencen", price: 180, image: "babyshower/9.jpeg" },
  { id: 10, name: "Arushi", altName: "Dekor blu për baby boy", price: 190, image: "babyshower/10.jpeg" },
  { id: 11, name: "Zbulimi i gjinisë", altName: "Boy apo girl", price: 130, image: "babyshower/11.jpeg" },
  { id: 12, name: "Këndi i tortës", altName: "Dekor për tavolinën kryesore", price: 210, image: "babyshower/13.jpeg" },
  { id: 13, name: "Dekor pranveror", altName: "Me flutura dhe ngjyra të lehta", price: 160, image: "babyshower/12.jpeg" },
  { id: 14, name: "Tavolinë feste", altName: "E rregulluar komplet", price: 175, image: "babyshower/14.jpeg" },
  { id: 15, name: "Dekor vjollcë", altName: "Me detaje ari", price: 140, image: "babyshower/22.jpeg" },
  { id: 16, name: "Dekor klasik ", altName: "Stil i thjeshtë dhe i bukur", price: 90, image: "babyshower/23.jpeg" },
];
  const toggleCartItem = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (exists) {
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <div className="bg-[#F8F5F1] min-h-screen py-10 px-4 sm:px-8 lg:px-12 font-sans selection:bg-[#EADDCB] text-[#4A3B32]">
      <br />
      <br />
      <div className="max-w-[1500px] mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(215,195,170,0.15)] overflow-hidden pb-16 relative">
        <section className="relative w-full flex items-center mb-16 overflow-hidden" style={{ height: '75vh', minHeight: '500px', maxHeight: '750px' }}>
          <div className="absolute inset-0 z-0">
            <img
              alt="Baby Shower Hero"
              src="/babyshower/1.1.jpeg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 50%',
                filter: 'brightness(1.15) saturate(1.1) contrast(0.95)',
              }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0.15) 65%, transparent 100%)'
            }}></div>
            <div className="absolute bottom-0 left-0 w-full" style={{
              height: '80px',
              background: 'linear-gradient(to top, white, transparent)'
            }}></div>
          </div>

          <div className="relative z-10 w-full max-w-3xl px-6 sm:px-12 md:px-20 pt-8">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[1px] bg-[#C5B4A3]"></div>
              </div>

              <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.1] text-[#4A3B32] mb-4 sm:mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Baby <span className="text-[#C5B4A3] italic block mt-1">Shower.</span>
              </h1>

              <p className="text-[#7A685B] text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-md border-l-2 border-[#EBE3DB] pl-4 sm:pl-5">
                Ne krijojmë dekorin perfekt për ditën tuaj më të rëndësishme.
              </p>
            </div>
          </div>
        </section>

        <div className="px-6 sm:px-12 md:px-20 mb-12 text-center relative z-10">
          <span className="text-[#A68F7C] uppercase tracking-[0.3em] text-xs font-bold mb-3 block">Zgjidhni Detajet</span>
          <h2 className="text-[2.2rem] md:text-[3rem] text-[#4A3B32] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Llojet e Dekoreve
          </h2>
          <div className="w-16 h-[2px] bg-[#C5B4A3] mx-auto opacity-60"></div>
        </div>

        <section className="px-4 sm:px-12 md:px-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 relative z-10 w-full mb-8">
          {collections.map((item) => {
            const isSelected = cart.find(i => i.id === item.id);
            return (
              <div
                key={item.id}
                className="group relative cursor-pointer"
                onClick={() => toggleCartItem(item)}
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-[2rem] transition-all duration-500 bg-[#F8F5F1]
                    ${isSelected ? 'shadow-[0_15px_30px_rgba(197,180,163,0.4)] scale-[1.02]' : 'shadow-md group-hover:shadow-[0_15px_35px_rgba(197,180,163,0.2)]'}`}
                  style={{
                    border: isSelected ? '3px solid #C5B4A3' : '3px solid transparent'
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />

                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
                    <button
                      className={`p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${isSelected ? 'bg-[#C5B4A3] text-white hover:bg-[#8E786B] scale-110' : 'bg-white/90 text-gray-400 hover:bg-white hover:text-[#C5B4A3] hover:scale-110'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill={isSelected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className={`absolute bottom-0 left-0 w-full bg-black/70 text-white py-2 sm:py-3 text-center transition-all duration-500 z-30 ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <p className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">Zgjedhur</p>
                  </div>

                  <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none z-10 ${isSelected ? 'bg-gradient-to-t from-black/70 via-black/10 to-transparent' : 'bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 group-hover:via-black/20'}`}></div>

                  <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 transition-transform duration-500 z-20 flex flex-col justify-end">
                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-base sm:text-xl md:text-2xl text-white mb-1 drop-shadow-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                      <p className="text-white/90 text-[10px] sm:text-sm font-medium tracking-wide mb-1 sm:mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[50ms] drop-shadow-md">{item.altName}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div >

      < style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div >
  );
};

export default BabyShower;
