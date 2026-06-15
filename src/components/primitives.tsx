import {
  animate as motionAnimate,
  motion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export const ACCENT_RED = "#B7070D";
export const ACCENT_GREEN = "#125B12";
export const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
export const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

const titleLineVariants: Variants = {
  hidden: { y: "120%", opacity: 0, filter: "blur(18px)" },
  show: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.35, ease: PREMIUM_EASE },
  },
};

const titleContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
};

type SplitRevealProps = {
  lines: string[];
  className?: string;
  ariaLabel?: string;
};

export function SplitReveal({ lines, className = "", ariaLabel }: SplitRevealProps) {
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
  strength?: number;
};

export function MagneticPanel({ children, className = "", strength = 1 }: MagneticPanelProps) {
  const x = useMotionValueZero();
  const y = useMotionValueZero();
  const rotateX = useMotionValueZero();
  const rotateY = useMotionValueZero();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;

    x.set(relX * 0.045 * strength);
    y.set(relY * 0.045 * strength);
    rotateX.set((-relY / rect.height) * 7 * strength);
    rotateY.set((relX / rect.width) * 7 * strength);
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

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInViewImported(ref);
  const counter = useMotionValueZero();
  const formatted = useTransformImported(counter, suffix);

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

type FloatingGeometryProps = {
  shapes?: { className: string; delay: number; duration: number }[];
};

const defaultShapes = [
  { className: "left-[6%] top-[18%] h-12 w-12", delay: 0, duration: 9 },
  { className: "right-[12%] top-[16%] h-20 w-12", delay: 1.2, duration: 11 },
  { className: "bottom-[19%] left-[16%] h-16 w-28", delay: 0.4, duration: 10 },
  { className: "bottom-[24%] right-[18%] h-10 w-10", delay: 1.9, duration: 8 },
  { className: "left-[42%] top-[10%] h-7 w-7", delay: 0.8, duration: 7 },
];

export function FloatingGeometry({ shapes = defaultShapes }: FloatingGeometryProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          aria-hidden="true"
          className={`absolute rounded-[0.35rem] border border-[#000000]/12 bg-[#FFFFFF]/80 shadow-[0_0_70px_rgba(183,7,13,0.08)] backdrop-blur-md ${shape.className}`}
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

const particleSeeds = Array.from({ length: 26 }, (_, i) => {
  const left = (i * 37.13) % 100;
  const top = (i * 53.71) % 100;
  const size = 1 + ((i * 7) % 4);
  const duration = 9 + ((i * 5) % 12);
  const delay = (i % 9) * 0.7;
  return { left, top, size, duration, delay, drift: i % 2 ? 30 : -30 };
});

export function FloatingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particleSeeds.map((p, i) => (
        <motion.span
          className="absolute rounded-full bg-[#B7070D]/30 blur-[0.5px]"
          key={i}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            height: p.size,
            width: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

export function AmbientGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_10%,black,transparent_68%)]" />
    </div>
  );
}

// --- thin re-export wrappers so consumers import from one place ---
import {
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

function useMotionValueZero() {
  return useMotionValue(0);
}

function useInViewImported(ref: React.RefObject<HTMLElement | null>) {
  return useInView(ref, { once: true, margin: "-18%" });
}

function useTransformImported(value: ReturnType<typeof useMotionValue<number>>, suffix: string) {
  return useTransform(value, (latest) =>
    `${Math.round(latest).toLocaleString("en-US")}${suffix}`,
  );
}
