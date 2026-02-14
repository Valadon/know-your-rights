'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookmarkedRight, getBookmarkedRights, removeBookmark } from '@/components/RightCard';

export default function SavedRightsPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedRight[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarks(getBookmarkedRights());

    // Listen for bookmark updates
    const handleUpdate = () => {
      setBookmarks(getBookmarkedRights());
    };
    window.addEventListener('kyr-bookmarks-update', handleUpdate);
    return () => window.removeEventListener('kyr-bookmarks-update', handleUpdate);
  }, []);

  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarkedRights());
  };

  const handleClearAll = () => {
    if (typeof window !== 'undefined' && confirm('Are you sure you want to remove all saved rights?')) {
      localStorage.setItem('kyr-bookmarked-rights', '[]');
      window.dispatchEvent(new Event('kyr-bookmarks-update'));
      setBookmarks([]);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-[var(--card-bg)] rounded-lg mb-4"></div>
            <div className="h-4 w-96 bg-[var(--card-bg)] rounded-lg"></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--card-border)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6 animate-fade-in"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                  My Saved Rights
                </h1>
              </div>              
              <p className="text-[var(--muted)]">
                {bookmarks.length === 0 
                  ? "Save rights that matter to you for quick access."
                  : `You have ${bookmarks.length} saved right${bookmarks.length !== 1 ? 's' : ''}.`
                }
              </p>
            </div>

            {bookmarks.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-xl transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Saved Rights List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {bookmarks.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-[var(--card-bg)] flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              No saved rights yet
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
              Browse scenarios and click the bookmark icon on any right to save it here for quick access.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-dark)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Browse Scenarios
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark, index) => (
              <div
                key={bookmark.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5 sm:p-6 hover:border-[var(--accent)]/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    {/* Scenario Icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl">
                      {bookmark.scenarioIcon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                            {bookmark.title}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">
                            From: {bookmark.scenarioTitle}
                          </p>
                          <p className="text-xs text-[var(--muted)] mt-1">
                            Saved {new Date(bookmark.timestamp).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                            href={`/scenario/${bookmark.scenarioId}`}
                            className="p-2 rounded-lg text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
                            title="Go to scenario"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleRemove(bookmark.id)}
                            className="p-2 rounded-lg text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
                            title="Remove bookmark"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      {bookmarks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tip
            </h3>            
            <p className="text-[var(--muted)] mb-4">
              Your saved rights are stored locally on your device. They won't sync across devices but will be available offline.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pocket-card"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Pocket Card
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Take Quiz
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
