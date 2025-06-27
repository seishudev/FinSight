import { useEffect, useState } from 'react';
import _debounce from 'lodash.debounce';

// true - mobile site version. false - desktop site version
export const useMobile = (breakpoint: number) => {
  const [width, setWidth] = useState(innerWidth);
  const debounce = _debounce(() => setWidth(innerWidth), 300);

  useEffect(() => {
    window.addEventListener('resize', debounce);

    return () => window.removeEventListener('resize', debounce);
  }, []);

  return breakpoint >= width;
};
