import { useState } from "react";

const faqs = [
  {
    q: "Çfarë është TixheDecor?",
    a: "TixheDecor është studio profesionale dekorimi për dasma dhe evenimente të veçanta. Ofrojmë shërbime të plota: rregullim lulesh, sfonde dekorative, ndriçim artistik dhe stilizim tavolinash  të gjitha të përshtatura sipas vizionit dhe dëshirave tuaja.",
  },
  {
    q: "A punoni jashtë Ferizajit?",
    a: "Po, kryejmë instalime në të gjithë territorin e Kosovës. Për evenimente më të mëdha ose në distancë, mund të bisedojmë për kushtet e udhëtimit. Na kontaktoni me datën dhe vendndodhjen e eventit tuaj dhe do t'ju japim ofertën e duhur.",
  },
  {
    q: "Sa kohë përpara duhet të bëjmë rezervimin?",
    a: "Datat e fundjavës rezervohen shumë shpejt, ndaj ju rekomandojmë të na kontaktoni të paktën 3–6 muaj përpara eventit. Rezervimet me afat më të shkurtër janë të mundshme në varësi të disponueshmërisë  na shkruani dhe shohim çfarë mund të bëjmë.",
  },
  {
    q: "A mund t'i personalizojmë paketat?",
    a: "Sigurisht. Çdo event është i veçantë dhe ne e trajtojmë si të tillë. Paketat tona janë plotësisht të personalizueshme  zgjidhni vetëm shërbimet që ju nevojiten dhe paguani vetëm për ato.",
  },
  {
    q: "Si mund të marrim një ofertë?",
    a: "Plotësoni formularin në faqen Kontakt duke specifikuar datën e eventit, vendndodhjen dhe stilin që preferoni. Do t'ju kthejmë përgjigje sa më shpejt me hapat e ardhshëm dhe një vlerësim të personalizuar.",
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-[#2b2b2b] hover:bg-[#f7f3ec]/60 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base">{question}</span>
        <span
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#f7f3ec] text-[#a67c52] text-lg leading-none"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#f7f3ec] to-[#eae6df] py-12 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="h-16 sm:h-20" aria-hidden />

        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2b2b2b] mb-2">
          Rreth nesh
        </h1>
        <p
          className="text-center text-gray-600 mb-10 sm:mb-14 text-sm sm:text-base max-w-2xl mx-auto"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Dekor i menduar me kujdes, për momente që do t'i mbani mend gjithmonë.
        </p>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center mb-14 md:mb-20">
          <div className="order-2 md:order-1 space-y-4">
            <p
              className="text-xs tracking-[0.2em] text-[#5a5a5a] uppercase"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              TixheDecor
            </p>
            <h2
              className="text-3xl sm:text-4xl text-[#2b2b2b] leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Ngjyra të ngrohta, detaje të rafinuara dhe planifikim pa stres.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kombinojmë lule, ndriçim dhe dizajn hapësinor që salla juaj të
              duket e plotë dhe harmonike  nga hyrja e parë deri te kërcimi i
              fundit. Çdo element zgjidhet me kujdes që të reflektojë stilin
              tuaj personal.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="/logo.png"
              alt="Stilizim lulesh TixheDecor"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Story */}
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl mb-14 md:mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2b2b] mb-4">
            Historia jonë
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            TixheDecor ka lindur nga një dëshirë e thjeshtë: t'i bëjmë momentet
            e rëndësishme të jetës edhe më të bukura. Specializohemi në dekorim
            për dasma, fejesa, ditëlindje, kanagjegje, synetie dhe çdo festë
            familjare  duke ofruar shërbim të personalizuar nga fillimi deri
            në fund.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Besojmë se çdo event ka historinë e vet. Prandaj punojmë ngushtë
            me çdo klient  nga zgjedhja e vendit dhe dekorimit, deri te
            detajet më të vogla si ftesat dhe aksesorët. Çdo vendim merret me
            kujdes, që rezultati final të jetë pikërisht ajo që keni imagjinuar.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Krahas dekorimit klasik me lule dhe sfondet elegante, ofrojmë edhe
            elemente moderne si ndriçim special, photo booth, efekte tymi dhe
            laser  për të krijuar një atmosferë të paharrueshme. Qëllimi ynë
            është i qartë: çdo moment i rëndësishëm për ju të bëhet një
            përvojë e jashtëzakonshme.
          </p>
        </div>

        {/* Values */}
        <div className="mb-14 md:mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2b2b] text-center mb-8">
            Çfarë na dallon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Punë me dorë",
                text: "Çdo rregullim lulesh dhe element dekorativ kryhet me dorë dhe kontrollohet në vend para mbërritjes së mysafirëve.",
              },
              {
                title: "Komunikim i qartë",
                text: "Afate të qarta, përgjigje të shpejta dhe një pikë kontakti të vetme  pa konfuzion dhe pa surpriza të padëshiruara.",
              },
              {
                title: "Harmoni vizuale",
                text: "Paleta ngjyrash dhe materialet zgjidhemi në përputhje me tonin e ftesave dhe me ambientin e sallës suaj.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50"
              >
                <h3 className="font-semibold text-[#2b2b2b] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Q&A */}
        <div className="pb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2b2b] text-center mb-2">
            Pyetje të shpeshta
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8 max-w-xl mx-auto">
            Klikoni mbi një pyetje për të lexuar përgjigjen. Gjeni informacion
            për rezervimet, shërbimet dhe mënyrën e funksionimit tonë.
          </p>
          <div className="flex flex-col gap-3 max-w-3xl mx-auto">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}