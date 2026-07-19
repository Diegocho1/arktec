import { useEffect, useState } from 'react';

/**
 * Hook que calcula qué tan revelado está el footer
 * conforme el usuario se acerca al fondo de la página.
 * Retorna un valor entre 0 (oculto) y 1 (completamente visible).
 * Principio S: lógica de scroll aislada, no mezclada en el componente.
 */
export function useScrolledFooter() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight;
      const winHeight    = window.innerHeight;
      const scrollable   = docHeight - winHeight;
      const threshold    = scrollable * 0.8; // empieza a revelar al 80% del scroll

      if (scrollTop <= threshold) {
        setProgress(0);
        return;
      }

      const remaining = scrollable - threshold;
      const current   = scrollTop - threshold;
      setProgress(Math.min(current / remaining, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}