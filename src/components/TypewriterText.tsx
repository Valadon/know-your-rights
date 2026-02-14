'use client';

import { useEffect, useMemo, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeedMs?: number;
  startDelayMs?: number;
  cursorClassName?: string;
}

export default function TypewriterText({
  text,
  className = '',
  typingSpeedMs = 18,
  startDelayMs = 0,
  cursorClassName = 'typing-cursor',
}: TypewriterTextProps) {
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(text);
      return;
    }

    let startTimeout = 0;
    let interval = 0;

    setTyped('');
    setStarted(false);

    startTimeout = window.setTimeout(() => {
      setStarted(true);
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
        }
      }, typingSpeedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearInterval(interval);
    };
  }, [prefersReducedMotion, startDelayMs, text, typingSpeedMs]);

  return (
    <span className={className} aria-label={text}>
      <span
        className={!prefersReducedMotion && started ? cursorClassName : ''}
        aria-hidden="true"
      >
        {typed}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
