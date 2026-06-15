import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import terroir_logo from "../images/logo.png";

const ACCENT_GOLD = "#B7070D";
const EASE = [0.76, 0, 0.24, 1] as const;

export type NavRoute =
  | "home"
  | "about"
  | "products"
  | "chef-club"
  | "awards"
  | "contact";

const LINKS: { label: string; route: NavRoute }[] = [
  { label: "Home", route: "home" },
  { label: "About", route: "about" },
  { label: "Products", route: "products" },
  { label: "Terroir Club", route: "chef-club" },
  { label: "Awards", route: "awards" },
];

type NavBarProps = {
  active: NavRoute;
  onNavigate: (route: NavRoute) => void;
};

export function NavBar({ active, onNavigate }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (route: NavRoute) => {
    setOpen(false);
    onNavigate(route);
  };

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "border-b border-[#000000]/12 bg-[#FFFFFF]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 md:px-10 lg:px-14 ${scrolled ? "py-3.5" : "py-5"}`}>
        {/* logo */}
        <button
          onClick={() => go("home")}
          type="button"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <img
            src={terroir_logo}
            alt="Terroir Express Logo"
            className={`transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}
          />
        </button>

        {/* desktop links */}
        <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.22em] md:flex">
          {LINKS.map((link) => (
            <button
              key={link.route}
              onClick={() => go(link.route)}
              type="button"
              className="group relative py-1 text-[#000000] transition-colors hover:text-[#000000]"
              style={active === link.route ? { color: "#000000" } : undefined}
            >
              {link.label}
              {active === link.route && (
                <motion.span
                  layoutId="nav-ul"
                  className="absolute -bottom-0.5 left-0 h-px w-full"
                  style={{ background: ACCENT_GOLD }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{
                  background: ACCENT_GOLD,
                  display: active === link.route ? "none" : undefined,
                }}
              />
            </button>
          ))}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <button
            className="hidden items-center gap-2 rounded-full border border-transparent bg-[#B7070D] px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#125B12] sm:inline-flex"
            onClick={() => go("contact")}
            type="button"
            style={active === "contact" ? { borderColor: ACCENT_GOLD, color: ACCENT_GOLD } : undefined}
          >
            Contact
          </button>

          {/* mobile burger */}
          <button
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-[#000000]/12 md:hidden"
            onClick={() => setOpen((o) => !o)}
            type="button"
          >
            <motion.span
              className="h-px w-4 bg-[#000000]"
              animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
            />
            <motion.span
              className="h-px w-4 bg-[#000000]"
              animate={{ opacity: open ? 0 : 1 }}
            />
            <motion.span
              className="h-px w-4 bg-[#000000]"
              animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
            />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mx-4 overflow-hidden rounded-2xl border border-[#000000]/12 bg-[#FFFFFF]/95 p-3 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {LINKS.map((link) => (
              <button
                key={link.route}
                onClick={() => go(link.route)}
                type="button"
                className={`block w-full rounded-xl px-4 py-3 text-left text-xs uppercase tracking-[0.24em] transition ${
                  active === link.route
                    ? "bg-[#FFFFFF]/70 text-[#000000]"
                    : "text-[#000000] hover:bg-[#FFFFFF]/60 hover:text-[#000000]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              type="button"
              className="mt-1 block w-full rounded-xl px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.24em] text-[#000000]"
              style={{ background: ACCENT_GOLD }}
            >
              Contact
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
