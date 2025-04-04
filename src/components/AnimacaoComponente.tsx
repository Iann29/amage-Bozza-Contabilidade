// src/components/AnimacaoComponente.tsx
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export interface AnimacaoComponenteRef {
  setAnimationProgress: (progress: number) => void;
}

const AnimacaoComponente = forwardRef<AnimacaoComponenteRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [totalFrames, setTotalFrames] = React.useState(0);

  // Expor a função que atualiza a animação conforme o progresso do scroll
  useImperativeHandle(ref, () => ({
    setAnimationProgress(progress: number) {
      if (animationRef.current && totalFrames) {
        const frame = progress * totalFrames;
        animationRef.current.goToAndStop(frame, true);
      }
    },
  }));

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/animJson/graph.json', // Certifique-se de que o arquivo está em public/animJson/graph.json
      });

      // Após o carregamento, armazena a duração (em frames) da animação
      animationRef.current.addEventListener('DOMLoaded', () => {
        setTotalFrames(animationRef.current?.getDuration(true) || 0);
      });
    }

    return () => {
      animationRef.current?.destroy();
    };
  }, []);

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
      <div ref={containerRef} className="w-full max-w-5xl" />
    </div>
  );
});

export default AnimacaoComponente;
