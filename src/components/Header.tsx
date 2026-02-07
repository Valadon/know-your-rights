'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'glass border-b border-[var(--card-border)] shadow-lg' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="progress-bar-container fixed top-0 left-0 right-0 z-50">
        <ProgressBar />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/40 transition-shadow duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-xl bg-[var(--accent)] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold gradient-text">
              Know Your Rights
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              href="/quiz" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              Quiz
            </Link>
            <Link 
              href="/emergency" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-all duration-200"
            >
              Emergency
            </Link>
            
            <button
              onClick={toggleTheme}
              className="theme-toggle p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all duration-200 ml-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="sm:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// Progress Bar Component
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  // Total scenarios - updated from the data file count
  const TOTAL_SCENARIOS = 9;

  useEffect(() => {
    // Get viewed scenarios from localStorage
    const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
    setViewedCount(viewed.length);
    setProgress((viewed.length / TOTAL_SCENARIOS) * 100);
  }, []);

  // Update progress when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
      setViewedCount(viewed.length);
      setProgress((viewed.length / TOTAL_SCENARIOS) * 100);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event
    window.addEventListener('kyr-progress-update', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('kyr-progress-update', handleStorageChange);
    };
  }, []);

  if (progress === 0) return null;

  return (
    <div 
      className="progress-bar" 
      style={{ '--progress': `${progress}%` } as React.CSSProperties}
      role="progressbar"
      aria-valuenow={viewedCount}
      aria-valuemin={0}
      aria-valuemax={TOTAL_SCENARIOS}
      aria-label={`Progress: ${viewedCount} of ${TOTAL_SCENARIOS} scenarios viewed`}
    />
  );
}
