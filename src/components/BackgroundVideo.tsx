import { useRef, forwardRef, useImperativeHandle } from 'react';

export interface BackgroundVideoHandle {
  videoElement: HTMLVideoElement | null;
  wrapperElement: HTMLDivElement | null;
}

export const BackgroundVideo = forwardRef<BackgroundVideoHandle>((_props, ref) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    get videoElement() {
      return null;
    },
    get wrapperElement() {
      return wrapperRef.current;
    },
  }));

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      {/* Subtle Cinematic Ambient Lighting Depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 35%, rgba(38, 38, 48, 0.45) 0%, transparent 60%),
            radial-gradient(circle at 75% 65%, rgba(28, 28, 36, 0.3) 0%, transparent 55%),
            #030304
          `,
        }}
      />

      {/* Original Signature Dark Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(3, 3, 4, 0.6) 55%, rgba(0, 0, 0, 0.98) 100%)`,
        }}
      />

      {/* Atmospheric Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';
