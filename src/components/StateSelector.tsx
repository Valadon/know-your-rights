'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  availableStates: string[];
}

export default function StateSelector({ selectedState, onStateChange, availableStates }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(selectedState ? availableStates.indexOf(selectedState) + 1 : 0);
      }
      return;
    }

    const items = ['', ...availableStates];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(items[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        // Close on tab out
        setIsOpen(false);
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(items.length - 1);
        break;
    }
  }, [isOpen, highlightedIndex, availableStates, selectedState]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('button');
      const highlightedItem = items[highlightedIndex];
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (state: string) => {
    onStateChange(state);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHighlightedIndex(selectedState ? availableStates.indexOf(selectedState) + 1 : 0);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          selectedState 
            ? 'bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30' 
            : 'bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--card-border)] hover:border-[var(--accent)]/50'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedState ? `Selected state: ${selectedState}. Change state` : 'Select a state'}
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
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div 
        className={`absolute z-50 mt-2 w-48 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl shadow-black/20 overflow-hidden transition-all duration-200 ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        role="listbox"
        aria-label="Select a state"
      >
        <div 
          ref={listRef}
          className="max-h-60 overflow-y-auto"
          role="presentation"
        >
          <button
            onClick={() => handleSelect('')}
            onMouseEnter={() => setHighlightedIndex(0)}
            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
              selectedState === '' 
                ? 'bg-[var(--accent)]/20 text-[var(--accent-light)]' 
                : highlightedIndex === 0
                  ? 'bg-[var(--accent)]/10 text-[var(--foreground)]'
                  : 'text-[var(--foreground)] hover:bg-[var(--card-border)]'
            }`}
            role="option"
            aria-selected={selectedState === ''}
            tabIndex={-1}
          >
            All States (General)
          </button>
          {availableStates.map((state, index) => {
            const itemIndex = index + 1;
            return (
              <button
                key={state}
                onClick={() => handleSelect(state)}
                onMouseEnter={() => setHighlightedIndex(itemIndex)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                  selectedState === state 
                    ? 'bg-[var(--accent)]/20 text-[var(--accent-light)]' 
                    : highlightedIndex === itemIndex
                      ? 'bg-[var(--accent)]/10 text-[var(--foreground)]'
                      : 'text-[var(--foreground)] hover:bg-[var(--card-border)]'
                }`}
                role="option"
                aria-selected={selectedState === state}
                tabIndex={-1}
              >
                {state}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
