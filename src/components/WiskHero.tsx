import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACCENT_GOLD = "#B7070D";

const SLIDES = [
  {
    subtitle: "Terroir Express · Morocco",
    headline: ["FROM MOROCCAN", "TERROIR TO", "CULINARY", "EXCELLENCE"],
    description:
      "Premium ingredients sourced from Morocco's finest terroirs for chefs, restaurants, and hospitality professionals worldwide.",
    image:
      "https://images.pexels.com/photos/2287528/pexels-photo-2287528.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2400&h=1600",
    thumb:
      "https://images.pexels.com/photos/2287528/pexels-photo-2287528.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=300&h=300",
  },
  {
    subtitle: "Artisan Heritage",
    headline: ["AUTHENTIC", "FLAVORS", "CRAFTED BY", "TRADITION"],
    description:
      "Connecting Moroccan producers with international culinary excellence through quality, trust, and innovation.",
    image:
      "https://images.pexels.com/photos/1414693/pexels-photo-1414693.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2400&h=1600",
    thumb:
      "https://images.pexels.com/photos/1414693/pexels-photo-1414693.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=300&h=300",
  },
  {
    subtitle: "Worldwide Distribution",
    headline: ["PREMIUM", "GASTRONOMY", "DELIVERED"],
    description:
      "Fast, reliable distribution of exceptional ingredients for hotels, restaurants, caterers, and gourmet retailers.",
    image:
      "https://images.pexels.com/photos/15671380/pexels-photo-15671380.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2400&h=1600",
    thumb:
      "https://images.pexels.com/photos/15671380/pexels-photo-15671380.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=300&h=300",
  },
];

const INTERVAL = 6000;
const EASE = [0.76, 0, 0.24, 1] as const;

export function WiskHero() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDir(1);
      setActive((p) => (p + 1) % SLIDES.length);
    }, INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [resetTimer]);

  const goTo = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    resetTimer();
  };

  const prev = () => {
    setDir(-1);
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
    resetTimer();
  };

  const next = () => {
    setDir(1);
    setActive((p) => (p + 1) % SLIDES.length);
    resetTimer();
  };

  const slide = SLIDES[active];
  const nextSlide = SLIDES[(active + 1) % SLIDES.length];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#FFFFFF]">
      {/* ── Backgrounds ── */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={`bg-${active}`}
          src={slide.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.06, opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </AnimatePresence>

      {/* subtle readability overlay */}
      <div className="absolute inset-0 media-dark-overlay" />

      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Right decorative curved shape ── */}
      <div className="pointer-events-none absolute -right-[18vw] top-0 hidden h-full w-[42vw] lg:block">
        <svg
          viewBox="0 0 600 1080"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M600 0H240C240 0 50 200 50 540C50 880 240 1080 240 1080H600V0Z"
            fill="white"
            fillOpacity="0.04"
          />
          <path
            d="M600 0H240C240 0 50 200 50 540C50 880 240 1080 240 1080H600"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-10 lg:px-14">
        <div className="flex w-full items-center justify-between gap-10">
          {/* Left: text content */}
          <div className="max-w-[52rem]">
            {/* subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${active}`}
                className="mb-6 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.38em]"
                style={{ color: ACCENT_GOLD }}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span
                  className="h-px w-10"
                  style={{ background: ACCENT_GOLD }}
                />
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`h-${active}`}
                className="text-[clamp(2.6rem,7.8vw,7.8rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] text-[#000000]"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {slide.headline.map((line, i) => (
                  <span className="block overflow-hidden" key={line}>
                    <motion.span
                      className="block"
                      variants={{
                        hidden: {
                          y: dir > 0 ? "110%" : "-110%",
                          opacity: 0,
                        },
                        show: {
                          y: "0%",
                          opacity: 1,
                          transition: {
                            duration: 0.85,
                            ease: EASE,
                            delay: i * 0.06,
                          },
                        },
                        exit: {
                          y: dir > 0 ? "-70%" : "70%",
                          opacity: 0,
                          transition: {
                            duration: 0.5,
                            ease: EASE,
                            delay: i * 0.03,
                          },
                        },
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </AnimatePresence>

            {/* divider */}
            <motion.div
              className="my-8 h-px w-full max-w-[28rem] origin-left"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_GOLD}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            />

            {/* description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                className="max-w-[32rem] text-[1rem] leading-[1.75] text-[#000000] md:text-[1.1rem]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            >
              <button
                type="button"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#000000]/12 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#000000] transition-colors hover:border-[#125B12]"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              >
                <span className="relative z-10">Discover More</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
                <span
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: ACCENT_GOLD }}
                />
              </button>
            </motion.div>
          </div>

          {/* Right: circular slide navigator */}
          <div className="hidden flex-col items-center gap-7 lg:flex">
            {/* Circular preview */}
            <div className="relative">
              {/* outer ring */}
              <div className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full border border-[#000000]/12 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={`thumb-${active}`}
                    src={nextSlide.thumb}
                    alt="Next slide preview"
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.25, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 rounded-full border border-[#000000]/12 media-readable-bottom" />
              </div>

              {/* slide counter */}
              <div
                className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-baseline gap-1 rounded-full border border-[#000000]/12 bg-[#FFFFFF]/80 px-3 py-1 text-[0.68rem] font-bold tracking-[0.1em] backdrop-blur-xl"
                style={{ color: ACCENT_GOLD }}
              >
                <span className="text-sm">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-[#000000]">/</span>
                <span className="text-[#000000] text-[0.6rem]">
                  {String(SLIDES.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* prev / next buttons */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#000000]/12 text-[#000000] transition hover:border-[#125B12] hover:text-[#000000]"
                onClick={prev}
                type="button"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M8.5 2.5L4 7l4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#000000]/12 text-[#000000] transition hover:border-[#125B12] hover:text-[#000000]"
                onClick={next}
                type="button"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M5.5 2.5L10 7l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* dot indicators */}
            <div className="flex flex-col gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative h-2.5 w-2.5 rounded-full border border-[#000000]/12 transition"
                  onClick={() => goTo(i)}
                  type="button"
                >
                  {active === i && (
                    <motion.span
                      layoutId="hero-dot"
                      className="absolute inset-0 rounded-full"
                      style={{ background: ACCENT_GOLD }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* progress bar */}
        <div className="h-px w-full bg-[#FFFFFF]/70">
          <motion.div
            className="h-full origin-left"
            style={{ background: ACCENT_GOLD }}
            key={`prog-${active}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        </div>

        {/* mobile dot nav */}
        <div className="flex items-center justify-center gap-3 py-5 lg:hidden">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-2 w-2 rounded-full border border-[#000000]/12 transition"
              onClick={() => goTo(i)}
              type="button"
            >
              {active === i && (
                <motion.span
                  layoutId="hero-dot-m"
                  className="absolute inset-0 rounded-full"
                  style={{ background: ACCENT_GOLD }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        aria-hidden
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[0.6rem] uppercase tracking-[0.35em] text-[#000000] lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-[#000000]/15">
          <motion.span
            className="absolute left-0 top-0 h-6 w-px"
            style={{
              background: `linear-gradient(to bottom, ${ACCENT_GOLD}, transparent)`,
            }}
            animate={{ y: [-28, 52] }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </span>
      </motion.div>
    </section>
  );
}
