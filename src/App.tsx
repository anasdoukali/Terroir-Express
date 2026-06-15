import { useEffect, useRef, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  animate as motionAnimate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import terroir_logo from "./images/logo.png";


import { NavBar, type NavRoute } from "./components/NavBar";
import { CURTAIN_EASE } from "./components/primitives";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_RED = "#B7070D";
const ACCENT_GREEN = "#125B12";
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const images = {
  hero:
    "https://images.pexels.com/photos/2287524/pexels-photo-2287524.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200&h=1400",
  story:
    "https://images.pexels.com/photos/18742777/pexels-photo-18742777.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=2200",
  terroir:
    "https://images.pexels.com/photos/33654800/pexels-photo-33654800.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1200",
  dining:
    "https://images.pexels.com/photos/24186303/pexels-photo-24186303.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1900&h=1200",
  detail:
    "https://images.pexels.com/photos/28616665/pexels-photo-28616665.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1200",
  chef:
    "https://images.pexels.com/photos/36430088/pexels-photo-36430088.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1900&h=1200",
  chefTwo:
    "https://images.pexels.com/photos/15671380/pexels-photo-15671380.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1200",
  kitchen:
    "https://images.pexels.com/photos/36430149/pexels-photo-36430149.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1900&h=1200",
};

const storySteps = [
  {
    kicker: "Origin",
    title: "Terroir with memory.",
    copy: "Ingredients chosen for depth, rarity, and Moroccan character.",
  },
  {
    kicker: "Curation",
    title: "A sharper standard.",
    copy: "Every product is filtered through hospitality, gastronomy, and craft.",
  },
  {
    kicker: "Export",
    title: "Made to travel beautifully.",
    copy: "From local producers to international tables with precision and care.",
  },
];

const visionCards = [
  "Gastronomy",
  "Hospitality",
  "Innovation",
  "Moroccan Terroir",
  "International Excellence",
];

const galleryItems = [
  {
    title: "Atlas Origin",
    text: "Raw intensity, selected at source.",
    image: images.story,
  },
  {
    title: "Culinary Signal",
    text: "Products designed for presence.",
    image: images.dining,
  },
  {
    title: "Chef Precision",
    text: "Finishing moments that define the plate.",
    image: images.chef,
  },
  {
    title: "Global Ritual",
    text: "Moroccan terroir, staged for the world.",
    image: images.detail,
  },
];

const statistics = [
  { value: 500, suffix: "+", label: "Premium Products" },
  { value: 120, suffix: "+", label: "Hospitality Partners" },
  { value: 24, suffix: "+", label: "Culinary Destinations" },
  { value: 40, suffix: "+", label: "Exclusive Gastronomic Events" },
];

const chefCards = [
  {
    title: "Sourcing Room",
    copy: "Rare Moroccan ingredients, mapped to menu intent.",
    image: images.terroir,
  },
  {
    title: "Chef Network",
    copy: "Tastings, launches, and private culinary moments.",
    image: images.chefTwo,
  },
  {
    title: "Plate Finish",
    copy: "Premium products engineered for the final gesture.",
    image: images.kitchen,
  },
];

const heroShapes = [
  { className: "left-[6%] top-[18%] h-12 w-12", delay: 0, duration: 9 },
  { className: "right-[12%] top-[16%] h-20 w-12", delay: 1.2, duration: 11 },
  { className: "bottom-[19%] left-[16%] h-16 w-28", delay: 0.4, duration: 10 },
  { className: "bottom-[24%] right-[18%] h-10 w-10", delay: 1.9, duration: 8 },
  { className: "left-[42%] top-[10%] h-7 w-7", delay: 0.8, duration: 7 },
];

const titleLineVariants = {
  hidden: { y: "120%", opacity: 0, filter: "blur(18px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.35, ease: PREMIUM_EASE },
  },
};

const titleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.3,
    },
  },
};

type SplitRevealProps = {
  lines: string[];
  className?: string;
  ariaLabel?: string;
};

function SplitReveal({ lines, className = "", ariaLabel }: SplitRevealProps) {
  return (
    <motion.span
      aria-label={ariaLabel ?? lines.join(" ")}
      className={className}
      initial="hidden"
      animate="show"
      variants={titleContainerVariants}
    >
      {lines.map((line) => (
        <span className="block overflow-hidden" key={line}>
          <motion.span className="block" variants={titleLineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

type MagneticPanelProps = {
  children: ReactNode;
  className?: string;
};

function MagneticPanel({ children, className = "" }: MagneticPanelProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;

    x.set(relX * 0.045);
    y.set(relY * 0.045);
    rotateX.set((-relY / rect.height) * 7);
    rotateY.set((relX / rect.width) * 7);
  };

  const reset = () => {
    const spring = { type: "spring" as const, stiffness: 180, damping: 20 };
    motionAnimate(x, 0, spring);
    motionAnimate(y, 0, spring);
    motionAnimate(rotateX, 0, spring);
    motionAnimate(rotateY, 0, spring);
  };

  return (
    <motion.div
      className={className}
      onMouseLeave={reset}
      onMouseMove={handleMouseMove}
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });
  const counter = useMotionValue(0);
  const formatted = useTransform(counter, (latest) => {
    return `${Math.round(latest).toLocaleString("en-US")}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;

    const controls = motionAnimate(counter, value, {
      duration: 2.25,
      ease: PREMIUM_EASE,
    });

    return controls.stop;
  }, [counter, inView, value]);

  return <motion.span ref={ref}>{formatted}</motion.span>;
}

function FloatingGeometry() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {heroShapes.map((shape, index) => (
        <motion.div
          aria-hidden="true"
          className={`absolute rounded-[0.35rem] border border-[#000000]/12 bg-[#FFFFFF]/86 shadow-[0_0_70px_rgba(183,7,13,0.16)] backdrop-blur-md ${shape.className}`}
          key={shape.className}
          animate={{
            opacity: [0.18, 0.58, 0.22],
            rotate: [0, index % 2 ? -10 : 12, 0],
            x: [0, index % 2 ? 18 : -14, 0],
            y: [0, index % 2 ? -24 : 20, 0],
          }}
          transition={{
            delay: shape.delay,
            duration: shape.duration,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function AmbientGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_10%,black,transparent_68%)]" />
    </div>
  );
}

type AppProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function App({ active, onNavigate }: AppProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 28, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 28, mass: 0.7 });
  const mouseGlow = useMotionTemplate`radial-gradient(680px circle at ${smoothX}px ${smoothY}px, rgba(183,7,13,0.22), rgba(0,0,0,0.1) 34%, transparent 68%)`;

  useEffect(() => {
    if (!rootRef.current) return;

    const lenis = reduceMotion
      ? null
      : new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.1,
          wheelMultiplier: 0.82,
        });

    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".gsap-reveal, .story-step, .vision-card, .stat-tile, .chef-card", {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap.to(".hero-bg", {
        yPercent: 16,
        scale: 1.17,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-light", {
        yPercent: 38,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 88, opacity: 0, filter: "blur(18px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".story-step").forEach((step) => {
        gsap.fromTo(
          step,
          { y: 70, opacity: 0.18, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 86%",
              end: "top 48%",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".story-image-layer").forEach((layer, index) => {
        gsap.to(layer, {
          yPercent: index % 2 === 0 ? -12 : 12,
          scale: index === 0 ? 1.08 : 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".vision-card",
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".vision-grid",
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".stat-tile",
        { y: 70, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 74%",
          },
        },
      );

      gsap.fromTo(
        ".chef-card",
        { y: 100, opacity: 0, rotate: 0, filter: "blur(16px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".chef-section",
            start: "top 68%",
          },
        },
      );

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
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 700);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      media.revert();
      ctx.revert();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
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
        <section className="hero-section relative flex min-h-screen items-center overflow-hidden">
          <motion.img
            alt="Moroccan tagine with preserved lemons and olives"
            className="hero-bg absolute inset-0 h-full w-full object-cover opacity-100 filter contrast-[1.08] brightness-[1.02]"
            decoding="async"
            fetchPriority="high"
            initial={{ scale: 1.09, filter: "blur(16px)" }}
            animate={{ scale: reduceMotion ? 1.08 : [1.08, 1.145], filter: "blur(0px)" }}
            transition={{
              filter: { duration: 1.55, ease: "easeOut" },
              scale: reduceMotion
                ? { duration: 0 }
                : { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            }}
            src={images.hero}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_34%,rgba(18,91,18,0.20),transparent_30%),radial-gradient(circle_at_76%_24%,rgba(0,0,0,0.14),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.12))]" />
          <div className="hero-light absolute -left-[10%] top-[6%] h-[40rem] w-[40rem] rounded-full bg-[#B7070D]/30 blur-[140px]" />
          <div className="absolute bottom-[-15%] right-[-9%] h-[34rem] w-[34rem] rounded-full bg-[#B7070D]/22 blur-[130px]" />
          <FloatingGeometry />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col px-6 py-28 md:px-10 lg:px-14">
            <motion.p
              className="mb-8 max-w-max text-xs font-semibold uppercase tracking-[0.5em] text-[#ffffff] md:text-sm"
              initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: PREMIUM_EASE }}
            >
              TERROIR EXPRESS
            </motion.p>
            <h1 className="max-w-[1220px] text-[clamp(3.35rem,9.5vw,10.6rem)] font-black uppercase leading-[0.83] tracking-[-0.085em] text-[#ffffff] md:text-[clamp(4.5rem,8vw,11.5rem)]">
              <SplitReveal
                ariaLabel="From Moroccan Terroir to International Excellence"
                lines={["From Moroccan", "Terroir to", "International Excellence"]}
              />
            </h1>
            <motion.div
              className="mt-9 h-px w-full max-w-[46rem] origin-left bg-gradient-to-r from-[#B7070D] via-[#125B12]/45 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.2, ease: PREMIUM_EASE }}
            />
            <div className="mt-9 flex max-w-[1000px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <motion.p
                className="max-w-xl text-balance text-lg font-medium leading-8 text-[#ffffff] md:text-2xl md:leading-9"
                initial={{ y: 32, opacity: 0, filter: "blur(12px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.05, duration: 1.05, ease: PREMIUM_EASE }}
              >
                A cinematic bridge between Moroccan origin, chef culture, and the world&apos;s most selective tables.
              </motion.p>

              <motion.div
                className="max-w-sm rounded-[1.75rem] border border-[#000000]/12 bg-[#FFFFFF]/86 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                initial={{ y: 42, opacity: 0, filter: "blur(16px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2, duration: 1.1, ease: PREMIUM_EASE }}
              >
              </motion.div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.35em] text-[#000000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <span>Scroll</span>
            <span className="relative h-16 w-px overflow-hidden bg-[#B7070D]/12">
              <motion.span
                className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#B7070D] to-[#125B12]"
                animate={{ y: [-36, 70] }}
                transition={{ duration: 1.65, ease: "easeInOut", repeat: Infinity }}
              />
            </span>
          </motion.div>
        </section>

        <section className="story-section relative min-h-screen overflow-hidden bg-[#FFFFFF] py-28 md:py-36 lg:min-h-[230vh]">
          <div className="absolute left-[-12%] top-[14%] h-[30rem] w-[30rem] rounded-full bg-[#B7070D]/14 blur-[140px]" />
          <div className="absolute right-[-10%] top-[42%] h-[28rem] w-[28rem] rounded-full bg-[#B7070D]/18 blur-[130px]" />
          <div className="mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-6 py-24 md:px-10 lg:sticky lg:top-0 lg:grid-cols-[0.92fr_1.08fr] lg:px-14">
            <div className="relative z-10">
              <p className="gsap-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                Brand Story
              </p>
              <div className="space-y-12 md:space-y-16">
                {storySteps.map((step, index) => (
                  <div className="story-step max-w-[42rem]" key={step.title}>
                    <div className="mb-4 flex items-center gap-4 text-xs uppercase tracking-[0.36em] text-[#000000]">
                      <span className="h-px w-12 bg-gradient-to-r from-[#B7070D] to-[#125B12]" />
                      {step.kicker} 0{index + 1}
                    </div>
                    <h2 className="text-[clamp(3rem,7vw,8.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em] text-[#000000]">
                      {step.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#000000] md:text-xl">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[62vh] overflow-hidden rounded-[2.3rem] border border-[#000000]/12 bg-[#FFFFFF]/86 shadow-[0_40px_140px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:min-h-[78vh]">
              <img
                alt="Moroccan spice seller at a traditional bazaar"
                className="story-image-layer absolute inset-0 h-full w-full object-cover opacity-90"
                decoding="async"
                loading="lazy"
                src={images.story}
              />
              <img
                alt="Saffron threads in close detail"
                className="story-image-layer absolute bottom-[-10%] right-[-8%] h-[54%] w-[56%] rounded-[1.4rem] border border-[#000000]/12 object-cover opacity-95 shadow-[0_30px_100px_rgba(0,0,0,0.1)]"
                decoding="async"
                loading="lazy"
                src={images.terroir}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_65%,rgba(0,0,0,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.38))]" />
              <div className="absolute left-8 top-8 h-20 w-20 rounded-[0.7rem] border border-[#000000]/12 bg-[#FFFFFF]/86 backdrop-blur-xl" />
              <div className="absolute bottom-8 left-8 h-28 w-44 rounded-[1rem] border border-[#000000]/12 bg-[#FFFFFF]/86 backdrop-blur-xl" />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="gsap-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Vision</p>
              <h2 className="text-[clamp(3.2rem,8vw,9.6rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                A future built for taste.
              </h2>
            </div>

            <div className="vision-grid relative grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <motion.svg
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 left-0 h-[125%] w-full opacity-95"
                fill="none"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.path
                  d="M20 120 C 260 30, 370 290, 620 155 S 980 35, 1260 230"
                  stroke="url(#visionGradient)"
                  strokeLinecap="round"
                  strokeWidth="1.2"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    show: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 2.2, ease: "easeInOut" },
                    },
                  }}
                />
                <defs>
                  <linearGradient id="visionGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop stopColor={ACCENT_RED} />
                    <stop offset="0.52" stopColor="rgba(255,255,255,0.55)" />
                    <stop offset="1" stopColor={ACCENT_GREEN} />
                  </linearGradient>
                </defs>
              </motion.svg>

              {visionCards.map((card, index) => (
                <MagneticPanel
                  className="vision-card group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86 p-6 backdrop-blur-2xl md:min-h-[25rem]"
                  key={card}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <motion.div
                    className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#B7070D]/0 via-[#125B12]/0 to-[#125B12]/0 opacity-0 blur-xl group-hover:from-[#B7070D]/28 group-hover:to-[#125B12]/24 group-hover:opacity-100"
                    animate={{ opacity: [0.2, 0.48, 0.22] }}
                    transition={{ duration: 3 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>0{index + 1}</span>
                      <span className="h-4 w-4 rounded-[0.25rem] border border-[#000000]/12 bg-[#FFFFFF]/86" />
                    </div>
                    <div>
                      <h3 className="max-w-[14rem] text-2xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#000000] md:text-3xl">
                        {card}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-[#000000]">
                        Elevated by design, discipline, and a global hospitality rhythm.
                      </p>
                    </div>
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative min-h-screen bg-[#FFFFFF] py-24 md:py-0"
          ref={galleryRef}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_34%,rgba(183,7,13,0.18),transparent_28%),radial-gradient(circle_at_86%_64%,rgba(0,0,0,0.14),transparent_30%)]" />
          <div className="relative flex min-h-screen flex-col justify-center gap-12 px-6 md:px-10 lg:px-14">
            <div className="gsap-reveal max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                Immersive Experience
              </p>
              <h2 className="text-[clamp(3.2rem,8vw,9.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Scroll through the atmosphere.
              </h2>
            </div>

            <div className="overflow-visible md:w-max will-change-transform" ref={galleryTrackRef}>
              <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                {galleryItems.map((item, index) => (
                  <article
                    className="group relative h-[72vh] min-h-[34rem] overflow-hidden rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/86 shadow-[0_40px_140px_rgba(0,0,0,0.08)] md:w-[72vw] md:min-w-[72vw] xl:w-[62vw] xl:min-w-[62vw]"
                    key={item.title}
                  >
                    <img
                      alt={item.title}
                      className="h-full w-full object-cover opacity-100 transition duration-[1600ms] ease-out group-hover:scale-105 group-hover:opacity-95"
                      decoding="async"
                      loading={index === 0 ? "eager" : "lazy"}
                      src={item.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.42)),radial-gradient(circle_at_78%_22%,rgba(183,7,13,0.14),transparent_30%)]" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                      <div className="mb-6 h-px w-full bg-gradient-to-r from-[#000000]/30 via-[#B7070D]/70 to-transparent" />
                      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <h3 className="max-w-2xl text-[clamp(2.8rem,7vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#ffffff]">
                          {item.title}
                        </h3>
                        <p className="max-w-xs text-base leading-7 text-[#000000]">{item.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute left-[10%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-[#B7070D]/16 blur-[120px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="gsap-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(3.3rem,8vw,9.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Numbers with gravity.
              </h2>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                Quiet scale. Selective reach. Built for premium culinary ecosystems.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statistics.map((stat, index) => (
                <div
                  className="stat-tile group relative min-h-[21rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86 p-7 backdrop-blur-2xl"
                  key={stat.label}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-[1.2rem] border border-[#000000]/12 bg-gradient-to-br from-[#B7070D]/18 to-[#125B12]/12 blur-[1px] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-[#000000]">
                      <span>Metric</span>
                      <span>0{index + 1}</span>
                    </div>
                    <div>
                      <div className="text-[clamp(4rem,8vw,7rem)] font-black leading-none tracking-[-0.075em] text-[#000000]">
                        <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                      </div>
                      <p className="mt-5 max-w-[15rem] text-xl font-semibold uppercase leading-6 tracking-[-0.03em] text-[#000000]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="chef-section relative min-h-screen overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <img
            alt="Chef adding final touches to a gourmet dish"
            className="absolute inset-0 h-full w-full object-cover opacity-100 blur-[0px]"
            decoding="async"
            loading="lazy"
            src={images.chef}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(183,7,13,0.24),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.24),rgba(0,0,0,0.06),rgba(0,0,0,0.18))]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="gsap-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
                Chef Experience
              </p>
              <h2 className="text-[clamp(3.2rem,8vw,9.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                A living chef ecosystem.
              </h2>
            </div>

            <div className="grid min-h-[48rem] items-end gap-5 lg:grid-cols-3">
              {chefCards.map((card, index) => (
                <motion.article
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, index % 2 ? -18 : 18, 0], rotate: [0, index % 2 ? 1.3 : -1.3, 0] }
                  }
                  className={`chef-card group relative overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/86 backdrop-blur-2xl ${
                    index === 1 ? "lg:mb-28" : index === 2 ? "lg:mb-10" : ""
                  }`}
                  key={card.title}
                  transition={{ duration: 7 + index, ease: "easeInOut", repeat: Infinity }}
                  whileHover={{ y: -18, scale: 1.025 }}
                >
                  <div className="relative h-[22rem] overflow-hidden">
                    <img
                      alt={card.title}
                      className="h-full w-full object-cover opacity-100 transition duration-[1400ms] group-hover:scale-[1.08] group-hover:opacity-95"
                      decoding="async"
                      loading="lazy"
                      src={card.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/16 via-transparent to-transparent" />
                  </div>
                  <div className="p-7">
                    <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-[#000000]">
                      <span className="h-3 w-3 rounded-[0.22rem] border border-[#000000]/12 bg-[#FFFFFF]/86" />
                      0{index + 1}
                    </div>
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#000000] md:text-5xl">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-[#000000]">{card.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(183,7,13,0.22),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.16),transparent_34%)]" />
          <FloatingGeometry />
          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="gsap-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">
              TERROIR EXPRESS
            </p>
            <h2 className="gsap-reveal max-w-[1180px] text-[clamp(3.4rem,10vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">
              The next table is global.
            </h2>
            <div className="gsap-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <a
                  className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                  href="mailto:contact@terroirexpress.com"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Enter the Universe</span>
                </a>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]"
                  onClick={() => onNavigate("home")}
                  type="button"
                >
                  Home
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]"
                  onClick={() => onNavigate("products")}
                  type="button"
                >
                  Products
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]"
                  onClick={() => onNavigate("chef-club")}
                  type="button"
                >
                  ChefClubs
                </button>
                <span className="text-[#000000]">·</span>
                <button
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#B7070D]"
                  onClick={() => onNavigate("awards")}
                  type="button"
                >
                  Awards
                </button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <footer className="relative z-10 border-t border-[#000000]/12 bg-[#FFFFFF] px-6 py-8 text-xs uppercase tracking-[0.32em] text-[#000000] md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <img src={terroir_logo} alt="Terroir Express Logo" className="h-8" />
          <span>About · 2026</span>
        </div>
      </footer>
    </div>
  );
}
