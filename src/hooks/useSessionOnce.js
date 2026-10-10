import { useState, useCallback } from 'react';

export function useSessionOnce(key = 'candid_pixel_session_once') {
  const [hasRun, setHasRun] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(key) === 'true';
    } catch {
      return false;
    }
  });

  const markAsRun = useCallback(() => {
    try {
      sessionStorage.setItem(key, 'true');
      setHasRun(true);
    } catch {
      setHasRun(true);
    }
  }, [key]);

  return [hasRun, markAsRun];
}
