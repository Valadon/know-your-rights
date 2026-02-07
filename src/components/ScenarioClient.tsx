'use client';

import { useState, useEffect } from 'react';
import { Scenario } from '@/types';
import { RightCard, StateSelector } from '@/components';

interface ScenarioClientProps {
  scenario: Scenario;
  availableStates: string[];
}

export default function ScenarioClient({ scenario, availableStates }: ScenarioClientProps) {
  const [selectedState, setSelectedState] = useState('');
  const [mounted, setMounted] = useState(false);

  // Read initial state from URL on mount
  useEffect(() => {
    setMounted(true);
    const urlParams = new URLSearchParams(window.location.search);
    const stateFromUrl = urlParams.get('state');
    if (stateFromUrl && availableStates.includes(stateFromUrl)) {
      setSelectedState(stateFromUrl);
    }
  }, [availableStates]);

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    // Update URL without reloading
    const url = newState 
      ? `/scenario/${scenario.id}/?state=${newState}` 
      : `/scenario/${scenario.id}/`;
    window.history.replaceState({}, '', url);
  };

  // Prevent hydration mismatch by not rendering state-dependent UI until mounted
  if (!mounted) {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">
              Your Rights
            </h2>
            <p className="text-sm text-[var(--muted)]">
              {scenario.rights.length} rights in this scenario
            </p>
          </div>
          <div className="h-10 w-32 bg-[var(--card-bg)] rounded-xl animate-pulse" />
        </div>
        
        <div className="space-y-4">
          {scenario.rights.map((right, index) => (
            <RightCard 
              key={right.title} 
              right={right} 
              index={index}
              selectedState=""
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* State Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">
            Your Rights
          </h2>
          <p className="text-sm text-[var(--muted)]">
            {scenario.rights.length} rights in this scenario
          </p>
        </div>
        
        <StateSelector 
          selectedState={selectedState} 
          onStateChange={handleStateChange}
          availableStates={availableStates}
        />
      </div>

      {/* State info banner */}
      {selectedState && (
        <div className="mb-6 p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--success)]/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
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
          <RightCard 
            key={right.title} 
            right={right} 
            index={index}
            selectedState={selectedState}
          />
        ))}
      </div>
    </>
  );
}
