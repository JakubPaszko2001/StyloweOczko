"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "„Absolutnie zachwycona! Rzęsy zrobione z niezwykłą precyzją, trzymają się już ponad miesiąc. Na pewno wróce!\"",
    author: "Karolina M. — Białystok",
  },
  {
    text: "„Manicure hybrydowy trzyma się rewelacyjnie, a wzorki są dokładnie takie, jak sobie wymarzyłam. Polecam z całego serca!\"",
    author: "Agnieszka K. — Białystok",
  },
  {
    text: "„Zabiegi na twarz przyniosły niesamowite efekty. Skóra wygląda o lata młodziej. Najlepsze studio w mieście!\"",
    author: "Marta W. — Białystok",
  },
  {
    text: "„Brwi w końcu wyglądają tak, jak chciałam. Mistrzyni słucha i rozumie — nie trzeba długo tłumaczyć. Wreszcie mój salon!\"",
    author: "Natalia P. — Białystok",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const goTo = (newIdx: number) => {
    setIdx((newIdx + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-32 px-20 bg-cream overflow-hidden" id="opinie">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
        <div className="lg:col-span-1">
          <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Opinie klientek</p>
          <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight mb-8">
            Co mówią o <em className="text-rose italic font-normal">nas</em>
          </h2>
          <p className="reveal delay-2 text-[0.88rem] leading-[1.8] text-muted mb-12">
            Zaufały nam tysiące kobiet. Ich satysfakcja to nasza największa nagroda.
          </p>
          <div className="reveal delay-3 flex gap-4 mt-12">
            <button
              onClick={() => goTo(idx - 1)}
              className="w-11 h-11 border border-beige flex items-center justify-center text-lg text-mid hover:bg-rose hover:border-rose hover:text-white transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={() => goTo(idx + 1)}
              className="w-11 h-11 border border-beige flex items-center justify-center text-lg text-mid hover:bg-rose hover:border-rose hover:text-white transition-all duration-200"
            >
              →
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 overflow-hidden -m-4 p-4">
          <div
            ref={trackRef}
            className="flex gap-8 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(calc(-${idx * 50}% - ${idx * 1}rem))` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(50%-1rem)] bg-white p-10 border-l-2 border-rose"
              >
                <div className="text-rose text-base mb-4 tracking-widest">★★★★★</div>
                <p className="font-serif text-[1.1rem] italic font-light leading-[1.7] text-mid mb-6">
                  {t.text}
                </p>
                <div className="text-[0.75rem] tracking-[0.1em] uppercase text-muted font-medium">
                  {t.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
