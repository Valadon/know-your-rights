'use client';

import { useEffect, useMemo, useState } from 'react';

interface HeroHeadingProps {
  primary: string;
  secondary: string;
  className?: string;
  typingSpeedMs?: number;
}

export default function HeroHeading({
  primary,
  secondary,
  className = '',
  typingSpeedMs = 35,
}: HeroHeadingProps) {
  const [typed, setTyped] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(primary);
      setDoneTyping(true);
      return;
    }

    let i = 0;
    setTyped('');
    setDoneTyping(false);

    const id = window.setInterval(() => {
      i += 1;
      setTyped(primary.slice(0, i));
      if (i >= primary.length) {
        window.clearInterval(id);
        setDoneTyping(true);
      }
    }, typingSpeedMs);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, primary, typingSpeedMs]);

  return (
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight ${className}`}
      aria-label={`${primary} ${secondary}`}
    >
      <span className="gradient-text inline-block">
        <span className={prefersReducedMotion ? '' : 'typing-cursor'} aria-hidden="true">
          {typed}
        </span>
        <span className="sr-only">{primary}</span>
      </span>
      <br />
      <span
        className={`text-[var(--foreground)] inline-block ${
          prefersReducedMotion ? '' : doneTyping ? 'animate-text-reveal' : 'opacity-0'
        }`}
      >
        {secondary}
      </span>
    </h1>
  );
}
