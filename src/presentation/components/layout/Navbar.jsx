import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Navbar fija que se vuelve opaca al hacer scroll.
 * Principio S: solo maneja navegación y su propio estado visual.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setTimeout(() => {
      document.querySelector('#inicio')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
}, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <button className="navbar__logo" onClick={handleLogoClick}>arktec</button>

      {/* Desktop */}
      <nav className="navbar__links" aria-label="Navegación principal">
        {NAV_LINKS.map(({ label, href }) => (
          <button key={href} className="navbar__link" onClick={() => handleNavClick(href)}>
            {label}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* Mobile menu */}
      <nav className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-label="Menú móvil">
        {NAV_LINKS.map(({ label, href }) => (
          <button key={href} className="navbar__mobile-link" onClick={() => handleNavClick(href)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

