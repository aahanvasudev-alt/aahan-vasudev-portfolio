import React from 'react';

export const NameTransformation: React.FC = () => {
  const FIRST_NAME_1 = 'ASHISH';
  const LAST_NAME_1 = 'VOORADI';

  const FIRST_NAME_2 = 'AAHAN';
  const LAST_NAME_2 = 'VASUDEV';

  return (
    <div className="relative flex flex-col items-start select-none w-full">
      {/* Top Identity Tag Marker */}
      <div className="identity-tag flex items-center gap-2.5 text-white/50 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span className="tag-text">DIRECTOR // IDENTITY</span>
      </div>

      {/* Main Massive Kinetic Typography Container */}
      <div
        className="relative font-heading font-black tracking-tighter leading-[0.88] uppercase text-[clamp(48px,8.2vw,112px)] w-full"
        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
      >
        {/* ================================================================ */}
        {/* INITIAL NAME: ASHISH VOORADI                                     */}
        {/* ================================================================ */}
        <div className="name-primary flex flex-col">
          <div className="flex">
            {FIRST_NAME_1.split('').map((char, i) => (
              <span
                key={`ashish-${i}`}
                className="char-ashish inline-block text-white"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="flex text-white/95">
            {LAST_NAME_1.split('').map((char, i) => (
              <span
                key={`vooradi-${i}`}
                className="char-vooradi inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* STAGE NAME: AAHAN VASUDEV (Exact same spot, pointer-events-none) */}
        {/* ================================================================ */}
        <div
          className="name-stage absolute top-0 left-0 flex flex-col pointer-events-none"
          aria-hidden="true"
        >
          <div className="flex">
            {FIRST_NAME_2.split('').map((char, i) => (
              <span
                key={`aahan-${i}`}
                className="char-aahan inline-block text-white"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="flex text-white/95">
            {LAST_NAME_2.split('').map((char, i) => (
              <span
                key={`vasudev-${i}`}
                className="char-vasudev inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* EXPLANATORY STAGE NAME STATEMENTS (Revealed on Scroll)             */}
      {/* ================================================================== */}
      <div
        className="stage-explainer mt-6 pt-4 border-t border-white/20 max-w-lg w-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="stage-line-1 text-white font-medium text-[16px] sm:text-[18px] tracking-wide">
          &ldquo;Aahan Vasudev is my stage name.&rdquo;
        </p>

        <p className="stage-line-2 text-white/70 text-[13px] sm:text-[15px] font-light tracking-wide mt-1.5">
          Filmmaker. Storyteller. Creating as Aahan Vasudev.
        </p>
      </div>
    </div>
  );
};
