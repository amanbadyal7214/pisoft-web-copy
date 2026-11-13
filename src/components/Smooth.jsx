// SmoothScrolling.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

function SmoothScrolling() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.5,
      smooth: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Setup requestAnimationFrame loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true }); 
    }
  }, [pathname]);

  return null;
}

export default SmoothScrolling;
