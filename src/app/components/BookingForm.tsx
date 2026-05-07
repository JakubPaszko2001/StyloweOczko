"use client";

import { useEffect, useRef } from "react";

export default function BookingForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealEls = sectionRef.current?.querySelectorAll(".reveal, .reveal-right");
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

  useEffect(() => {
    const container = widgetRef.current;
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://booksy.com/widget/code.js?id=35877&country=pl&lang=pl";
    container.appendChild(script);

    return () => { container.innerHTML = ""; };
  }, []);

  const contactItems = [
    {
      label: "Telefon",
      value: "728 278 503",
      href: "tel:+48728278503",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[1.5]">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.72 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.12 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "E-mail",
      value: "kontakt@styloweoczko.pl",
      href: "mailto:kontakt@styloweoczko.pl",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[1.5]">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Adres",
      value: "Słonimska 5/lok. 6, 15-029 Białystok",
      href: "https://share.google/yqa9pssvJ8DXFiW1a",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[1.5]">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: "Godziny otwarcia",
      value: "Pon: 8:00–20:00 | Wt–Czw: 8:00–18:00 | Pt: 8:00–16:00",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[1.5]">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-8 md:px-24 bg-beige flex flex-col lg:flex-row gap-16 lg:gap-24 items-start"
      id="rezerwacja"
    >
      <div className="lg:w-1/3 lg:sticky lg:top-32">
        <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Rezerwacja</p>
        <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight mb-8">
          Umów swoją <em className="text-rose italic font-normal">wizytę</em>
        </h2>
        <p className="reveal delay-2 text-[0.88rem] leading-[1.8] text-muted mb-12">
          Wybierz dogodny termin w naszym systemie rezerwacji online Booksy lub skontaktuj się z nami telefonicznie.
        </p>

        <div className="reveal delay-3">
          {contactItems.map((item) => {
            const inner = (
              <>
                <div className="w-9 h-9 bg-rose flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="text-[0.85rem] text-mid leading-[1.5]">
                  <strong className="block text-[0.68rem] tracking-[0.12em] uppercase text-muted font-medium mb-0.5">
                    {item.label}
                  </strong>
                  {item.value}
                </div>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 py-4 border-b border-rose/20 last:border-0 hover:opacity-75 transition-opacity"
              >
                {inner}
              </a>
            ) : (
              <div key={item.label} className="flex items-center gap-4 py-4 border-b border-rose/20 last:border-0">
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <div className="reveal-right lg:w-2/3 w-full bg-white shadow-sm overflow-hidden">
        <div className="p-10 md:p-14 flex flex-col items-center text-center">
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-rose mb-4">Rezerwacja online</p>
          <h3 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light tracking-tight leading-[1.15] mb-3">
            Zarezerwuj wizytę<br />
            przez <em className="text-rose italic font-normal">Booksy</em>
          </h3>
          <div className="w-8 h-px bg-rose mt-6 mb-10" />

          <div ref={widgetRef} />
        </div>
      </div>
    </section>
  );
}
