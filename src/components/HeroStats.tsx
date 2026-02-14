'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);
}

function AnimatedNumber({
  value,
  start,
  durationMs = 1500,
}: {
  value: number;
  start: boolean;
  durationMs?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplay(0);
      return;
    }

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const from = 0;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // Ease-out quart
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, prefersReducedMotion, start, value]);

  return <span className="tabular-nums">{display}</span>;
}

export default function HeroStats({
  statesCount,
  scenariosCount,
}: {
  statesCount: number;
  scenariosCount: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={ref} className={`mt-6 flex flex-wrap items-center justify-center gap-3 counter-animate ${inView ? 'visible' : ''}`}>
      <div className="px-4 py-2 rounded-full bg-[var(--card-bg)]/60 border border-[var(--card-border)] backdrop-blur-sm">
        <span className="text-xs text-[var(--muted)]">Coverage</span>
        <div className="text-sm font-semibold text-[var(--foreground)]">
          <AnimatedNumber value={statesCount} start={inView} />+{' '}
          <span className="text-[var(--muted)] font-medium">states</span>
        </div>
      </div>

      <div className="px-4 py-2 rounded-full bg-[var(--card-bg)]/60 border border-[var(--card-border)] backdrop-blur-sm">
        <span className="text-xs text-[var(--muted)]">Practice</span>
        <div className="text-sm font-semibold text-[var(--foreground)]">
          <AnimatedNumber value={scenariosCount} start={inView} />{' '}
          <span className="text-[var(--muted)] font-medium">scenarios</span>
        </div>
      </div>
    </div>
  );
}
