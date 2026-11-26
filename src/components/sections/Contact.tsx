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
  const invitationRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const emailRef = useRef<HTMLAnchorElement | null>(null);
  const phoneRef = useRef<HTMLAnchorElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.contact-word');
      const invitationWords = invitationRef.current?.querySelectorAll('.invitation-word');
      const copyWords = copyRef.current?.querySelectorAll('.copy-word');
      if (!words?.length || !invitationWords?.length || !copyWords?.length || !emailRef.current || !phoneRef.current) return;


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: mobile ? '+=220%' : '+=180%',
          pin: !mobile,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(invitationWords,
        { yPercent: 130, rotateX: -78, rotateZ: -7, opacity: 0, filter: 'blur(10px)', transformOrigin: '50% 100%' },
        { yPercent: 0, rotateX: 0, rotateZ: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.075, duration: 0.9, ease: 'back.out(1.7)' }, 0
      );
      tl.fromTo(words,
        { yPercent: 45, opacity: 0, rotateX: -35, transformOrigin: '50% 100%' },
        { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out' }, 0.38
      );
      // The invitation copy joins the headline's movement instead of sitting awkwardly beneath it.
      tl.fromTo(copyWords,
        { y: 24, opacity: 0, filter: 'blur(7px)', rotateX: -18, transformOrigin: '50% 100%' },
        { y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0, stagger: 0.025, duration: 0.55, ease: 'power2.out' }, 1.12
      );
      // Both contact methods enter in sequence and remain visible together.
      tl.fromTo(emailRef.current, { y: 34, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }, 1.75);
      tl.fromTo(phoneRef.current, { y: 34, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }, 2.15);
      tl.fromTo(footerRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 2.95);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div ref={stageRef} className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-5 pt-7 sm:px-10 sm:pb-6 sm:pt-8 lg:px-[7vw]">
        <div className="pointer-events-none absolute inset-0 opacity-[.045]" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '90px 90px', maskImage: 'radial-gradient(ellipse at center, black, transparent 78%)' }} />
        <div className="pointer-events-none absolute -right-[18vw] top-[8%] h-[68vw] w-[68vw] rounded-full border border-white/[.07]" />
        <div className="pointer-events-none absolute -right-[10vw] top-[17%] h-[52vw] w-[52vw] rounded-full border border-[#d5a65b]/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-center py-4 sm:py-5">
          <div ref={invitationRef} className="mb-6 flex flex-wrap gap-y-2 overflow-visible font-black uppercase tracking-[-.015em]" style={{ columnGap: '0.38em', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem, 3.1vw, 3.15rem)', lineHeight: 1.02, perspective: '900px' }}>
            {"Have a story to tell?".split(' ').map((word, i) => <span key={i} className="invitation-word inline-block origin-bottom" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{word}</span>)}
          </div>
          <div className="[perspective:1100px]">
            <h2 ref={headlineRef} className="font-black uppercase" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)', lineHeight: 0.84, letterSpacing: '-.105em' }}>
              <span className="contact-word block">LET’S MAKE</span>
              <span className="contact-word block text-white/45">SOMETHING</span>
              <span className="contact-word block text-[#d5a65b]">MATTER.</span>
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-5 sm:mt-6">
            <p ref={copyRef} className="max-w-[820px] font-body font-light leading-snug text-white/65" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)', perspective: '800px' }}>
              {"Got a film, a collaboration or an idea you want to bring to life? Tell me about it. I’d love to hear what you’re working on.".split(' ').map((word, i) => <span key={i} className="copy-word inline-block" style={{ marginRight: '0.26em', willChange: 'transform, opacity, filter' }}>{word}</span>)}
            </p>
            <div className="relative z-20 mt-1 grid w-full max-w-[1040px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
              <a ref={emailRef} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`} target="_blank" rel="noreferrer" className="flex min-h-[112px] flex-col justify-center border-y border-white/20 py-4 transition-colors hover:border-[#d5a65b]/70">
                <span className="mb-3 font-mono text-[11px] tracking-[.28em] text-[#d5a65b]">01 / EMAIL</span>
                <span className="break-all font-body tracking-[-.025em] text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', lineHeight: 1.2 }}>{CONTACT_EMAIL} <span className="text-[#d5a65b]">↗</span></span>
              </a>
              <a ref={phoneRef} href={`tel:${CONTACT_PHONE}`} className="flex min-h-[112px] flex-col justify-center border-y border-white/20 py-4 transition-colors hover:border-[#d5a65b]/70">
                <span className="mb-3 font-mono text-[11px] tracking-[.28em] text-[#d5a65b]">02 / PHONE</span>
                <span className="font-body tracking-[-.025em] text-white" style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)', lineHeight: 1.2 }}>+91-9959622180 <span className="text-[#d5a65b]">↗</span></span>
              </a>
            </div>
          </div>
        </div>

        <div ref={footerRef} className="relative z-30 mt-3 flex min-h-[44px] flex-col justify-between gap-2 border-t border-white/15 py-3 font-mono text-[10px] tracking-[.16em] text-white/45 sm:flex-row sm:items-center sm:text-[11px]">
          <span>ASHISH VOORADI / AAHAN VASUDEV</span>
          <span>INDEPENDENT FILMMAKER</span>
          <a href="#top" className="relative z-30 block w-fit py-1 text-white/70 leading-normal transition-colors hover:text-[#d5a65b]">BACK TO FIRST FRAME ↑</a>
        </div>
      </div>
    </section>
  );
};
