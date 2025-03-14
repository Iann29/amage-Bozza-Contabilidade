import React, { useEffect, useRef } from 'react';

// Componente para o chatbot 3D usando Spline
const SplineChatbot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar o script do Spline Viewer dinamicamente
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.77/build/spline-viewer.js';
    script.async = true;
    document.body.appendChild(script);

    // Limpar quando o componente for desmontado
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-4 right-4 z-50 w-20 h-20 cursor-pointer transition-all duration-300 hover:scale-110 rounded-full bg-white/90 shadow-lg border border-blue-100 overflow-hidden"
      title="Clique para abrir o chatbot"
      onClick={() => alert('Chatbot em desenvolvimento!')}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <div style={{
        position: 'relative',
        width: '300%',
        height: '300%',
        transform: 'scale(0.3)',
      }}>
        <spline-viewer 
          url="https://prod.spline.design/VsEIjTj5rS3fq5DF/scene.splinecode"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default SplineChatbot;
