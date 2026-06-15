import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    headline: ["MOROCCAN", "TERROIR"],
    description:
      "From ancient olive groves, Atlantic seafood, aromatic spices, and fertile agricultural lands, TERROIR EXPRESS brings the richness of Morocco to the world's finest kitchens.",
  },
  {
    headline: ["INTERNATIONAL", "CULINARY", "EXCELLENCE"],
    description:
      "Combining Moroccan authenticity with global gastronomy, we source premium products and culinary solutions designed for chefs, restaurants, hotels, and luxury hospitality.",
  },
  {
    headline: ["CHEF CLUB", "&", "GASTRONOMIC", "EVENTS"],
    description:
      "A community where executive chefs, pastry chefs, restaurateurs, and hospitality leaders meet to exchange ideas, discover products, and shape the future of gastronomy.",
  },
  {
    headline: ["QUALITY", "TRUST", "FAST"],
    description:
      "Premium sourcing, professional logistics, and exceptional service delivered with the speed and reliability demanded by modern hospitality professionals.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_DELAY = 5000;

export function TerroirStoryCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, AUTO_DELAY);

    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#FFFFFF] px-6 py-24 md:px-10 lg:px-14">
      {/* WISK-inspired circular line system — clear, visible random drifting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[18rem] top-[-12rem] h-[44rem] w-[44rem] rounded-full border-2 border-[#000000]/25"
          animate={{
            x: [0, 130, -60, 90, -40, 0],
            y: [0, -90, 70, -30, 50, 0],
            rotate: [0, 14, -8, 10, -5, 0],
            scale: [1, 1.08, 0.95, 1.05, 0.98, 1],
          }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-[11rem] top-[-5rem] h-[30rem] w-[30rem] rounded-full border-2 border-[#000000]/[0.18]"
          animate={{
            x: [0, -100, 70, -50, 110, 0],
            y: [0, 110, -60, 90, -40, 0],
            rotate: [0, -16, 9, -12, 6, 0],
            scale: [1, 0.93, 1.07, 0.97, 1.04, 1],
          }}
          transition={{ duration: 19, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-[16rem] bottom-[-18rem] h-[50rem] w-[50rem] rounded-full border-2 border-[#000000]/25"
          animate={{
            x: [0, -140, 60, -90, 50, 0],
            y: [0, 80, -100, 40, -70, 0],
            rotate: [0, -12, 8, -6, 10, 0],
            scale: [1, 1.06, 0.94, 1.03, 0.97, 1],
          }}
          transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-[7rem] bottom-[-7rem] h-[30rem] w-[30rem] rounded-full border-2 border-[#000000]/[0.18]"
          animate={{
            x: [0, 100, -70, 120, -50, 0],
            y: [0, -110, 50, -60, 90, 0],
            rotate: [0, 18, -10, 8, -14, 0],
            scale: [1, 0.95, 1.08, 0.96, 1.05, 1],
          }}
          transition={{ duration: 17, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[58rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#000000]/[0.12]"
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -40, 60, -20, 0],
            scale: [1, 1.05, 0.96, 1.03, 1],
            rotate: [0, 6, -4, 3, 0],
          }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1400px] flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.h2
              className="text-[clamp(4.4rem,10vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#000000]"
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {slide.headline.map((line, index) => (
                <span className="block overflow-hidden" key={`${line}-${index}`}>
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: "105%", opacity: 0 },
                      show: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.9, ease: EASE, delay: index * 0.055 },
                      },
                      exit: {
                        y: "-42%",
                        opacity: 0,
                        transition: { duration: 0.45, ease: EASE, delay: index * 0.025 },
                      },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              className="mt-8 max-w-[600px] text-base leading-8 text-[#000000] md:text-lg md:leading-9"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
            >
              {slide.description}
            </motion.p>

            <motion.a
              href="#chef-preview"
              className="mt-9 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#000000] transition-colors hover:text-[#B7070D]"
              style={{ background: 'rgba(255,255,255,0.3)' }}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.35 }}
            >
              Discover More
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#000000]/35 md:bottom-14">
        {SLIDES.map((_, index) => (
          <div className="flex items-center gap-4" key={index}>
            <button
              className={`transition-colors ${active === index ? "text-[#000000]" : "hover:text-[#000000]/70"}`}
              onClick={() => setActive(index)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")}
            </button>
            {index < SLIDES.length - 1 && <span className="h-px w-6 bg-[#000000]/25 md:w-10" />}
          </div>
        ))}
      </div>
    </section>
  );
}