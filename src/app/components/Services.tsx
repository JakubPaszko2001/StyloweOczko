"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    name: "Kosmetologia",
    desc: "Profesjonalne zabiegi pielęgnacyjne dopasowane do Twojego typu skóry. Oczyszczanie, nawilżanie, anti-aging.",
  },
  {
    num: "02",
    name: "Modelowanie sylwetki",
    desc: "Nowoczesne zabiegi wyszczuplające i modelujące. Cavitation, RF, lipolaser — skuteczne efekty.",
  },
  {
    num: "03",
    name: "Stylizacja rzęs",
    desc: "Przedłużanie, zagęszczanie i laminowanie rzęs. Metoda 1:1, objętościowa i rosyjski wachlarz.",
  },
  {
    num: "04",
    name: "Stylizacja brwi",
    desc: "Henna, laminowanie, regulacja i makijaż permanentny brwi. Podkreśl swój naturalny wygląd.",
  },
  {
    num: "05",
    name: "Paznokcie",
    desc: "Manicure klasyczny, hybrydowy, żelowy. Pedicure, zdobienia, nail art — piękne paznokcie przez cały miesiąc.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-32 px-20 bg-white" id="uslugi">
      <div className="max-w-[600px] mb-20">
        <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Nasze usługi</p>
        <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight max-w-[28rem] mb-6">
          Kompleksowa pielęgnacja dla <em className="text-rose italic font-normal">Ciebie</em>
        </h2>
        <p className="reveal delay-2 text-[0.88rem] leading-[1.8] text-muted max-w-[30rem]">
          Każda wizyta to wyjątkowe doświadczenie. Nasz zespół specjalistów zadba o każdy detal Twojego wyglądu.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-beige border border-beige overflow-hidden">
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`reveal delay-${i + 1} bg-white p-10 cursor-pointer transition-colors duration-300 relative group overflow-hidden hover:bg-cream`}
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
