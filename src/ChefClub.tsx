import { useEffect, useRef, useState, type PointerEvent } from "react";
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

const HERO_VIDEO = "https://videos.pexels.com/video-files/4926209/4926209-uhd_4096_2160_30fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/4926209/pexels-photo-4926209.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2000&h=1200";

const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const chefs = [
  {
    name: "Yassine Berrada",
    role: "Executive Chef",
    specialty: "Modern Moroccan tasting menus",
    image: img(20509791, 900, 1300),
  },
  {
    name: "Lina Charef",
    role: "Pastry Chef",
    specialty: "Architectural desserts & confection",
    image: img(8092354, 900, 1300),
  },
  {
    name: "Kenji Aït",
    role: "Sushi Master",
    specialty: "Edomae precision, Atlas terroir",
    image: img(8093910, 900, 1300),
  },
  {
    name: "Sofia Marin",
    role: "Mediterranean Chef",
    specialty: "Coastal fire & seasonal produce",
    image: img(13470189, 900, 1300),
  },
  {
    name: "Omar Tazi",
    role: "Gastronomy Expert",
    specialty: "Fusion R&D & flavour theory",
    image: img(30874866, 900, 1300),
  },
];

const events = [
  {
    title: "Chef Tasting Nights",
    tag: "Members Only",
    text: "Twelve courses, one chef, zero menu.",
    image: img(16935993, 1400, 1000),
  },
  {
    title: "Gastronomy Networking",
    tag: "Quarterly",
    text: "Where producers and chefs collide.",
    image: img(17294776, 1400, 1000),
  },
  {
    title: "Culinary Innovation Lab",
    tag: "Invitation",
    text: "Future plates, prototyped live.",
    image: img(17294688, 1400, 1000),
  },
  {
    title: "International Fusion Showcase",
    tag: "Flagship",
    text: "Borders dissolve on the plate.",
    image: img(17294768, 1400, 1000),
  },
];

const loungePanels = [
  { label: "The Cellar", image: img(32523798, 1000, 1300), className: "lg:row-span-2" },
  { label: "Fire Bar", image: img(14133592, 1000, 800), className: "" },
  { label: "Chef's Pass", image: img(36430088, 1000, 800), className: "" },
];

const galleryStripA = [20509791, 8093910, 30874866, 36430088, 8092354, 13470189];
const galleryStripB = [16935993, 17294776, 17294688, 17294768, 32523798, 14133592];

const clubStats = [
  { value: 38, suffix: "", label: "Resident Chefs" },
  { value: 12, suffix: "", label: "Annual Experiences" },
  { value: 9, suffix: "", label: "Global Chapters" },
];

const heroShapes = [
  { className: "left-[8%] top-[22%] h-14 w-14", delay: 0, duration: 10 },
  { className: "right-[10%] top-[18%] h-24 w-14", delay: 1.1, duration: 12 },
  { className: "bottom-[16%] left-[14%] h-16 w-32", delay: 0.5, duration: 11 },
  { className: "bottom-[26%] right-[16%] h-10 w-10", delay: 1.7, duration: 9 },
];

type ChefClubProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function ChefClub({ active, onNavigate }: ChefClubProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chefSectionRef = useRef<HTMLElement | null>(null);
  const chefTrackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [formSent, setFormSent] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 28, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 28, mass: 0.7 });
  const mouseGlow = useMotionTemplate`radial-gradient(660px circle at ${smoothX}px ${smoothY}px, rgba(183,7,13,0.22), rgba(18,91,18,0.1) 34%, transparent 68%)`;

  useLenisGsap(!reduceMotion);

  useEffect(() => {
    if (!rootRef.current) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          ".gsap-reveal, .event-card, .lounge-panel, .invite-card, .club-stat",
          { clearProps: "all", opacity: 1 },
        );
        return;
      }

      gsap.to(".hero-media", {
        yPercent: 16,
        scale: 1.16,
        ease: "none",
        scrollTrigger: {
          trigger: ".cc-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-light", {
        yPercent: 40,
        opacity: 0.7,
        ease: "none",
        scrollTrigger: { trigger: ".cc-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 86, opacity: 0, filter: "blur(18px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      gsap.fromTo(
        ".event-card",
        { y: 90, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".events-grid", start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".lounge-panel",
        { y: 80, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".lounge-grid", start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".invite-card",
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: ".invite-section", start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".club-stat",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".invite-section", start: "top 70%" },
        },
      );

      // Auto-scrolling gallery strips
      gsap.utils.toArray<HTMLElement>(".gallery-strip").forEach((strip, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(strip, {
          xPercent: dir * 50,
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Horizontal pinned chef showcase (desktop)
      media.add("(min-width: 768px)", () => {
        const section = chefSectionRef.current;
        const track = chefTrackRef.current;
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
            // pinType: "transform" prevents Chrome from fighting the pin spacer
            // when overflow:hidden ancestors are present elsewhere on the page
            pinType: "transform",
          },
        });

        // Refresh after images have had a chance to load so scrollWidth is accurate
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => clearTimeout(refreshTimer);
      });
    }, rootRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, [reduceMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  return (
    <div
      className="relative min-h-screen bg-[#FFFFFF] text-[#000000] antialiased"
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <AmbientGrid />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20 mix-blend-screen"
        style={{ background: mouseGlow }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-[#FFFFFF]"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.2 }}
      />

      <NavBar active={active} onNavigate={onNavigate} />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.28 }}
      >
        {/* HERO */}
        <section className="cc-hero relative flex min-h-screen items-center overflow-hidden">
          <video
            autoPlay
            className="hero-media absolute inset-0 h-full w-full object-cover opacity-100"
            loop
            muted
            playsInline
            poster={HERO_POSTER}
            preload="metadata"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(183,7,13,0.22),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.22),rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.20)),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.40)_88%)]" />
          <div className="hero-light absolute -left-[10%] top-[8%] h-[40rem] w-[40rem] rounded-full bg-[#B7070D]/30 blur-[150px]" />
          <div className="absolute bottom-[-16%] right-[-8%] h-[34rem] w-[34rem] rounded-full bg-[#125B12]/22 blur-[140px]" />
          <FloatingParticles />
          <FloatingGeometry shapes={heroShapes} />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col px-6 py-32 md:px-10 lg:px-14">
            <motion.div
              className="mb-9 inline-flex max-w-max items-center gap-3 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/80 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.4em] text-[#000000] backdrop-blur-xl"
              initial={{ y: 22, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: PREMIUM_EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-[1px] bg-[#125B12] shadow-[0_0_18px_#125B12]" />
              By Invitation Only
            </motion.div>

            <h1 className="max-w-[1160px] text-[clamp(3.1rem,9vw,10rem)] font-black uppercase leading-[0.84] tracking-[-0.085em] text-[#ffffff]">
              <SplitReveal
                ariaLabel="Private Chef Club Experience"
                lines={["Private", "Chef Club", "Experience"]}
              />
            </h1>

            <motion.div
              className="mt-9 h-px w-full max-w-[44rem] origin-left bg-gradient-to-r from-[#B7070D] via-[#125B12]/45 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.2, ease: PREMIUM_EASE }}
            />

            <div className="mt-9 flex max-w-[1000px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <motion.p
                className="max-w-lg text-balance text-lg font-medium leading-8 text-[#ffffff] md:text-2xl md:leading-9"
                initial={{ y: 30, opacity: 0, filter: "blur(12px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.05, duration: 1.05, ease: PREMIUM_EASE }}
              >
                A private universe of chefs, terroir, and cinematic gastronomy nights.
              </motion.p>

              <motion.div
                className="max-w-sm rounded-[1.75rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                initial={{ y: 40, opacity: 0, filter: "blur(16px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2, duration: 1.1, ease: PREMIUM_EASE }}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#000000]">
                  <span>The Invitation</span>
                  <span className="h-2 w-2 rounded-[2px] bg-[#B7070D] shadow-[0_0_22px_#B7070D]" />
                </div>
                <p className="mt-4 text-sm leading-6 text-[#000000]">
                  Resident chefs. Curated tables. Moroccan terroir, served to the world.
                </p>
                <a
                  className="mt-5 inline-flex w-full items-center justify-center rounded-[0.8rem] bg-[#B7070D] py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-[#125B12]"
                  href="#invite"
                >
                  Request Access
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.66rem] uppercase tracking-[0.35em] text-[#000000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <span>Enter</span>
            <span className="relative h-16 w-px overflow-hidden bg-[#125B12]/12">
              <motion.span
                className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#B7070D] to-[#125B12]"
                animate={{ y: [-36, 70] }}
                transition={{ duration: 1.65, ease: "easeInOut", repeat: Infinity }}
              />
            </span>
          </motion.div>
        </section>

        {/* CHEF MEMBERS — horizontal pinned */}
        <section
          className="relative min-h-screen bg-[#FFFFFF] py-24 md:py-0"
          id="members"
          ref={chefSectionRef}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(183,7,13,0.18),transparent_28%),radial-gradient(circle_at_84%_66%,rgba(18,91,18,0.14),transparent_30%)]" />
          <div className="relative flex min-h-screen flex-col justify-center gap-12 px-6 md:px-10 lg:px-14">
            <div className="gsap-reveal max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                The Members
              </p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Resident chefs.
              </h2>
            </div>

            <div className="overflow-visible md:w-max will-change-transform" ref={chefTrackRef}>
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {chefs.map((chef, index) => (
                  <MagneticPanel
                    className="member-card group relative h-[64vh] min-h-[30rem] overflow-hidden rounded-[2.2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 shadow-[0_40px_140px_rgba(0,0,0,0.08)] md:w-[26rem] md:min-w-[26rem]"
                    key={chef.name}
                    strength={0.6}
                  >
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-px rounded-[2.2rem] opacity-0 blur-md transition group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(130deg, ${ACCENT_RED}, transparent 45%, ${ACCENT_GREEN})`,
                      }}
                      animate={{ opacity: [0.0, 0.25, 0.0] }}
                      transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-px overflow-hidden rounded-[2.1rem]">
                      <img
                        alt={chef.name}
                        className="h-full w-full object-cover opacity-100 transition duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                        decoding="async"
                        loading={index === 0 ? "eager" : "lazy"}
                        src={chef.image}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,91,18,0.04),rgba(18,91,18,0.42))]" />
                      <div className="absolute left-5 top-5 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#000000] backdrop-blur-md">
                        {chef.role}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#ffffff] md:text-4xl">
                          {chef.name}
                        </h3>
                        <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[#ffffff] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {chef.specialty}
                        </p>
                        <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </MagneticPanel>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EVENT EXPERIENCE */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14" id="events">
          <div className="absolute left-[-10%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-[#B7070D]/16 blur-[140px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="gsap-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Event experiences.
              </h2>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                VIP gastronomy nights staged like a luxury launch.
              </p>
            </div>

            <div className="events-grid grid gap-4 md:grid-cols-2">
              {events.map((event, index) => (
                <article
                  className={`event-card group relative overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 shadow-[0_30px_120px_rgba(0,0,0,0.08)] ${
                    index % 3 === 0 ? "md:row-span-2" : ""
                  }`}
                  key={event.title}
                >
                  <div className={`relative overflow-hidden ${index % 3 === 0 ? "h-[34rem]" : "h-[20rem]"}`}>
                    <img
                      alt={event.title}
                      className="h-full w-full object-cover opacity-100 transition duration-[1500ms] ease-out group-hover:scale-105 group-hover:opacity-95"
                      decoding="async"
                      loading="lazy"
                      src={event.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(18,91,18,0.42)),radial-gradient(circle_at_80%_18%,rgba(18,91,18,0.18),transparent_30%)]" />
                  </div>
                  <div className="absolute left-6 top-6 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#000000] backdrop-blur-md">
                    {event.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="mb-4 h-px w-full bg-gradient-to-r from-[#125B12]/28 via-[#B7070D]/70 to-transparent" />
                    <h3 className="text-[clamp(1.8rem,3.5vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#ffffff]">
                      {event.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-[#ffffff]">{event.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* IMMERSIVE LOUNGE */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <FloatingParticles />
          <div className="absolute right-[-10%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[#125B12]/16 blur-[150px]" />
          <div className="absolute left-[-8%] bottom-[10%] h-[26rem] w-[26rem] rounded-full bg-[#B7070D]/16 blur-[140px]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="gsap-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                The Lounge
              </p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Atmosphere first.
              </h2>
            </div>

            <div className="lounge-grid grid gap-4 md:grid-cols-3 md:[grid-template-rows:repeat(2,minmax(0,1fr))]">
              {loungePanels.map((panel, index) => (
                <MagneticPanel
                  className={`lounge-panel group relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 ${panel.className}`}
                  key={panel.label}
                  strength={0.5}
                >
                  <img
                    alt={panel.label}
                    className="absolute inset-0 h-full w-full object-cover opacity-100 transition duration-[1500ms] ease-out group-hover:scale-110 group-hover:opacity-90"
                    decoding="async"
                    loading="lazy"
                    src={panel.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,91,18,0.1),rgba(18,91,18,0.42))]" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-18deg] bg-[#FFFFFF]/70 blur-md"
                    animate={{ x: ["-20%", "420%"] }}
                    transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay: index }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                    <h3 className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#ffffff] md:text-3xl">
                      {panel.label}
                    </h3>
                    <span className="h-4 w-4 rounded-[0.25rem] border border-[#000000]/12 bg-[#FFFFFF]/80" />
                  </div>
                </MagneticPanel>
              ))}

              <div className="lounge-panel relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-gradient-to-br from-[#B7070D]/25 via-[#B7070D]/30 to-[#125B12]/20 p-7 backdrop-blur-2xl md:col-span-2">
                <FloatingGeometry
                  shapes={[
                    { className: "right-[12%] top-[20%] h-10 w-10", delay: 0, duration: 8 },
                    { className: "right-[28%] bottom-[24%] h-7 w-16", delay: 0.6, duration: 9 },
                  ]}
                />
                <p className="relative text-xs font-semibold uppercase tracking-[0.4em] text-[#000000]">
                  Ambient by design
                </p>
                <p className="relative max-w-md text-[clamp(1.6rem,3.2vw,2.8rem)] font-black uppercase leading-[0.95] tracking-[-0.05em] text-[#000000]">
                  Soft light. Slow fire. Deep flavour.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVATE INVITATION */}
        <section
          className="invite-section relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14"
          id="invite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(183,7,13,0.22),transparent_30%),radial-gradient(circle_at_72%_72%,rgba(18,91,18,0.16),transparent_34%)]" />
          <FloatingParticles />
          <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="gsap-reveal mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                Private Invitation
              </p>
              <h2 className="gsap-reveal max-w-2xl text-[clamp(3rem,8vw,8.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Join the society.
              </h2>
              <p className="gsap-reveal mt-7 max-w-md text-lg leading-8 text-[#000000]">
                Membership is limited. Each request is reviewed by the resident council.
              </p>
              <div className="gsap-reveal mt-12 grid grid-cols-3 gap-4">
                {clubStats.map((stat) => (
                  <div
                    className="club-stat rounded-[1.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-5 backdrop-blur-xl"
                    key={stat.label}
                  >
                    <div className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-none tracking-[-0.06em] text-[#000000]">
                      <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                    </div>
                    <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#000000]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <MagneticPanel
              className="invite-card relative overflow-hidden rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-8 shadow-[0_40px_160px_rgba(0,0,0,0.08)] backdrop-blur-2xl md:p-10"
              strength={0.4}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-[2.4rem]"
                style={{
                  background: `linear-gradient(130deg, ${ACCENT_RED}, transparent 40%, ${ACCENT_GREEN})`,
                }}
                animate={{ opacity: [0.18, 0.5, 0.18] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative rounded-[2.2rem] bg-[#FFFFFF]/90 p-6 md:p-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#000000]">
                  <span>Membership Request</span>
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#125B12] shadow-[0_0_20px_#125B12]" />
                </div>

                {formSent ? (
                  <motion.div
                    className="mt-10 flex flex-col items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                  >
                    <span className="text-4xl font-black uppercase tracking-[-0.05em] text-[#000000]">
                      Received.
                    </span>
                    <p className="text-sm leading-6 text-[#000000]">
                      The council will reach out with your private invitation.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    className="mt-8 flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                    }}
                  >
                    <input
                      className="rounded-[0.9rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] placeholder:text-[#000000] outline-none transition focus:border-[#B7070D]/70 focus:bg-[#FFFFFF]/80"
                      placeholder="Full name"
                      required
                      type="text"
                    />
                    <input
                      className="rounded-[0.9rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] placeholder:text-[#000000] outline-none transition focus:border-[#125B12]/70 focus:bg-[#FFFFFF]/80"
                      placeholder="Email"
                      required
                      type="email"
                    />
                    <select
                      className="rounded-[0.9rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] outline-none transition focus:border-[#B7070D]/70 focus:bg-[#FFFFFF]/80"
                      defaultValue=""
                      required
                    >
                      <option className="bg-[#FFFFFF]" disabled value="">
                        Interest
                      </option>
                      <option className="bg-[#FFFFFF]">Chef Membership</option>
                      <option className="bg-[#FFFFFF]">Hospitality Partner</option>
                      <option className="bg-[#FFFFFF]">Event Guest</option>
                    </select>
                    <button
                      className="group relative mt-2 inline-flex overflow-hidden rounded-[0.9rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition duration-500 hover:text-white"
                      type="submit"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="relative z-10">Request Invitation</span>
                    </button>
                  </form>
                )}
              </div>
            </MagneticPanel>
          </div>
        </section>

        {/* GALLERY EXPERIENCE — auto-moving strips */}
        <section className="gallery-section relative overflow-hidden bg-[#FFFFFF] py-28 md:py-36">
          <div className="mb-16 px-6 md:px-10 lg:px-14">
            <div className="gsap-reveal mx-auto max-w-[1500px]">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                Gallery
              </p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Inside the club.
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="gallery-strip flex w-max gap-5 pl-6 will-change-transform">
              {[...galleryStripA, ...galleryStripA].map((id, i) => (
                <div
                  className="group relative h-[26vh] min-h-[16rem] w-[20rem] overflow-hidden rounded-[1.6rem] border border-[#000000]/12 md:w-[26rem]"
                  key={`a-${id}-${i}`}
                >
                  <img
                    alt="Chef club moment"
                    className="h-full w-full object-cover opacity-100 transition duration-[1200ms] group-hover:scale-110 group-hover:opacity-95"
                    decoding="async"
                    loading="lazy"
                    src={img(id, 900, 700)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
                </div>
              ))}
            </div>
            <div className="gallery-strip flex w-max gap-5 pl-6 will-change-transform" style={{ marginLeft: "-12rem" }}>
              {[...galleryStripB, ...galleryStripB].map((id, i) => (
                <div
                  className="group relative h-[26vh] min-h-[16rem] w-[20rem] overflow-hidden rounded-[1.6rem] border border-[#000000]/12 md:w-[26rem]"
                  key={`b-${id}-${i}`}
                >
                  <img
                    alt="Chef club moment"
                    className="h-full w-full object-cover opacity-100 transition duration-[1200ms] group-hover:scale-110 group-hover:opacity-95"
                    decoding="async"
                    loading="lazy"
                    src={img(id, 900, 700)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL EXPERIENCE */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(183,7,13,0.24),transparent_30%),radial-gradient(circle_at_72%_72%,rgba(18,91,18,0.18),transparent_34%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 30% 60%, rgba(183,7,13,0.16), transparent 40%)",
            }}
          />
          <FloatingGeometry />
          <FloatingParticles />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="gsap-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
              TERROIR EXPRESS · CHEF CLUB
            </p>
            <h2 className="gsap-reveal max-w-[1180px] text-[clamp(3.1rem,9.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">
              Where gastronomy meets excellence.
            </h2>
            <div className="gsap-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <a
                  className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                  href="#invite"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Request Membership</span>
                </a>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("home")}
                  type="button"
                >
                  Home
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("products")}
                  type="button"
                >
                  Products
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("awards")}
                  type="button"
                >
                  Awards
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]"
                  onClick={() => onNavigate("contact")}
                  type="button"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="relative z-10 border-t border-[#000000]/12 bg-[#FFFFFF] px-6 py-8 text-xs uppercase tracking-[0.32em] text-[#000000] md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <img src={terroir_logo} alt="Terroir Express Logo" className="h-8" />
          <span>Private Chef Club · 2026</span>
        </div>
      </footer>
    </div>
  );
}
