"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import data from "@/assets/data.json";

const slides = data.banners.map((banner, i) => ({
  id: banner.id,
  image: banner.image,
  eyebrow: ["Mahe Ramadan Sale", "Exclusive For Him", "New Arrivals"][i] ?? "Aura Sentiments",
  title: ["Upto 40%\nOFF", "Men's Attar\nCollection", "Women's Attar\nCollection"][i] ?? "Premium Attars",
  titleHighlight: [true, true, true][i],
  desc: [
    "Shop our finest non-alcoholic attars at unbeatable Ramadan prices. Limited time only.",
    "Bold, powerful, long-lasting — fragrances crafted for the modern man who values heritage.",
    "Floral, elegant, divine — a curated collection for the woman who leaves a lasting impression.",
  ][i] ?? "",
  cta: ["Shop the Sale", "Explore Men's", "Explore Women's"][i] ?? "Shop Now",
  align: ["center", "left", "right"][i] as "center" | "left" | "right",
}));

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, [current, isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Auto-play every 5s
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);



  return (
    <div className="relative w-full h-[350px] lg:h-[750px] overflow-hidden bg-[#0d0d0d] mt-[89px]">

      {/* Background Images — crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image}
            alt="Banner Image"
            fill
            priority={i === 0}
            className=" object-fit "
          />
        </div>
      ))}



      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[3px] rounded-full transition-all duration-400 ${i === current ? "w-10 bg-[#fdb61b]" : "w-5 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-[#fdb61b] hover:border-[#fdb61b] hover:text-black transition-all"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-[#fdb61b] hover:border-[#fdb61b] hover:text-black transition-all"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <div
          key={current}
          className="h-full bg-[#fdb61b] animate-[progress_5s_linear_forwards]"
          style={{ width: "100%", animation: "progress 5s linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
}
