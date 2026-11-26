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

// ════════════════════════════════════════════════════════════════════════════════
// SEQUENCE 2: THE RESOLUTION (VISUAL MANIFESTO)
// ════════════════════════════════════════════════════════════════════════════════
interface ResolutionLine {
  id: string;
  text: string;
  tier: 'remains' | 'light' | 'fades' | 'emotion';
  accent?: boolean;
}

const SEQUENCE_2_LINES: ResolutionLine[] = [
  {
    id: 'seq2-remains',
    text: 'WHAT REMAINS',
    tier: 'remains',
  },
  {
    id: 'seq2-light',
    text: 'WHEN THE LIGHT',
    tier: 'light',
  },
  {
    id: 'seq2-fades',
    text: 'FADES',
    tier: 'fades',
    accent: true,
  },
  {
    id: 'seq2-emotion',
    text: 'IS THE EMOTION.',
    tier: 'emotion',
  },
];

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const scene2Ref = useRef<HTMLDivElement | null>(null);
  const particleFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = pinnedStageRef.current;
    const scene1 = scene1Ref.current;
    const scene2 = scene2Ref.current;
    const spatialBackdrop = null;
    const particleField = particleFieldRef.current;
    const particleNodes = particleField
      ? Array.from(particleField.querySelectorAll<HTMLElement>('.cursor-particle'))
      : [];

    if (!stage || !scene1 || !scene2) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ════════════════════════════════════════════════════════════════════════════
    // 1. MASTER GSAP SCROLLTRIGGER CHOREOGRAPHY
    // Single unified pinned timeline spanning 520% scroll runway.
    // Deliberate progressive entrance for Sequence 1, spacious pacing for Sequence 2,
    // intentional typography spacing with zero overlap, and clean bidirectional scrub.
    // ════════════════════════════════════════════════════════════════════════════
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simplified accessible crossfade for users who prefer reduced motion
        gsap.to(scene1, {
          autoAlpha: 0,
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=70%',
            scrub: true,
          },
        });
        gsap.fromTo(
          scene2,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: stage,
              start: 'top -30%',
              end: '+=70%',
              scrub: true,
            },
          }
        );
        return;
      }

      // Master Timeline pinned across 520% scroll runway for spacious, cinematic pacing
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=1150%',
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
      const remainsChars = scene2.querySelectorAll('.char-seq2-remains .char-outer');
      const lightChars = scene2.querySelectorAll('.char-seq2-light .char-outer');
      const fadesChars = scene2.querySelectorAll('.char-seq2-fades .char-outer');
      const emotionChars = scene2.querySelectorAll('.char-seq2-emotion .char-outer');
      const s2Headline = scene2.querySelector('.seq2-headline');

      // ────────────────────────────────────────────────────────────────────────
      // EXPLICIT INITIAL STATE DEFINITIONS
      // Sequence 1 letters start below their masked bounds in 3D depth.
      // The visitor will actually WITNESS the typography being constructed!
      // ────────────────────────────────────────────────────────────────────────
      gsap.set(scene1, { autoAlpha: 1, pointerEvents: 'auto' });
      gsap.set(scene2, { autoAlpha: 0, pointerEvents: 'none' });

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

      // Sequence 2 initial character setups: positioned for kinetic assembly
      gsap.set(remainsChars, {
        autoAlpha: 0,
        z: -260,
        scale: 1.5,
        yPercent: 120,
        rotateX: 45,
      });

      gsap.set(lightChars, {
        autoAlpha: 0,
        xPercent: -45,
        z: -160,
        rotateY: -30,
        scale: 0.8,
      });

      gsap.set(fadesChars, {
        autoAlpha: 0,
        scale: 2.2,
        z: 220,
        yPercent: -50,
        rotateX: -25,
      });

      gsap.set(emotionChars, {
        autoAlpha: 0,
        z: 360,
        yPercent: 90,
        rotateX: -40,
        scale: 0.82,
      });

      if (s2Headline) gsap.set(s2Headline, { autoAlpha: 0, y: -20 });
      if (spatialBackdrop) gsap.set(spatialBackdrop, { autoAlpha: 0, scale: 0.94 });

      // ────────────────────────────────────────────────────────────────────────
      // CHAPTER 1: CINEMATIC OPENING STATEMENT
      // Only Sequence 1 choreography is revised. Sequence 2 remains untouched.
      // ────────────────────────────────────────────────────────────────────────
      const seq1Typography = scene1.querySelector('.seq1-typography');

      masterTl.addLabel('seq1-entrance-start', 0);

      masterTl.to(metaElements1, {
        autoAlpha: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.0552,
      }, 0.0092);

      // Each line gets a distinct cinematic reveal, while every character resolves.
      masterTl.fromTo(leadChars,
        { autoAlpha: 0, x: -70, y: 34, z: -260, rotateY: -24, filter: 'blur(12px)' },
        { autoAlpha: 1, x: 0, y: 0, yPercent: 0, z: 0, rotateY: 0, filter: 'blur(0px)',
          stagger: { each: 0.0038, from: 'center' }, ease: 'power4.out', duration: 0.09 },
        0.0184
      );

      masterTl.fromTo(pivotChars,
        { autoAlpha: 0, x: 70, y: 28, z: -180, rotateY: 20, filter: 'blur(10px)' },
        { autoAlpha: 1, x: 0, y: 0, yPercent: 0, z: 0, rotateY: 0, filter: 'blur(0px)',
          stagger: { each: 0.004, from: 'start' }, ease: 'power3.out', duration: 0.085 },
        0.0552
      );

      masterTl.fromTo(monumentChars,
        { autoAlpha: 0, scale: 0.72, y: 95, z: -420, rotateX: 28, filter: 'blur(16px)' },
        { autoAlpha: 1, scale: 1, y: 0, yPercent: 0, z: 0, rotateX: 0, filter: 'blur(0px)',
          stagger: { each: 0.006, from: 'center' }, ease: 'expo.out', duration: 0.11 },
        0.092
      );

      masterTl.fromTo(echoChars,
        { autoAlpha: 0, x: -55, y: 24, z: -180, rotateY: -16, filter: 'blur(9px)' },
        { autoAlpha: 1, x: 0, y: 0, yPercent: 0, z: 0, rotateY: 0, filter: 'blur(0px)',
          stagger: { each: 0.0038, from: 'end' }, ease: 'power3.out', duration: 0.085 },
        0.1288
      );

      masterTl.fromTo(climaxChars,
        { autoAlpha: 0, x: 58, y: 32, z: -220, rotateY: 18, filter: 'blur(11px)' },
        { autoAlpha: 1, x: 0, y: 0, yPercent: 0, z: 0, rotateY: 0, filter: 'blur(0px)',
          stagger: { each: 0.004, from: 'center' }, ease: 'power4.out', duration: 0.09 },
        0.1656
      );

      masterTl.addLabel('seq1-assembled-hold', 0.2576);

      // Brief dimensional tension before the full-composition camera push.
      masterTl.to(leadChars, { y: -18, z: 55, ease: 'sine.inOut', duration: 0.045 }, 0.276);
      masterTl.to(pivotChars, { y: 14, z: 35, ease: 'sine.inOut', duration: 0.045 }, 0.276);
      masterTl.to(monumentChars, { z: 95, scale: 1.06, ease: 'sine.inOut', duration: 0.045 }, 0.276);
      masterTl.to(echoChars, { y: 16, z: 35, ease: 'sine.inOut', duration: 0.045 }, 0.276);
      masterTl.to(climaxChars, { y: -12, z: 45, ease: 'sine.inOut', duration: 0.045 }, 0.276);
      masterTl.to([leadChars, pivotChars, monumentChars, echoChars, climaxChars], {
        y: 0, z: 0, scale: 1, ease: 'power2.out', duration: 0.035,
      }, 0.321);

      // One unified camera push: preserve the five-line layout as a single composition.
      // Scaling individual lines caused the monument and echo lines to collide.
      masterTl.addLabel('seq1-exit', 0.3496);
      masterTl.to(seq1Typography, {
        scale: 9,
        z: 2200,
        autoAlpha: 0,
        filter: 'blur(16px)',
        transformOrigin: '50% 50%',
        ease: 'expo.in',
        duration: 0.092,
      }, 0.3496);
      masterTl.to(metaElements1, {
        autoAlpha: 0,
        y: (i) => (i === 0 ? -25 : 25),
        duration: 0.0552,
        ease: 'power2.in',
      }, 0.3496);

      masterTl.to(scene1, {
        autoAlpha: 0,
        pointerEvents: 'none',
        duration: 0.0184,
      }, 0.4416);


      // ────────────────────────────────────────────────────────────────────────
      // CHAPTER 2: THE RESOLUTION — extended kinetic typography chapter
      // The section now receives almost half of a 760vh pinned runway.
      // Each phrase has an entrance, a distinct kinetic beat, a settle and a hold.
      // ────────────────────────────────────────────────────────────────────────
      masterTl.addLabel('seq2-chapter-start', 0.50);

      // Bring the second scene in just as the spatial transition clears.
      masterTl.to(
        scene2,
        { autoAlpha: 1, pointerEvents: 'auto', duration: 0.03, ease: 'none' },
        0.5
      );

      if (s2Headline) {
        masterTl.fromTo(
          s2Headline,
          { autoAlpha: 0, y: -24, scale: 0.92, rotateX: -35 },
          {
            autoAlpha: 1, y: 0, scale: 1, rotateX: 0,
            ease: 'power3.out', duration: 0.078,
          },
          0.508
        );
      }

      // BEAT 1 — WHAT REMAINS: characters rise out of a deep masked plane,
      // then briefly fan apart before snapping into precise editorial spacing.
      masterTl.to(
        remainsChars,
        {
          autoAlpha: 1, z: 0, scale: 1, yPercent: 0, rotateX: 0,
          stagger: { each: 0.012, from: 'edges' },
          ease: 'power4.out', duration: 0.126,
        },
        0.556
      );
      masterTl.to(
        remainsChars,
        {
          x: (i) => (i - (remainsChars.length - 1) / 2) * 2.4,
          rotateY: (i) => (i % 2 === 0 ? -9 : 9),
          z: (i) => (i % 2 === 0 ? 34 : -24),
          stagger: 0.003,
          ease: 'power2.inOut',
          duration: 0.066,
        },
        0.732
      );
      masterTl.to(
        remainsChars,
        {
          x: 0, rotateY: 0, z: 0,
          stagger: 0.002,
          ease: 'elastic.out(1, 0.65)',
          duration: 0.084,
        },
        0.82
      );

      // BEAT 2 — WHEN THE LIGHT: a travelling perspective wave sweeps
      // from the centre outwards, followed by a clean alignment.
      masterTl.to(
        lightChars,
        {
          autoAlpha: 1, xPercent: 0, z: 0, rotateY: 0, scale: 1,
          stagger: { each: 0.009, from: 'center' },
          ease: 'power4.out', duration: 0.12,
        },
        0.716
      );
      masterTl.to(
        lightChars,
        {
          y: (i) => (i % 2 === 0 ? -18 : 18),
          rotateZ: (i) => (i % 2 === 0 ? -5 : 5),
          z: 55,
          stagger: { each: 0.004, from: 'center' },
          ease: 'power2.inOut', duration: 0.066,
        },
        0.892
      );
      masterTl.to(
        lightChars,
        {
          y: 0, rotateZ: 0, z: 0,
          stagger: { each: 0.003, from: 'center' },
          ease: 'power3.out', duration: 0.078,
        },
        0.98
      );

      // BEAT 3 — FADES: a monumental word pushes through the camera plane,
      // overshoots deliberately, then resolves into a crisp accent.
      masterTl.to(
        fadesChars,
        {
          autoAlpha: 1, scale: 1, z: 0, yPercent: 0, rotateX: 0,
          stagger: { each: 0.016, from: 'center' },
          ease: 'back.out(1.7)', duration: 0.132,
        },
        0.876
      );
      masterTl.to(
        fadesChars,
        {
          scale: 1.22, z: 150, rotateY: (i) => (i % 2 ? 12 : -12),
          stagger: 0.005,
          ease: 'power2.in', duration: 0.072,
        },
        1.06
      );
      masterTl.to(
        fadesChars,
        {
          scale: 1, z: 0, rotateY: 0,
          stagger: 0.004,
          ease: 'power3.out', duration: 0.09,
        },
        1.156
      );

      // BEAT 4 — IS THE EMOTION: the climax assembles from behind the camera.
      // Each character lands with a restrained wave, then the whole phrase
      // expands into a readable, monumental final lockup.
      masterTl.to(
        emotionChars,
        {
          autoAlpha: 1, z: 0, yPercent: 0, rotateX: 0, scale: 1,
          stagger: { each: 0.013, from: 'edges' },
          ease: 'power4.out', duration: 0.144,
        },
        1.02
      );
      masterTl.to(
        emotionChars,
        {
          y: (i) => (i % 2 === 0 ? 14 : -14),
          rotateZ: (i) => (i % 2 === 0 ? -3 : 3),
          z: 90,
          stagger: 0.003,
          ease: 'power2.inOut', duration: 0.066,
        },
        1.164
      );
      masterTl.to(
        emotionChars,
        {
          y: 0, rotateZ: 0, z: 0, scale: 1,
          stagger: 0.002,
          ease: 'elastic.out(1, 0.72)', duration: 0.078,
        },
        1.22
      );

      // A genuine reading / cursor-play window before the next section.
      masterTl.addLabel('seq2-resolved-hold', 0.97);

      // Clear, controlled exit. No abrupt blank interval before Projects.
      masterTl.to(
        scene2,
        {
          yPercent: -12,
          autoAlpha: 0,
          pointerEvents: 'none',
          ease: 'power2.in',
          duration: 0.042,
        },
        1.26
      );

      masterTl.addLabel('section-end', 1.30);
    }, containerRef);

    // ════════════════════════════════════════════════════════════════════════════
    // 2. UNIFIED CURSOR-RESPONSIVE TYPOGRAPHY PHYSICS ENGINE
    // Active across BOTH Sequence 1 and Sequence 2.
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
            className="scene-container relative w-full h-full max-h-[85vh] flex flex-col justify-between py-6 sm:py-8"
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
              className="seq1-typography relative my-auto w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-4 overflow-visible"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {SEQUENCE_1_LINES.map((line, lineIdx) => {
                const isMonument = line.tier === 'monument';
                const isClimax = line.tier === 'climax';
                const isLead = line.tier === 'lead';
                const isPivot = line.tier === 'pivot';

                return (
                  <div
                    key={line.id}
                    className={`w-full flex overflow-visible py-1 sm:py-1.5 ${
                      lineIdx === 0 ? 'justify-start pl-[2%] sm:pl-[4%] text-left' :
                      lineIdx === 1 ? 'justify-end pr-[8%] sm:pr-[13%] text-right' :
                      lineIdx === 2 ? 'justify-center text-center' :
                      lineIdx === 3 ? 'justify-start pl-[7%] sm:pl-[11%] text-left' :
                      'justify-end pr-[2%] sm:pr-[5%] text-right'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`inline-block whitespace-nowrap overflow-visible char-${line.id}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {line.text.split('').map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className={`char-outer inline-block overflow-visible ${
                            char === ' ' ? 'w-[0.58em]' : ''
                          }`}
                          style={{
                            transformStyle: 'preserve-3d',
                            willChange: 'transform, opacity',
                          }}
                        >
                          <span
                            className={`char-physics inline-block font-heading uppercase select-none ${
                              isMonument
                                ? 'font-black tracking-[-0.045em] text-white'
                                : isClimax
                                ? 'font-black tracking-[-0.035em] text-amber-300'
                                : isLead
                                ? 'font-black tracking-[-0.03em] text-white/90'
                                : isPivot
                                ? 'font-extrabold tracking-[-0.025em] text-white/75'
                                : 'font-bold tracking-[-0.02em] text-white/80'
                            }`}
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: isMonument
                                ? 'clamp(48px, 9.2vw, 136px)'
                                : isClimax
                                ? 'clamp(28px, 5.4vw, 76px)'
                                : isLead
                                ? 'clamp(24px, 4.2vw, 58px)'
                                : isPivot
                                ? 'clamp(22px, 3.6vw, 48px)'
                                : 'clamp(20px, 3.2vw, 42px)',
                              lineHeight: isMonument ? 0.82 : 0.94,
                              willChange: 'transform',
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        </span>
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

          {/* ══════════════════════════════════════════════════════════════════════
              SEQUENCE 2: THE RESOLUTION (VISUAL MANIFESTO)
              Spacious, deliberate layout with intentional hierarchy & zero collision.
              ══════════════════════════════════════════════════════════════════════ */}
          <div
            ref={scene2Ref}
            className="scene-container absolute inset-0 flex flex-col justify-between items-center w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 z-20"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Top Indicator */}
            <div className="seq2-headline flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 border border-white/15 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>THE RESULT // CORE CINEMATIC PHILOSOPHY</span>
            </div>

            {/* Monumental Kinetic Editorial Block with Generous Line-by-Line Spacing */}
            <div
              className="flex flex-col items-center justify-center text-center font-heading font-black uppercase tracking-[-0.035em] select-none text-white my-auto w-full max-w-5xl gap-1 sm:gap-2 md:gap-3"
              style={{
                fontFamily: 'var(--font-heading)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* LINE 1: WHAT REMAINS */}
              <div className="char-seq2-remains overflow-hidden shrink-0 py-1.5 sm:py-2 mb-1 sm:mb-1.5">
                <div className="inline-block whitespace-nowrap overflow-visible">
                  {SEQUENCE_2_LINES[0].text.split('').map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className={`char-outer inline-block overflow-visible ${
                        char === ' ' ? 'w-[0.58em]' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <span
                        className="char-physics inline-block font-heading font-black uppercase select-none text-white"
                        style={{
                          fontSize: 'clamp(28px, 4.8vw, 64px)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.03em',
                          willChange: 'transform',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* LINE 2: WHEN THE LIGHT */}
              <div className="char-seq2-light overflow-hidden shrink-0 py-1.5 sm:py-2 mb-1 sm:mb-1.5">
                <div className="inline-block whitespace-nowrap overflow-visible">
                  {SEQUENCE_2_LINES[1].text.split('').map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className={`char-outer inline-block overflow-visible ${
                        char === ' ' ? 'w-[0.58em]' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <span
                        className="char-physics inline-block font-heading font-extrabold uppercase select-none text-white/80"
                        style={{
                          fontSize: 'clamp(22px, 3.8vw, 48px)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.025em',
                          willChange: 'transform',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* LINE 3: FADES (Distinctive visual accent) */}
              <div className="char-seq2-fades overflow-hidden shrink-0 py-2 sm:py-2.5 mb-1 sm:mb-2">
                <div className="inline-block whitespace-nowrap overflow-visible">
                  {SEQUENCE_2_LINES[2].text.split('').map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className={`char-outer inline-block overflow-visible ${
                        char === ' ' ? 'w-[0.58em]' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <span
                        className="char-physics inline-block font-heading font-black uppercase select-none text-amber-300"
                        style={{
                          fontSize: 'clamp(38px, 7vw, 92px)',
                          lineHeight: 0.98,
                          letterSpacing: '-0.04em',
                          willChange: 'transform',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* LINE 4: IS THE EMOTION. (The Dramatic Focal Climax — Zero Collision) */}
              <div className="char-seq2-emotion overflow-hidden shrink-0 py-2 sm:py-2.5">
                <div className="inline-block whitespace-nowrap overflow-visible">
                  {SEQUENCE_2_LINES[3].text.split('').map((char, cIdx) => {
                    const isDot = char === '.';
                    return (
                      <span
                        key={cIdx}
                        className={`char-outer inline-block overflow-visible ${
                          char === ' ' ? 'w-[0.58em]' : ''
                        }`}
                        style={{
                          transformStyle: 'preserve-3d',
                          willChange: 'transform, opacity',
                        }}
                      >
                        <span
                          className={`char-physics inline-block font-heading font-black uppercase select-none ${
                            isDot ? 'text-amber-400 font-black' : 'text-white'
                          }`}
                          style={{
                            fontSize: 'clamp(36px, 7.5vw, 105px)',
                            lineHeight: 0.92,
                            letterSpacing: '-0.045em',
                            willChange: 'transform',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
