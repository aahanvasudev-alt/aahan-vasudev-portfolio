import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BTS_ITEMS, BTSItem } from '../../data/behindTheScenes';

gsap.registerPlugin(ScrollTrigger);

export const BehindTheScenes: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const header = headerRef.current;
      const title = titleRef.current;
      const rowOne = rowOneRef.current;
      const rowTwo = rowTwoRef.current;

      if (!header) return;

      // 1. Documentary Title Slate Reveal
      if (title && !prefersReducedMotion) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 40, letterSpacing: '0.05em' },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '-0.03em',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Differential Horizontal Collage Drift (Desktop)
      if (!isMobile && !prefersReducedMotion) {
        if (rowOne) {
          gsap.fromTo(
            rowOne,
            { x: 60 },
            {
              x: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        if (rowTwo) {
          gsap.fromTo(
            rowTwo,
            { x: -60 },
            {
              x: 80,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const half = Math.ceil(BTS_ITEMS.length / 2);
  const rowOneItems = BTS_ITEMS.slice(0, half);
  const rowTwoItems = BTS_ITEMS.slice(half);

  return (
    <section
      ref={sectionRef}
      id="behind-the-scenes"
      className="relative z-[3] bg-zinc-950 text-white w-full overflow-hidden select-none border-t border-white/10"
      style={{
        paddingTop: 'clamp(90px, 14vh, 180px)',
        paddingBottom: 'clamp(90px, 14vh, 180px)',
      }}
      aria-label="Behind The Scenes and Production Archives"
    >
      {/* Contact Sheet Sprocket Border Accent (Top & Bottom) */}
      <div
        className="w-full h-4 bg-repeat-x opacity-20 border-b border-white/10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10px 8px, transparent 4px, white 4px)',
          backgroundSize: '24px 16px',
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[94vw] lg:max-w-[88vw] mx-auto px-5 sm:px-8 mt-12">
        {/* ================================================================== */}
        {/* SECTION HEADER: DOCUMENTARY SLATE & PRODUCTION JOURNAL              */}
        {/* ================================================================== */}
        <div ref={headerRef} className="mb-16 sm:mb-24">
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-white/15 text-white/50 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>FIELD ARCHIVE // PRODUCTION CHRONICLES</span>
            </div>
            <div className="flex items-center gap-6">
              <span>ROLLS: 35MM KODAK &amp; ARRI RAW</span>
              <span className="hidden sm:inline">CONTACT SHEETS &amp; SKETCHES</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-amber-400/80 font-mono text-[11px] tracking-[0.3em] uppercase block mb-2">
                // UNFILTERED PROCESS
              </span>
              <h2
                ref={titleRef}
                className="text-white uppercase font-black text-[clamp(36px,8vw,110px)] leading-[0.9] tracking-tighter"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Behind The Scenes
              </h2>
            </div>

            <p className="text-white/60 max-w-md text-[14px] sm:text-[15px] font-light leading-relaxed">
              Contact sheets, hand-annotated storyboards, optical tests, and
              unfiltered on-set moments from locations across the world.
            </p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* IRREGULAR PHOTOGRAPHIC COLLAGE (Desktop Horizontal Drift)          */}
        {/* ================================================================== */}
        <div className="hidden md:flex flex-col gap-12 w-full overflow-visible">
          {/* Row 1 Drift */}
          <div
            ref={rowOneRef}
            className="flex items-start gap-8 will-change-transform"
            style={{ width: '120%' }}
          >
            {rowOneItems.map((item, idx) => (
              <BTSCard key={item.id} item={item} index={idx} />
            ))}
          </div>

          {/* Row 2 Counter-Drift */}
          <div
            ref={rowTwoRef}
            className="flex items-start gap-8 ml-[-10%] will-change-transform"
            style={{ width: '120%' }}
          >
            {rowTwoItems.map((item, idx) => (
              <BTSCard key={item.id} item={item} index={half + idx} />
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* MOBILE ADAPTED DOCUMENTARY FEED (<768px)                           */}
        {/* ================================================================== */}
        <div className="md:hidden flex flex-col gap-10">
          {BTS_ITEMS.map((item, idx) => (
            <BTSCard key={`mob-${item.id}`} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BTSCardProps {
  item: BTSItem;
  index: number;
}

const BTSCard: React.FC<BTSCardProps> = ({ item, index }) => {
  const isVertical = item.aspectRatio === 'vertical';
  const isWide = item.aspectRatio === '16:9' || item.aspectRatio === '2.39:1';
  const isSquare = item.aspectRatio === '1:1';

  // Subtle rotation for tactile darkroom contact sheet look
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
  const rotClass = rotations[index % rotations.length];

  return (
    <div
      className={`group relative shrink-0 bg-zinc-900 border border-white/10 p-3 sm:p-4 rounded-xs shadow-2xl transition-all duration-500 hover:border-white/40 hover:z-20 ${rotClass} hover:rotate-0 ${
        isWide
          ? 'w-full md:w-[480px]'
          : isVertical
          ? 'w-full md:w-[320px]'
          : isSquare
          ? 'w-full md:w-[360px]'
          : 'w-full md:w-[420px]'
      }`}
    >
      {/* Tape mark visual graphic on top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/15 backdrop-blur-xs border-x border-white/20 transform -rotate-1 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Slate Label */}
      <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/50 uppercase mb-2 px-1">
        <span>{item.dateOrScene || `ARCHIVE #${String(index + 1).padStart(2, '0')}`}</span>
        {item.badge && (
          <span className="text-amber-400/90 font-bold tracking-wider">
            [{item.badge}]
          </span>
        )}
      </div>

      {/* Image Canvas with 35mm Edge markings */}
      <div
        className={`relative w-full overflow-hidden bg-black rounded-xs border border-white/5 ${
          isVertical
            ? 'aspect-[3/4]'
            : isWide
            ? 'aspect-[16/9]'
            : isSquare
            ? 'aspect-square'
            : 'aspect-[4/3]'
        }`}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105"
          loading="lazy"
        />

        {/* Grease Pencil Crop Marker Overlay (Red grease pencil aesthetic) */}
        <div className="absolute top-2 right-2 text-red-500/80 font-mono text-[11px] font-bold pointer-events-none select-none tracking-tighter">
          #{(index + 1) * 3}A ✓
        </div>

        {/* Ambient Film Grain Vignette */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-10 transition-opacity"
          style={{
            background:
              'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </div>

      {/* Bottom Editorial Content */}
      <div className="mt-3.5 px-1">
        <h3
          className="text-white text-[15px] sm:text-[17px] font-bold uppercase tracking-tight leading-snug group-hover:text-amber-300 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {item.title}
        </h3>

        {item.description && (
          <p className="text-white/60 text-[12px] sm:text-[13px] font-light leading-relaxed mt-1.5">
            {item.description}
          </p>
        )}

        {item.note && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-start gap-2">
            <span className="text-amber-400/70 font-mono text-[9px] uppercase tracking-wider shrink-0 mt-0.5">
              LOG:
            </span>
            <p className="text-white/40 font-mono text-[10px] tracking-wider uppercase leading-tight">
              {item.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
