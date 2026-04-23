"use client";

import { useEffect, useRef } from "react";

const categories = [
  {
    title: "Kosmetologia",
    services: [
      { name: "Oczyszczanie twarzy", price: "150 zł" },
      { name: "Peeling kawitacyjny", price: "180 zł" },
      { name: "Mikrodermabrazja", price: "200 zł" },
      { name: "Lifting twarzy RF", price: "250 zł" },
    ],
    note: "Ceny orientacyjne. Ostateczna wycena po konsultacji.",
  },
  {
    title: "Rzęsy & Brwi",
    featured: true,
    services: [
      { name: "Rzęsy 1:1", price: "180 zł" },
      { name: "Rzęsy objętościowe", price: "220 zł" },
      { name: "Laminowanie rzęs", price: "160 zł" },
      { name: "Laminowanie brwi", price: "120 zł" },
      { name: "Henna brwi", price: "60 zł" },
    ],
    note: "Uzupełnienia 50% ceny zabiegu.",
  },
  {
    title: "Paznokcie",
    services: [
      { name: "Manicure klasyczny", price: "70 zł" },
      { name: "Manicure hybrydowy", price: "110 zł" },
      { name: "Żel przedłużenie", price: "180 zł" },
      { name: "Pedicure klasyczny", price: "100 zł" },
      { name: "Nail art (od)", price: "20 zł" },
    ],
    note: "Ceny zdobień zależą od stopnia trudności.",
  },
];

export default function Pricing() {
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
    <section ref={sectionRef} className="py-20 md:py-32 px-8 md:px-24 bg-white" id="cennik">
      <div className="flex justify-between items-end mb-12 md:mb-16">
        <div>
          <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Cennik</p>
          <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight">
            Przejrzyste <em className="text-rose italic font-normal">ceny</em>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-beige border border-beige">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className={`reveal delay-${i + 1} p-8 md:p-10 relative transition-colors duration-300 ${cat.featured ? "bg-beige text-dark" : "bg-white"
              }`}
          >
            {cat.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-rose text-white text-[0.6rem] tracking-[0.15em] uppercase px-4 py-1.5 font-medium">
                Bestseller
              </div>
            )}
            <div className={`text-[0.68rem] tracking-[0.2em] uppercase font-medium mb-6 ${cat.featured ? "text-rose-dark" : "text-rose"
              }`}>
              {cat.title}
            </div>
            <div className="space-y-4">
              {cat.services.map((s) => (
                <div
                  key={s.name}
                  className={`flex justify-between items-baseline py-2.5 border-b ${cat.featured ? "border-dark/10" : "border-beige"
                    }`}
                >
                  <span className="text-[0.85rem]">{s.name}</span>
                  <span className="font-serif text-[1rem] font-normal text-rose">{s.price}</span>
                </div>
              ))}
            </div>
            <div className={`text-[0.75rem] leading-[1.6] mt-6 ${cat.featured ? "text-dark/50" : "text-muted"
              }`}>
              {cat.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
