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

const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const contactMethods = [
  {
    label: "Email",
    value: "contact@terroirexpress.com",
    href: "mailto:contact@terroirexpress.com",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <rect x="6" y="12" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 15l18 12 18-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+212 5XX-XXXXXX",
    href: "tel:+212500000000",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <path d="M10 12a4 4 0 014-4h2a6 6 0 016 6v12a6 6 0 01-6 6h-2a4 4 0 01-4-4v-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M28 20h10a4 4 0 014 4v4a4 4 0 01-4 4H28" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "WhatsApp Business",
    href: "#",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M18 18h12M18 24h8M18 30h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@terroirexpress",
    href: "#",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <rect x="10" y="10" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="34" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Marrakech, Morocco",
    href: "#",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <path d="M24 6c-7 0-13 6.2-13 14 0 10.5 13 22 13 22s13-11.5 13-22c0-7.8-6-14-13-14z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="24" cy="20" r="5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const showcaseImages = [
  { src: img(7556764, 1600, 1100), label: "The Experience" },
  { src: img(34723813, 1600, 1100), label: "The Atmosphere" },
  { src: img(10573397, 1600, 1100), label: "The Terroir" },
];

const heroShapes = [
  { className: "left-[8%] top-[22%] h-14 w-14", delay: 0, duration: 10 },
  { className: "right-[10%] top-[16%] h-20 w-12", delay: 1.1, duration: 12 },
  { className: "bottom-[18%] left-[14%] h-12 w-24", delay: 0.5, duration: 11 },
  { className: "bottom-[24%] right-[16%] h-9 w-9", delay: 1.7, duration: 9 },
  { className: "left-[40%] top-[8%] h-6 w-6", delay: 0.8, duration: 7 },
  { className: "right-[32%] bottom-[10%] h-16 w-8", delay: 2.2, duration: 10 },
];

type ContactProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export default function Contact({ active, onNavigate }: ContactProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 28, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 28, mass: 0.7 });
  const mouseGlow = useMotionTemplate`radial-gradient(660px circle at ${smoothX}px ${smoothY}px, rgba(183,7,13,0.24), rgba(0,0,0,0.1) 34%, transparent 68%)`;

  const [formState, setFormState] = useState({
    name: "", company: "", email: "", phone: "", project: "", message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useLenisGsap(!reduceMotion);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".ct-reveal, .ct-card, .ct-contact-card, .ct-showcase", { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.to(".ct-hero-bg", {
        yPercent: 18,
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: ".ct-hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".ct-hero-light", {
        yPercent: 42, opacity: 0.65, ease: "none",
        scrollTrigger: { trigger: ".ct-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".ct-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 86, opacity: 0, filter: "blur(18px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.fromTo(".ct-card", { y: 80, opacity: 0, scale: 0.94 }, {
        y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out", stagger: 0.1,
        scrollTrigger: { trigger: ".ct-form-section", start: "top 75%" },
      });

      gsap.fromTo(".ct-contact-card", { y: 80, opacity: 0, scale: 0.94, filter: "blur(12px)" }, {
        y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.15, ease: "power4.out", stagger: 0.08,
        scrollTrigger: { trigger: ".ct-methods-grid", start: "top 78%" },
      });

      gsap.fromTo(".ct-showcase", { y: 90, opacity: 0, filter: "blur(14px)" }, {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power4.out", stagger: 0.12,
        scrollTrigger: { trigger: ".ct-showcase-grid", start: "top 78%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setFormSubmitted(true);
  };

  const handleChange = (field: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [field]: ev.target.value }));
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#FFFFFF] text-[#000000] antialiased"
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <AmbientGrid />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-20 mix-blend-screen" style={{ background: mouseGlow }} />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-[#FFFFFF]" initial={{ y: "0%" }} animate={{ y: "-100%" }} transition={{ duration: 1.15, ease: CURTAIN_EASE, delay: 0.2 }} />

      <NavBar active={active} onNavigate={onNavigate} />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.28 }}
      >

        {/* ════════════════ HERO ════════════════ */}
        <section className="ct-hero relative flex min-h-screen items-center overflow-hidden">
          <img
            alt="Luxury restaurant interior" src={img(7556764, 2200, 1400)}
            className="ct-hero-bg absolute inset-0 h-full w-full object-cover opacity-100"
            decoding="async" fetchPriority="high"
          />
          <div className="absolute inset-0 media-dark-overlay" />
          <div className="ct-hero-light absolute -left-[10%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-[#B7070D]/28 blur-[160px]" />
          <div className="absolute bottom-[-14%] right-[-8%] h-[36rem] w-[36rem] rounded-full bg-[#000000]/22 blur-[150px]" />
          <FloatingParticles />
          <FloatingGeometry shapes={heroShapes} />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col px-6 py-32 md:px-10 lg:px-14">
            <motion.div
              className="mb-9 inline-flex max-w-max items-center gap-3 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/80 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.42em] text-[#000000] backdrop-blur-xl"
              initial={{ y: 22, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.42, duration: 1, ease: PREMIUM_EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-[1px] bg-[#000000] shadow-[0_0_18px_#000000]" />
              Connect with us
            </motion.div>

            <h1 className="max-w-[1180px] text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-[0.83] tracking-[-0.085em] text-[#000000]">
              <SplitReveal
                ariaLabel="Let's Create Something Exceptional"
                lines={["Let's Create", "Something", "Exceptional"]}
              />
            </h1>

            <motion.div className="mt-9 h-px w-full max-w-[46rem] origin-left bg-gradient-to-r from-[#B7070D] via-[#125B12]/45 to-transparent" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1.1, duration: 1.2, ease: PREMIUM_EASE }} />

            <div className="mt-9 flex max-w-[1000px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <motion.p className="max-w-lg text-balance text-lg font-medium leading-8 text-[#000000] md:text-2xl md:leading-9" initial={{ y: 30, opacity: 0, filter: "blur(12px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 1.05, duration: 1.05, ease: PREMIUM_EASE }}>
                Every great partnership begins with a conversation. Reach out — let's build something extraordinary together.
              </motion.p>

              <motion.div
                className="max-w-sm rounded-[1.75rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-5 shadow-[0_25px_100px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                initial={{ y: 40, opacity: 0, filter: "blur(16px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.25, duration: 1.1, ease: PREMIUM_EASE }}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#000000]">
                  <span>Quick Connect</span>
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-[#B7070D] shadow-[0_0_20px_#B7070D]" />
                </div>
                <ul className="mt-4 space-y-3 text-sm text-[#000000]">
                  <li>contact@terroirexpress.com</li>
                  <li>+212 5XX-XXXXXX</li>
                  <li>Marrakech, Morocco</li>
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div aria-hidden className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.66rem] uppercase tracking-[0.35em] text-[#000000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
            <span>Discover</span>
            <span className="relative h-16 w-px overflow-hidden bg-[#000000]/12">
              <motion.span className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-[#B7070D] to-[#125B12]" animate={{ y: [-36, 70] }} transition={{ duration: 1.65, ease: "easeInOut", repeat: Infinity }} />
            </span>
          </motion.div>
        </section>

        {/* ════════════════ INTERACTIVE CONTACT FORM ════════════════ */}
        <section className="ct-form-section relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14" id="contact-form">
          <div className="absolute left-[-10%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-[#B7070D]/14 blur-[150px]" />
          <div className="absolute right-[-10%] bottom-[8%] h-[26rem] w-[26rem] rounded-full bg-[#000000]/12 blur-[140px]" />

          <div className="mx-auto max-w-[1500px]">
            <div className="ct-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Your Message</p>
              <h2 className="text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Start the conversation.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Form */}
              {formSubmitted ? (
                <motion.div
                  className="ct-card flex min-h-[32rem] flex-col items-start justify-center rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-8 backdrop-blur-2xl md:p-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: PREMIUM_EASE }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1rem] border border-[#000000]/40 bg-[#000000]/10">
                    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-[#000000]">
                      <path d="M10 24l9 9L38 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-3xl font-black uppercase tracking-[-0.04em] text-[#000000]">Message Received</h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-[#000000]">Thank you for reaching out. Our team will respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="ct-card grid gap-4 rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl md:grid-cols-2 md:p-10"
                >
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                    { id: "company", label: "Company / Restaurant", type: "text", placeholder: "Your establishment" },
                    { id: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
                    { id: "phone", label: "Phone", type: "tel", placeholder: "+212 ..." },
                  ].map((field) => (
                    <div className="relative group" key={field.id}>
                      <label htmlFor={field.id} className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#000000] group-focus-within:text-[#B7070D] transition-colors">
                        {field.label}
                      </label>
                      <motion.div
                        className="pointer-events-none absolute bottom-0 left-0 h-[2px] origin-left bg-gradient-to-r from-[#B7070D] to-[#125B12]"
                        initial={{ scaleX: 0 }}
                        whileFocus={{ scaleX: 1 }}
                      />
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={(formState as Record<string, string>)[field.id]}
                        onChange={handleChange(field.id)}
                        className="w-full rounded-[0.8rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] placeholder:text-[#000000] outline-none transition focus:border-[#B7070D]/60 focus:bg-[#FFFFFF]/80"
                      />
                    </div>
                  ))}

                  <div className="relative group md:col-span-2">
                    <label htmlFor="project" className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#000000] group-focus-within:text-[#B7070D] transition-colors">
                      Project Type
                    </label>
                    <select
                      id="project"
                      value={formState.project}
                      onChange={handleChange("project")}
                      className="w-full rounded-[0.8rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] outline-none transition focus:border-[#B7070D]/60 focus:bg-[#FFFFFF]/80"
                    >
                      <option value="" disabled className="bg-[#FFFFFF]">Select an area</option>
                      <option value="gastronomy" className="bg-[#FFFFFF]">Gastronomy & Products</option>
                      <option value="hospitality" className="bg-[#FFFFFF]">Hospitality Partnership</option>
                      <option value="consultation" className="bg-[#FFFFFF]">Private Consultation</option>
                      <option value="events" className="bg-[#FFFFFF]">Events & Experiences</option>
                      <option value="other" className="bg-[#FFFFFF]">Other</option>
                    </select>
                  </div>

                  <div className="relative group md:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#000000] group-focus-within:text-[#B7070D] transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange("message")}
                      placeholder="Tell us about your project..."
                      className="w-full resize-none rounded-[0.8rem] border border-[#000000]/12 bg-[#FFFFFF]/80 px-5 py-4 text-sm text-[#000000] placeholder:text-[#000000] outline-none transition focus:border-[#B7070D]/60 focus:bg-[#FFFFFF]/80"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="group relative inline-flex w-full overflow-hidden rounded-[1rem] border border-[#000000]/12 bg-[#B7070D] py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="relative z-10">Send Message</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Side panel */}
              <div className="flex flex-col gap-5">
                <MagneticPanel className="ct-card flex-1 overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 backdrop-blur-2xl" strength={0.4}>
                  <img alt="Moroccan interior" src={img(7391598, 900, 1100)} className="h-full w-full object-cover opacity-100 transition duration-[1400ms] group-hover:scale-108" decoding="async" loading="lazy" />
                  <div className="absolute inset-0 media-readable-bottom" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">Our Home</p>
                    <p className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#000000]">Marrakech, Morocco</p>
                  </div>
                </MagneticPanel>

                <MagneticPanel className="ct-card flex-1 overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 backdrop-blur-2xl" strength={0.4}>
                  <img alt="Riad courtyard" src={img(10573397, 900, 1100)} className="h-full w-full object-cover opacity-100 transition duration-[1400ms] group-hover:scale-108" decoding="async" loading="lazy" />
                  <div className="absolute inset-0 media-readable-bottom" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">The Spirit</p>
                    <p className="text-2xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#000000]">Terroir & Tradition</p>
                  </div>
                </MagneticPanel>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ LOCATION ════════════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute right-[-10%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-[#000000]/14 blur-[140px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="ct-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Location</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Where it all begins.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
              {/* Stylised "map" card */}
              <MagneticPanel className="group relative min-h-[30rem] overflow-hidden rounded-[2.4rem] border border-[#000000]/12 bg-[#FFFFFF]/80 backdrop-blur-2xl" strength={0.3}>
                <img alt="Marrakech" src={img(13759765, 1600, 1200)} className="absolute inset-0 h-full w-full object-cover opacity-100 transition duration-[1500ms] group-hover:scale-105" decoding="async" loading="lazy" />
                <div className="absolute inset-0 media-readable-bottom" />

                {/* floating coordinate marker */}
                <motion.div
                  animate={reduceMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#000000]/12 bg-[#B7070D]/50 blur-sm" />
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#000000]/12"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <div className="relative h-4 w-4 rounded-full bg-[#FFFFFF] shadow-[0_0_30px_white]" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-4 flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">
                    <span className="h-px w-8 bg-gradient-to-r from-[#B7070D] to-transparent" />
                    Coordinates
                  </div>
                  <p className="text-4xl font-black uppercase tracking-[-0.05em] text-[#000000] md:text-5xl">31.6295° N</p>
                  <p className="text-2xl font-bold text-[#000000] md:text-3xl">7.9811° W</p>
                  <p className="mt-4 text-sm text-[#000000]">Marrakech, Morocco</p>
                </div>
              </MagneticPanel>

              {/* Location cards stack */}
              <div className="flex flex-col gap-5">
                <MagneticPanel className="ct-card flex-1 rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl" strength={0.4}>
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">Headquarters</span>
                      <p className="mt-4 text-2xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#000000]">The Riad Office</p>
                    </div>
                    <p className="text-sm text-[#000000]">Traditional space, modern ambition. Where terroir meets vision.</p>
                  </div>
                </MagneticPanel>

                <MagneticPanel className="ct-card flex-1 rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl" strength={0.4}>
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">Available For</span>
                      <p className="mt-4 text-2xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#000000]">Global Visits</p>
                    </div>
                    <p className="text-sm text-[#000000]">By appointment. Come see the origin — taste the difference.</p>
                  </div>
                </MagneticPanel>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ PRIVATE CONSULTATION ════════════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(183,7,13,0.18),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.14),transparent_34%)]" />
          <FloatingParticles />

          <div className="relative mx-auto max-w-[1500px]">
            <div className="ct-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Private consultation.
              </h2>
              <p className="max-w-sm text-lg leading-8 text-[#000000]">
                Tailored experiences, partnerships, and gastronomy innovation — by invitation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Gastronomy Consultation", desc: "Menu design, product selection, and sourcing strategy.", accent: ACCENT_RED },
                { title: "Hospitality Partnerships", desc: "Hotel, resort, and restaurant program development.", accent: ACCENT_GREEN },
                { title: "Culinary Innovation", desc: "R&D, new flavour profiles, and fusion concepts.", accent: ACCENT_RED },
              ].map((item, i) => (
                <MagneticPanel
                  key={item.title}
                  className="ct-card group relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-7 backdrop-blur-2xl"
                  strength={0.5}
                >
                  <motion.div
                    aria-hidden
                    className="absolute -inset-px rounded-[2rem] opacity-0 blur-md transition group-hover:opacity-100"
                    style={{ background: `linear-gradient(135deg, ${item.accent}, transparent 50%, ${item.accent === ACCENT_RED ? ACCENT_GREEN : ACCENT_RED})` }}
                    animate={{ opacity: [0.0, 0.2, 0.0] }}
                    transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">0{i + 1}</span>
                    <div>
                      <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000] md:text-4xl">{item.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-[#000000]">{item.desc}</p>
                    </div>
                  </div>
                </MagneticPanel>
              ))}
            </div>

            <motion.div className="ct-reveal mt-14 flex justify-center">
              <a
                className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-10 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                href="#contact-form"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative z-10">Book a Consultation</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ COMMUNICATION METHODS ════════════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="ct-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">Reach Out</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                Every channel open.
              </h2>
            </div>

            <div className="ct-methods-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {contactMethods.map((method) => (
                <a
                  href={method.href}
                  key={method.label}
                  className="ct-contact-card group relative flex min-h-[16rem] flex-col items-start justify-between overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80 p-6 backdrop-blur-2xl transition-colors hover:bg-[#FFFFFF]/80"
                >
                  <motion.div
                    aria-hidden
                    className="absolute -inset-px rounded-[2rem] opacity-0 blur-md transition group-hover:opacity-100"
                    style={{ background: `linear-gradient(135deg, ${ACCENT_RED}66, transparent 50%, ${ACCENT_GREEN}66)` }}
                  />
                  <div className="relative z-10 text-[#000000] transition-colors duration-500 group-hover:text-[#000000]">
                    {method.icon}
                  </div>
                  <div className="relative z-10">
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#000000]">{method.label}</span>
                    <p className="mt-2 text-lg font-bold text-[#000000]">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ LUXURY SHOWCASE ════════════════ */}
        <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 md:py-36 lg:px-14">
          <div className="absolute right-[-10%] top-[14%] h-[30rem] w-[30rem] rounded-full bg-[#B7070D]/16 blur-[150px]" />
          <div className="mx-auto max-w-[1500px]">
            <div className="ct-reveal mb-16 max-w-5xl">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">The Universe</p>
              <h2 className="text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-[#000000]">
                See it. Taste it.
              </h2>
            </div>

            <div className="ct-showcase-grid grid gap-4 md:grid-cols-3">
              {showcaseImages.map((si) => (
                <MagneticPanel
                  className="ct-showcase group relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-[#000000]/12 bg-[#FFFFFF]/80"
                  key={si.label}
                  strength={0.4}
                >
                  <img alt={si.label} src={si.src} className="h-full w-full object-cover opacity-100 transition duration-[1500ms] group-hover:scale-108" decoding="async" loading="lazy" />
                  <div className="absolute inset-0 media-readable-bottom" />
                  {/* sweep */}
                  <motion.div
                    aria-hidden
                    className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-18deg] bg-[#000000]/08 blur-md"
                    animate={{ x: ["-20%", "440%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#000000] md:text-4xl">{si.label}</h3>
                  </div>
                </MagneticPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ FINAL ════════════════ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#FFFFFF] px-6 py-28 md:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(183,7,13,0.24),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(0,0,0,0.18),transparent_34%)]" />
          <motion.div aria-hidden className="absolute inset-0" animate={{ opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle at 28% 58%, rgba(183,7,13,0.16), transparent 40%)" }} />
          <FloatingGeometry />
          <FloatingParticles />

          <div className="relative mx-auto flex w-full max-w-[1500px] flex-col items-start">
            <p className="ct-reveal mb-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#000000]">TERROIR EXPRESS</p>
            <h2 className="ct-reveal max-w-[1180px] text-[clamp(3rem,9.5vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#000000]">
              The future of gastronomy starts here.
            </h2>
            <div className="ct-reveal mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticPanel className="relative inline-flex">
                <a
                  className="group relative inline-flex overflow-hidden rounded-[1.2rem] border border-[#000000]/12 bg-[#B7070D] px-8 py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition duration-500 hover:text-white"
                  href="#contact-form"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#B7070D] to-[#125B12] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10">Start the Conversation</span>
                </a>
              </MagneticPanel>
              <div className="flex items-center gap-4">
                <button className="text-sm font-semibold uppercase tracking-[0.2em] text-[#000000] transition hover:text-[#000000]" onClick={() => onNavigate("home")} type="button">Home</button>
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
          <span>Contact · 2026</span>
        </div>
      </footer>
    </div>
  );
}
