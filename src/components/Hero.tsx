import React, { useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { DimensionalPortrait } from './film/DimensionalPortrait';
import { NameTransformation } from './film/NameTransformation';

const TYPEWRITER_TEXT =
  'Every frame is a deliberate composition of light, silence, and human truth.';

export const Hero: React.FC = () => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 32, 1200);
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] w-full min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-20 overflow-hidden"
      aria-label="Director Hero Introduction"
    >
      <div className="w-full max-w-7xl mx-auto hero-content relative z-10 flex flex-col-reverse md:grid md:grid-cols-12 md:items-center gap-10 md:gap-8 lg:gap-14">
        {/* ================================================================ */}
        {/* LEFT SIDE: MASSIVE CINEMATIC NAME & IDENTITY                     */}
        {/* ================================================================ */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center items-start text-left w-full">
          {/* 1. Kinetic Scroll-Triggered Name Transformation */}
          <div className="w-full mb-6 sm:mb-8">
            <NameTransformation />
          </div>

          {/* 2. Director Statement / Typewriter */}
          <p
            className="text-white/80 mb-6 sm:mb-8 hero-typewriter max-w-xl font-light text-[15px] sm:text-[18px] leading-relaxed"
            style={{ minHeight: '52px' }}
          >
            <span>{displayed}</span>
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

        </div>

        {/* ================================================================ */}
        {/* RIGHT SIDE: PROMINENT 2.5D INTERACTIVE PORTRAIT                  */}
        {/* ================================================================ */}
        <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end items-center w-full">
          <div className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[500px]">
            <DimensionalPortrait />
          </div>
        </div>
      </div>
    </section>
  );
};
