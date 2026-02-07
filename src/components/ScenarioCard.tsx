'use client';

import { Scenario } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ScenarioCardProps {
  scenario: Scenario;
  index: number;
}

export default function ScenarioCard({ scenario, index }: ScenarioCardProps) {
  const [isViewed, setIsViewed] = useState(false);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
    setIsViewed(viewed.includes(scenario.id));
  }, [scenario.id]);

  return (
    <Link
      href={`/scenario/${scenario.id}`}
      className="group relative block animate-fade-in opacity-0 card-hover"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
      aria-label={`${scenario.title} - ${scenario.category}. ${isViewed ? 'Viewed' : 'Not viewed'}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-6 h-full transition-all duration-300 group-hover:border-[var(--accent)]/50">
        {/* Viewed indicator */}
        {isViewed && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-[var(--success)]/90 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Viewed
            </div>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center text-3xl border border-[var(--accent)]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {scenario.icon}
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-14 h-14 rounded-xl bg-[var(--accent)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category badge */}
        <span className="relative inline-block text-xs font-medium text-[var(--accent-light)] bg-[var(--accent)]/10 px-3 py-1 rounded-full mb-3">
          {scenario.category}
        </span>

        {/* Title */}
        <h3 className="relative text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent-light)] transition-colors duration-300">
          {scenario.title}
        </h3>

        {/* Description */}
        <p className="relative text-sm text-[var(--muted)] line-clamp-2">
          {scenario.description}
        </p>

        {/* Rights count */}
        <div className="relative mt-4 flex items-center justify-between">
          <span className="text-xs text-[var(--muted)]">
            {scenario.rights.length} rights
          </span>
          
          {/* Arrow indicator */}
          <div className="flex items-center text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
            <span>Learn</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
