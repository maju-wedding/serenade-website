"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClientRouter() {
  const router = useRouter();

  useEffect(() => {
    // Check for path parameter from 404 page  
    const urlParams = new URLSearchParams(window.location.search);
    const pathParam = urlParams.get('path');
    const redirectParam = urlParams.get('redirect');
    
    if (pathParam) {
      console.log('Redirecting from 404 path to:', pathParam);
      // Clean the URL and navigate to the actual route
      router.replace(pathParam);
      return;
    }
    
    if (redirectParam) {
      console.log('Redirecting from 404 redirect to:', redirectParam);
      // Clean the URL and navigate to the actual route
      router.replace(redirectParam);
      return;
    }

    // Check sessionStorage for redirect path
    const storedPath = window.sessionStorage?.getItem('redirectPath');
    if (storedPath && storedPath !== '/') {
      console.log('Redirecting from stored path:', storedPath);
      window.sessionStorage.removeItem('redirectPath');
      router.replace(storedPath);
      return;
    }

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