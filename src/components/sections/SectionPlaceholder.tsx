import React from 'react';

/**
 * Placeholder section component.
 * Drop-in architecture for future sections. Each section is self-contained
 * and can register its own ScrollTrigger instances.
 */
interface SectionPlaceholderProps {
  id: string;
  title: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({ id, title }) => {
  return (
    <section
      id={id}
      className="relative z-[3] bg-black min-h-[50vh] flex items-center justify-center border-t border-white/5"
    >
      <div className="text-center px-8 py-20">
        <span
          className="text-white/10 uppercase tracking-[0.3em] text-[12px]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Coming soon
        </span>
        <h2
          className="text-white/15 mt-3"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 4vw, 48px)',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
      </div>
    </section>
  );
};
