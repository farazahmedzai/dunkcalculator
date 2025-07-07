import { useEffect } from 'react';

interface EzoicAdProps {
  placementId: number;
  className?: string;
}

declare global {
  interface Window {
    ezstandalone?: {
      cmd: {
        push: (fn: () => void) => void;
      };
      showAds: (placementId: number) => void;
    };
  }
}

export default function EzoicAd({ placementId, className = "" }: EzoicAdProps) {
  useEffect(() => {
    // Load Ezoic script if not already loaded
    if (!window.ezstandalone) {
      const script = document.createElement('script');
      script.src = 'https://go.ezoic.net/detroitchicago/ezstandalone.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Show ads when ezstandalone is ready
    const showAd = () => {
      if (window.ezstandalone) {
        window.ezstandalone.cmd.push(() => {
          window.ezstandalone!.showAds(placementId);
        });
      }
    };

    // Add a small delay to ensure the DOM element is rendered
    const timer = setTimeout(showAd, 100);

    return () => clearTimeout(timer);
  }, [placementId]);

  return (
    <div className={`ezoic-ad-container ${className}`}>
      <div id={`ezoic-pub-ad-placeholder-${placementId}`}></div>
    </div>
  );
}