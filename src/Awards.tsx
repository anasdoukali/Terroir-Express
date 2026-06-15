import { useEffect, useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import terroir_logo from "./images/logo.png";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ACCENT_GREEN,
  ACCENT_RED,
  AmbientGrid,
  AnimatedCounter,
  CURTAIN_EASE,
  FloatingGeometry,
  FloatingParticles,
  MagneticPanel,
  PREMIUM_EASE,
  SplitReveal,
} from "./components/primitives";
import { useLenisGsap } from "./hooks/useLenisGsap";
import { NavBar, type NavRoute } from "./components/NavBar";

gsap.registerPlugin(ScrollTrigger);

/* ───────── helpers ───────── */
const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/* ───────── data ───────── */

const awards = [
  {
    title: "Best Young Chef",
    desc: "Exceptional talent under 30 redefining Moroccan gastronomy.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 4l6.18 12.52L44 18.54l-10 9.74L36.36 44 24 37.52 11.64 44 14 28.28 4 18.54l13.82-2.02z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Gastronomy Innovation",
    desc: "Pioneering techniques, ingredients, or dining concepts.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M24 6v36M6 24h36M12 12l24 24M36 12L12 36" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
    ),
  },
  {
    title: "Mediterranean Excellence",
    desc: "Mastery of coastal fire, seasonal produce, and tradition.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 6C14 6 8 14 8 24c0 10 6 18 16 18s16-8 16-18S34 6 24 6z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 20c2-5 10-5 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="24" cy="32" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Pastry Championship",
    desc: "Architectural desserts and confection precision at the highest level.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="10" y="22" width="28" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 22V14a6 6 0 1112 0v8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="24" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "International Fusion",
    desc: "Borders dissolve on the plate — global vision, local soul.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 24h36" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

const winners = [
  { name: "Nadia El Amrani", title: "Young Chef 2025", image: img(36630804, 900, 1300) },
  { name: "Karim Ait Ouaziz", title: "Innovation Laureate", image: img(36430084, 900, 1300) },
  { name: "Sofia Benhima", title: "Mediterranean Master", image: img(4253315, 900, 1300) },
  { name: "Youssef Tazi", title: "Pastry Champion", image: img(4253130, 900, 1300) },
  { name: "Lina Ziani", title: "Fusion Visionary", image: img(8093910, 900, 1300) },
];

const ceremonyTimeline = [
  { year: "2022", title: "Inaugural Edition", text: "38 chefs, one stage, Casablanca.", image: img(17315427, 1400, 900) },
  { year: "2023", title: "Mediterranean Chapter", text: "Expanded to Barcelona & Marseille.", image: img(16120243, 1400, 900) },
  { year: "2024", title: "International Launch", text: "First global jury, 18 countries.", image: img(16935951, 1400, 900) },
  { year: "2025", title: "The Terroir Standard", text: "Innovation track & pastry summit.", image: img(17315434, 1400, 900) },
];

const statistics = [
  { value: 186, suffix: "+", label: "International Competitions" },
  { value: 72, suffix: "", label: "Elite Chef Laureates" },
  { value: 24, suffix: "", label: "Gastronomic Events" },
  { value: 9, suffix: "", label: "Innovation Awards" },
];

const heroShapes = [
  { className: "left-[7%] top-[20%] h-14 w-14", delay: 0, duration: 10 },
  { className: "right-[9%] top-[14%] h-20 w-12", delay: 1.1, duration: 12 },
  { className: "bottom-[18%] left-[13%] h-12 w-24", delay: 0.5, duration: 11 },
  { className: "bottom-[22%] right-[15%] h-9 w-9", delay: 1.8, duration: 9 },
  { className: "left-[38%] top-[8%] h-6 w-6", delay: 0.8, duration: 7 },
  { className: "right-[34%] bottom-[12%] h-16 w-8", delay: 2.1, duration: 10 },
];

type AwardsProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function Awards({ active, onNavigate }: AwardsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const winnersRef = useRef<HTMLElement | null>(null);
  const winnersTrackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 28, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 28, mass: 0.7 });
  const mouseGlow = useMotionTemplate`radial-gradient(660px circle at ${smoothX}px ${smoothY}px, rgba(183,7,13,0.24), rgba(0,0,0,0.1) 34%, transparent 68%)`;

  useLenisGsap(!reduceMotion);

  useEffect(() => {
    if (!rootRef.current) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          ".aw-reveal, .aw-card, .aw-timeline, .aw-stat, .aw-invite",
          { clearProps: "all", opacity: 1 },
        );
        return;
      }

      /* hero parallax */
      gsap.to(".aw-hero-bg", {
        yPercent: 18,
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: ".aw-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".aw-hero-light", {
        yPercent: 42,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: { trigger: ".aw-hero", start: "top top", end: "bottom top", scrub: true },
      });

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>(".aw-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 86, opacity: 0, filter: "blur(18px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: 1.3, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      /* award cards stagger */
      gsap.fromTo(
        ".aw-card",
        { y: 90, opacity: 0, scale: 0.93 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.1, ease: "power4.out", stagger: 0.1,
          scrollTrigger: { trigger: ".aw-grid", start: "top 78%" },
        },
      );

      /* trophy float */
      gsap.to(".aw-trophy-float", {
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: ".aw-trophy-section", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".aw-trophy-shadow", {
        scaleX: 0.85,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: { trigger: ".aw-trophy-section", start: "top bottom", end: "bottom top", scrub: true },
      });

      /* ceremony timeline */
      gsap.fromTo(
        ".aw-timeline",
        { y: 80, opacity: 0, filter: "blur(14px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)",
          duration: 1.2, ease: "power4.out", stagger: 0.14,
          scrollTrigger: { trigger: ".aw-timeline-grid", start: "top 78%" },
        },
      );

      /* stats */
      gsap.fromTo(
        ".aw-stat",
        { y: 64, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.05, ease: "power4.out", stagger: 0.09,
          scrollTrigger: { trigger: ".aw-stats-section", start: "top 76%" },
        },
      );

      /* invite */
      gsap.fromTo(
        ".aw-invite",
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.3, ease: "power4.out",
          scrollTrigger: { trigger: ".aw-invite-section", start: "top 78%" },
        },
      );

      /* horizontal winners (desktop) */
      media.add("(min-width: 768px)", () => {
        const section = winnersRef.current;
        const track = winnersTrackRef.current;
        if (!section || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, rootRef);

    return () => { media.revert(); ctx.revert(); };
  }, [reduceMotion]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#FFFFFF] text-[#000000] antialiased"
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <AmbientGrid />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-20 mix-blend-screen" style={{ background: mouseGlow }} />

      {/* curtain */}
      <motion.div
        aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-[#FFFFFF]"
        initial={{ y: "0%" }} animate={{ y: "-100%" }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.2 }}
      />

      <NavBar active={active} onNavigate={onNavigate} />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.28 }}
      >

        {/* ───────────── HERO ───────────── */}
        <section className="aw-hero relative flex min-h-screen items-center overflow-hidden">
          {/* dark cinematic BG: gala stage */}
          <img
            alt="Luxury ceremony stage" src={img(17315427, 2200, 1400)}
            className="aw-hero-bg absolute inset-0 h-full w-full object-cover opacity-100"
            decoding="async" fetchPriority="high"
          />
          <div className="absolute inset-0 media-dark-overlay" />
          <div className="aw-hero-light absolute -left-[10%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-[#B7070D]/28 blur-[160px]" />
          <div className="absolute bottom-[-14%] right-[-8%] h-[36rem] w-[36rem] rounded-full bg-[#000000]/22 blur-[150px]" />

          {/* metallic light streaks */}
          <motion.div
            aria-hidden className="absolute left-[16%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#B7070D]/25 to-transparent"
            animate={{ opacity: [0.12, 0.38, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden className="absolute right-[22%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#000000]/20 to-transparent"
            animate={{ opacity: [0.08, 0.28, 0.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          <FloatingParticles />
          <FloatingGeometry shapes={heroShapes} />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col px-6 py-32 md:px-10 lg:px-14">
            <motion.div
              className="mb-9 inline-flex max-w-max items-center gap-3 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/80 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#000000] backdrop-blur-xl"
              initial={{ y: 22, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: PREMIUM_EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-[1px] bg-[#B7070D] shadow-[0_0_18px_#B7070D]" />
              Celebrating Culinary Excellence
            </motion.div>

            <h1 className="max-w-[1200px] text-[clamp(3.3rem,9.5vw,10.5rem)] font-black uppercase leading-[0.83] tracking-[-0.085em] text-[#000000]">
              <SplitReveal
                ariaLabel="Terroir Awards"
                lines={["Terroir", "Awards"]}
              />
            </h1>

            <motion.div className="mt-9 h-px w-full max-w-[46rem] origin-left bg-gradient-to-r from-[#B7070D] via-[#125B12]/45 to-transparent" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1.1, duration: 1.2, ease: PREMIUM_EASE }} />

            <div className="mt-9 flex max-w-[1000px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <motion.p className="max-w-lg text-balance text-lg font-medium leading-8 text-[#000000] md:text-2xl md:leading-9" initial={{ y: 30, opacity: 0, filter: "blur(12px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 1.05, duration: 1.05, ease: PREMIUM_EASE }}>
                Where the world's finest terroir chefs are recognised, celebrated, and remembered.
              </motion.p>

              {/* Floating glass trophy card */}
              <motion.div
                className="max-w-[16rem] rounded-[1.75rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-5 shadow-[0_25px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                initial={{ y: 40, opacity: 0, filter: "blur(16px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.25, duration: 1.1, ease: PREMIUM_EASE }}
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-[#000000]/12 bg-gradient-to-br from-[#B7070D]/25 to-[#000000]/20 text-[#000000]">
                  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
                    <path d="M24 4l6.18 12.52L44 18.54l-10 9.74L36.36 44 24 37.52 11.64 44 14 28.28 4 18.54l13.82-2.02z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#000000]">
                  2025 Edition
                </p>
              </motion.div>
            </div>
          </div>

          {/* scroll indicator */}
          <motion.div aria-hidden className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.66rem] uppercase tracking-[0.35em] text-[#000000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
            <span>Discover</span>
            <span className="relative h-16 w-px overflow-hidden bg-[#000000]/12">
              <motion.span className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#B7070D] to-[#125B12]" animate={{ y: [-36, 70] }} transition={{ duration: 1.65, ease: "easeInOut", repeat: Infinity }} />
            </span>
          </motion.div>
        </section>

        {/* ───────────── AWARDS SHOWCASE ───────────── */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14" id="showcase">
          <div className="absolute left-[-12%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[#B7070D]/16 blur-[150px]" />
          <div className="absolute right-[-10%] bottom-[8%] h-[26rem] w-[26rem] rounded-full bg-[#000000]/14 blur-[140px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="aw-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Award Categories</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Five pillars of culinary prestige.
              </h2>
            </div>

            <div className="aw-grid grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {awards.map((award, i) => (
                <MagneticPanel
                  className="aw-card group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-6 backdrop-blur-2xl md:min-h-[27rem]"
                  key={award.title}
                  strength={0.6}
                >
                  {/* glow border pulse */}
                  <motion.div
                    aria-hidden className="absolute -inset-px rounded-[2rem] opacity-0 blur-md transition group-hover:opacity-100"
                    style={{ background: `linear-gradient(135deg, ${ACCENT_RED}, transparent 45%, ${ACCENT_GREEN})` }}
                    animate={{ opacity: [0.0, 0.22, 0.0] }}
                    transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* hover spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.13),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>0{i + 1}</span>
                      <span className="h-4 w-4 rounded-[0.25rem] border border-[#000000]/12 bg-[#FFFFFF]/80" />
                    </div>

                    <div>
                      <div className="mb-5 text-[#000000] transition-colors duration-500 group-hover:text-[#000000]">
                        {award.icon}
                      </div>
                      <h3 className="max-w-[13rem] text-2xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#000000] md:text-3xl">
                        {award.title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-[#000000]">{award.desc}</p>
                    </div>
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── TROPHY EXPERIENCE ───────────── */}
        <section className="aw-trophy-section relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(183,7,13,0.2),transparent_32%)]" />
          <FloatingParticles />

          {/* reflective metallic streaks */}
          <motion.div aria-hidden className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#B7070D]/15 to-transparent" animate={{ opacity: [0.1, 0.32, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

          <div className="relative mx-auto flex max-w-[1500px] flex-col items-center text-center">
            <p className="aw-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
              The Trophy
            </p>

            {/* large floating trophy visual */}
            <div className="aw-trophy-float relative">
              <motion.div
                className="relative mx-auto flex h-[22rem] w-[16rem] items-center justify-center rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 shadow-[0_40px_200px_rgba(183,7,13,0.08)] backdrop-blur-2xl md:h-[28rem] md:w-[20rem]"
                animate={reduceMotion ? {} : { y: [0, -16, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* metallic glow edge */}
                <motion.div
                  aria-hidden className="absolute -inset-px rounded-[2.4rem]"
                  style={{ background: `linear-gradient(160deg, ${ACCENT_RED}44, transparent 40%, ${ACCENT_GREEN}44)` }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* trophy image */}
                <img
                  alt="Crystal trophy" src={img(6532365, 600, 900)}
                  className="relative z-10 h-[70%] w-[70%] rounded-[1.6rem] object-contain drop-shadow-2xl"
                  decoding="async" loading="lazy"
                />
                {/* inner light sweep */}
                <motion.div
                  aria-hidden className="absolute -left-1/3 top-0 z-20 h-full w-1/3 skew-x-[-18deg] bg-[#000000]/08 blur-md"
                  animate={{ x: ["-40%", "520%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
              {/* shadow below */}
              <div className="aw-trophy-shadow mx-auto mt-6 h-4 w-36 rounded-full bg-[#000000]/08 blur-lg" />
            </div>

            <h2 className="aw-reveal mt-14 max-w-3xl text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.07em] text-[#000000]">
              Crafted for those who redefine the plate.
            </h2>
            <p className="aw-reveal mt-6 max-w-md text-lg leading-8 text-[#000000]">
              A singular object — a Terroir Award — given to the finest.
            </p>
          </div>
        </section>

        {/* ───────────── WINNERS SPOTLIGHT ─── horizontal pin ───────────── */}
        <section
          className="relative min-h-screen overflow-hidden bg-[#FFFFFF] py-24 md:py-0"
          id="winners"
          ref={winnersRef}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(183,7,13,0.18),transparent_28%),radial-gradient(circle_at_86%_66%,rgba(0,0,0,0.14),transparent_30%)]" />

          <div className="relative flex min-h-screen flex-col justify-center gap-12 px-6 md:px-10 lg:px-14">
            <div className="aw-reveal max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Winners Spotlight</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Laureates.
              </h2>
            </div>

            <div className="overflow-visible md:w-max" ref={winnersTrackRef}>
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {winners.map((w, i) => (
                  <MagneticPanel
                    className="group relative h-[62vh] min-h-[28rem] overflow-hidden rounded-[2.2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 shadow-[0_40px_140px_rgba(0,0,0,0.08)] md:w-[26rem] md:min-w-[26rem]"
                    key={w.name}
                    strength={0.55}
                  >
                    <motion.div
                      aria-hidden className="absolute -inset-px rounded-[2.2rem] opacity-0 blur-md transition group-hover:opacity-100"
                      style={{ background: `linear-gradient(130deg, ${ACCENT_RED}, transparent 45%, ${ACCENT_GREEN})` }}
                      animate={{ opacity: [0.0, 0.22, 0.0] }}
                      transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-px overflow-hidden rounded-[2.1rem]">
                      <img alt={w.name} src={w.image}
                        className="h-full w-full object-cover opacity-100 transition duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                        decoding="async" loading={i === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 media-readable-bottom" />

                      {/* spotlight flash */}
                      <motion.div
                        aria-hidden className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-18deg] media-light-sweep blur-md"
                        animate={{ x: ["-30%", "460%"] }}
                        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                      />

                      <div className="absolute left-5 top-5 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#000000] backdrop-blur-md">
                        {w.title}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000] md:text-4xl">{w.name}</h3>
                        <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </MagneticPanel>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── CEREMONY EXPERIENCE ── timeline ───────────── */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14" id="ceremony">
          <div className="absolute right-[-10%] top-[16%] h-[30rem] w-[30rem] rounded-full bg-[#000000]/16 blur-[150px]" />
          <FloatingParticles />

          <div className="mx-auto max-w-[1500px]">
            <div className="aw-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Ceremony editions.
              </h2>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                Each year a new stage, a deeper standard.
              </p>
            </div>

            {/* timeline animated line */}
            <motion.div
              aria-hidden
              className="mb-10 hidden h-px w-full origin-left bg-gradient-to-r from-[#B7070D] via-[#000000]/40 to-[#000000] md:block"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1, transition: { duration: 1.6, ease: PREMIUM_EASE } },
              }}
            />

            <div className="aw-timeline-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ceremonyTimeline.map((ev, i) => (
                <article className="aw-timeline group relative overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80" key={ev.year}>
                  <div className="relative h-[14rem] overflow-hidden">
                    <img alt={ev.title} src={ev.image}
                      className="h-full w-full object-cover opacity-100 transition duration-[1500ms] ease-out group-hover:scale-105 group-hover:opacity-90"
                      decoding="async" loading="lazy"
                    />
                    <div className="absolute inset-0 media-readable-bottom" />
                    {/* spotlight sweep */}
                    <motion.div
                      aria-hidden className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-18deg] bg-[#000000]/08 blur-md"
                      animate={{ x: ["-20%", "440%"] }}
                      transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="mb-3 inline-block text-[clamp(2.6rem,5vw,4rem)] font-black leading-none tracking-[-0.06em] text-[#000000]">{ev.year}</span>
                    <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000] md:text-3xl">{ev.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#000000]">{ev.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── STATISTICS ───────────── */}
        <section className="aw-stats-section relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute left-[10%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-[#B7070D]/16 blur-[120px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="aw-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Scale of prestige.
              </h2>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                Measured in excellence, not volume.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statistics.map((stat, i) => (
                <div className="aw-stat group relative min-h-[21rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl" key={stat.label}>
                  {/* floating corner shape */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-[1.2rem] border border-[#000000]/12 bg-gradient-to-br from-[#B7070D]/25 to-[#000000]/10 blur-[1px] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>Metric</span>
                      <span>0{i + 1}</span>
                    </div>
                    <div>
                      <div className="text-[clamp(4rem,8vw,7rem)] font-black leading-none tracking-[-0.075em] text-[#000000]">
                        <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                      </div>
                      <p className="mt-5 max-w-[15rem] text-xl font-semibold uppercase leading-6 tracking-[-0.03em] text-[#000000]">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── INVITATION ───────────── */}
        <section className="aw-invite-section relative flex min-h-[70vh] items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(183,7,13,0.22),transparent_30%),radial-gradient(circle_at_70%_72%,rgba(0,0,0,0.16),transparent_34%)]" />
          <FloatingParticles />

          <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="aw-reveal mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Participate</p>
              <h2 className="aw-reveal max-w-2xl text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Submit your craft.
              </h2>
              <p className="aw-reveal mt-7 max-w-md text-lg leading-8 text-[#000000]">
                Nominations are open for the 2026 edition. Culinary distinction awaits.
              </p>
            </div>

            <MagneticPanel className="aw-invite relative overflow-hidden rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-1 shadow-[0_40px_160px_rgba(0,0,0,0.08)] backdrop-blur-2xl" strength={0.4}>
              {/* animated glow border */}
              <motion.div
                aria-hidden className="pointer-events-none absolute -inset-px rounded-[2.4rem]"
                style={{ background: `linear-gradient(130deg, ${ACCENT_RED}, transparent 40%, ${ACCENT_GREEN})` }}
                animate={{ opacity: [0.2, 0.55, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative rounded-[2.2rem] bg-[#FFFFFF]/90 p-7 md:p-9">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#000000]">
                  <span>Nomination 2026</span>
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#B7070D] shadow-[0_0_20px_#B7070D]" />
                </div>
                <p className="mt-5 text-sm leading-6 text-[#000000]">
                  Submit your portfolio, signature dish, and vision statement. The jury reviews in Q1.
                </p>
                <a
                  className="group relative mt-7 inline-flex w-full items-center justify-center overflow-hidden rounded-[0.9rem] border border-[#000000]/12 bg-[#B7070D] py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition duration-500 hover:text-white"
                  href="mailto:awards@terroirexpress.com"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Begin Nomination</span>
                </a>
              </div>
            </MagneticPanel>
          </div>
        </section>

        {/* ───────────── FINAL ───────────── */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(183,7,13,0.26),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(0,0,0,0.18),transparent_34%)]" />
          <motion.div
            aria-hidden className="absolute inset-0"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle at 28% 58%, rgba(183,7,13,0.16), transparent 40%)" }}
          />
          <FloatingGeometry />
          <FloatingParticles />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="aw-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
              TERROIR EXPRESS · AWARDS
            </p>
            <h2 className="aw-reveal max-w-[1180px] text-[clamp(3.1rem,9.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">
              Excellence deserves recognition.
            </h2>
            <div className="aw-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <a
                  className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                  href="mailto:awards@terroirexpress.com"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Enter the Awards</span>
                </a>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("home")} type="button"
                >
                  Home
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("products")} type="button"
                >
                  Products
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("chef-club")} type="button"
                >
                  ChefClubs
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("contact")} type="button"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      {/* footer */}
      <footer className="relative z-10 border-t border-[#000000]/12 bg-[#FFFFFF] px-6 py-8 text-xs uppercase tracking-[0.32em] text-[#000000] md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <img src={terroir_logo} alt="Terroir Express Logo" className="h-8" />
          <span>Terroir Awards · 2026</span>
        </div>
      </footer>
    </div>
  );
}
