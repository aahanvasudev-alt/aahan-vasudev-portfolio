import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA, FilmProject } from '../../data/projects';
import { FilmModal } from '../film/FilmModal';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsShowreel: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<FilmProject | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const cameraSpaceRef = useRef<HTMLDivElement | null>(null);
  const planesRef = useRef<(HTMLDivElement | null)[]>([]);
  const indexIndicatorsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileStageRef = useRef<HTMLDivElement | null>(null);
  const mobilePlanesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance header references
  const entranceRef = useRef<HTMLDivElement | null>(null);
  const entranceTitleRef = useRef<HTMLHeadingElement | null>(null);
  const entranceLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const stage = pinnedStageRef.current;
      const entrance = entranceRef.current;
      const entranceTitle = entranceTitleRef.current;
      const entranceLine = entranceLineRef.current;

      if (!stage) return;

      // ----------------------------------------------------------------------
      // 1. ENTRANCE APERTURE SLATE SEQUENCE
      // ----------------------------------------------------------------------
      if (entrance && entranceTitle && entranceLine && !prefersReducedMotion) {
        gsap.fromTo(
          entranceTitle,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: entrance,
              start: 'top 80%',
              end: 'top 35%',
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          entranceLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: entrance,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 0.5,
            },
          }
        );
      }

      // Mobile: one pinned camera window. Each project approaches from depth,
      // holds briefly in focus, then rushes past the lens as the next frame arrives.
      if (isMobile) {
        const mobileStage = mobileStageRef.current;
        const total = PROJECTS_DATA.length;

        if (mobileStage && total > 0) {
          if (prefersReducedMotion) {
            mobilePlanesRef.current.forEach((plane, index) => {
              if (plane) {
                gsap.set(plane, {
                  autoAlpha: index === 0 ? 1 : 0,
                  z: 0,
                  scale: 1,
                  rotateX: 0,
                });
              }
            });
            return;
          }

          const slice = 1;
          const mobileTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: mobileStage,
              start: 'top top',
              end: `+=${total * 105}%`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Establish every frame's starting depth before the scroll timeline runs.
          mobilePlanesRef.current.forEach((plane, index) => {
            if (!plane) return;
            gsap.set(plane, {
              z: index === 0 ? 0 : -1050,
              scale: index === 0 ? 1 : 0.42,
              rotateX: index === 0 ? 0 : 11,
              rotateY: index === 0 ? 0 : index % 2 === 0 ? -3 : 3,
              opacity: index === 0 ? 1 : 0,
              visibility: index === 0 ? 'visible' : 'hidden',
              transformOrigin: '50% 50%',
            });
          });

          // Each incoming frame begins just before the outgoing frame clears,
          // creating a continuous hand-off instead of three independent reveals.
          PROJECTS_DATA.forEach((_, index) => {
            const plane = mobilePlanesRef.current[index];
            if (!plane) return;

            const start = index * slice;
            const approachAt = index === 0 ? 0 : start - 0.18;
            const passAt = start + 0.48;

            if (index > 0) {
              mobileTl.set(plane, { visibility: 'visible' }, approachAt);
              mobileTl.fromTo(
                plane,
                {
                  z: -1050,
                  scale: 0.42,
                  rotateX: 11,
                  rotateY: index % 2 === 0 ? -3 : 3,
                  opacity: 0,
                  immediateRender: false,
                },
                {
                  z: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  opacity: 1,
                  duration: 0.62,
                  ease: 'power3.out',
                },
                approachAt
              );
            }

            if (index < total - 1) {
              mobileTl.to(
                plane,
                {
                  z: 1050,
                  scale: 2.6,
                  rotateX: -3,
                  rotateY: index % 2 === 0 ? 2 : -2,
                  opacity: 0,
                  duration: 0.58,
                  ease: 'power2.in',
                },
                passAt
              );
            }
          });

          // Keep clicks on the frame that is actually closest to the lens.
          mobileTl.eventCallback('onUpdate', () => {
            const active = Math.min(total - 1, Math.floor(mobileTl.time() + 0.18));
            mobilePlanesRef.current.forEach((plane, index) => {
              if (plane) plane.style.pointerEvents = index === active ? 'auto' : 'none';
            });
          });
        }
        return;
      }

      // ----------------------------------------------------------------------
      // 2. 3D CAMERA-THROUGH-FRAMES MASTER TIMELINE
      // Zero React state updates on scroll. Pure GPU transform3d + opacity.
      // ----------------------------------------------------------------------
      const totalProjects = PROJECTS_DATA.length;
      const scrollDistance = totalProjects * 180; // 180vh per project for smooth, cinematic pacing

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: `+=${scrollDistance}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update pure DOM indicators without React re-rendering
            const activeIdx = Math.min(
              totalProjects - 1,
              Math.floor(self.progress * totalProjects)
            );

            // Only the currently active 3D plane may receive clicks.
            // Faded planes remain layered in the same position during the
            // scrubbed transition, so opacity alone does not stop them
            // intercepting pointer events.
            planesRef.current.forEach((plane, idx) => {
              if (plane) {
                plane.style.pointerEvents = idx === activeIdx ? 'auto' : 'none';
              }
            });

            indexIndicatorsRef.current.forEach((el, idx) => {
              if (el) {
                if (idx === activeIdx) {
                  el.style.color = '#ffffff';
                  el.style.fontWeight = 'bold';
                } else {
                  el.style.color = 'rgba(255, 255, 255, 0.3)';
                  el.style.fontWeight = 'normal';
                }
              }
            });
          },
        },
      });

      if (prefersReducedMotion) {
        // Simplified opacity crossfade
        planesRef.current.forEach((plane, i) => {
          if (!plane) return;
          if (i === 0) {
            masterTl.fromTo(plane, { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0.5);
          } else {
            const time = i / totalProjects;
            masterTl.fromTo(plane, { opacity: 0 }, { opacity: 1, duration: 0.5 }, time);
          }
        });
        return;
      }

      // Choreograph 3D flight through each frame
      PROJECTS_DATA.forEach((_, i) => {
        const plane = planesRef.current[i];
        if (!plane) return;

        const slice = 1 / totalProjects;
        const startTime = i * slice;
        const midTime = startTime + slice * 0.45; // focal hold period

        if (i === 0) {
          // Project 0 starts at the focal plane (z: 0, scale: 1, opacity: 1)
          gsap.set(plane, {
            z: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            visibility: 'visible',
          });

          // Advances toward camera, expands to fill viewport, and flies past
          masterTl.to(
            plane,
            {
              z: 650,
              scale: 2.1,
              opacity: 0,
              ease: 'power2.in',
              duration: slice * 0.55,
            },
            midTime
          );
        } else {
          // Successive projects start deep in 3D perspective space
          gsap.set(plane, {
            z: -900,
            scale: 0.55,
            rotateX: 8,
            opacity: 0,
            visibility: 'hidden',
          });

          // Approach: travels from depth into focal position
          masterTl.to(
            plane,
            {
              visibility: 'visible',
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              ease: 'power3.out',
              duration: slice * 0.45,
            },
            startTime
          );

          // Fly-through: expands dramatically beyond viewport and exits past camera
          masterTl.to(
            plane,
            {
              z: 650,
              scale: 2.1,
              opacity: 0,
              ease: 'power2.in',
              duration: slice * 0.55,
            },
            midTime
          );
        }
      });
    }, sectionRef);

    // ------------------------------------------------------------------------
    // 3. LIGHTWEIGHT DESKTOP 3D MOUSE PERSPECTIVE
    // Decoupled from scroll, uses RAF for silky 120fps responsiveness
    // ------------------------------------------------------------------------
    let animationFrameId: number;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      targetRotY = normX * 4; // degrees
      targetRotX = -normY * 4;
    };

    const updatePerspective = () => {
      if (cameraSpaceRef.current) {
        currentRotX += (targetRotX - currentRotX) * 0.08;
        currentRotY += (targetRotY - currentRotY) * 0.08;
        cameraSpaceRef.current.style.transform = `rotateX(${currentRotX.toFixed(
          2
        )}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      }
      animationFrameId = requestAnimationFrame(updatePerspective);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePerspective);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="films"
      className="relative z-[3] bg-black text-white w-full overflow-hidden select-none"
      aria-label="3D Cinematic Film Projects Showreel"
    >
      {/* Background Film Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* ==================================================================== */}
      {/* 1. CINEMATIC SHOWREEL ENTRANCE SLATE                                 */}
      {/* ==================================================================== */}
      <div
        ref={entranceRef}
        className="relative z-10 w-full min-h-[60vh] flex flex-col justify-center items-center px-6 py-24 text-center"
      >
        <div className="flex items-center gap-3 text-white/40 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>PORTFOLIO REEL // 3D CAMERA RUN</span>
          <span className="text-white/20">|</span>
          <span>ANAMORPHIC FRAME DEPTH</span>
        </div>

        <h2
          ref={entranceTitleRef}
          className="text-white uppercase font-black text-[clamp(40px,10vw,140px)] leading-[0.88] tracking-tighter"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
        >
          Selected Films
        </h2>

        <div
          ref={entranceLineRef}
          className="w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-8 origin-center"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />

        <p className="text-white/60 max-w-lg text-[14px] sm:text-[16px] font-light leading-relaxed tracking-wide">
          Travel through floating cinematic planes. Scroll forward to advance the camera through each project.
        </p>

        <div className="mt-12 flex items-center gap-3 text-white/40 text-[11px] font-mono uppercase tracking-[0.25em]">
          <span>Advance Camera</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. DESKTOP: 3D CAMERA-THROUGH-FRAMES THEATER STAGE                  */}
      {/* ==================================================================== */}
      <div
        ref={pinnedStageRef}
        className="hidden md:flex relative z-10 w-full h-screen items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* HUD Camera Framing Guides */}
        <div className="absolute top-8 left-8 right-8 z-30 flex justify-between items-center text-white/40 text-[11px] font-mono tracking-[0.25em] uppercase pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ARRI LF // 35MM T1.3</span>
          </div>
          <div>
            <span>DEPTH // CAMERA RUN</span>
          </div>
        </div>

        {/* 3D Transform Space */}
        <div
          ref={cameraSpaceRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                planesRef.current[idx] = el;
              }}
              onClick={(event) => {
                event.stopPropagation();
                setActiveModalProject(project);
              }}
              className="group absolute w-[82vw] lg:w-[76vw] max-w-6xl aspect-[16/9] lg:aspect-[2.39/1] rounded-xs overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-zinc-950 transition-shadow duration-500 hover:shadow-white/10"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                visibility: idx === 0 ? 'visible' : 'hidden',
                pointerEvents: idx === 0 ? 'auto' : 'none',
              }}
            >
              {/* Project Image Canvas */}
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white/20 font-mono text-sm uppercase tracking-widest">
                  Cinematic Frame Placeholder
                </div>
              )}

              {/* Shading & Vignette Layer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-45 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
                }}
              />

              {/* Viewfinder Registration Corners */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none z-20" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none z-20" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none z-20" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none z-20" />

              {/* Center Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <div className="w-8 h-[1px] bg-white" />
                <div className="h-8 w-[1px] bg-white -ml-4" />
              </div>

              {/* In-Frame Title & Floating Metadata */}
              <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start pointer-events-none">
                <div>
                  <span className="text-white/50 text-[10px] font-mono tracking-[0.25em] uppercase block">
                    {project.category || 'FILM PRODUCTION'} // {project.year || '2025'}
                  </span>
                  <h3
                    className="text-white font-extrabold uppercase text-[clamp(28px,4.5vw,64px)] leading-none mt-1 drop-shadow-2xl"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                <span className="text-white/40 font-mono text-[12px] tracking-[0.25em] uppercase hidden sm:block">
                  {String(idx + 1).padStart(2, '0')} // {String(PROJECTS_DATA.length).padStart(2, '0')}
                </span>
              </div>

              {/* Play Button Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full text-[12px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 transform scale-90 opacity-90 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-white group-hover:text-black shadow-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:bg-black animate-ping" />
                  <span>{project.videoUrl ? 'Watch Film' : 'View Stills'}</span>
                </div>
              </div>

              {/* In-Frame Bottom Production Slate */}
              <div className="absolute bottom-6 left-8 right-8 z-20 flex justify-between items-end pointer-events-none">
                <div className="max-w-xl">
                  {project.description && (
                    <p className="text-white/70 text-[13px] lg:text-[14px] font-light leading-relaxed line-clamp-2 drop-shadow-md">
                      {project.description}
                    </p>
                  )}
                  {project.role && (
                    <span className="text-white/50 text-[10px] font-mono uppercase tracking-[0.2em] mt-1.5 block">
                      ROLE // {project.role}
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase block">
                    RUNTIME
                  </span>
                  <span className="text-white font-mono text-[12px] tracking-wider uppercase font-semibold">
                    {project.duration || '00:00'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Film Scene Indicator Bar */}
        <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-4">
            {PROJECTS_DATA.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  indexIndicatorsRef.current[i] = el;
                }}
                className={`font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                  i === 0 ? 'text-white font-bold' : 'text-white/30 font-normal'
                }`}
              >
                SCENE {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>

          <div className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase">
            CLICK FRAME TO LAUNCH REEL
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. MOBILE: TOUCH-DRIVEN 3D CAMERA THROUGH PROJECT FRAMES           */}
      {/* ==================================================================== */}
      <div ref={mobileStageRef}
        className="md:hidden relative z-10 h-[100svh] min-h-[620px] w-full overflow-hidden flex items-center justify-center px-4"
        style={{ perspective: '900px' }}>
        <div className="absolute top-5 left-5 right-5 z-30 flex justify-between text-white/40 text-[9px] font-mono tracking-[.2em] uppercase pointer-events-none">
          <span>ARRI LF // 35MM</span><span>DEPTH // CAMERA RUN</span>
        </div>
        <div className="relative w-full aspect-[4/5] max-h-[68svh]" style={{ transformStyle: 'preserve-3d' }}>
          {PROJECTS_DATA.map((project, idx) => (
            <div key={`mobile-plane-${project.id}`}
              ref={(el) => { mobilePlanesRef.current[idx] = el; }}
              onClick={(event) => { event.stopPropagation(); setActiveModalProject(project); }}
              className="absolute inset-0 overflow-hidden rounded-sm border border-white/15 bg-zinc-950 shadow-2xl"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden',
                visibility: idx === 0 ? 'visible' : 'hidden',
                pointerEvents: idx === 0 ? 'auto' : 'none', willChange: 'transform, opacity' }}>
              {project.thumbnailUrl
                ? <img src={project.thumbnailUrl} alt={project.title} className="mobile-project-still h-full w-full object-cover" loading={idx < 2 ? 'eager' : 'lazy'} />
                : <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/25 font-mono text-xs uppercase">Cinematic Frame</div>}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.58), transparent 34%, transparent 58%, rgba(0,0,0,.72))' }} />
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                <div className="min-w-0">
                  <span className="block text-white/65 text-[9px] font-mono tracking-[.2em] uppercase">{project.category || 'FILM'} // {project.year || '2025'}</span>
                  <h3 className="mt-2 text-white font-black uppercase text-[clamp(1.8rem,8vw,3.2rem)] leading-[.9] tracking-[-.055em]" style={{ fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
                </div>
                <span className="shrink-0 text-white/55 font-mono text-[10px] tracking-widest">{String(idx + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}</span>
              </div>
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <span className="border border-white/30 bg-black/55 px-4 py-2 text-white text-[9px] font-mono tracking-[.24em] uppercase backdrop-blur-sm">View Film ↗</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end pointer-events-none">
                <span className="max-w-[72%] text-white/60 text-[10px] leading-relaxed">{project.description || 'A cinematic project'}</span>
                <span className="text-white/55 text-[9px] font-mono tracking-widest uppercase">Camera Push</span>
              </div>
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/65 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/65 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/65 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/65 pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-5 right-5 z-30 flex justify-between text-white/40 text-[9px] font-mono tracking-[.18em] uppercase pointer-events-none">
          <span>SCROLL TO ADVANCE</span><span>PROJECT SEQUENCE</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. FULLSCREEN CINEMATIC VIDEO LIGHTBOX                               */}
      {/* ==================================================================== */}
      <FilmModal
        key={activeModalProject?.id ?? 'no-active-project'}
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
