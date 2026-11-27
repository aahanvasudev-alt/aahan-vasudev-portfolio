import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════════════════════════════════════════════
// SEQUENCE 1: THE OPENING STATEMENT (PHILOSOPHICAL PREMISE)
// ════════════════════════════════════════════════════════════════════════════════
interface StatementLine {
  id: string;
  text: string;
  align: 'left' | 'right' | 'between';
  tier: 'lead' | 'pivot' | 'monument' | 'echo' | 'climax';
  accent?: boolean;
}

const SEQUENCE_1_LINES: StatementLine[] = [
  {
    id: 'line-lead',
    text: "I DON'T JUST WANT TO TELL STORIES.",
    align: 'left',
    tier: 'lead',
  },
  {
    id: 'line-pivot',
    text: 'I WANT TO CREATE',
    align: 'left',
    tier: 'pivot',
  },
  {
    id: 'line-monument',
    text: 'EXPERIENCES',
    align: 'right',
    tier: 'monument',
  },
  {
    id: 'line-echo',
    text: 'THAT STAY LONG AFTER',
    align: 'left',
    tier: 'echo',
  },
  {
    id: 'line-climax',
    text: 'THE FRAME DISAPPEARS.',
    align: 'right',
    tier: 'climax',
    accent: true,
  },
];

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const particleFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = pinnedStageRef.current;
    const scene1 = scene1Ref.current;
    const spatialBackdrop = null;
    const cameraPlanes = null;
    const particleField = particleFieldRef.current;
    const particleNodes = particleField
      ? Array.from(particleField.querySelectorAll<HTMLElement>('.cursor-particle'))
      : [];

    if (!stage || !scene1) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ════════════════════════════════════════════════════════════════════════════
    // 1. MASTER GSAP SCROLLTRIGGER CHOREOGRAPHY
    // Single focused pinned timeline for the opening statement.
    // Deliberate progressive entrance for Sequence 1, spacious pacing for Sequence 2,
    // intentional typography spacing with zero overlap, and clean bidirectional scrub.
    // ════════════════════════════════════════════════════════════════════════════
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simplified accessible crossfade for users who prefer reduced motion
        gsap.set(scene1, { autoAlpha: 1 });
        return;
      }

      // Master timeline focused on one cinematic opening statement
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Target character groups in Sequence 1
      const leadChars = scene1.querySelectorAll('.char-line-lead .char-outer');
      const pivotChars = scene1.querySelectorAll('.char-line-pivot .char-outer');
      const monumentChars = scene1.querySelectorAll('.char-line-monument .char-outer');
      const echoChars = scene1.querySelectorAll('.char-line-echo .char-outer');
      const climaxChars = scene1.querySelectorAll('.char-line-climax .char-outer');
      const metaElements1 = scene1.querySelectorAll('.meta-element-1');

      // Target character groups in Sequence 2

      // ────────────────────────────────────────────────────────────────────────
      // EXPLICIT INITIAL STATE DEFINITIONS
      // Sequence 1 letters start below their masked bounds in 3D depth.
      // The visitor will actually WITNESS the typography being constructed!
      // ────────────────────────────────────────────────────────────────────────
      gsap.set(scene1, { autoAlpha: 1, pointerEvents: 'auto' });

      // Sequence 1 initial states: hidden below lines with perspective tilt
      gsap.set(leadChars, {
        autoAlpha: 0,
        yPercent: 120,
        rotateX: -35,
        z: -160,
      });

      gsap.set(pivotChars, {
        autoAlpha: 0,
        yPercent: 120,
        rotateX: -35,
        z: -140,
      });

      gsap.set(monumentChars, {
        autoAlpha: 0,
        scale: 0.65,
        yPercent: 140,
        z: -250,
        rotateX: -45,
      });

      gsap.set(echoChars, {
        autoAlpha: 0,
        yPercent: 120,
        rotateX: -30,
        z: -140,
      });

      gsap.set(climaxChars, {
        autoAlpha: 0,
        yPercent: 120,
        rotateX: -35,
        z: -160,
      });

      gsap.set(metaElements1, {
        autoAlpha: 0,
        y: (i) => (i === 0 ? -20 : 20),
      });

      // ────────────────────────────────────────────────────────────────────────
      // CHAPTER 1: SEQUENCE 1 DELIBERATE ENTRANCE (Fixes Task 1)
      // Progress 0 -> 0.2024
      // Words enter progressively through masking and clipping as the user scrolls.
      // ────────────────────────────────────────────────────────────────────────
      masterTl.addLabel('seq1-entrance-start', 0);

      // Metadata bars emerge
      masterTl.to(
        metaElements1,
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.046,
        },
        0.0092
      );

      // Line 1: "I DON'T JUST WANT TO TELL STORIES." assembles from depth
      masterTl.to(
        leadChars,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          z: 0,
          stagger: 0.00552,
          ease: 'power3.out',
          duration: 0.0736,
        },
        0.0184
      );

      // Line 2: "I WANT TO CREATE" slides up into position
      masterTl.to(
        pivotChars,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          z: 0,
          stagger: 0.00644,
          ease: 'power3.out',
          duration: 0.0736,
        },
        0.046
      );

      // Line 3: Monolithic "EXPERIENCES" surges forward and scales into place
      masterTl.to(
        monumentChars,
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          rotateX: 0,
          z: 0,
          stagger: 0.01104,
          ease: 'power3.out',
          duration: 0.092,
        },
        0.0736
      );

      // Line 4: "THAT STAY LONG AFTER" assembles
      masterTl.to(
        echoChars,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          z: 0,
          stagger: 0.00552,
          ease: 'power3.out',
          duration: 0.0736,
        },
        0.1104
      );

      // Line 5: "THE FRAME DISAPPEARS." snaps into place with golden accent
      masterTl.to(
        climaxChars,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          z: 0,
          stagger: 0.00644,
          ease: 'power3.out',
          duration: 0.0828,
        },
        0.1288
      );

      // ────────────────────────────────────────────────────────────────────────
      // SEQUENCE 1 ASSEMBLED HOLD (0.2024 -> 0.2576)
      // The fully formed typographic composition holds in pristine stillness.
      // Full cursor interactivity is available.
      // ────────────────────────────────────────────────────────────────────────
      masterTl.addLabel('seq1-assembled-hold', 0.2024);

      // Final cinematic resolve: keep the full statement readable and composed.
      masterTl.to(
        [leadChars, pivotChars, echoChars, climaxChars],
        {
          autoAlpha: 1, x: 0, y: 0, z: 0,
          rotateX: 0, rotateY: 0, rotateZ: 0,
          scale: 1, filter: 'blur(0px)',
          stagger: { each: 0.0018, from: 'center' },
          ease: 'power3.out', duration: 0.06,
        },
        0.2576
      );
      masterTl.to(monumentChars, {
        scale: 1.045, z: 34, ease: 'power2.out', duration: 0.055,
      }, 0.27);
      masterTl.to(monumentChars, {
        scale: 1, z: 0, ease: 'power2.inOut', duration: 0.07,
      }, 0.325);
      masterTl.to({}, { duration: 0.18 }, 0.40);
    }, containerRef);

    // ════════════════════════════════════════════════════════════════════════════
    // 2. UNIFIED CURSOR-RESPONSIVE TYPOGRAPHY PHYSICS ENGINE
    // Active across the opening statement.
    // Letters magnetic repulsion, 3D lift, perspective tilt, and spring settling.
    // ════════════════════════════════════════════════════════════════════════════
    const physicsNodes = stage.querySelectorAll<HTMLElement>('.char-physics');
    if (physicsNodes.length === 0 || prefersReducedMotion) {
      return () => ctx.revert();
    }

    interface PhysicsParticle {
      el: HTMLElement;
      sceneEl: HTMLElement | null;
      originX: number;
      originY: number;
      curX: number;
      curY: number;
      curZ: number;
      curRotX: number;
      curRotY: number;
      curRotZ: number;
      curScale: number;
      tarX: number;
      tarY: number;
      tarZ: number;
      tarRotX: number;
      tarRotY: number;
      tarRotZ: number;
      tarScale: number;
      vx: number;
      vy: number;
      vz: number;
      vRotX: number;
      vRotY: number;
      vRotZ: number;
      vScale: number;
    }

    let particles: PhysicsParticle[] = [];

    // Cache character center coordinates relative to the pinned stage
    const measureParticles = () => {
      const stageRect = stage.getBoundingClientRect();
      particles = Array.from(physicsNodes).map((el) => {
        const rect = el.getBoundingClientRect();
        const sceneEl = el.closest('.scene-container') as HTMLElement | null;
        return {
          el,
          sceneEl,
          originX: rect.left + rect.width / 2 - stageRect.left,
          originY: rect.top + rect.height / 2 - stageRect.top,
          curX: 0,
          curY: 0,
          curZ: 0,
          curRotX: 0,
          curRotY: 0,
          curRotZ: 0,
          curScale: 1,
          tarX: 0,
          tarY: 0,
          tarZ: 0,
          tarRotX: 0,
          tarRotY: 0,
          tarRotZ: 0,
          tarScale: 1,
          vx: 0,
          vy: 0,
          vz: 0,
          vRotX: 0,
          vRotY: 0,
          vRotZ: 0,
          vScale: 0,
        };
      });
    };

    // Initial measurement
    measureParticles();

    // Re-measure on window resize or ScrollTrigger refresh
    const handleResize = () => measureParticles();
    window.addEventListener('resize', handleResize, { passive: true });
    ScrollTrigger.addEventListener('refresh', handleResize);

    // Mouse coordinates relative to stage
    let mouseRelX = -99999;
    let mouseRelY = -99999;
    let isCursorInBounds = false;
    let animFrameId: number;

    const handlePointerMove = (e: MouseEvent) => {
      const stageRect = stage.getBoundingClientRect();
      const inX = e.clientX >= stageRect.left && e.clientX <= stageRect.right;
      const inY = e.clientY >= stageRect.top && e.clientY <= stageRect.bottom;

      if (inX && inY) {
        mouseRelX = e.clientX - stageRect.left;
        mouseRelY = e.clientY - stageRect.top;
        isCursorInBounds = true;
        particleNodes.forEach((node) => {
          const r = node.getBoundingClientRect();
          const dx = r.left + r.width / 2 - e.clientX;
          const dy = r.top + r.height / 2 - e.clientY;
          const distance = Math.hypot(dx, dy);
          if (distance < 190 && distance > 1) {
            const force = (1 - distance / 190) * 24;
            node.style.transform = `translate3d(${(dx / distance * force).toFixed(1)}px, ${(dy / distance * force).toFixed(1)}px, 0) scale(${(1 + force / 42).toFixed(2)})`;
            node.style.opacity = String(0.25 + (force / 24) * 0.7);
          } else {
            node.style.transform = 'translate3d(0,0,0) scale(1)';
            node.style.opacity = '';
          }
        });
      } else {
        isCursorInBounds = false;
        mouseRelX = -99999;
        mouseRelY = -99999;
      }
    };

    const handlePointerLeave = () => {
      isCursorInBounds = false;
      mouseRelX = -99999;
      mouseRelY = -99999;
      particleNodes.forEach((node) => {
        node.style.transform = 'translate3d(0,0,0) scale(1)';
        node.style.opacity = '';
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Mobile / touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const stageRect = stage.getBoundingClientRect();
        mouseRelX = touch.clientX - stageRect.left;
        mouseRelY = touch.clientY - stageRect.top;
        isCursorInBounds = true;
      }
    };

    const handleTouchEnd = () => {
      isCursorInBounds = false;
      mouseRelX = -99999;
      mouseRelY = -99999;
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Physics constants
    const RADIUS = 180; // Proximity threshold in pixels
    const MAX_PUSH = 32; // Max displacement in pixels
    const SPRING = 0.14; // Spring stiffness
    const DAMPING = 0.82; // Velocity damping factor

    // Continuous 60/120fps animation frame loop
    const tickPhysics = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Check if character's parent scene is visible. If hidden, skip physics to save GPU
        const isSceneVisible =
          p.sceneEl &&
          p.sceneEl.style.visibility !== 'hidden' &&
          p.sceneEl.style.opacity !== '0';

        if (isCursorInBounds && isSceneVisible) {
          const dx = p.originX - mouseRelX;
          const dy = p.originY - mouseRelY;
          const dist = Math.hypot(dx, dy);

          if (dist < RADIUS && dist > 0.001) {
            // Cubic falloff for organic tactile feel
            const falloff = Math.pow(1 - dist / RADIUS, 2.2);
            const dirX = dx / dist;
            const dirY = dy / dist;

            p.tarX = dirX * MAX_PUSH * falloff;
            p.tarY = dirY * MAX_PUSH * falloff;
            p.tarZ = 45 * falloff; // Letters lift towards the viewer in 3D
            p.tarRotY = dirX * 16 * falloff;
            p.tarRotX = -dirY * 16 * falloff;
            p.tarRotZ = -dirX * 10 * falloff;
            p.tarScale = 1 + 0.14 * falloff;
          } else {
            p.tarX = 0;
            p.tarY = 0;
            p.tarZ = 0;
            p.tarRotX = 0;
            p.tarRotY = 0;
            p.tarRotZ = 0;
            p.tarScale = 1;
          }
        } else {
          p.tarX = 0;
          p.tarY = 0;
          p.tarZ = 0;
          p.tarRotX = 0;
          p.tarRotY = 0;
          p.tarRotZ = 0;
          p.tarScale = 1;
        }

        // Spring acceleration & velocity integration
        p.vx = (p.vx + (p.tarX - p.curX) * SPRING) * DAMPING;
        p.curX += p.vx;

        p.vy = (p.vy + (p.tarY - p.curY) * SPRING) * DAMPING;
        p.curY += p.vy;

        p.vz = (p.vz + (p.tarZ - p.curZ) * SPRING) * DAMPING;
        p.curZ += p.vz;

        p.vRotX = (p.vRotX + (p.tarRotX - p.curRotX) * SPRING) * DAMPING;
        p.curRotX += p.vRotX;

        p.vRotY = (p.vRotY + (p.tarRotY - p.curRotY) * SPRING) * DAMPING;
        p.curRotY += p.vRotY;

        p.vRotZ = (p.vRotZ + (p.tarRotZ - p.curRotZ) * SPRING) * DAMPING;
        p.curRotZ += p.vRotZ;

        p.vScale = (p.vScale + (p.tarScale - p.curScale) * SPRING) * DAMPING;
        p.curScale += p.vScale;

        // Efficient resting check to bypass styles when static
        const isResting =
          Math.abs(p.curX) < 0.04 &&
          Math.abs(p.curY) < 0.04 &&
          Math.abs(p.curZ) < 0.04 &&
          Math.abs(p.curRotZ) < 0.04 &&
          Math.abs(p.curScale - 1) < 0.003;

        if (isResting) {
          if (p.el.style.transform !== '') {
            p.el.style.transform = '';
          }
        } else {
          p.el.style.transform = `translate3d(${p.curX.toFixed(2)}px, ${p.curY.toFixed(2)}px, ${p.curZ.toFixed(2)}px) rotateX(${p.curRotX.toFixed(2)}deg) rotateY(${p.curRotY.toFixed(2)}deg) rotateZ(${p.curRotZ.toFixed(2)}deg) scale(${p.curScale.toFixed(3)})`;
        }
      }

      animFrameId = requestAnimationFrame(tickPhysics);
    };

    animFrameId = requestAnimationFrame(tickPhysics);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener('refresh', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-[3] bg-black text-white w-full overflow-hidden select-none"
      aria-label="Director Statement Sequence"
    >
      {/* Pinned 3D Spatial Stage */}
      <div
        ref={pinnedStageRef}
        className="relative z-10 w-full h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      >
        {/* Fine floating dust that parts around the cursor */}
        <div
          ref={particleFieldRef}
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 96 }, (_, i) => {
            const x = (i * 37 + 11) % 96 + 2;
            const y = (i * 53 + 7) % 88 + 6;
            const size = i % 13 === 0 ? 4 : i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
            return (
              <span
                key={i}
                className="cursor-particle absolute rounded-full bg-amber-100/90"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: i % 9 === 0 ? 0.78 : i % 3 === 0 ? 0.42 : 0.2,
                  boxShadow: i % 9 === 0
                    ? '0 0 14px rgba(252, 211, 77, 0.78)'
                    : '0 0 8px rgba(252, 211, 77, 0.42)',
                  transition: 'transform 180ms ease-out, opacity 180ms ease-out',
                  willChange: 'transform',
                }}
              />
            );
          })}
        </div>
        {/* Camera Spatial Planes Container for 3D Perspective shifts */}
        <div
          className="relative w-full max-w-7xl h-full flex flex-col justify-center items-center"
        >
          {/* ══════════════════════════════════════════════════════════════════════
              SEQUENCE 1: THE OPENING STATEMENT (PHILOSOPHICAL PREMISE)
              ══════════════════════════════════════════════════════════════════════ */}
          <div
            ref={scene1Ref}
            className="scene-container w-full h-full max-h-[85vh] flex flex-col justify-between py-6 sm:py-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Top Editorial Metadata Bar */}
            <div className="meta-element-1 w-full flex items-center justify-between border-b border-white/15 pb-4 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-white/50 uppercase">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-semibold text-white/80">MANIFESTO // 02</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-white/40">
                <span>FPS: 24.00</span>
                <span>•</span>
                <span>SHUTTER: 180°</span>
                <span>•</span>
                <span>OPTIC: 35MM T1.5</span>
              </div>
              <div className="text-right tracking-[0.2em] text-white/60">
                DIRECTOR'S STATEMENT
              </div>
            </div>

            {/* Central High-Impact Typographic Body */}
            <div
              className="my-auto w-full flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-8 py-4 sm:py-6"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {SEQUENCE_1_LINES.map((line) => {
                const isMonument = line.tier === 'monument';
                const isClimax = line.tier === 'climax';
                const isLead = line.tier === 'lead';
                const isPivot = line.tier === 'pivot';

                return (
                  <div
                    key={line.id}
                    className={`w-full min-w-0 flex justify-center text-center ${
                      line.align === 'right'
                        ? 'md:justify-end md:text-right'
                        : line.align === 'between'
                        ? 'md:justify-between'
                        : 'md:justify-start md:text-left'
                    } overflow-visible py-1.5 sm:py-2`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`block w-full max-w-full whitespace-normal break-words overflow-visible char-${line.id}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {line.text.split('').map((char, cIdx) => (
                        char === ' ' ? ' ' : (
                          <span
                            key={cIdx}
                            className="char-outer inline-block overflow-visible"
                            style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
                          >
                            <span
                              className={`char-physics inline-block font-heading uppercase select-none ${
                                isMonument
                                  ? 'font-black tracking-[-0.055em] text-white'
                                  : isClimax
                                  ? 'font-black tracking-[-0.055em] text-amber-300'
                                  : isLead
                                  ? 'font-black tracking-[-0.055em] text-white/90'
                                  : isPivot
                                  ? 'font-extrabold tracking-[-0.055em] text-white/75'
                                  : 'font-bold tracking-[-0.055em] text-white/80'
                              }`}
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: isMonument
                                  ? 'clamp(2.2rem, 6.2vw, 5.7rem)'
                                  : isClimax
                                  ? 'clamp(1.8rem, 4.7vw, 4.4rem)'
                                  : isLead
                                  ? 'clamp(1.25rem, 3.7vw, 3.55rem)'
                                  : isPivot
                                  ? 'clamp(1.7rem, 4.3vw, 4.2rem)'
                                  : 'clamp(1.35rem, 3.8vw, 3.6rem)',
                                lineHeight: 0.92,
                                willChange: 'transform',
                                transformStyle: 'preserve-3d',
                              }}
                            >
                              {char}
                            </span>
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Editorial Anchor Bar */}
            <div className="meta-element-1 w-full flex items-center justify-between border-t border-white/15 pt-4 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-white/40 uppercase">
              <div className="flex items-center gap-2">
                <span>SCENE INDEX: 00:00:14:00</span>
                <span className="text-white/20">|</span>
                <span className="hidden sm:inline">PERSISTENCE OF VISION</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>SCROLL TO DISSOLVE REALITY</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
