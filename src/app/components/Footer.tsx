"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-beige text-dark pt-20 pb-10 px-8 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-1">
        <Link href="/" className="font-serif text-[1.6rem] font-medium tracking-tight mb-4 block">
          Stylowe<span className="text-rose">Oczko</span>
        </Link>
        <p className="text-[0.82rem] leading-[1.8] text-dark/50 max-w-[18rem] mb-6">
          Studio beauty w sercu Białegostoku. Twoje piękno to nasza pasja i misja każdego dnia.
        </p>
        <div className="flex gap-4">
          {["IG", "FB", "TK"].map((social) => (
            <a
              key={social}
              href={`https://www.${social === "IG" ? "instagram" : social === "FB" ? "facebook" : "tiktok"}.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-dark/15 flex items-center justify-center cursor-pointer transition-all duration-200 text-[0.85rem] text-dark/60 hover:bg-rose hover:border-rose hover:text-white"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-rose font-medium mb-6">Usługi</h4>
        <ul className="space-y-3">
          {["Kosmetologia", "Modelowanie sylwetki", "Stylizacja rzęs", "Stylizacja brwi", "Paznokcie"].map((s) => (
            <li key={s}>
              <button
                onClick={() => scrollToSection("uslugi")}
                className="text-[0.82rem] text-dark/50 hover:text-rose-dark transition-colors"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-rose font-medium mb-6">Studio</h4>
        <ul className="space-y-3">
          {[
            { label: "O nas", id: "onas" },
            { label: "Galeria", id: "galeria" },
            { label: "Opinie", id: "opinie" },
            { label: "Cennik", id: "cennik" },
            { label: "Rezerwacja", id: "rezerwacja" },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-[0.82rem] text-dark/50 hover:text-rose-dark transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-[0.65rem] tracking-[0.2em] uppercase text-rose font-medium mb-6">Kontakt</h4>
        <ul className="space-y-3 text-[0.82rem] text-dark/50">
          <li><a href="tel:+48512345678" className="hover:text-rose-dark transition-colors">+48 512 345 678</a></li>
          <li><a href="mailto:kontakt@styloweoczko.pl" className="hover:text-rose-dark transition-colors">kontakt@styloweoczko.pl</a></li>
          <li>ul. Lipowa 12</li>
          <li>15-950 Białystok</li>
          <li>Pon–Pt: 9–19, Sob: 9–16</li>
        </ul>
      </div>

      <div className="col-span-full border-t border-dark/10 pt-6 mt-12 flex justify-between text-[0.72rem] text-dark/30">
        <span>© 2025 StyloweOczko. Wszelkie prawa zastrzeżone.</span>
        <div className="flex gap-4">
          <span>Polityka prywatności</span>
          <span>Regulamin</span>
        </div>
      </div>
    </footer>
  );
}
