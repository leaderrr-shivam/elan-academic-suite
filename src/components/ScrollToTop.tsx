
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Security: Validate that we have a valid pathname
    if (typeof pathname !== 'string') {
      console.warn('Invalid pathname detected:', pathname);
      return;
    }

    // Smooth scroll to top with fallback for older browsers
    try {
      // Modern browsers
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
      });
    } catch (error) {
      // Fallback for older browsers
      console.warn('Modern scrollTo not supported, using fallback:', error);
      window.scrollTo(0, 0);
    }

    // Additional safety check - ensure scroll position is actually at top
    // This handles edge cases where scrollTo might not work immediately
    const checkScrollPosition = () => {
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
        try {
          window.scrollTo(0, 0);
        } catch (error) {
          console.error('Failed to scroll to top:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkScrollPosition, 50);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};
