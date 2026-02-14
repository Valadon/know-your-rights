'use client';

import Link from 'next/link';

export default function EmergencyButton() {
  return (
    <Link
      href="/emergency"
      className="emergency-float fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--danger)] text-white font-medium shadow-lg shadow-[var(--danger)]/30 hover:bg-[var(--danger)]/90 hover:shadow-[var(--danger)]/50 transition-all duration-300 emergency-pulse"
      aria-label="Emergency contacts and resources"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="hidden sm:inline">Emergency</span>
    </Link>
  );
}
