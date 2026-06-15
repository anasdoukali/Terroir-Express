import { useEffect, useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
} from "./components/primitives";
import { useLenisGsap } from "./hooks/useLenisGsap";
import { NavBar, type NavRoute } from "./components/NavBar";
import { TerroirStoryCarousel } from "./components/TerroirStoryCarousel";
import { GastronomicCollections } from "./components/GastronomicCollections";
import { SoulStatement } from "./components/SoulStatement";
import { ChefClubCommunity } from "./components/ChefClubCommunity";
import { WiskHero } from "./components/WiskHero";
import terroir_logo from "./images/logo.png";

gsap.registerPlugin(ScrollTrigger);

/* hero is now in WiskHero component */
const VIDEO_EXP_SRC = "https://videos.pexels.com/video-files/34720127/14717545_3840_2160_24fps.mp4";
const VIDEO_EXP_POSTER = "https://images.pexels.com/videos/34720127/pexels-photo-34720127.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2000&h=1200";

/* ── data ── */

const awardIcons = [
  { title: "Best Young Chef", icon: <path d="M24 4l6.18 12.52L44 18.54l-10 9.74L36.36 44 24 37.52 11.64 44 14 28.28 4 18.54l13.82-2.02z" /> },
  { title: "Gastronomy Innovation", icon: <>M24 6v36M6 24h36M12 12l24 24M36 12L12 36</> },
  { title: "Mediterranean Excellence", icon: <><circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="18"/><path d="M6 24h36"/></> },
  { title: "Pastry Championship", icon: <><rect x="10" y="22" width="28" height="18" rx="4"/><path d="M18 22V14a6 6 0 1112 0v8"/></> },
  { title: "International Fusion", icon: <><circle cx="24" cy="24" r="18"/><path d="M24 6c-7 0-13 6.2-13 14 0 10.5 13 22 13 22s13-11.5 13-22c0-7.8-6-14-13-14z"/></> },
];

const statistics = [
  { value: 500, suffix: "+", label: "Premium Products" },
  { value: 120, suffix: "+", label: "Hospitality Partners" },
  { value: 24, suffix: "+", label: "Culinary Destinations" },
  { value: 40, suffix: "+", label: "Exclusive Events" },
];

/* heroShapes moved into WiskHero */

type HomePageProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function HomePage({ active, onNavigate }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
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
        gsap.set(".hp-reveal, .hp-card, .hp-stat, .hp-collection, .hp-chef, .hp-award", { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.to(".hp-hero-bg", { yPercent: 18, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".hp-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hp-hero-light", { yPercent: 42, opacity: 0.65, ease: "none", scrollTrigger: { trigger: ".hp-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hp-video-bg", { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hp-video-section", start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".hp-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 86, opacity: 0, filter: "blur(18px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      gsap.fromTo(".hp-collection", { y: 80, opacity: 0, scale: 0.94, filter: "blur(12px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: ".hp-collections-grid", start: "top 78%" } });

      gsap.fromTo(".hp-award", { y: 80, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: ".hp-awards-grid", start: "top 78%" } });

      gsap.fromTo(".hp-stat", { y: 64, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: "power4.out", stagger: 0.09, scrollTrigger: { trigger: ".hp-stats-section", start: "top 76%" } });
    }, rootRef);

    return () => { media.revert(); ctx.revert(); };
  }, [reduceMotion]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFFFF] text-[#000000] antialiased" onPointerMove={handlePointerMove} ref={rootRef}>
      <AmbientGrid />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-20 mix-blend-screen" style={{ background: mouseGlow }} />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-[#FFFFFF]" initial={{ y: "0%" }} animate={{ y: "-100%" }} transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.2 }} />

      <NavBar active={active} onNavigate={onNavigate} />

      <motion.main className="relative z-10" initial={{ opacity: 0, filter: "blur(18px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.28 }}>

        {/* ════════ HERO ════════ */}
        <WiskHero />

        {/* ════════ TERROIR EXPRESS STORY CAROUSEL ════════ */}
        <TerroirStoryCarousel />

        {/* ════════ GASTRONOMIC COLLECTIONS ════════ */}
        <GastronomicCollections />

        {/* ════════ THE SOUL OF GASTRONOMY ════════ */}
        <SoulStatement />

        {/* ════════ CHEF CLUB COMMUNITY ════════ */}
        <div id="chef-preview">
          <ChefClubCommunity />
        </div>

        {/* ════════ AWARDS PREVIEW ════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute left-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[#B7070D]/16 blur-[140px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="hp-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Awards</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Prestige defined.</h2>
            </div>
            <div className="hp-awards-grid grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {awardIcons.map((a, i) => (
                <MagneticPanel className="hp-award group relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-6 backdrop-blur-2xl" key={a.title} strength={0.5}>
                  <motion.div aria-hidden className="absolute -inset-px rounded-[2rem] opacity-0 blur-md transition group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${ACCENT_RED}, transparent 50%, ${ACCENT_GREEN})` }} animate={{ opacity: [0.0, 0.2, 0.0] }} transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>0{i + 1}</span>
                      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#000000]" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{a.icon}</svg>
                    </div>
                    <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000]">{a.title}</h3>
                  </div>
                </MagneticPanel>
              ))}
            </div>
            <div className="hp-reveal mt-14 flex justify-center">
              <button className="group relative inline-flex overflow-hidden rounded-[0.9rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-4 text-[0.68rem] font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white" onClick={() => onNavigate("awards")} type="button">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative z-10">Explore Awards →</span>
              </button>
            </div>
          </div>
        </section>

        {/* ════════ VIDEO EXPERIENCE ════════ */}
        <section className="hp-video-section relative flex min-h-screen items-center overflow-hidden">
          <video autoPlay className="hp-video-bg absolute inset-0 h-full w-full object-cover" loop muted playsInline poster={VIDEO_EXP_POSTER} preload="metadata">
            <source src={VIDEO_EXP_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 media-dark-overlay" />
          <FloatingParticles />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-6 py-28 text-center md:px-10 lg:px-14">
            <p className="hp-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">The Fire</p>
            <h2 className="hp-reveal max-w-3xl text-[clamp(3rem,7.5vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
              Where passion meets precision.
            </h2>
            <p className="hp-reveal mt-6 max-w-lg text-lg leading-8 text-[#000000]">
              Every flame tells a story. Every plate, a legacy.
            </p>
          </div>
        </section>

        {/* ════════ STATISTICS ════════ */}
        <section className="hp-stats-section relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute left-[10%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-[#B7070D]/16 blur-[120px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="hp-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Impact</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Numbers with gravity.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statistics.map((stat, i) => (
                <div className="hp-stat group relative min-h-[21rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl" key={stat.label}>
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-[1.2rem] border border-[#000000]/12 bg-gradient-to-br from-[#B7070D]/25 to-[#000000]/10 blur-[1px] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]"><span>Metric</span><span>0{i + 1}</span></div>
                    <div>
                      <div className="text-[clamp(4rem,8vw,7rem)] font-black leading-none tracking-[-0.075em] text-[#000000]"><AnimatedCounter suffix={stat.suffix} value={stat.value} /></div>
                      <p className="mt-5 max-w-[15rem] text-xl font-semibold uppercase leading-6 tracking-[-0.03em] text-[#000000]">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CONTACT PREVIEW ════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(183,7,13,0.18),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.14),transparent_34%)]" />
          <FloatingParticles />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="hp-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Get in Touch</p>
                <h2 className="max-w-4xl text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Start the conversation.</h2>
              </div>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                Every great partnership begins with a single message.
              </p>
            </div>
            <MagneticPanel className="hp-card group relative overflow-hidden rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-1 shadow-[0_40px_160px_rgba(0,0,0,0.08)] backdrop-blur-2xl" strength={0.4}>
              <motion.div aria-hidden className="pointer-events-none absolute -inset-px rounded-[2.4rem]" style={{ background: `linear-gradient(130deg, ${ACCENT_RED}, transparent 40%, ${ACCENT_GREEN})` }} animate={{ opacity: [0.2, 0.55, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              <div className="relative flex flex-col items-center rounded-[2.2rem] bg-[#FFFFFF]/90 p-10 text-center md:p-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1rem] border border-[#000000]/12 bg-[#FFFFFF]/80 text-[#000000]">
                  <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8"><rect x="6" y="12" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.6" /><path d="M6 15l18 12 18-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="mt-6 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000] md:text-4xl">Let's Build Something Extraordinary</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#000000]">Gastronomy partnerships, private consultations, and hospitality innovation — all by conversation.</p>
                <button className="group relative mt-8 inline-flex overflow-hidden rounded-[1rem] border border-[#000000]/12 bg-[#B7070D] px-10 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white" onClick={() => onNavigate("contact")} type="button">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Open Contact →</span>
                </button>
              </div>
            </MagneticPanel>
          </div>
        </section>

        {/* ════════ FINAL ════════ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(183,7,13,0.24),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(0,0,0,0.18),transparent_34%)]" />
          <motion.div aria-hidden className="absolute inset-0" animate={{ opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle at 28% 58%, rgba(183,7,13,0.16), transparent 40%)" }} />
          <FloatingGeometry />
          <FloatingParticles />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="hp-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">TERROIR EXPRESS</p>
            <h2 className="hp-reveal max-w-[1180px] text-[clamp(3rem,9.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">The future of gastronomy.</h2>
            <div className="hp-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <button className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white" onClick={() => onNavigate("about")} type="button">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Enter the Universe</span>
                </button>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]" onClick={() => onNavigate("about")} type="button">About</button>
                <span className="text-[#000000]">·</span>
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]" onClick={() => onNavigate("products")} type="button">Products</button>
                <span className="text-[#000000]">·</span>
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]" onClick={() => onNavigate("chef-club")} type="button">ChefClubs</button>
                <span className="text-[#000000]">·</span>
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]" onClick={() => onNavigate("awards")} type="button">Awards</button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="relative z-10 border-t border-[#000000]/12 bg-[#FFFFFF] px-6 py-8 text-xs uppercase tracking-[0.32em] text-[#000000] md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <img src={terroir_logo} alt="Terroir Express Logo" className="h-8" />
          <span>© 2026 All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
