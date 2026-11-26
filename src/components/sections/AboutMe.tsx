import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutMe: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      const [one, two, three] = panelsRef.current;
      if (!one || !two || !three || reduceMotion || mobile) return;

      gsap.set([two, three], { autoAlpha: 0, yPercent: 8, scale: 0.985 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=390%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(one.querySelectorAll('.about-reveal'),
        { yPercent: 115, rotateX: -65, opacity: 0, transformOrigin: '50% 100%' },
        { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.12, duration: 1.15, ease: 'power4.out' }, 0.05
      );
      const firstParagraphWords = one.querySelectorAll('.about-copy-line:first-child .about-copy-word');
      const secondParagraphWords = one.querySelectorAll('.about-copy-line:nth-child(2) .about-copy-word');
      tl.fromTo(firstParagraphWords,
        { yPercent: 115, rotateX: -58, opacity: 0, filter: 'blur(7px)', transformOrigin: '50% 100%' },
        { yPercent: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.025, duration: 0.65, ease: 'power3.out' }, 0.82
      );
      tl.fromTo(secondParagraphWords,
        { yPercent: 115, rotateX: -58, opacity: 0, filter: 'blur(7px)', transformOrigin: '50% 100%' },
        { yPercent: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.012, duration: 0.65, ease: 'power3.out' }, 1.98
      );
      tl.to(one, { autoAlpha: 0, scale: 1.025, filter: 'blur(8px)', duration: 0.45 }, 3.02);

      tl.to(two, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, 3.22);
      tl.fromTo(two.querySelectorAll('.about-word'),
        { yPercent: 130, rotateX: -75, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.11, duration: 1.1, ease: 'power4.out' }, 3.28
      );
      tl.fromTo(two.querySelectorAll('.about-copy-word'),
        { yPercent: 105, rotateX: -52, opacity: 0, filter: 'blur(7px)', transformOrigin: '50% 100%' },
        { yPercent: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.012, duration: 0.65, ease: 'power3.out' }, 4.7
      );
      tl.to(two, { autoAlpha: 0, xPercent: -6, filter: 'blur(8px)', duration: 0.45 }, 5.72);

      tl.to(three, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.5 }, 5.92);
      tl.fromTo(three.querySelector('.about-final-copy'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 6.5);
      tl.to({}, { duration: 0.35 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative isolate overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '90px 90px', maskImage: 'radial-gradient(ellipse at center, black, transparent 78%)' }} />
      <div ref={stageRef} className="relative min-h-[100svh] w-full overflow-hidden">
        <div ref={el => { panelsRef.current[0] = el; }} className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-20 sm:px-10 lg:px-[8vw]">
          <div className="mb-7 font-mono text-xs tracking-[.3em] text-[#d5a65b] sm:text-sm">A LITTLE ABOUT THE PERSON</div>
          <div className="[perspective:1000px]">
            <h2 className="max-w-[1600px] font-black uppercase" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.2rem, 6.2vw, 6.2rem)', lineHeight: 0.82, letterSpacing: '-0.095em' }}>
              <span className="about-reveal block">I AM A</span>
              <span className="about-reveal block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,.8)' }}>FILMMAKER.</span>
            </h2>
          </div>
          <div className="about-copy mt-8 max-w-[1150px] sm:mt-10">
            <p className="about-copy-line font-body font-light" style={{ color: 'rgba(190,190,190,.78)', fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)', lineHeight: 1.45 }}>
              {['I’m', 'Ashish', 'Vooradi.', 'I', 'make', 'films', 'because', 'I’m', 'drawn', 'to', 'the', 'things', 'people', 'don’t', 'always', 'say', 'out', 'loud.'].map((word, i) => <React.Fragment key={i}><span className="about-copy-word inline-block" style={{ color: 'rgba(190,190,190,.78)' }}>{word}</span>{i < 17 ? ' ' : ''}</React.Fragment>)}
            </p>
            <p className="about-copy-line mt-1 max-w-[1150px] font-body" style={{ color: 'rgba(190,190,190,.78)', fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)', lineHeight: 1.45 }}>
              {"A look that says more than a conversation. A small choice that changes everything. I like finding those human moments and turning them into stories you can feel.".split(' ').map((word, i, arr) => <React.Fragment key={i}><span className="about-copy-word inline-block">{word}</span>{i < arr.length - 1 ? ' ' : ''}</React.Fragment>)}
            </p>
          </div>
        </div>

        <div ref={el => { panelsRef.current[1] = el; }} className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-12 sm:px-10 md:absolute md:inset-0 md:py-10 lg:px-[8vw]">
          <div className="mb-7 font-mono text-xs tracking-[.3em] text-[#d5a65b] sm:text-sm">THE WAY I SEE IT</div>
          <div className="[perspective:1000px]">
            <h3 className="font-black uppercase" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 5.7vw, 5.7rem)', lineHeight: 0.84, letterSpacing: '-0.095em' }}>
              <span className="about-word inline-block">STORIES</span><br />
              <span className="about-word inline-block text-white/35">LIVE IN</span><br />
              <span className="about-word inline-block text-[#d5a65b]">THE DETAILS.</span>
            </h3>
          </div>
          <p className="about-copy mt-8 max-w-[1250px] font-body font-light" style={{ color: 'rgba(190,190,190,.78)', fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)', lineHeight: 1.42 }}>
            {"I care about direction, visual storytelling and emotion before explanation. I’m drawn to worlds that feel lived in, characters who feel real, and images that carry a little more than what’s on the surface.".split(' ').map((word, i, arr) => <React.Fragment key={i}><span className="about-copy-word inline-block">{word}</span>{i < arr.length - 1 ? ' ' : ''}</React.Fragment>)}
          </p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-[.24em] text-white/40 sm:text-sm"><span>STORY</span><span>IMAGE</span><span>FEELING</span></div>
        </div>

        <div ref={el => { panelsRef.current[2] = el; }} className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-12 sm:px-10 md:absolute md:inset-0 md:py-10 lg:px-[8vw]">
          <div className="mb-7 font-mono text-xs tracking-[.3em] text-[#d5a65b] sm:text-sm">THE NAME BEHIND THE FRAME</div>
          <div className="max-w-[1600px]">
            <div className="mb-2 font-body text-3xl tracking-[.12em] text-white/40 sm:text-4xl">ASHISH VOORADI</div>
            <h3 className="my-6 font-black uppercase" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.2rem, 6vw, 6rem)', lineHeight: 0.82, letterSpacing: '-0.095em' }}>AAHAN<br /><span className="text-[#d5a65b]">VASUDEV.</span></h3>
            <p className="about-final-copy mt-7 max-w-[1150px] font-body text-white/70" style={{ fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)', lineHeight: 1.32 }}>An independent filmmaker, telling stories through images, rhythm and feeling.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
