import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Films', href: '#films' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-20 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
        aria-label="Main Navigation"
      >
        {/* Neutral Logo / Monogram (Left) — understated so it doesn't undermine hero reveal */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span
            className="text-[19px] sm:text-[21px] tracking-wider text-white font-mono font-bold select-none group-hover:opacity-80 transition-opacity"
          >
            AV
          </span>
          <span
            className="text-[17px] sm:text-[20px] text-amber-400 select-none leading-none group-hover:rotate-45 transition-transform duration-300"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase ml-1">
            // CINEMA
          </span>
        </a>

        {/* Desktop Nav Links (Center, hidden below md) */}
        <div className="hidden md:flex items-center text-[18px] lg:text-[20px] text-white/90">
          {NAV_LINKS.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="hover:text-white hover:opacity-100 opacity-75 transition-all"
              >
                {link.label}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span className="text-white/30">&nbsp;•&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Hamburger (Visible below md) */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none z-30"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transform transition-transform duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transform transition-transform duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay (z-index: 25) */}
      <div
        className={`fixed inset-0 z-25 bg-black/95 backdrop-blur-md flex flex-col justify-center px-8 gap-8 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="text-white/40 text-[10px] font-mono tracking-[0.25em] uppercase mb-2">
          // PORTFOLIO NAVIGATION
        </div>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={closeMobileMenu}
            className="text-[32px] font-bold text-white hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};
