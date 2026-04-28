"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import imgKosmetologia from "../assets/kosmetologia.png";
import imgRzesy from "../assets/rzesy.jpg";
import imgPaznokcie from "../assets/paznokcie.jpg";

const items = [
  { src: imgKosmetologia, label: "Kosmetologia", tall: true },
  { src: imgRzesy, label: "Stylizacja rzęs" },
  { src: imgPaznokcie, label: "Paznokcie", objectPosition: "50% 70%" },
];

export default function Gallery() {
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
    <section ref={sectionRef} className="py-20 md:py-32 px-8 md:px-24 bg-beige text-dark" id="galeria">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div>
          <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Galeria efektów</p>
          <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight text-dark">
            Nasze <em className="text-rose italic font-normal">realizacje</em>
          </h2>
        </div>
        <a
          href="https://www.instagram.com/styloweoczko_projekt_piekna"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal text-[0.72rem] tracking-[0.15em] uppercase text-dark/60 flex items-center gap-3 font-medium hover:text-rose transition-colors group"
        >
          Zobacz Instagram <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <div className="reveal delay-2 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-1 md:h-[760px]">
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative group overflow-hidden bg-mid h-[400px] md:h-auto ${item.tall ? "md:row-span-2" : ""}`}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover brightness-[0.85] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106 group-hover:brightness-100"
              style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-5 left-5 z-20 text-[0.7rem] tracking-[0.15em] uppercase text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
