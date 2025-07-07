import { useEffect } from 'react';

export default function EzoicScript() {
  useEffect(() => {
    // Load the main Ezoic script only once
    if (!document.querySelector('script[src*="ezstandalone.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://go.ezoic.net/detroitchicago/ezstandalone.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
}