// hooks/useStickyHeader.js
import { useEffect, useState } from 'react';

export function useStickyHeader(threshold = 40) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return solid;
}
