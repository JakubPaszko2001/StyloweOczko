"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animRing);
    };

    const onMouseEnter = () => {
      ring.style.transform += " scale(1.8)";
      ring.style.opacity = "0.5";
    };

    const onMouseLeave = () => {
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove);
    const animationFrame = requestAnimationFrame(animRing);

    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-rose rounded-full pointer-events-none z-[9999] transition-transform duration-150 opacity-100 mix-blend-multiply"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-rose rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-multiply"
      />
    </>
  );
}
