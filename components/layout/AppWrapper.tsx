'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import PageLoader from '../loaders/PageLoader';

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Create a stable callback for handleLoaderComplete
  const handleLoaderComplete = useCallback(() => {
    console.log('Page loader completed');
  }, []);

  useEffect(() => {
    // Use a ref to track if this is the first load
    let isMounted = true;
    
    const handleRouteChange = async () => {
      if (!isMounted) return;
      
      // Skip loader on initial page load (better UX)
      if (isFirstLoad) {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => {
          if (isMounted) {
            setIsFirstLoad(false);
          }
        }, 0);
        return;
      }

      // Show loader on route change
      setLoading(true);
      
      // Auto-hide loader after duration (matches PageLoader)
      const timer = setTimeout(() => {
        if (isMounted) {
          setLoading(false);
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    };

    handleRouteChange();

    return () => {
      isMounted = false;
    };
  }, [pathname, isFirstLoad]); // Add isFirstLoad to dependencies

  return (
    <>
      {loading && <PageLoader onComplete={handleLoaderComplete} />}
      
      {/* Content wrapper with smooth fade-in */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${loading 
          ? 'opacity-0 blur-sm translate-y-2' 
          : 'opacity-100 blur-0 translate-y-0'
        }
      `}>
        {children}
      </div>
    </>
  );
}