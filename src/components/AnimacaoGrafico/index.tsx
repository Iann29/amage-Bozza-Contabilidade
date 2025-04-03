import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimacaoGrafico: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Estado para o deslocamento horizontal da seta
  const [deslocamentoX, setDeslocamentoX] = useState(-150);
  // Estado para controlar se o header deve estar visível
  const [dispatchedHeaderVisible, setDispatchedHeaderVisible] = useState(true);
  
  // Hook para detectar a largura da tela e ajustar o deslocamento
  useEffect(() => {
    // Função para atualizar o deslocamento com base no tamanho da tela
    const atualizarDeslocamento = () => {
      if (window.innerWidth >= 768) {
        setDeslocamentoX(-150); // Desktop
      } else {
        setDeslocamentoX(-100); // Mobile
      }
    };
    
    // Inicialização
    atualizarDeslocamento();
    
    // Adiciona listener para redimensionamento da janela
    window.addEventListener('resize', atualizarDeslocamento);
    
    // Limpeza
    return () => {
      window.removeEventListener('resize', atualizarDeslocamento);
    };
  }, []);
  
  // Configuração do scroll para animação
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.3", "end start"] // Ajustado para iniciar a animação quando o topo da seção estiver a 80% da tela
  });

  // Nova lógica usando on("change", ...) para reagir imediatamente ao scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => { 
      // Define se o header deve estar escondido baseado no progresso
      // Esconde se o progresso estiver entre 1% e 99% da animação
      const shouldBeHidden = progress > 0.01 && progress < 0.99;
      console.log(`[AnimacaoGrafico] Progress: ${progress.toFixed(2)}, ShouldHide: ${shouldBeHidden}, CurrentDispatchedState: ${dispatchedHeaderVisible}`); // LOG

      // Dispara o evento SOMENTE se o estado de visibilidade precisar mudar
      if (shouldBeHidden && dispatchedHeaderVisible) {
        console.log('[AnimacaoGrafico] Dispatching toggleHeader: false'); // LOG
        setDispatchedHeaderVisible(false);
        document.dispatchEvent(new CustomEvent('toggleHeader', { detail: { visible: false } }));
      } else if (!shouldBeHidden && !dispatchedHeaderVisible) {
        console.log('[AnimacaoGrafico] Dispatching toggleHeader: true'); // LOG
        setDispatchedHeaderVisible(true);
        document.dispatchEvent(new CustomEvent('toggleHeader', { detail: { visible: true } }));
      }
    });

    // Limpeza: cancelar a inscrição no onChange quando o componente desmontar
    return () => unsubscribe();
  }, [scrollYProgress, dispatchedHeaderVisible]); // Dependências: scrollYProgress e o estado de controle

  // Animação da seta inicial (descida), rotação/recuo (movimento para canto inferior esquerdo)
  const setaOpacity = useTransform(scrollYProgress,
    [0, 0.05, 0.1, 0.15, 0.3], // Manter opacidade até 0.3
    [0.3, 0.6, 0.8, 1, 1]    // Permanece 100% durante a rotação
  );
  
  // Adicionamos a animação de rotação
  const setaRotate = useTransform(scrollYProgress,
    [0, 1], // Do início ao fim
    [180, 180]    // Mantém rotação 180 graus (apontando para baixo)
  );

  // Ajustamos a escala para desaparecer APÓS a rotação
  const setaScale = useTransform(scrollYProgress,
    [0, 0.3, 0.4, 0.5], // Começa a diminuir em 0.3, termina em 0.5
    [1, 1, 1, 0]       // Mantém o tamanho durante a rotação/movimento
  );

  // Responsividade e movimento lateral para a posição X da seta
  const setaX = useTransform(scrollYProgress,
    [0, 0.2, 0.3], // Intervalo da animação
    [deslocamentoX, deslocamentoX, deslocamentoX] // Mantém a posição X constante
  );

  const deslocamentoVerticalInicial = -500;
  const setaYVertical = useTransform(
    scrollYProgress, 
    // Ajustado para atingir y=0 mais rápido (em progress 0.2)
    [0, 0.1, 0.2, 0.3, 0.5, 1], 
    [deslocamentoVerticalInicial - 300, deslocamentoVerticalInicial + 50, 0, -50, -100, -200] 
  );

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400vh] bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Container para centralizar conteúdo se necessário */}
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex flex-col items-center h-full relative">
            <div className="sticky top-20 flex flex-col items-center w-full h-[80vh]">
              <h2 className="text-3xl font-bold text-[#024570] mb-12 text-center">
                Veja sua empresa alcançar novos patamares
              </h2>
              
              <div className="w-full flex-1 flex items-center justify-center relative">
                {/* Container principal para os elementos do gráfico */}
                <div className="w-full h-full relative">
                  {/* Fase 1: Seta inicial animada */}
                  <motion.div
                    className="absolute left-[50%] top-0 z-10 transform -translate-x-1/2" // Restaurado left-[50%] e transform
                    style={{
                      x: setaX, // Aplicando deslocamento horizontal via transform 'x'
                      y: setaYVertical,
                      opacity: setaOpacity,
                      scale: setaScale,
                      rotate: setaRotate, // Mantendo a rotação
                    }}
                  >
                    <img 
                      src="/graph/seta-inicial.svg" 
                      alt="Seta Inicial" 
                      className="w-48 md:w-64 lg:w-80 h-auto"
                    />
                  </motion.div>
                  
                  {/* Mais componentes do gráfico serão adicionados nas próximas etapas */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimacaoGrafico;
