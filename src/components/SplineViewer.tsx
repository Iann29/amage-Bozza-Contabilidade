import React, { useEffect } from 'react';

interface SplineViewerProps {
  url: string;
  className?: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ url, className = '' }) => {
  useEffect(() => {
    // Verificar se o script já foi carregado
    if (!document.querySelector('script[src*="spline-viewer.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.77/build/spline-viewer.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Usar uma string HTML com o elemento web component
  const splineHtml = `<spline-viewer url="${url}"></spline-viewer>`;

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: splineHtml }}
    />
  );
};

export default SplineViewer;