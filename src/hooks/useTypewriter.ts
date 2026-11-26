import { useState, useEffect } from 'react';

/**
 * Custom hook to reveal text character-by-character with optional start delay.
 *
 * @param text The full string to type out.
 * @param speed Typing speed per character in milliseconds (default: 38ms).
 * @param startDelay Delay before typing begins in milliseconds (default: 600ms).
 * @returns { displayed: string, done: boolean }
 */
export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;

    setDisplayed('');
    setDone(false);

    timer = setTimeout(() => {
      if (text.length === 0) {
        setDone(true);
        return;
      }

      interval = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
