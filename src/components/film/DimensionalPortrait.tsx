import React, { useRef, useEffect } from 'react';

export const DimensionalPortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      // Gentle, clamped response to physical phone tilt.
      targetX = Math.max(-1, Math.min(1, event.gamma / 35));
      targetY = Math.max(-1, Math.min(1, (event.beta - 35) / 45));
    };

    const OrientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    let orientationListening = false;
    const startListening = () => {
      if (orientationListening) return;
      orientationListening = true;
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    };

    // Android and browsers without a permission gate start immediately.
    // iOS requires a user gesture, so request permission on the first natural
    // interaction anywhere on the page. No visible motion-enable control.
    if (isMobile && !OrientationEvent.requestPermission) {
      startListening();
    } else if (isMobile && OrientationEvent.requestPermission) {
      const requestOnFirstInteraction = async () => {
        window.removeEventListener('pointerdown', requestOnFirstInteraction, true);
        window.removeEventListener('touchstart', requestOnFirstInteraction, true);
        try {
          const permission = await OrientationEvent.requestPermission!();
          if (permission === 'granted') startListening();
        } catch (error) {
          console.warn('Device orientation permission was not granted.', error);
        }
      };
      window.addEventListener('pointerdown', requestOnFirstInteraction, { once: true, capture: true });
      window.addEventListener('touchstart', requestOnFirstInteraction, { once: true, capture: true });
    }

    const updatePhysics = () => {
      // Damped spring interpolation (lerp factor: 0.075 for fluid cinematic motion)
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      const rotY = currentX * 5.5; // max ±5.5deg
      const rotX = -currentY * 5.5; // max ±5.5deg
      const transX = currentX * 12; // max ±12px
      const transY = currentY * 10; // max ±10px

      // 1. Tilt the 3D frame
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(
          2
        )}px, ${transY.toFixed(2)}px, 20px)`;
      }

      // 2. Counter-shift the inner portrait for true 2.5D window parallax
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(1.07) translate3d(${(-currentX * 14).toFixed(
          2
        )}px, ${(-currentY * 12).toFixed(2)}px, 0px)`;
      }

      // 3. Shift the ambient silhouette glow
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate3d(${(currentX * 24).toFixed(
          2
        )}px, ${(currentY * 18).toFixed(2)}px, -40px) scale(1.15)`;
      }

      // 4. Glare specular movement across glass
      if (glareRef.current) {
        const glareX = (currentX + 1) * 50;
        const glareY = (currentY + 1) * 50;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`;
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] select-none pointer-events-auto"
      style={{ perspective: '1200px' }}
      aria-label="Portrait of Filmmaker Ashish Vooradi"
    >
      {/* Layer 0: Ambient Optical Halo (No double image or head silhouette) */}
      <div
        ref={ambientGlowRef}
        className="absolute -inset-4 rounded-3xl pointer-events-none opacity-20 filter blur-3xl z-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(217, 119, 6, 0.08) 40%, transparent 70%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Layer 1: The Dimensional Director's Frame with solid opaque backing */}
      <div
        ref={cardRef}
        className="relative z-10 w-full aspect-[4/5] sm:aspect-[9/12] rounded-xs bg-black border border-white/20 p-2 sm:p-2.5 shadow-2xl overflow-hidden transition-shadow duration-500 hover:shadow-white/10"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Inner Image Canvas with Window Parallax */}
        <div className="relative w-full h-full overflow-hidden rounded-xs bg-black">
          <img
            ref={imageRef}
            src="/images/ashish-vooradi.JPG"
            alt="Ashish Vooradi - Filmmaker"
            className="block w-full h-full object-cover object-[center_18%] transition-transform duration-300 ease-out filter contrast-[1.04]"
            style={{
              willChange: 'transform',
              transform: 'scale(1.05)',
            }}
            loading="eager"
          />

          {/* Ambient Film Vignette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-10"
            style={{
              background:
                'radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.45) 100%)',
            }}
          />

          {/* Optical Glass Glare / Specular Highlight */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80"
          />

          {/* 35mm Lens Reticles / Viewfinder Crosshairs */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/50 pointer-events-none z-20" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/50 pointer-events-none z-20" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/50 pointer-events-none z-20" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/50 pointer-events-none z-20" />

          {/* Slate Timecode Marker */}
          <div className="absolute top-3 left-6 right-6 z-20 flex justify-between items-center text-white/50 text-[9px] font-mono tracking-[0.25em] uppercase pointer-events-none">
            <span>PORTRAIT // 01</span>
            <span>24 FPS</span>
          </div>

          {/* Director Slate Monogram at Bottom */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-end text-white/60 text-[9px] font-mono tracking-[0.2em] uppercase pointer-events-none">
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
              ASHISH VOORADI
            </span>
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
              35MM RAW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
