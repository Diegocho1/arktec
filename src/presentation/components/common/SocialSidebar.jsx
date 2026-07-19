const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/arktec/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/arktec/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
];

export function SocialSidebar() {
  return (
    <aside className="social-sidebar" aria-label="Redes sociales">
      {SOCIALS.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          className="social-sidebar__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon}
        </a>
      ))}
    </aside>
  );
}

