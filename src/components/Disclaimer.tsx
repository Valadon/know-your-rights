'use client';

import { useState, useEffect } from 'react';

interface DisclaimerProps {
  text: string;
}

export default function Disclaimer({ text }: DisclaimerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has previously dismissed the disclaimer
    const dismissed = localStorage.getItem('kyr-disclaimer-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('kyr-disclaimer-dismissed', 'true');
  };

  const handleShow = () => {
    setIsVisible(true);
    localStorage.removeItem('kyr-disclaimer-dismissed');
  };

  if (!isMounted) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-[var(--warning)]/10 via-[var(--warning)]/5 to-[var(--warning)]/10 border-t border-[var(--warning)]/30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
          >
            <div className="flex items-start gap-3 animate-pulse"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--warning)]/20" />
              <div className="flex-1 h-4 bg-[var(--warning)]/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return (
      <button
        onClick={handleShow}
        className="disclaimer-container fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-[var(--warning)]/20 border border-[var(--warning)]/30 flex items-center justify-center text-[var(--warning)] hover:bg-[var(--warning)]/30 transition-colors emergency-pulse"
        aria-label="Show educational disclaimer"
        title="Show disclaimer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="disclaimer-container fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
    >
      <div className="bg-gradient-to-r from-[var(--warning)]/10 via-[var(--warning)]/5 to-[var(--warning)]/10 border-t border-[var(--warning)]/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
        >
          <div className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--warning)]/20 flex items-center justify-center mt-0.5"
            >
              <svg className="w-4 h-4 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1"
            >
              <p className="text-sm text-[var(--foreground)] leading-relaxed"
              >
                <span className="font-semibold text-[var(--warning)]">Educational Disclaimer: </span>
                {text}
              </p>
            </div>            
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--card-border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]/80 transition-colors"
              aria-label="Dismiss disclaimer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
