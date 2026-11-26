import React, { useRef } from 'react';
import { BackgroundVideo, BackgroundVideoHandle } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroTransition } from './components/HeroTransition';
import { IntroStatement } from './components/sections/IntroStatement';
import { ProjectsShowreel } from './components/sections/ProjectsShowreel';
import { AboutMe } from './components/sections/AboutMe';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  const videoRef = useRef<BackgroundVideoHandle | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div id="top" className="relative w-full bg-black select-none font-body">
      <BackgroundVideo
        ref={(handle) => {
          if (handle) videoWrapperRef.current = handle.wrapperElement;
          (videoRef as React.MutableRefObject<BackgroundVideoHandle | null>).current = handle;
        }}
      />
      <Navbar />
      <HeroTransition videoWrapperRef={videoWrapperRef}><Hero /></HeroTransition>
      <IntroStatement />
      <ProjectsShowreel />
      <AboutMe />
      <Contact />
    </div>
  );
};

export default App;
