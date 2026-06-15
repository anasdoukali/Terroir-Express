import { useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import terroir_logo from "./images/logo.png";
import {
  AnimatePresence,
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
  CURTAIN_EASE,
  FloatingGeometry,
  FloatingParticles,
  MagneticPanel,
  PREMIUM_EASE,
  SplitReveal,
} from "./components/primitives";
import { NavBar, type NavRoute } from "./components/NavBar";
import { useLenisGsap } from "./hooks/useLenisGsap";

gsap.registerPlugin(ScrollTrigger);

const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const HERO_VIDEO = "https://videos.pexels.com/video-files/34720127/14717545_3840_2160_24fps.mp4";
const HERO_POSTER = "https://images.pexels.com/videos/34720127/pexels-photo-34720127.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2000&h=1200";
const VIDEO_EXP_SRC = "https://videos.pexels.com/video-files/4926209/4926209-uhd_4096_2160_30fps.mp4";
const VIDEO_EXP_POSTER = "https://images.pexels.com/videos/4926209/pexels-photo-4926209.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2000&h=1200";

/* ── data ── */
const products = [
  { title: "Wagyu Beef", tag: "Japan A5", image: img(31406831, 1500, 1000) },
  { title: "Mediterranea", tag: "Coastal", image: img(24289216, 1500, 1000) },
  { title: "Premium Spices", tag: "Atlas", image: img(33654800, 1500, 1000) },
  { title: "Atlantic Seafood", tag: "Ocean", image: img(15497534, 1500, 1000) },
  { title: "Pastry Collection", tag: "Artistry", image: img(7381532, 1500, 1000) },
  { title: "Japanese Products", tag: "Umami", image: img(983299, 1500, 1000) },
  { title: "Mediterranean Collection", tag: "Sun-ripe", image: img(24289217, 1500, 1000) },
  { title: "Fresh Terroir", tag: "Origin", image: img(2287524, 1500, 1000) },
];

const featured = [
  {
    title: "Wagyu Beef",
    desc: "Marbled perfection. Sourced from the world's finest lineage.",
    image: img(31406820, 1800, 1200),
    align: "left",
  },
  {
    title: "Atlantic Seafood",
    desc: "Ocean to table within hours. Purity you can taste.",
    image: img(12302328, 1800, 1200),
    align: "right",
  },
  {
    title: "Premium Spices",
    desc: "The soul of Moroccan terroir, distilled into every grain.",
    image: img(18742777, 1800, 1200),
    align: "left",
  },
];

const galleryIds = [31406831, 983299, 7381532, 15497534, 33654800, 24289216, 12931388, 28574963];

const collections = [
  { title: "Moroccan Terroir", icon: <path d="M24 6c-7 0-13 6.2-13 14 0 10.5 13 22 13 22s13-11.5 13-22c0-7.8-6-14-13-14z" /> },
  { title: "Mediterranean Essentials", icon: <><circle cx="24" cy="24" r="18" /><path d="M6 24h36" /></> },
  { title: "International Cuisine", icon: <><circle cx="24" cy="24" r="18" /><ellipse cx="24" cy="24" rx="8" ry="18" /></> },
  { title: "Pastry & Desserts", icon: <><rect x="10" y="22" width="28" height="18" rx="4" /><path d="M18 22V14a6 6 0 1112 0v8" /></> },
  { title: "Seafood Selection", icon: <path d="M8 24c8-10 24-10 32 0-8 10-24 10-32 0zM38 24c2 0 4 2 4 4" /> },
];

const ingredientIds = [4589169, 29172134, 33654800];

const heroShapes = [
  { className: "left-[7%] top-[20%] h-14 w-14", delay: 0, duration: 10 },
  { className: "right-[10%] top-[16%] h-20 w-12", delay: 1.1, duration: 12 },
  { className: "bottom-[18%] left-[14%] h-12 w-24", delay: 0.5, duration: 11 },
  { className: "bottom-[24%] right-[16%] h-9 w-9", delay: 1.7, duration: 9 },
  { className: "left-[40%] top-[8%] h-6 w-6", delay: 0.8, duration: 7 },
];

type ProductsProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function Products({ active, onNavigate }: ProductsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const [activeBg, setActiveBg] = useState<string | null>(null);

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
        gsap.set(".pr-reveal, .pr-card, .pr-collection, .pr-feature", { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.to(".pr-hero-bg", { yPercent: 18, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".pr-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".pr-hero-light", { yPercent: 42, opacity: 0.65, ease: "none", scrollTrigger: { trigger: ".pr-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".pr-video-bg", { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".pr-video-section", start: "top bottom", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".pr-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 86, opacity: 0, filter: "blur(18px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      gsap.fromTo(".pr-card", { y: 80, opacity: 0, scale: 0.94, filter: "blur(12px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.05, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: ".pr-showcase-grid", start: "top 80%" } });

      gsap.fromTo(".pr-collection", { y: 80, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: ".pr-collections-grid", start: "top 80%" } });

      // featured fullscreen reveals
      gsap.utils.toArray<HTMLElement>(".pr-feature").forEach((el) => {
        const image = el.querySelector(".pr-feature-img");
        if (image) {
          gsap.fromTo(image, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        }
      });

      // horizontal gallery
      media.add("(min-width: 768px)", () => {
        const section = galleryRef.current;
        const track = galleryTrackRef.current;
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
            pinType: "transform",
          },
        });
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => clearTimeout(refreshTimer);
      });
    }, rootRef);

    return () => { media.revert(); ctx.revert(); };
  }, [reduceMotion]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#000000] antialiased" onPointerMove={handlePointerMove} ref={rootRef}>
      <AmbientGrid />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-20 mix-blend-screen" style={{ background: mouseGlow }} />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-[#FFFFFF]" initial={{ y: "0%" }} animate={{ y: "-100%" }} transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.2 }} />

      <NavBar active={active} onNavigate={onNavigate} />

      <motion.main className="relative z-10" initial={{ opacity: 0, filter: "blur(18px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.28 }}>

        {/* ════════ HERO ════════ */}
        <section className="pr-hero relative flex min-h-screen items-center overflow-hidden">
          <video autoPlay className="pr-hero-bg absolute inset-0 h-full w-full object-cover opacity-100" loop muted playsInline poster={HERO_POSTER} preload="metadata">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(183,7,13,0.24),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.24),rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.22)),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.42)_88%)]" />
          <div className="pr-hero-light absolute -left-[10%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-[#B7070D]/28 blur-[160px]" />
          <div className="absolute bottom-[-14%] right-[-8%] h-[36rem] w-[36rem] rounded-full bg-[#B7070D]/22 blur-[150px]" />
          <FloatingParticles />
          <FloatingGeometry shapes={heroShapes} />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col px-6 py-32 md:px-10 lg:px-14">
            <motion.div className="mb-9 inline-flex max-w-max items-center gap-3 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/86 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#000000] backdrop-blur-xl" initial={{ y: 22, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.42, duration: 1, ease: PREMIUM_EASE }}>
              <span className="h-1.5 w-1.5 rounded-[1px] bg-[#B7070D] shadow-[0_0_18px_#B7070D]" />
              The Collections
            </motion.div>
            <h1 className="max-w-[1200px] text-[clamp(2.9rem,8.5vw,9.5rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-[#ffffff] md:text-[clamp(3.5rem,8vw,10rem)]">
              <SplitReveal ariaLabel="Premium Gastronomy Collections" lines={["Premium", "Gastronomy", "Collections"]} />
            </h1>
            <motion.div className="mt-9 h-px w-full max-w-[46rem] origin-left bg-gradient-to-r from-[#B7070D] via-[#125B12]/45 to-transparent" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1.1, duration: 1.2, ease: PREMIUM_EASE }} />
            <motion.p className="mt-9 max-w-lg text-balance text-lg font-medium leading-8 text-[#ffffff] md:text-2xl md:leading-9" initial={{ y: 30, opacity: 0, filter: "blur(12px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 1.05, duration: 1.05, ease: PREMIUM_EASE }}>
              Rare ingredients, curated for the world's most selective kitchens.
            </motion.p>
          </div>

          <motion.div aria-hidden className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.66rem] uppercase tracking-[0.35em] text-[#000000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
            <span>Browse</span>
            <span className="relative h-16 w-px overflow-hidden bg-[#B7070D]/12">
              <motion.span className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#B7070D] to-[#125B12]" animate={{ y: [-36, 70] }} transition={{ duration: 1.65, ease: "easeInOut", repeat: Infinity }} />
            </span>
          </motion.div>
        </section>

        {/* ════════ INTERACTIVE SHOWCASE (hover swaps bg) ════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          {/* hover background */}
          <AnimatePresence>
            {activeBg && (
              <motion.img
                key={activeBg}
                src={activeBg}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.22, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              />
            )}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.7),rgba(5,5,5,0.9))]" />
          <div className="absolute left-[-10%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-[#B7070D]/14 blur-[150px]" />

          <div className="relative mx-auto max-w-[1500px]">
            <div className="pr-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#ffffff]">Explore</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#ffffff]">Eight signatures.</h2>
            </div>

            <div className="pr-showcase-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <MagneticPanel
                  key={p.title}
                  className="pr-card group relative min-h-[20rem] overflow-hidden rounded-[1.8rem] border border-[#000000]/12 bg-[#FFFFFF]/86"
                  strength={0.5}
                >
                  <div
                    onMouseEnter={() => setActiveBg(p.image)}
                    onMouseLeave={() => setActiveBg(null)}
                    className="absolute inset-0"
                  >
                    <img alt={p.title} src={p.image} className="h-full w-full object-cover opacity-100 transition duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-95" decoding="async" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/16 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/92 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[#000000] backdrop-blur-md">{p.tag}</div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#ffffff] md:text-2xl">{p.title}</h3>
                      <div className="mt-3 h-px w-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ FULLSCREEN PRODUCT EXPERIENCES ════════ */}
        {featured.map((f, i) => (
          <section key={f.title} className="pr-feature relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF]">
            <div className="absolute inset-0 overflow-hidden">
              <img alt={f.title} src={f.image} className="pr-feature-img h-full w-full object-cover opacity-100" decoding="async" loading="lazy" />
            </div>
            <div className={`absolute inset-0 ${f.align === "left" ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.08)_70%)]" : "bg-[linear-gradient(270deg,rgba(0,0,0,0.42),rgba(0,0,0,0.08)_70%)]"}`} />
            <div className={`absolute h-[34rem] w-[34rem] rounded-full blur-[150px] ${i % 2 ? "right-[-8%] bg-[#B7070D]/22" : "left-[-8%] bg-[#B7070D]/26"} top-1/2 -translate-y-1/2`} />
            <FloatingParticles />

            <div className={`relative mx-auto flex w-full max-w-[1500px] px-6 md:px-10 lg:px-14 ${f.align === "right" ? "justify-end text-right" : ""}`}>
              <div className="max-w-2xl">
                <p className="pr-reveal mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-[#ffffff]">0{i + 1} · Featured</p>
                <h2 className="pr-reveal text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#ffffff]">{f.title}</h2>
                <p className={`pr-reveal mt-7 max-w-md text-lg leading-8 text-[#ffffff] md:text-xl ${f.align === "right" ? "ml-auto" : ""}`}>{f.desc}</p>
              </div>
            </div>
          </section>
        ))}

        {/* ════════ HORIZONTAL GALLERY ════════ */}
        <section className="relative min-h-screen bg-[#FFFFFF] py-24 md:py-0" ref={galleryRef}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(183,7,13,0.18),transparent_28%),radial-gradient(circle_at_86%_66%,rgba(0,0,0,0.14),transparent_30%)]" />
          <div className="relative flex min-h-screen flex-col justify-center gap-12 px-6 md:px-10 lg:px-14">
            <div className="pr-reveal max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Gallery</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Up close.</h2>
            </div>
            <div className="overflow-visible md:w-max will-change-transform" ref={galleryTrackRef}>
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {galleryIds.map((id, i) => (
                  <div key={`${id}-${i}`} className="group relative h-[58vh] min-h-[26rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86 md:w-[34rem] md:min-w-[34rem]">
                    <img alt="Product detail" src={img(id, 1200, 900)} className="h-full w-full object-cover opacity-100 transition duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-95" decoding="async" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
                    <motion.div aria-hidden className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-18deg] bg-[#B7070D]/08 blur-md" animate={{ x: ["-20%", "440%"] }} transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ INGREDIENT EXPERIENCE ════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute right-[-10%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[#B7070D]/14 blur-[150px]" />
          <FloatingParticles />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="pr-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">The Craft</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Pure ingredients.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {ingredientIds.map((id, i) => (
                <MagneticPanel key={id} className="pr-card group relative overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86" strength={0.45}>
                  <div className={`relative overflow-hidden ${i === 1 ? "h-[32rem]" : "h-[26rem]"}`}>
                    <motion.img
                      alt="Ingredient macro"
                      src={img(id, 1100, 1200)}
                      className="h-full w-full object-cover opacity-100"
                      animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
                      transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ PREMIUM COLLECTIONS ════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute left-[-10%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[#B7070D]/16 blur-[140px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="pr-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Categories</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">Curated worlds.</h2>
            </div>
            <div className="pr-collections-grid grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {collections.map((c, i) => (
                <MagneticPanel key={c.title} className="pr-collection group relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86 p-6 backdrop-blur-2xl" strength={0.5}>
                  <motion.div aria-hidden className="absolute -inset-px rounded-[2rem] opacity-0 blur-md transition group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${ACCENT_RED}, transparent 50%, ${ACCENT_GREEN})` }} animate={{ opacity: [0.0, 0.2, 0.0] }} transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>0{i + 1}</span>
                      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-[#000000]" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000]">{c.title}</h3>
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ VIDEO EXPERIENCE ════════ */}
        <section className="pr-video-section relative flex min-h-screen items-center overflow-hidden">
          <video autoPlay className="pr-video-bg absolute inset-0 h-full w-full object-cover opacity-100" loop muted playsInline poster={VIDEO_EXP_POSTER} preload="metadata">
            <source src={VIDEO_EXP_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(183,7,13,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.42))]" />
          <FloatingParticles />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-6 py-28 text-center md:px-10 lg:px-14">
            <p className="pr-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#ffffff]">In Motion</p>
            <h2 className="pr-reveal max-w-3xl text-[clamp(3rem,7.5vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#ffffff]">From source to signature.</h2>
            <p className="pr-reveal mt-6 max-w-lg text-lg leading-8 text-[#ffffff]">Every product, a story of origin and craft.</p>
          </div>
        </section>

        {/* ════════ FINAL ════════ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(183,7,13,0.24),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(0,0,0,0.18),transparent_34%)]" />
          <motion.div aria-hidden className="absolute inset-0" animate={{ opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle at 28% 58%, rgba(183,7,13,0.16), transparent 40%)" }} />
          <FloatingGeometry />
          <FloatingParticles />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="pr-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">TERROIR EXPRESS · PRODUCTS</p>
            <h2 className="pr-reveal max-w-[1180px] text-[clamp(3rem,9.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">Crafted for culinary excellence.</h2>
            <div className="pr-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <button className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white" onClick={() => onNavigate("contact")} type="button">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Request the Catalog</span>
                </button>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]" onClick={() => onNavigate("home")} type="button">Home</button>
                <span className="text-[#000000]">·</span>
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]" onClick={() => onNavigate("chef-club")} type="button">ChefClubs</button>
                <span className="text-[#000000]">·</span>
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]" onClick={() => onNavigate("awards")} type="button">Awards</button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="relative z-10 border-t border-[#000000]/12 bg-[#FFFFFF] px-6 py-8 text-xs uppercase tracking-[0.32em] text-[#000000] md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <img src={terroir_logo} alt="Terroir Express Logo" className="h-8" />
          <span>Products · 2026</span>
        </div>
      </footer>
    </div>
  );
}
