import React, { useEffect, useCallback } from 'react';
import { FilmProject } from '../../data/projects';

interface FilmModalProps {
  project: FilmProject | null;
  onClose: () => void;
}

export const FilmModal: React.FC<FilmModalProps> = ({ project, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  // Resolve embed URL for YouTube or Vimeo
  const getEmbedUrl = (url?: string): string | null => {
    if (!url) return null;

    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(project.videoUrl);
  const isDirectVideo = embedUrl?.endsWith('.mp4') || embedUrl?.endsWith('.webm');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video player for ${project.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-3 text-white/60 hover:text-white uppercase text-[12px] tracking-[0.2em] transition-colors cursor-pointer group"
        aria-label="Close video player"
      >
        <span>Close Reel</span>
        <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/80 flex items-center justify-center transition-colors">
          ✕
        </span>
      </button>

      {/* Film header info */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 pointer-events-none">
        <span className="text-white/40 uppercase text-[10px] sm:text-[11px] tracking-[0.25em] block">
          {project.category || 'FILM PROJECT'} // {project.year || '2025'}
        </span>
        <h3
          data-project-id={project.id}
          className="text-white text-[18px] sm:text-[22px] tracking-tight mt-1 font-heading"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>
      </div>

      {/* Video Cinema Container */}
      <div
        className="relative w-full max-w-6xl mx-4 sm:mx-8 aspect-video bg-black/80 rounded-sm overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {embedUrl ? (
          isDirectVideo ? (
            <video
              key={`${project.id}-${embedUrl}`}
              src={embedUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              key={`${project.id}-${embedUrl}`}
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
            <span className="text-white/40 text-[12px] tracking-[0.2em] uppercase mb-3">
              No Video Source Provided
            </span>
            <p className="text-white/80 max-w-md text-sm">
              Add your YouTube, Vimeo, or MP4 URL in{' '}
              <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">
                src/data/projects.ts
              </code>{' '}
              to play the full film or showreel here.
            </p>
          </div>
        )}
      </div>

      {/* Film Slate Footer */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-50 flex justify-between items-center text-white/40 text-[11px] tracking-[0.2em] uppercase pointer-events-none">
        <span>ASPECT: {project.aspectRatio || '2.39:1 ANAMORPHIC'}</span>
        <span>ESC TO RETURN</span>
      </div>
    </div>
  );
};
