'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/providers';

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
}

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const shortcuts: Shortcut[] = useMemo(
    () => [
      {
        key: 'h',
        description: 'Home',
        action: () => router.push('/'),
      },
      {
        key: 'q',
        description: 'Quiz',
        action: () => router.push('/quiz'),
      },
      {
        key: 'e',
        description: 'Emergency',
        action: () => router.push('/emergency'),
      },
      {
        key: 't',
        description: 'Toggle theme',
        action: () => toggleTheme(),
      },
      {
        key: '?',
        description: 'Show shortcuts',
        action: () => setIsOpen(true),
      },
    ],
    [router, toggleTheme]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (event.key === '?') {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      const shortcut = shortcuts.find((s) => s.key === key);
      if (!shortcut || shortcut.key === '?') return;

      event.preventDefault();
      shortcut.action();
    },
    [shortcuts]
  );

  useEffect(() => {
    if (!mounted) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, mounted]);

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div
      className="keyboard-shortcuts-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="keyboard-shortcuts-modal relative w-full max-w-md rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl animate-fade-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Press a key to navigate
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)] transition-colors"
            aria-label="Close shortcuts"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-4">
          <div className="space-y-2">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-colors"
              >
                <span className="text-sm text-[var(--foreground)]">
                  {shortcut.description}
                </span>
                <kbd className="px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono font-semibold text-[var(--accent)] min-w-[2rem] text-center">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="mt-4 p-3 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/20">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-[var(--muted)]">
                Shortcuts are disabled when typing in input fields. Press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent)]">
                  Esc
                </kbd>{' '}
                to close this dialog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
