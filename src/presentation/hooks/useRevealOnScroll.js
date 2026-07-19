import { useEffect, useRef, useState } from 'react';

/**
 * Hook reutilizable — detecta cuando un elemento entra al viewport.
 * Principio S: responsabilidad única, solo maneja visibilidad por scroll.
 * @param {IntersectionObserverInit} options
 */
export function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1, ...options });

    const el = ref.current;
    if (el) observer.observe(el);

    return () => { if (el) observer.unobserve(el); };
  }, []);

  return { ref, isVisible };
}