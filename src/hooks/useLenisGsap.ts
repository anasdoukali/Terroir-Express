import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Boots a Lenis smooth-scroll instance synced to GSAP's ticker and refreshes
 * ScrollTrigger once layout settles. Returns nothing — purely a side effect.
 *
 * Pass `enabled = false` (e.g. for reduced-motion users) to skip smooth scroll.
 * `deps` lets the caller re-init when route/page identity changes.
 */
export function useLenisGsap(enabled: boolean, deps: unknown[] = []) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.82,
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 700);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
}
