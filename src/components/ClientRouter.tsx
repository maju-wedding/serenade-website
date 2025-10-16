"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClientRouter() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a hash route that needs to be handled
    const handleHashRoute = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const path = hash.substring(1); // Remove the #
        console.log('Handling hash route:', path);
        
        // Use replace to avoid adding to history
        router.replace(path);
        
        // Clean up the hash
        if (window.history.replaceState) {
          window.history.replaceState(null, '', path);
        }
      }
    };

    // Handle initial load
    handleHashRoute();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashRoute);

    return () => {
      window.removeEventListener('hashchange', handleHashRoute);
    };
  }, [router]);

  return null; // This component doesn't render anything
}