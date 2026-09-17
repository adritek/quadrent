import { useState, useEffect } from 'react';

const COUCHDB_URL = 'https://couchdb3-5-2.onrender.com';
const BACKEND_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:3001';

interface UseWakeUpReturn {
  isWakingUp: boolean;
  isReady: boolean;
  wakeupError: string | null;
}

export const useWakeUp = (): UseWakeUpReturn => {
  const [isWakingUp, setIsWakingUp] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [wakeupError, setWakeupError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const wake = async () => {
      try {
        await fetch(COUCHDB_URL, { signal: AbortSignal.timeout(120000) });
        await fetch(`${BACKEND_URL}/health`, {
          signal: AbortSignal.timeout(120000),
        });
        if (!cancelled) {
          setIsReady(true);
          setIsWakingUp(false);
        }
      } catch {
        if (!cancelled) {
          setWakeupError('Services are taking too long to wake up. Please refresh');
          setIsWakingUp(false);
        }
      }
    };
    void wake();
    return () => {
      cancelled = true;
    };
  }, []);
  return { isWakingUp, isReady, wakeupError };
};
