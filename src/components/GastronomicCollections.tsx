import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediterannaImage from "../images/Mediteranna.png";

const GOLD = "#B7070D";
const NAVY = "#000000";
const EASE = [0.16, 1, 0.3, 1] as const;

const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const CATEGORIES = [
  {
    title: "Mediterranna",
    items: ["Premium Olive Oils", "Gourmet Mediterranean Products", "Artisan Collections"],
    description:
      "Luxury extra virgin olive oils, Mediterranean delicacies, artisan condiments, and premium products crafted for modern gastronomy.",
    image: MediterannaImage,
  },
  {
    title: "Fresh Terroir",
    items: ["Vegetables", "Fruits", "Fresh Herbs"],
    description:
      "Seasonal vegetables, sun-ripened fruits, and aromatic herbs selected at the source for chefs who demand absolute freshness.",
    image: img(21792977, 1100, 1400),
  },
  {
    title: "Premium Meat",
    items: ["Wagyu", "Beef", "Lamb", "Poultry"],
    description:
      "Exceptional cuts including marbled Wagyu, premium beef, tender lamb, and poultry, sourced for the world's finest tables.",
    image: img(31406827, 1100, 1400),
  },
  {
    title: "International Gastronomy",
    items: ["Japanese Products", "Chinese Products", "Mediterranean Ingredients"],
    description:
      "A curated world pantry — Japanese precision, Chinese tradition, and Mediterranean soul, united for boundless culinary creativity.",
    image: img(31286807, 1100, 1400),
  },
  {
    title: "Professional Pastry",
    items: ["Chocolate", "Creams", "Decorations", "Bakery Solutions"],
    description:
      "Couverture chocolate, refined creams, elegant decorations, and complete bakery solutions for the art of fine pâtisserie.",
    image: img(29380188, 1100, 1400),
  },
];

export function GastronomicCollections() {
  const [active, setActive] = useState(0);
  const current = CATEGORIES[active];

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        {/* eyebrow */}
        <div className="mb-14 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em]" style={{ color: NAVY }}>
          <span className="h-px w-10" style={{ background: GOLD }} />
          Gastronomic Collections
        </div>

        <div className="grid items-stretch gap-12 lg:grid-cols-[30%_70%]">
          {/* ── Left: image ── */}
          <div className="relative h-[26rem] overflow-hidden md:h-[44rem] lg:h-[48rem]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </AnimatePresence>

            {/* active index */}
            <div className="absolute left-6 top-6 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#000000]">
              {String(active + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
            </div>
          </div>

          {/* ── Right: list ── */}
          <div className="flex flex-col justify-center">
            <ul className="flex flex-col">
              {CATEGORIES.map((cat, index) => {
                const isActive = index === active;
                return (
                  <li key={cat.title} className="border-b border-[#000000]/10 last:border-b-0">
                    <button
                      type="button"
                      className="group w-full py-4 text-left md:py-5"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                    >
                      <motion.span
                        className="block font-black uppercase leading-[0.95] tracking-[-0.04em]"
                        animate={{
                          opacity: isActive ? 1 : 0.3,
                          x: isActive ? 14 : 0,
                          color: isActive ? NAVY : NAVY,
                        }}
                        transition={{ duration: 0.6, ease: EASE }}
                        style={{ fontSize: "clamp(2rem,4.6vw,4.4rem)" }}
                      >
                        {cat.title}
                      </motion.span>

                      {/* expanding description for active */}
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
                            <div className="pl-3.5 pt-5 md:max-w-xl">
                              <p className="text-sm leading-7 md:text-base" style={{ color: "#000000" }}>
                                {current.description}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em]" style={{ color: NAVY }}>
                                {cat.items.map((item) => (
                                  <span key={item} className="opacity-70">
                                    {item}
                                  </span>
                                ))}
                              </div>
                              <span
                                className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.26em] transition-colors"
                                style={{ color: GOLD }}
                              >
                                Explore Collection
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
      </div>
    </section>
  );
}
