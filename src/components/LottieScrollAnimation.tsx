import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useLenis } from 'lenis/react';

const LottieScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      try {
        const response = await fetch('/animJson/graph.json');
        if (!response.ok) throw new Error('Erro ao carregar animação');
        const animationData = await response.json();

        if (!containerRef.current) return;

        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData,
        });

        animationInstanceRef.current = anim;

        anim.addEventListener('DOMLoaded', () => {
          anim.goToAndStop(0, true);
        });

        const update = () => {
          if (!animationInstanceRef.current || !mounted || !lenis) return;

          const scroll = lenis.scroll || 0;
          const limit = lenis.limit || 1;
          const progress = scroll / limit;

          const totalFrames = animationInstanceRef.current.totalFrames;
          const frame = progress * totalFrames;
          animationInstanceRef.current.goToAndStop(frame, true);

          animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);
      } catch (err) {
        console.error('Erro na animação Lottie:', err);
      }
    };

    loadAnimation();

    return () => {
      mounted = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationInstanceRef.current?.destroy();
    };
  }, [lenis]);

  return <div ref={containerRef} style={{ width: '100%', height: '400px', position: 'relative' }} />;
};

export default LottieScrollAnimation;