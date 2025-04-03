import { PropsWithChildren, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';

/**
 * Componente que encapsula o ReactLenis para fornecer rolagem suave
 * em toda a aplicação.
 */
const SmoothScroll: React.FC<PropsWithChildren> = ({ children }) => {
  const lenisRef = useRef<LenisRef>(null);

  // Opções para configurar o comportamento do Lenis
  const options = {
    duration: 1.2, // Reduzimos a duração para tornar a transição mais rápida
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.7, // Reduzido para melhor controle
    touchMultiplier: 1.2, // Ajustado para melhor resposta
    syncTouch: true,
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    lerp: 0.07, // Reduzido para transições mais suaves e menos problemas com a barra de rolagem
    smoothTouch: true, // Adiciona suavidade nas interações por touch/arrasto
    autoRaf: false, // Desativamos o raf automático para controlar manualmente
  };

  useEffect(() => {
    // Função que será chamada em cada frame para atualizar o Lenis
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    // Inicia o loop de animação
    const frameId = requestAnimationFrame(raf);

    // Função de limpeza para quando o componente for desmontado
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} root options={options}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
