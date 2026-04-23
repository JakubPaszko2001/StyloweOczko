"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/Logo3.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a link or scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { id: "uslugi", label: "usługi" },
    { id: "onas", label: "o nas" },
    { id: "galeria", label: "galeria" },
    { id: "cennik", label: "cennik" },
    { id: "opinie", label: "opinie" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] px-8 md:px-24 flex items-center justify-between h-20 md:h-[88px] transition-all duration-500 border-b ${scrolled || isMenuOpen
          ? "bg-cream/90 backdrop-blur-[14px] border-[#C8A55B]"
          : "bg-transparent border-transparent"
          }`}
      >
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-serif text-xl md:text-[1.45rem] font-medium tracking-tight flex items-center gap-3 md:gap-4 group relative z-[110]"
        >
          <Image
            src={Logo}
            alt="Logo StyloweOczko"
            width={128}
            height={128}
            className="w-28 h-28 object-contain"
          />
          {/* <div className="hidden sm:block">
            Stylowe<span className="text-rose">Oczko</span>
          </div>
          <div className="sm:hidden text-lg">
            Stylowe<span className="text-rose">Oczko</span>
          </div> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-[0.72rem] tracking-[0.2em] uppercase font-medium">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-mid hover:text-rose transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollToSection("rezerwacja")}
          className="hidden md:block bg-rose text-white px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase font-medium hover:bg-rose-dark transition-colors"
        >
          Umów wizytę
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-mid transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-mid transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-mid transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-cream transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 px-6 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-2xl font-serif text-mid hover:text-rose transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection("rezerwacja")}
            className={`mt-4 bg-rose text-white px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-rose-dark transition-all duration-500 transform ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            style={{ transitionDelay: `${menuItems.length * 100}ms` }}
          >
            Umów wizytę
          </button>
        </div>

        <div className={`absolute bottom-12 flex flex-col items-center gap-2 text-rose/60 text-xs tracking-widest uppercase transition-all duration-700 delay-500 ${isMenuOpen ? "opacity-100" : "opacity-0"
          }`}>
          <span>Stylowe Oczko</span>
          <span className="w-12 h-px bg-rose/30"></span>
        </div>
      </div>
    </>
  );
}
