'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { useEffect, useState } from 'react';
import { getAllScenarios } from '@/data/rightsLoader';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
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
              <span className="text-lg font-bold gradient-text hidden sm:block">
                Know Your Rights
              </span>
              <span className="text-lg font-bold gradient-text sm:hidden">
                KYR
              </span>
            </Link>

            {/* Desktop Navigation */}
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
                href="/saved" 
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all duration-200"
              >
                Saved
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
              className="sm:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-colors mobile-menu-container"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Slide-out */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-[var(--card-bg)] border-l border-[var(--card-border)] z-40 transform transition-transform duration-300 ease-out sm:hidden mobile-menu-container ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <div className="p-6 pt-20">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link 
              href="/quiz" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Quiz
            </Link>
            <Link 
              href="/saved" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved Rights
            </Link>
            <Link 
              href="/emergency" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Emergency
            </Link>
            
            <div className="border-t border-[var(--card-border)] my-2" />
            
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors text-left"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Switch to Dark Mode
                </>
              )}
            </button>

            <Link 
              href="/pocket-card" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Pocket Card
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

// Progress Bar Component
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [totalScenarios, setTotalScenarios] = useState(0);

  useEffect(() => {
    // Get total scenarios dynamically
    const scenarios = getAllScenarios();
    setTotalScenarios(scenarios.length);
    
    // Get viewed scenarios from localStorage
    const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
    setViewedCount(viewed.length);
    setProgress((viewed.length / scenarios.length) * 100);
  }, []);

  // Update progress when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const scenarios = getAllScenarios();
      setTotalScenarios(scenarios.length);
      const viewed = JSON.parse(localStorage.getItem('kyr-viewed-scenarios') || '[]');
      setViewedCount(viewed.length);
      setProgress((viewed.length / scenarios.length) * 100);
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
      aria-valuemax={totalScenarios}
      aria-label={`Progress: ${viewedCount} of ${totalScenarios} scenarios viewed`}
    />
  );
}
