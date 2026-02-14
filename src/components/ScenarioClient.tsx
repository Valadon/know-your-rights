'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Scenario } from '@/types';
import { RightCard, StateSelector } from '@/components';

interface ScenarioClientProps {
  scenario: Scenario;
  availableStates: string[];
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

async function copyToClipboard(text: string) {
  // Prefer modern clipboard API
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for older browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function useReadingProgress(targetRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  const recalc = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;

    const scrollY = window.scrollY;
    const rect = el.getBoundingClientRect();
    const top = rect.top + scrollY;
    const height = el.offsetHeight;
    const viewport = window.innerHeight;

    const maxScroll = height - viewport;
    if (maxScroll <= 0) {
      // Content fits within viewport: show progress once the reader reaches it.
      const p = scrollY >= top ? 100 : 0;
      setProgress(p);
      return;
    }

    const raw = ((scrollY - top) / maxScroll) * 100;
    setProgress(clamp(raw, 0, 100));
  }, [targetRef]);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = window.requestAnimationFrame(() => {
        recalc();
        ticking = false;
      });
    };

    recalc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
      window.cancelAnimationFrame(raf);
    };
  }, [recalc]);

  return progress;
}

function WhatToSaySection({ phrases }: { phrases: string[] }) {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async (phrase: string) => {
    try {
      await copyToClipboard(phrase);
      setToast('Copied!');
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 1200);
    } catch {
      setToast('Could not copy');
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 1600);
    }
  }, []);

  if (!phrases.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">What to Say</h2>
          <p className="text-sm text-[var(--muted)]">Click a phrase to copy.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {phrases.map((phrase) => (
          <button
            key={phrase}
            type="button"
            onClick={() => handleCopy(phrase)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/5 transition-colors"
            aria-label={`Copy phrase: ${phrase}`}
          >
            <span className="text-[var(--accent)]">❝</span>
            <span className="whitespace-nowrap">{phrase}</span>
            <span className="text-[var(--accent)]">❞</span>
          </button>
        ))}
      </div>

      {/* Toast */}
      <div className="aria-live-region" aria-live="polite" aria-atomic="true">
        {toast ?? ''}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-black/70 text-white text-sm shadow-lg no-print">
          {toast}
        </div>
      )}
    </div>
  );
}

export default function ScenarioClient({ scenario, availableStates }: ScenarioClientProps) {
  const [selectedState, setSelectedState] = useState('');
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const phrases = useMemo(() => scenario.phrases ?? [], [scenario.phrases]);
  const readingProgress = useReadingProgress(contentRef);

  // Read initial state from URL on mount and track progress
  useEffect(() => {
    setMounted(true);

    // Track that user viewed this scenario
    const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
    if (!viewed.includes(scenario.id)) {
      viewed.push(scenario.id);
      localStorage.setItem('kyr-viewed-scenarios', JSON.stringify(viewed));
      // Dispatch custom event to update progress bar
      window.dispatchEvent(new Event('kyr-progress-update'));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const stateFromUrl = urlParams.get('state');

    if (stateFromUrl && availableStates.includes(stateFromUrl)) {
      setSelectedState(stateFromUrl);
    }
  }, [availableStates, scenario.id]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    // Update URL without reloading
    const url = newState ? `/scenario/${scenario.id}/?state=${newState}` : `/scenario/${scenario.id}/`;
    window.history.replaceState({}, '', url);
  };

  const handlePrint = () => {
    // Expand all cards before printing
    const event = new CustomEvent('kyr-expand-all');
    window.dispatchEvent(event);

    // Small delay to allow expansion animation
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Prevent hydration mismatch by not rendering state-dependent UI until mounted
  if (!mounted) {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">Your Rights</h2>
            <p className="text-sm text-[var(--muted)]">{scenario.rights.length} rights in this scenario</p>
          </div>
          <div className="h-10 w-32 bg-[var(--card-bg)] rounded-xl animate-pulse" />
        </div>

        <div className="space-y-4">
          {scenario.rights.map((right, index) => (
            <RightCard key={right.title} right={right} index={index} selectedState="" scenarioId={scenario.id} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Scenario reading progress (scroll) */}
      <div className="reading-progress-container no-print" aria-hidden="true">
        <div className="reading-progress-fill" style={{ width: `${readingProgress}%` }} />
      </div>

      <div ref={contentRef}>
        {/* State Selector & Print */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">Your Rights</h2>
            <p className="text-sm text-[var(--muted)]">{scenario.rights.length} rights in this scenario</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--card-border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all duration-200 no-print"
              aria-label="Print this page"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>

            <StateSelector selectedState={selectedState} onStateChange={handleStateChange} availableStates={availableStates} />
          </div>
        </div>

        {/* State info banner */}
        {selectedState && (
          <div className="mb-6 p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20 animate-fade-in no-print">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--success)]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-[var(--foreground)]">
                Showing <span className="font-semibold text-[var(--success)]">{selectedState}</span>-specific information where available.
              </p>
            </div>
          </div>
        )}

        {/* Rights Cards */}
        <div className="space-y-4">
          {scenario.rights.map((right, index) => (
            <RightCard key={right.title} right={right} index={index} selectedState={selectedState} scenarioId={scenario.id} />
          ))}
        </div>

        {/* What to Say (after rights list) */}
        <WhatToSaySection phrases={phrases} />
      </div>
    </>
  );
}
