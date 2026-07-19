import { useScrolledFooter } from '../../hooks/useScrolledFooter.js';

const FOOTER_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/arktecarqs/' },
  { label: 'Facebook', href: 'https://www.facebook.com/arktec' },
];

/**
 * Footer fijo en el fondo de la página.
 * Se revela progresivamente conforme el usuario hace scroll hacia abajo.
 * El efecto se logra con clipPath animado según el progreso del scroll.
 * Principio S: useScrolledFooter maneja la lógica — Footer solo renderiza.
 */
export function Footer() {
  const progress = useScrolledFooter();

  const clipValue = `inset(${(1 - progress) * 100}% 0 0 0)`;

  return (
    <footer className="footer" style={{ clipPath: clipValue }}>
      <div className="footer__inner">

        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <span className="footer__logo">arktec</span>
            <span className="footer__logo-sub">Arquitectos</span>
          </div>
          <p className="footer__tagline">
            Arquitectura que transforma espacios,<br />
            diseño que perdura.
          </p>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Contacto</span>
          <a href="mailto:contacto@arktec.com.mx" className="footer__link">contacto@arktec.com.mx</a>
          <a href="tel:+526183104291" className="footer__link">+52 618 310 4291</a>
          <a href="tel:+526181075670" className="footer__link">+52 618 107 5670</a>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Redes</span>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="footer__link" target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </div>

      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} arktec. Todos los derechos reservados.</span>
        <button
          className="footer__back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Volver arriba
        </button>
      </div>
    </footer>
  );
}