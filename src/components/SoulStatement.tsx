import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GOLD = "#B7070D";
const EASE = [0.16, 1, 0.3, 1] as const;

export function SoulStatement() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-[#FFFFFF]"
    >
      {/* background image */}
      <motion.img
        src="https://images.pexels.com/photos/36430088/pexels-photo-36430088.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200&h=1400"
        alt="Chef finishing a gourmet dish"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: imgScale, opacity: imgOpacity }}
      />

      {/* subtle readability overlay */}
      <div className="absolute inset-0 media-dark-overlay" />

      {/* subtle top and bottom gradients */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#000000]/24 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000]/24 to-transparent" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-14">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <blockquote className="text-[clamp(2.4rem,5.5vw,5.8rem)] font-black uppercase leading-[1.06] tracking-[-0.035em] text-[#000000]">
            “Cuisine is emotion. Cuisine is memory. Cuisine is culture. Every ingredient tells a story, every chef creates an experience, and every plate becomes a journey.”
          </blockquote>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 h-px w-20"
          style={{ background: GOLD }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        />

        <motion.div
          className="mt-10 space-y-3"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#000000]">
            — TERROIR EXPRESS
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-[#000000]">
            From Moroccan Terroir to International Culinary Excellence
          </p>
        </motion.div>
      </div>
    </section>
  );
}
