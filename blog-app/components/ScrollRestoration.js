'use client';

import { useEffect } from 'react';

export default function ScrollRestoration() {
  useEffect(() => {
    // Check for scroll restoration flag
    const restoreScroll = sessionStorage.getItem('restore-scroll');
    if (restoreScroll) {
      const position = parseInt(restoreScroll, 10);
      // Add a small offset to account for header height (approx 80px)
      const offset = 80;
      const adjustedPosition = Math.max(0, position - offset);

      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: adjustedPosition,
          behavior: 'smooth'
        });
        sessionStorage.removeItem('restore-scroll');
      }, 100);
    }
  }, []);

  return null;
}
