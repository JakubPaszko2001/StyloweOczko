"use client";

import { useEffect, useRef, useState } from "react";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      e.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

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
    <section ref={sectionRef} className="py-20 md:py-32 px-8 md:px-24 bg-beige flex flex-col lg:flex-row gap-16 lg:gap-24 items-center" id="rezerwacja">
      <div className="lg:w-1/2">
        <p className="reveal text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-5">Rezerwacja</p>
        <h2 className="reveal delay-1 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-light leading-[1.1] tracking-tight mb-8">
          Umów swoją <em className="text-rose italic font-normal">wizytę</em>
        </h2>
        <p className="reveal delay-2 text-[0.88rem] leading-[1.8] text-muted mb-12">
          Zarezerwuj termin online lub skontaktuj się z nami bezpośrednio. Odpiszemy w ciągu kilku godzin.
        </p>
        
        <div className="reveal delay-3 space-y-0">
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

      <div className="reveal-right lg:w-1/2 bg-white p-8 md:p-12 shadow-sm w-full">
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-rose mb-6">Formularz rezerwacji</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Imię</label>
              <input name="imie" type="text" placeholder="Anna" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Nazwisko</label>
              <input name="nazwisko" type="text" placeholder="Kowalska" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Telefon</label>
              <input name="telefon" type="tel" placeholder="+48 500 000 000" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">E-mail</label>
              <input name="email" type="email" placeholder="anna@email.pl" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Usługa</label>
              <select name="usluga" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required>
                <option value="">Wybierz usługę...</option>
                <option>Kosmetologia</option>
                <option>Stylizacja rzęs</option>
                <option>Stylizacja brwi</option>
                <option>Paznokcie</option>
                <option>Endermologia</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Data</label>
              <input name="data" type="date" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Godzina</label>
              <select name="godzina" className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light" required>
                <option>9:00</option><option>9:30</option><option>10:00</option><option>10:30</option>
                <option>11:00</option><option>12:00</option><option>13:00</option><option>14:00</option>
                <option>15:00</option><option>16:00</option><option>17:00</option><option>18:00</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[0.68rem] tracking-[0.15em] uppercase text-muted font-medium">Uwagi (opcjonalnie)</label>
              <textarea name="uwagi" placeholder="Dodatkowe informacje..." className="border border-beige p-3.5 text-[0.85rem] bg-cream outline-none focus:border-rose transition-colors font-light resize-none h-[100px]"></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full p-4 text-[0.72rem] tracking-[0.2em] uppercase font-medium transition-colors duration-200 mt-4 disabled:opacity-60 ${
              status === "success" ? "bg-green-700 text-white" :
              status === "error"   ? "bg-red-700 text-white" :
              "bg-rose text-white hover:bg-rose-dark"
            }`}
          >
            {status === "loading" ? "Wysyłanie..." :
             status === "success" ? "Wysłano! Odezwiemy się wkrótce ✓" :
             status === "error"   ? "Błąd – spróbuj ponownie" :
             "Wyślij rezerwację"}
          </button>
          <p className="text-[0.72rem] text-muted text-center mt-4">
            Odpiszemy w ciągu kilku godzin
          </p>
        </form>
      </div>
    </section>
  );
}
