// src/components/SectionComAnimacao.tsx
import React, { useRef, useEffect, useState } from 'react';
import AnimacaoComponente, { AnimacaoComponenteRef } from './AnimacaoComponente';
import ConteudoTeste from './ConteudoTeste';

const SectionComAnimacao: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animacaoRef = useRef<AnimacaoComponenteRef>(null);
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 });

  // Calcula a posição de início e fim da seção para mapear o progresso
  useEffect(() => {
    if (sectionRef.current) {
      const start = sectionRef.current.offsetTop;
      const end = start + sectionRef.current.offsetHeight - window.innerHeight;
      setScrollRange({ start, end });
      
      // Log para debug
      console.log('Seção de animação:', { 
        offsetTop: sectionRef.current.offsetTop,
        height: sectionRef.current.offsetHeight
      });
    }
  }, []);

  // Já não precisamos dos trigger points, pois o header agora verifica diretamente

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const { start, end } = scrollRange;
      
      // Calcula o progresso (0 a 1) dentro da seção
      let progress = (scrollY - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);
      
      // Atualiza a animação com base no progresso
      animacaoRef.current?.setAnimationProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    // Função específica para controlar a visibilidade do header
    const controlHeader = () => {
      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop || 0;
      const viewportHeight = window.innerHeight;
      
      // Considera dentro da seção se estiver entre o início e o fim da seção
      const isInSection = scrollY > (sectionTop - viewportHeight/2) && 
                          scrollY < (sectionTop + 800);
      
      // Log para debug
      console.log(`Scroll: ${scrollY}, isInSection: ${isInSection}`);
      
      // Dispara evento para controlar o header
      document.dispatchEvent(new CustomEvent('toggleHeader', { 
        detail: { visible: !isInSection } 
      }));
    };
    
    // Adiciona o listener para este controlador específico
    window.addEventListener('scroll', controlHeader);
    
    // Executa imediatamente
    controlHeader();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', controlHeader);
      // Garante que o Header esteja visível quando o componente for desmontado
      document.dispatchEvent(new CustomEvent('toggleHeader', { detail: { visible: true } }));
    };
  }, [scrollRange]);

  // O controle de visibilidade do header agora é feito diretamente no componente Header

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[200vh] flex flex-col items-center"
      id="animacao-section"
    >
      {/* Já não precisamos dos trigger points, pois o header agora verifica diretamente */}
      <AnimacaoComponente ref={animacaoRef} />
      
      {/* Componente de conteúdo de teste abaixo da animação */}
      <div className="w-full mt-[100vh]">
        <ConteudoTeste />
      </div>
    </section>
  );
};

export default SectionComAnimacao;
