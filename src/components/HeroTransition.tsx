import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroTransitionProps {
  videoWrapperRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const HeroTransition: React.FC<HeroTransitionProps> = ({
  videoWrapperRef,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const barTopRef = useRef<HTMLDivElement | null>(null);
  const barBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const vignette = vignetteRef.current;
      const barTop = barTopRef.current;
      const barBottom = barBottomRef.current;
      const videoWrapper = videoWrapperRef.current;
      const navEl = document.querySelector('nav[aria-label="Main Navigation"]');
      const heroContent = container?.querySelector('.hero-content');

      // Kinetic name elements inside Hero
      const charAshish = container?.querySelectorAll('.char-ashish');
      const charVooradi = container?.querySelectorAll('.char-vooradi');
      const charAahan = container?.querySelectorAll('.char-aahan');
      const charVasudev = container?.querySelectorAll('.char-vasudev');
      const stageExplainer = container?.querySelector('.stage-explainer');
      const identityTag = container?.querySelector('.identity-tag .tag-text');

      if (!container) return;

      // Set explicit initial states for predictable scroll scrub & reversals
      if (charAahan && charVasudev) {
        gsap.set([charAahan, charVasudev], {
          opacity: 0,
          yPercent: 70,
          scale: 0.95,
          rotateX: -30,
        });
      }
      if (charAshish && charVooradi) {
        gsap.set([charAshish, charVooradi], {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          rotateX: 0,
        });
      }
      if (stageExplainer) {
        gsap.set(stageExplainer, {
          opacity: 0,
          y: 20,
        });
      }

      // Master Timeline bound to a single ScrollTrigger with Pin
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (prefersReducedMotion) {
        // Simplified fade for reduced motion users
        if (charAshish && charAahan) {
          masterTl.to([charAshish, charVooradi], { opacity: 0, duration: 0.3 }, 0.2);
          masterTl.to([charAahan, charVasudev], { opacity: 1, yPercent: 0, duration: 0.3 }, 0.3);
        }
        if (stageExplainer) {
          masterTl.to(stageExplainer, { opacity: 1, y: 0, duration: 0.3 }, 0.4);
        }
        if (heroContent) {
          masterTl.to(heroContent, { opacity: 0, duration: 0.4 }, 0.75);
        }
        if (vignette) {
          masterTl.to(vignette, { opacity: 1, duration: 0.4 }, 0.75);
        }
        return;
      }

      // ----------------------------------------------------------------------
      // PHASE 1: 0% to 12% - Pristine Initial Hold
      // ASHISH VOORADI is 100% visible, resting, and clearly readable.
      // ----------------------------------------------------------------------
      masterTl.addLabel('hero-hold', 0);

      // ----------------------------------------------------------------------
      // PHASE 2: 12% to 58% - SCROLL-TRIGGERED KINETIC NAME TRANSFORMATION
      // ASHISH VOORADI morphs continuously into AAHAN VASUDEV
      // ----------------------------------------------------------------------

      // 1. Outgoing ASHISH letters displace and fragment in 3D
      if (charAshish) {
        masterTl.to(
          charAshish,
          {
            yPercent: -80,
            opacity: 0,
            rotateX: 35,
            scale: 1.05,
            stagger: 0.03,
            ease: 'power2.inOut',
            duration: 0.24,
          },
          0.12
        );
      }

      // 2. Outgoing VOORADI letters displace with rotation
      if (charVooradi) {
        masterTl.to(
          charVooradi,
          {
            yPercent: -80,
            opacity: 0,
            rotateX: 40,
            scale: 1.05,
            stagger: 0.025,
            ease: 'power2.inOut',
            duration: 0.24,
          },
          0.14
        );
      }

      // 3. Incoming AAHAN letters advance into focus
      if (charAahan) {
        masterTl.to(
          charAahan,
          {
            yPercent: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            stagger: 0.03,
            ease: 'power3.out',
            duration: 0.26,
          },
          0.24
        );
      }

      // 4. Incoming VASUDEV letters advance into focus
      if (charVasudev) {
        masterTl.to(
          charVasudev,
          {
            yPercent: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            stagger: 0.025,
            ease: 'power3.out',
            duration: 0.26,
          },
          0.26
        );
      }

      // 5. Update tag text marker on scroll
      if (identityTag) {
        masterTl.to(
          identityTag,
          {
            opacity: 0,
            duration: 0.1,
            onComplete: () => {
              identityTag.textContent = 'STAGE ALIAS // AAHAN VASUDEV';
            },
            onReverseComplete: () => {
              identityTag.textContent = 'DIRECTOR // IDENTITY';
            },
          },
          0.24
        );
        masterTl.to(identityTag, { opacity: 1, duration: 0.12 }, 0.36);
      }

      // ----------------------------------------------------------------------
      // PHASE 3: 48% to 68% - Stage Name Explanatory Reveal
      // "Aahan Vasudev is my stage name."
      // "Filmmaker. Storyteller. Creating as Aahan Vasudev."
      // ----------------------------------------------------------------------
      if (stageExplainer) {
        masterTl.to(
          stageExplainer,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.2,
          },
          0.48
        );
      }

      // ----------------------------------------------------------------------
      // PHASE 4: 68% to 82% - Bold Resolved Hold
      // AAHAN VASUDEV and the explanatory statement hold in full clarity.
      // ----------------------------------------------------------------------
      masterTl.addLabel('resolved-hold', 0.72);

      // ----------------------------------------------------------------------
      // PHASE 5: 82% to 100% - Scene Transition into Next Section
      // Hero lifts away, letterbox bars close, dark vignette settles.
      // ----------------------------------------------------------------------
      if (heroContent) {
        masterTl.to(
          heroContent,
          {
            y: -75,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 0.18,
          },
          0.82
        );
      }

      if (navEl) {
        masterTl.to(
          navEl,
          {
            opacity: 0,
            pointerEvents: 'none',
            ease: 'power2.out',
            duration: 0.16,
          },
          0.82
        );
      }

      if (videoWrapper) {
        masterTl.to(
          videoWrapper,
          {
            scale: 1.12,
            ease: 'power1.inOut',
            duration: 0.18,
          },
          0.82
        );
      }

      if (vignette) {
        masterTl.to(
          vignette,
          {
            opacity: 1,
            ease: 'power2.inOut',
            duration: 0.18,
          },
          0.82
        );
      }

      if (barTop) {
        masterTl.to(
          barTop,
          {
            yPercent: 0,
            ease: 'power2.out',
            duration: 0.16,
          },
          0.84
        );
      }

      if (barBottom) {
        masterTl.to(
          barBottom,
          {
            yPercent: 0,
            ease: 'power2.out',
            duration: 0.16,
          },
          0.84
        );
      }

      masterTl.addLabel('transition-end', 1.0);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [videoWrapperRef]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Hero content passed as children */}
      {children}

      {/* Dark vignette overlay — strictly 0 opacity initially */}
      <div
        ref={vignetteRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Cinematic Letterbox Bars */}
      <div
        ref={barTopRef}
        className="fixed top-0 left-0 right-0 z-[2] pointer-events-none bg-black"
        style={{
          height: '11vh',
          transform: 'translateY(-100%)',
        }}
        aria-hidden="true"
      />
      <div
        ref={barBottomRef}
        className="fixed bottom-0 left-0 right-0 z-[2] pointer-events-none bg-black"
        style={{
          height: '11vh',
          transform: 'translateY(100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
