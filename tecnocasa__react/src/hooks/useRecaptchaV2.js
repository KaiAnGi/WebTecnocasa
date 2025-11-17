// hooks/useRecaptchaV2.js
import { useRef, useState, useCallback } from 'react';

export function useRecaptchaV2() {
  const recaptchaRef = useRef(null);
  const [token, setToken] = useState(null);
  const [completed, setCompleted] = useState(false);

  const onChange = useCallback((t) => {
    setToken(t || null);
    setCompleted(!!t);
  }, []);

  const reset = useCallback(() => {
    recaptchaRef.current?.reset();
    setToken(null);
    setCompleted(false);
  }, []);

  const getToken = useCallback(() => recaptchaRef.current?.getValue() || token, [token]);

  return { recaptchaRef, token, completed, onChange, reset, getToken };
}
