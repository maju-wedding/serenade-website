"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function ClientRouter() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('ClientRouter: Current pathname:', pathname);
    console.log('ClientRouter: Window location pathname:', window.location.pathname);
    
    // Check for query parameters first (from 404.html redirects)
    const urlParams = new URLSearchParams(window.location.search);
    const pathParam = urlParams.get('path');
    const redirectParam = urlParams.get('redirect');
    
    if (pathParam) {
      console.log('Redirecting from query path parameter:', pathParam);
      router.replace(pathParam);
      return;
    }
    
    if (redirectParam) {
      console.log('Redirecting from query redirect parameter:', redirectParam);
      router.replace(redirectParam);
      return;
    }

    // Get the actual browser URL path
    const currentPath = window.location.pathname;
    const dynamicRoutes = [
      '/studio-detail/',
      '/wedding-hall-detail/',
      '/magazine-detail/',
      '/curation-detail/'
    ];
    
    // Check if we're on home page but URL shows dynamic route
    const isDynamicRoute = dynamicRoutes.some(route => currentPath.startsWith(route));
    
    if (isDynamicRoute && pathname === '/' && currentPath !== '/') {
      console.log('S3 Error redirect detected. Browser URL:', currentPath, 'Next.js pathname:', pathname);
      console.log('Navigating to correct route:', currentPath);
      
      // Force navigation to the correct route
      router.push(currentPath);
      return;
    }

    // Handle hash routes
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const path = hash.substring(1);
      console.log('Handling hash route:', path);
      router.replace(path);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', path);
      }
    }
  }, [router, pathname]);

  return null;
}