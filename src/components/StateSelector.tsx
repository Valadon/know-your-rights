'use client';

import { useState, useRef, useEffect } from 'react';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  availableStates: string[];
}

export default function StateSelector({ selectedState, onStateChange, availableStates }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (state: string) => {
    onStateChange(state);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          selectedState 
            ? 'bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30' 
            : 'bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--card-border)] hover:border-[var(--accent)]/50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{selectedState || 'Select State'}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className={`absolute z-50 mt-2 w-48 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl shadow-black/20 overflow-hidden transition-all duration-200 ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="max-h-60 overflow-y-auto">
          <button
            onClick={() => handleSelect('')}
            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
              selectedState === '' 
                ? 'bg-[var(--accent)]/20 text-[var(--accent-light)]' 
                : 'text-[var(--foreground)] hover:bg-[var(--card-border)]'
            }`}
          >
            All States (General)
          </button>
          {availableStates.map((state) => (
            <button
              key={state}
              onClick={() => handleSelect(state)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                selectedState === state 
                  ? 'bg-[var(--accent)]/20 text-[var(--accent-light)]' 
                  : 'text-[var(--foreground)] hover:bg-[var(--card-border)]'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
