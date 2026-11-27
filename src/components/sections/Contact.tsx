import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'aahanvasudev@gmail.com';
const CONTACT_PHONE = '+919959622180';

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const emailRef = useRef<HTMLAnchorElement | null>(null);
  const phoneRef = useRef<HTMLAnchorElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (mobile) {
        const revealOnce = (target: Element | null, trigger: Element) => {
          if (!target) return;
          gsap.fromTo(target,
            { y: 24, opacity: 0, rotateX: -16, filter: 'blur(4px)', transformOrigin: '50% 100%' },
            { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.72,
              ease: 'power3.out', immediateRender: false,
              scrollTrigger: { trigger, start: 'top 86%', once: true, toggleActions: 'play none none none' } }
          );
        };
        headlineRef.current?.querySelectorAll('.contact-word').forEach((word, index) => {
          gsap.fromTo(word, { y: 24, opacity: 0, rotateX: -18, filter: 'blur(4px)' },
            { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.7,
              delay: index * 0.07, ease: 'power3.out', immediateRender: false,
              scrollTrigger: { trigger: headlineRef.current!, start: 'top 88%', once: true, toggleActions: 'play none none none' } });
        });
        revealOnce(stage.querySelector('p.max-w-\\[760px\\]'), stage);
        revealOnce(emailRef.current, emailRef.current!);
        revealOnce(phoneRef.current, phoneRef.current!);
        revealOnce(footerRef.current, footerRef.current!);
        return;
      }

      const words = headlineRef.current?.querySelectorAll('.contact-word');
      if (!words?.length || !emailRef.current || !phoneRef.current) return;

      gsap.set(phoneRef.current, { yPercent: -115, rotationX: -90, opacity: 0, transformOrigin: '50% 100%' });
      gsap.set(emailRef.current, { yPercent: 0, rotationX: 0, opacity: 1, transformOrigin: '50% 0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: mobile ? '+=85%' : '+=95%',
          pin: !mobile,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(words,
        { yPercent: 45, opacity: 0, rotateX: -35, transformOrigin: '50% 100%' },
        { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out' }, 0
      );
      // Email is the first contact card. On the next scroll it rolls down and away.
      tl.to(emailRef.current, { yPercent: 115, rotationX: 88, rotationZ: -9, scale: 0.82, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0.95);
      // Phone rolls up from the opposite side, like the next face of a 3D wheel.
      tl.to(phoneRef.current, { yPercent: 0, rotationX: 0, rotationZ: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }, 1.02);
      tl.fromTo(footerRef.current, { opacity: 0.35, y: 8 }, { opacity: 1, y: 0, duration: 0.25 }, 1.55);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div ref={stageRef} className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-6 pt-8 sm:px-10 sm:pb-8 sm:pt-10 lg:px-[7vw]">
        <div className="pointer-events-none absolute inset-0 opacity-[.045]" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '90px 90px', maskImage: 'radial-gradient(ellipse at center, black, transparent 78%)' }} />
        <div className="pointer-events-none absolute -right-[18vw] top-[8%] h-[68vw] w-[68vw] rounded-full border border-white/[.07]" />
        <div className="pointer-events-none absolute -right-[10vw] top-[17%] h-[52vw] w-[52vw] rounded-full border border-[#d5a65b]/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-center py-5 sm:py-7">
          <div className="mb-4 font-medium tracking-[-.055em] text-[#d5a65b]" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.45rem, 2.25vw, 2.25rem)', lineHeight: 1 }}>Have a story to tell?</div>
          <div className="[perspective:1100px]">
            <h2 ref={headlineRef} className="font-black uppercase" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.1rem, 6.2vw, 6.2rem)', lineHeight: 0.84, letterSpacing: '-.105em' }}>
              <span className="contact-word block">LET’S MAKE</span>
              <span className="contact-word block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,.82)' }}>SOMETHING</span>
              <span className="contact-word block text-[#d5a65b]">MATTER.</span>
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-5">
            <p className="max-w-[760px] font-body font-light leading-snug text-white/65" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}>
              Got a film, a collaboration or an idea you want to bring to life? Tell me about it. I’d love to hear what you’re working on.
            </p>
            <div className="relative flex w-full max-w-[760px] flex-col gap-5 overflow-visible [perspective:1100px] md:block md:h-[118px] md:shrink-0 sm:md:h-[132px]" style={{ perspective: '1100px' }}>
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#d5a65b]/70 to-transparent" />
              <a ref={emailRef} href={`mailto:${CONTACT_EMAIL}`} className="relative flex min-h-[88px] flex-col justify-center border-b border-white/20 pb-4 [backface-visibility:hidden] md:absolute md:inset-0 md:pb-0" style={{ backfaceVisibility: 'hidden' }}>
                <span className="mb-2 font-mono text-[11px] tracking-[.28em] text-[#d5a65b]">01 / WRITE TO ME</span>
                <span className="break-all font-body tracking-[-.045em] text-white" style={{ fontSize: 'clamp(1.45rem, 2.4vw, 2.4rem)', lineHeight: 1.05 }}>{CONTACT_EMAIL} <span className="text-[#d5a65b]">↗</span></span>
              </a>
              <a ref={phoneRef} href={`tel:${CONTACT_PHONE}`} className="relative flex min-h-[88px] flex-col justify-center border-b border-white/20 pb-4 [backface-visibility:hidden] md:absolute md:inset-0 md:pb-0" style={{ backfaceVisibility: 'hidden' }}>
                <span className="mb-2 font-mono text-[11px] tracking-[.28em] text-[#d5a65b]">02 / GIVE ME A CALL</span>
                <span className="font-body tracking-[-.045em] text-white" style={{ fontSize: 'clamp(1.65rem, 2.8vw, 2.8rem)', lineHeight: 1.05 }}>+91 99596 22180 <span className="text-[#d5a65b]">↗</span></span>
              </a>
            </div>
          </div>
        </div>

        <div ref={footerRef} className="relative z-10 flex flex-col justify-between gap-2 border-t border-white/15 pt-3 font-mono text-[9px] tracking-[.2em] text-white/35 sm:flex-row sm:items-center sm:text-[10px]">
          <span>ASHISH VOORADI / AAHAN VASUDEV</span>
          <span>INDEPENDENT FILMMAKER</span>
          <a href="#top" className="w-fit text-white/60 transition-colors hover:text-[#d5a65b]">BACK TO FIRST FRAME ↑</a>
        </div>
      </div>
    </section>
  );
};
