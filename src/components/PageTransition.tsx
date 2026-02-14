'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (pathname) {
      // Start transition
      setIsTransitioning(true);
      
      // Small delay to allow exit animation
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        
        // Trigger enter animation
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [pathname, children]);

  return (
    <div
      className={`page-transition-wrapper ${isTransitioning ? 'page-transition-exit' : 'page-transition-enter'}`}
    >
      {displayChildren}
    </div>
  );
}
