"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryBySlug } from "@/data/categories";

import "swiper/css";
import "swiper/css/effect-fade";

// Modern editorial aesthetic: huge text, minimal overlays, no harsh boxes.

const slides = [
  {
    id: 1,
    image: "/hero1.png",
    preTitle: "Operation 01",
    headline: "INDUSTRIAL",
    headlineSub: "GRADE",
    headlineEnd: "PRECISION",
    desc: "Premium tracksuits manufactured with precision. For modern athletes and forward-thinking brands.",
    target: "tracksuits"
  },
  {
    id: 2,
    image: "/hero2.png",
    preTitle: "Collection 02",
    headline: "STANDOUT",
    headlineSub: "OUTERWEAR",
    headlineEnd: "CRAFTSMANSHIP",
    desc: "From lightweight windbreakers to insulated bombers. Superior materials, uncompromised quality.",
    target: "jackets"
  },
  {
    id: 3,
    image: "/hero3.png",
    preTitle: "Collection 03",
    headline: "UNIFIED",
    headlineSub: "IDENTITY",
    headlineEnd: "& SPIRIT",
    desc: "Complete custom team kits. Global scale manufacturing with intricate bespoke detailing.",
    target: "team-uniforms"
  }
];

export default function Hero() {
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative h-screen min-h-[700px] w-full bg-black">

      <Swiper
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        speed={1200}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {({ isActive }) => (
              <>
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={slide.headline}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center grayscale mix-blend-screen"
                    style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)', transition: 'transform 8s ease-out' }}
                  />
                  {/* Subtle vignette / darkening to make text pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Editorial Layout */}
                <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-10 lg:px-16 lg:pb-32">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl"
                      >
                        <p className="mb-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-primary)] opacity-90">
                          {slide.preTitle}
                        </p>

                        <h1 className="flex flex-col font-black uppercase tracking-tighter leading-[0.85]">
                          <span className="text-[clamp(4rem,9vw,9rem)] text-white">{slide.headline}</span>
                          <span className="text-[clamp(4rem,9vw,9rem)] text-white/50">{slide.headlineSub}</span>
                          <span className="text-[clamp(4rem,9vw,9rem)] text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                            {slide.headlineEnd}
                          </span>
                        </h1>

                        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
                          <p className="max-w-md text-sm sm:text-lg leading-relaxed text-white/70 font-medium">
                            {slide.desc}
                          </p>

                          <div className="flex gap-6 shrink-0">
                            <Link
                              href={`/categories/${slide.target}`}
                              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:text-[var(--color-primary)]"
                            >
                              Explore Collection
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Minimalist Controls */}
      <div className="absolute top-1/2 right-6 lg:right-16 z-20 flex flex-col items-center gap-6 -translate-y-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="text-white/40 hover:text-white transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 15l8-8 8 8" />
          </svg>
        </button>

        <div className="flex flex-col gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className="relative py-2 flex justify-center group"
            >
              <span className={`w-[2px] rounded-full transition-all duration-500 ${activeIdx === i ? "h-12 bg-[var(--color-primary)]" : "h-4 bg-white/20 group-hover:bg-white/60"}`} />
            </button>
          ))}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="text-white/40 hover:text-white transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 9l-8 8-8-8" />
          </svg>
        </button>
      </div>

    </div>
  );
}