import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GOLD = "#B7070D";
const NAVY = "#000000";
const EASE = [0.16, 1, 0.3, 1] as const;

const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const PILLARS = [
  {
    title: "Executive Chefs",
    description:
      "Visionary leaders defining the identity of the world's most ambitious kitchens.",
    image: img(30874866, 1000, 1400),
  },
  {
    title: "Pastry Chefs",
    description:
      "Masters of precision and sweetness, turning craft into edible architecture.",
    image: img(23947768, 1000, 1400),
  },
  {
    title: "Sushi Chefs",
    description:
      "Guardians of discipline and detail, where every cut is a gesture of respect.",
    image: img(8951149, 1000, 1400),
  },
  {
    title: "Restaurateurs",
    description:
      "Entrepreneurs shaping dining culture and memorable hospitality destinations.",
    image: img(27504009, 1000, 1400),
  },
  {
    title: "Hospitality Leaders",
    description:
      "Directors and investors elevating the standards of luxury hospitality worldwide.",
    image: img(33344926, 1000, 1400),
  },
  {
    title: "Culinary Innovators",
    description:
      "Creative minds exploring new techniques, flavors, and the future of gastronomy.",
    image: img(20614080, 1000, 1400),
  },
];

export function ChefClubCommunity() {
  const [active, setActive] = useState(0);
  const current = PILLARS[active];

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        {/* ── Intro: split headline / editorial text ── */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div
              className="mb-6 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em]"
              style={{ color: NAVY }}
            >
              <span className="h-px w-10" style={{ background: GOLD }} />
              Chef Club
            </div>
            <h2
              className="font-black uppercase leading-[0.85] tracking-[-0.055em]"
              style={{ color: NAVY, fontSize: "clamp(3.4rem,8vw,8rem)" }}
            >
              A community
              <br />
              of culinary
              <br />
              excellence
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <p className="max-w-xl text-lg leading-9" style={{ color: "#000000" }}>
              The TERROIR EXPRESS Chef Club brings together executive chefs, pastry chefs, restaurateurs, hospitality investors, and culinary professionals to exchange ideas, discover products, build partnerships, and shape the future of gastronomy.
            </p>
          </motion.div>
        </div>

        {/* ── WISK-style interactive vertical list + image reveal ── */}
        <div className="grid items-stretch gap-12 lg:grid-cols-[30%_70%]">
          {/* Left: image reveal */}
          <div className="relative order-last h-[24rem] overflow-hidden md:h-[38rem] lg:order-first lg:h-[44rem]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover grayscale-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </AnimatePresence>
            <div className="absolute left-6 top-6 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#000000]">
              {String(active + 1).padStart(2, "0")} / {String(PILLARS.length).padStart(2, "0")}
            </div>
          </div>

          {/* Right: large list */}
          <div className="flex flex-col justify-center">
            <ul className="flex flex-col">
              {PILLARS.map((pillar, index) => {
                const isActive = index === active;
                return (
                  <li key={pillar.title} className="border-b border-[#000000]/10 last:border-b-0">
                    <button
                      type="button"
                      className="group w-full py-4 text-left md:py-5"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                    >
                      <motion.span
                        className="block font-black uppercase leading-[0.95] tracking-[-0.04em]"
                        animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 14 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        style={{ color: NAVY, fontSize: "clamp(1.9rem,4.2vw,4rem)" }}
                      >
                        {pillar.title}
                      </motion.span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3.5 pt-4 md:max-w-xl">
                              <p className="text-sm leading-7 md:text-base" style={{ color: "#000000" }}>
                                {pillar.description}
                              </p>
                              <span
                                className="mt-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.26em]"
                                style={{ color: GOLD }}
                              >
                                Join the Club
                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Featured quote ── */}
        <motion.div
          className="mx-auto mt-28 max-w-4xl text-center"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="mx-auto mb-10 block h-px w-16" style={{ background: GOLD }} />
          <blockquote
            className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-semibold leading-[1.3] tracking-[-0.02em]"
            style={{ color: NAVY }}
          >
            “Great gastronomy is not built by ingredients alone. It is built by the people, creativity, and passion behind every plate.”
          </blockquote>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#000000" }}>
            — TERROIR EXPRESS CHEF CLUB
          </p>
        </motion.div>
      </div>
    </section>
  );
}
