'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    // Calculate scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    setProgress(Math.min(100, Math.max(0, scrollPercent)));
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smooth updates
    let rafId: number | null = null;
    let isUpdating = false;

    const onScroll = () => {
      if (isUpdating) return;
      isUpdating = true;
      
      rafId = requestAnimationFrame(() => {
        handleScroll();
        isUpdating = false;
      });
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Recalculate on resize
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return (
    <div className="progress-bar-container no-print">
      <div 
        className="progress-bar-fill" 
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
