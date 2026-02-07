'use client';

import { useState } from 'react';
import { Right, StateVariation } from '@/types';

interface RightCardProps {
  right: Right;
  index: number;
  selectedState: string;
}

export default function RightCard({ right, index, selectedState }: RightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStateVariation = (): StateVariation | undefined => {
    return right.stateVariations.find((v) => v.state === selectedState);
  };

  const stateVariation = getStateVariation();
  const hasStateSpecificInfo = stateVariation !== undefined;

  return (
    <div
      className="animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-[var(--card-bg)] border transition-all duration-300 ${
          isExpanded 
            ? 'border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10' 
            : 'border-[var(--card-border)] hover:border-[var(--accent)]/50'
        }`}
      >
        {/* State-specific indicator */}
        {hasStateSpecificInfo && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-bl from-[var(--success)] to-[var(--success)]/70 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              {selectedState} Specific
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 pr-16">
                {right.title}
              </h3>
              <p className={`text-sm text-[var(--muted)] transition-all duration-300 ${
                isExpanded ? 'line-clamp-none' : 'line-clamp-2'
              }`}>
                {right.description}
              </p>
            </div>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center transition-all duration-300 ${
              isExpanded ? 'rotate-180 bg-[var(--accent)]' : ''
            }`}>
              <svg 
                className={`w-5 h-5 transition-colors duration-300 ${
                  isExpanded ? 'text-white' : 'text-[var(--accent)]'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[var(--card-border)]">
            {/* Full description */}
            <div className="mb-4">
              <p className="text-[var(--foreground)] leading-relaxed">
                {right.description}
              </p>
            </div>

            {/* State-specific variation */}
            {stateVariation && (
              <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-[var(--success)]/10 to-[var(--success)]/5 border border-[var(--success)]/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--success)]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--success)] mb-1">
                      {stateVariation.state} Law
                    </h4>
                    <p className="text-sm text-[var(--foreground)]">
                      {stateVariation.note}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Other state variations available */}
            {right.stateVariations.length > 0 && !stateVariation && (
              <div className="mb-4 p-4 rounded-xl bg-[var(--card-border)]/50 border border-[var(--card-border)]">
                <p className="text-sm text-[var(--muted)]">
                  💡 This right has state-specific variations. Select a state to see relevant details.
                </p>
              </div>
            )}

            {/* Legal source */}
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-[var(--muted)]">Source: </span>
              <span className="text-[var(--accent-light)] font-medium">{right.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
