'use client';

import { useState, useRef, useEffect } from 'react';
import { Scenario } from '@/types';
import Link from 'next/link';

interface SearchBarProps {
  scenarios: Scenario[];
}

interface SearchResult {
  scenario: Scenario;
  right?: {
    title: string;
    description: string;
  };
}

export default function SearchBar({ scenarios }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    scenarios.forEach((scenario) => {
      // Check scenario title and description
      if (
        scenario.title.toLowerCase().includes(lowerQuery) ||
        scenario.description.toLowerCase().includes(lowerQuery) ||
        scenario.category.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({ scenario });
      }

      // Check rights
      scenario.rights.forEach((right) => {
        if (
          right.title.toLowerCase().includes(lowerQuery) ||
          right.description.toLowerCase().includes(lowerQuery) ||
          right.source.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            scenario,
            right: { title: right.title, description: right.description },
          });
        }
      });
    });

    // Remove duplicates and limit results
    const uniqueResults = searchResults.filter((result, index, self) =>
      index === self.findIndex((r) => 
        r.scenario.id === result.scenario.id && r.right?.title === result.right?.title
      )
    ).slice(0, 6);

    setResults(uniqueResults);
    setIsOpen(uniqueResults.length > 0);
  }, [query, scenarios]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--muted)]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search rights, scenarios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--card-border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl shadow-black/20 overflow-hidden animate-fade-in"
        >
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((result, index) => (
              <Link
                key={`${result.scenario.id}-${index}`}
                href={`/scenario/${result.scenario.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--card-border)] transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-xl"
                >
                  {result.scenario.icon}
                </div>
                <div className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-[var(--foreground)] truncate"
                  >
                    {result.scenario.title}
                  </p>
                  {result.right ? (
                    <p className="text-xs text-[var(--accent-light)] mt-0.5"
                    >
                      {result.right.title}
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1"
                    >
                      {result.scenario.description}
                    </p>
                  )}
                </div>
                <svg 
                  className="flex-shrink-0 w-4 h-4 text-[var(--muted)] mt-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-[var(--card-border)]"
          >
            <p className="text-xs text-[var(--muted)]"
            >
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
