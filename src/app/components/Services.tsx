"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Service = {
  num: string;
  name: string;
  desc: string;
  details: {
    intro: string;
    items: { title: string; desc: string }[];
  };
};

const services: Service[] = [
  {
    num: "01",
    name: "Kosmetologia",
    desc: "Profesjonalne zabiegi pielęgnacyjne dopasowane do Twojego typu skóry. Oczyszczanie, nawilżanie, anti-aging.",
    details: {
      intro:
        "Oferujemy szeroki zakres zabiegów kosmetologicznych wykonywanych przez certyfikowane kosmetolożki z wieloletnim doświadczeniem. Każdy zabieg poprzedza szczegółowa analiza skóry i dobór odpowiednich preparatów.",
      items: [
        { title: "Oczyszczanie i peeling", desc: "Głębokie oczyszczanie porów, peelingi enzymatyczne i mechaniczne, mikrodermabrazja — skuteczne usuwanie martwego naskórka i zanieczyszczeń." },
        { title: "Nawilżanie i odżywanie", desc: "Zabiegi z kwasem hialuronowym, maseczki algowe i kolagenowe, mezoterapia bezigłowa. Intensywne nawilżenie przywracające skórze blask." },
        { title: "Anti-aging", desc: "Lifting ultradźwiękowy HIFU, RF (radiofrekwencja), elektrostymulacja mięśni twarzy. Widoczne ujędrnienie i redukcja zmarszczek." },
        { title: "Zabiegi na trądzik i przebarwienia", desc: "Peelingi chemiczne (kwas azelainowy, migdałowy, laktobionowy), terapia LED, zabiegi łagodzące stany zapalne." },
      ],
    },
  },
  {
    num: "02",
    name: "Modelowanie sylwetki",
    desc: "Nowoczesne zabiegi wyszczuplające i modelujące. Cavitation, RF, lipolaser — skuteczne efekty.",
    details: {
      intro:
        "Stosujemy najnowocześniejszy sprzęt do bezinwazyjnego modelowania sylwetki. Zabiegi są bezbolesne, nie wymagają rekonwalescencji i przynoszą mierzalne efekty już po kilku sesjach.",
      items: [
        { title: "Kawitacja ultradźwiękowa", desc: "Bezinwazyjna lipoliza oparta na falach ultradźwiękowych. Rozbija komórki tłuszczowe, redukuje cellulit i wygładza skórę skórki pomarańczowej." },
        { title: "Radiofrekwencja RF", desc: "Termiczne ujędrnianie tkanek głębszych warstw skóry. Stymuluje produkcję kolagenu, skutecznie walczy z wiotczeniem i cellulitem." },
        { title: "Lipolaser", desc: "Laserowe rozbijanie tkanki tłuszczowej przy użyciu diodowych głowic laserowych. Bezbolesna alternatywa dla liposukcji." },
        { title: "Drenaż limfatyczny", desc: "Presoterapia i ręczny drenaż limfatyczny — redukcja obrzęków, detoksykacja organizmu, poprawa krążenia." },
      ],
    },
  },
  {
    num: "03",
    name: "Stylizacja rzęs",
    desc: "Przedłużanie, zagęszczanie i laminowanie rzęs. Metoda 1:1, objętościowa i rosyjski wachlarz.",
    details: {
      intro:
        "Nasze artystki rzęs pracują wyłącznie na certyfikowanych klejach i włoskach najwyższej jakości. Efekt jest trwały, naturalny i w pełni bezpieczny dla Twoich naturalnych rzęs.",
      items: [
        { title: "Metoda 1:1 (klasyczna)", desc: "Do każdej naturalnej rzęsy doklejana jest jedna sztuczna. Efekt: eleganckie podkreślenie oka, naturalny wygląd. Trwałość ok. 3–4 tygodnie." },
        { title: "Metoda objętościowa 2D–6D", desc: "Na jedną rzęsę zakładany jest wachlarzyk 2–6 włosków. Efekt bardziej dramatyczny i puszysty, idealny na wieczór." },
        { title: "Rosyjski wachlarz (mega volume)", desc: "Wachlarze 7D–15D z ultralekkich włosków. Maksymalna objętość przy zachowaniu lekkości — efekt spektakularny." },
        { title: "Laminowanie rzęs", desc: "Uniesienie i utrwalenie naturalnych rzęs w trwałej ondulacji. Efekt uniesionego spojrzenia bez doklejania włosków. Trwałość 6–8 tygodni." },
      ],
    },
  },
  {
    num: "04",
    name: "Stylizacja brwi",
    desc: "Henna, laminowanie, regulacja i makijaż permanentny brwi. Podkreśl swój naturalny wygląd.",
    details: {
      intro:
        "Brwi to rama dla twarzy — odpowiednio zadbane odmieniają cały wygląd. Dobieramy kształt indywidualnie do rysów twarzy i preferencji klientki.",
      items: [
        { title: "Henna brwi", desc: "Naturalne barwienie włosków i skóry pod brwiami. Efekt wypełnionych, ciemnych brwi utrzymuje się 2–4 tygodnie na włosku i ok. 1–2 tygodnie na skórze." },
        { title: "Laminowanie brwi", desc: "Trwałe układanie włosków brwiowych nadające im jednolity, gęsty kształt. W zestawie regulacja i henna. Efekt 6–8 tygodni." },
        { title: "Regulacja i stylizacja", desc: "Precyzyjna regulacja pęsetą lub woskiem z uwzględnieniem naturalnego kształtu brwi. Dobór kształtu do owalnego twarzy." },
        { title: "Makijaż permanentny", desc: "Techniki: ombre powder brows, microblading, nanobrows. Efekt naturalnych, wypełnionych brwi utrzymuje się 1–2 lata." },
      ],
    },
  },
  {
    num: "05",
    name: "Paznokcie",
    desc: "Manicure klasyczny, hybrydowy, żelowy. Pedicure, zdobienia, nail art — piękne paznokcie przez cały miesiąc.",
    details: {
      intro:
        "Oferujemy kompleksową pielęgnację dłoni i stóp. Pracujemy na produktach renomowanych marek — Semilac, Indigo, Halo. Dbamy o higienę i bezpieczeństwo każdej klientki.",
      items: [
        { title: "Manicure hybrydowy", desc: "Klasyczne przygotowanie płytki + lakier hybrydowy utwardzany w lampie UV/LED. Trwałość 3–4 tygodnie, setki kolorów do wyboru." },
        { title: "Przedłużanie żelem / akrylem", desc: "Budowanie długości na formach lub tipach. Żel daje naturalny efekt, akryl — wyjątkową wytrzymałość. Możliwa dowolna długość." },
        { title: "Pedicure klasyczny i hybrydowy", desc: "Pielęgnacja stóp: usuwanie naskórka, opiłowanie, modelowanie, nawilżanie + lakier klasyczny lub hybrydowy." },
        { title: "Nail art i zdobienia", desc: "Folia transferowa, efekt chromu, naklejki 3D, zdobienia ręczne. Dowolna kreacja — od subtelnych akcentów po artystyczne projekty." },
      ],
    },
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => setActiveService(null), []);

  useEffect(() => {
    if (!activeService) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeService, closeModal]);

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-32 px-8 md:px-24 bg-white" id="uslugi">
        <div className="max-w-[600px] mb-12 md:mb-20">
          <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Nasze usługi</p>
          <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight max-w-[28rem] mb-6">
            Kompleksowa pielęgnacja dla <em className="text-rose italic font-normal">Ciebie</em>
          </h2>
          <p className="reveal delay-2 text-[0.88rem] leading-[1.8] text-muted max-w-[30rem]">
            Każda wizyta to wyjątkowe doświadczenie. Nasz zespół specjalistów zadba o każdy detal Twojego wyglądu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-beige border border-beige overflow-hidden">
          {services.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActiveService(s)}
              className={`reveal delay-${i + 1} bg-white p-8 md:p-10 text-left cursor-pointer transition-colors duration-300 relative group overflow-hidden hover:bg-cream ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-rose scale-x-0 origin-left transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <div className="font-serif text-[3.5rem] font-light text-beige leading-none mb-4 transition-colors duration-300 group-hover:text-rose-light">
                {s.num}
              </div>
              <div className="font-serif text-[1.3rem] font-normal mb-3 tracking-tight">
                {s.name}
              </div>
              <div className="text-[0.8rem] leading-[1.75] text-muted">
                {s.desc}
              </div>
              <div className="inline-flex items-center gap-2 mt-6 text-[0.68rem] tracking-[0.15em] uppercase text-rose font-medium transition-all duration-200 group-hover:gap-[0.85rem]">
                Dowiedz się więcej
                <svg viewBox="0 0 16 16" className="w-3 h-3 stroke-rose fill-none stroke-[1.5]">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={activeService.name}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark/50 backdrop-blur-[3px]"
            onClick={closeModal}
          />

          {/* Panel */}
          <div className="modal-enter relative bg-cream w-full max-w-md shadow-2xl overflow-hidden">

            {/* Decorative number */}
            <div className="absolute -top-6 -right-3 font-serif text-[9rem] font-light text-beige leading-none select-none pointer-events-none">
              {activeService.num}
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-7 h-7 flex items-center justify-center text-muted hover:text-dark transition-colors"
              aria-label="Zamknij"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[1.5]">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="px-7 pt-9 pb-7">
              {/* Header */}
              <p className="text-[0.58rem] tracking-[0.3em] uppercase text-rose mb-2">
                {activeService.num}
              </p>
              <h3 className="font-serif text-[1.55rem] font-light tracking-tight leading-tight mb-3">
                {activeService.name}
              </h3>
              <div className="w-7 h-px bg-rose mb-5" />

              {/* Intro */}
              <p className="text-[0.78rem] leading-[1.8] text-muted mb-6">
                {activeService.details.intro}
              </p>

              {/* Items — 2×2 grid matching site design language */}
              <div className="grid grid-cols-2 gap-px bg-beige border border-beige overflow-hidden mb-6">
                {activeService.details.items.map((item) => (
                  <div key={item.title} className="bg-cream p-4 group/item">
                    <p className="text-[0.72rem] font-medium text-mid mb-1 tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-[0.7rem] leading-[1.65] text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#rezerwacja"
                onClick={closeModal}
                className="flex items-center justify-center gap-2.5 bg-rose text-white text-[0.65rem] tracking-[0.22em] uppercase font-medium py-3.5 hover:bg-rose-dark transition-colors duration-200"
              >
                Umów wizytę
                <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 stroke-white fill-none stroke-[1.5]">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
