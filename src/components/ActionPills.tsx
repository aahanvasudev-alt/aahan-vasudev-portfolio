import React, { useState, useEffect } from 'react';

const WHITE_PILLS = [
  'Pitch a Project',
  'Director Showreel',
  'Commercial Work',
  'Film Inquiries',
];

const CONTACT_EMAIL = 'hello@aahanvasudev.com';

export const ActionPills: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = CONTACT_EMAIL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'
      }`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.4s',
        transitionTimingFunction: 'ease',
      }}
    >
      {/* 4 White pill buttons */}
      {WHITE_PILLS.map((label) => (
        <a
          key={label}
          href={label.includes('Showreel') ? '#films' : '#contact'}
          className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-xs select-none"
        >
          {label}
        </a>
      ))}

      {/* 1 Outline pill button with copy icon */}
      <button
        type="button"
        onClick={handleCopyEmail}
        title={copied ? 'Copied to clipboard!' : 'Click to copy email address'}
        className="group inline-flex items-center justify-center text-white bg-black/40 backdrop-blur-xs border border-white/40 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer gap-2 sm:gap-3 select-none"
      >
        <span>
          Reach us:{' '}
          <span className="underline underline-offset-1">
            {copied ? 'Copied to clipboard!' : CONTACT_EMAIL}
          </span>
        </span>
        {/* 12x12 inline copy SVG */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <rect
            x="3.75"
            y="1.75"
            width="6.5"
            height="7.5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M2.25 3.5H1.75C1.33579 3.5 1 3.83579 1 4.25V10.25C1 10.6642 1.33579 11 1.75 11H6.75C7.16421 11 7.5 10.6642 7.5 10.25V9.75"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
};
