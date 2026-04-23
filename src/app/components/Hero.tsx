"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import HeroImage from "../assets/Face.png";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY;
      if (imgRef.current && s < window.innerHeight) {
        imgRef.current.style.transform = `translateY(${s * 0.1}px) scale(1.1)`;
      }
    };

    const revealEls = heroRef.current?.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls?.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden bg-[#FAF7F4]"
      id="hero"
    >
      {/* LEWA STRONA: TREŚĆ */}
      <div className="flex flex-col justify-center px-8 md:px-24 pt-20 pb-20 relative z-20">
        <div className="reveal opacity-0 translate-y-4 transition-all duration-700 text-[0.65rem] tracking-[0.3em] uppercase text-[#C4876A] mb-12 flex items-center gap-3">
          <span className="text-[10px]">✦</span>
          Projekt piękna
          <span className="text-[10px]">✦</span>
        </div>

        <h1 className="reveal delay-100 opacity-0 translate-y-4 transition-all duration-700 font-serif text-[clamp(3.5rem,6vw,5.5rem)] font-light leading-[1] tracking-tight mb-2 text-[#1E120D]">
          Twoje piękno<br />to nasza
          <em className="italic text-[#C4876A] font-normal block text-[1.1em] mt-1">pasja</em>
        </h1>

        <p className="reveal delay-200 opacity-0 translate-y-4 transition-all duration-700 text-[0.85rem] leading-[1.8] text-[#9B7B6A] max-w-[28rem] my-10 font-light">
          Profesjonalne studio beauty w sercu miasta. Kosmetologia, modelowanie sylwetki, stylizacja rzęs i brwi, paznokcie — wszystko w jednym miejscu.
        </p>

        <div className="reveal delay-300 opacity-0 translate-y-4 transition-all duration-700 flex items-center gap-10">
          <button
            onClick={() => scrollToSection("rezerwacja")}
            className="bg-[#1E120D] text-white px-10 py-4 text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-[#C4876A] transition-all duration-500"
          >
            Umów wizytę
          </button>
          <button
            onClick={() => scrollToSection("uslugi")}
            className="text-[0.7rem] tracking-[0.2em] uppercase text-[#1E120D] flex items-center gap-3 font-medium hover:text-[#C4876A] transition-colors group"
          >
            Nasze usługi
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>

        <div className="reveal delay-500 opacity-0 absolute bottom-12 left-24 flex items-center gap-4 text-[0.65rem] tracking-[0.2em] uppercase text-[#9B7B6A] font-light">
          <div className="w-12 h-[1px] bg-[#9B7B6A]/30" />
          Studio Beauty
        </div>
      </div>

      {/* PRAWA STRONA: ZDJĘCIE DOSUNIĘTE DO KRAWĘDZI */}
      <div
        className="relative h-full w-full hidden lg:block overflow-visible"
        style={{
          // Clip-path tworzy mocny skos zaczynający się od środka strony na dole
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        <div className="w-full h-full relative">
          <Image
            ref={imgRef}
            src={HeroImage}
            alt="Studio Beauty"
            fill
            priority
            quality={100}
            className="object-cover object-center scale-100 transition-transform duration-100 ease-out"
          />
        </div>
      </div>

      {/* Styl dla animacji reveal */}
      <style jsx global>{`
        .reveal.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .delay-500 { transition-delay: 0.5s; }
      `}</style>
    </section>
  );
}