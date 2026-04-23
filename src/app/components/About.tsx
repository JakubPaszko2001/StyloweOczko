"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Essential from "../assets/Essentials.png"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll(".reveal-left, .reveal-right");
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

  const stats = [
    { num: "8+", label: "Lat doświadczenia" },
    { num: "2k+", label: "Zadowolonych klientek" },
    { num: "5★", label: "Średnia ocena" },
    { num: "20+", label: "Rodzajów zabiegów" },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center" id="onas">
      <div className="reveal-left relative">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={Essential}
            alt="Studio StyloweOczko"
            fill
            className="object-cover"
          />
          <div className="absolute -top-6 -left-6 w-3/5 h-3/5 border border-rose -z-10" />
        </div>
      </div>

      <div className="reveal-right">
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">O nas</p>
        <h2 className="font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight mb-8">
          Pasja do piękna w każdym <em className="text-rose italic font-normal">detalu</em>
        </h2>
        <blockquote className="font-serif text-[1.5rem] italic font-light text-mid border-l-2 border-rose pl-6 my-8 leading-[1.5]">
          „Wierzymy, że piękno to nie tylko wygląd — to pewność siebie, którą nosimy w sobie każdego dnia."
        </blockquote>
        <p className="font-serif text-[1.1rem] italic text-rose mt-2">
          — Zespół StyloweOczko
        </p>
        <div className="text-[0.88rem] leading-[1.9] text-muted space-y-4 mt-6">
          <p>
            Studio StyloweOczko to miejsce, gdzie profesjonalizm spotyka się z pasją. Każda z naszych specjalistek posiada certyfikaty i regularnie poszerza swoją wiedzę na szkoleniach w Polsce i za granicą.
          </p>
          <p>
            Używamy wyłącznie sprawdzonych, bezpiecznych produktów renomowanych marek. Twoje bezpieczeństwo i komfort to nasz priorytet.
          </p>
        </div>
        <button
          onClick={() => document.getElementById("rezerwacja")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-beige text-dark px-8 py-3.5 text-[0.72rem] tracking-[0.15em] uppercase font-medium hover:bg-rose hover:text-white transition-colors mt-8"
        >
          Poznaj nas bliżej
        </button>
      </div>
    </section>
  );
}
