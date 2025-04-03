import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimacaoGrafico: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Estado para controlar se o header deve estar visível
  const [dispatchedHeaderVisible, setDispatchedHeaderVisible] = useState(true);
  
  // Hook para detectar a largura da tela e ajustar o deslocamento
  useEffect(() => {
    // Função para atualizar o deslocamento com base no tamanho da tela
    const atualizarDeslocamento = () => {
      if (window.innerWidth >= 768) {
        // setDeslocamentoX(-150); // Desktop
      } else {
        // setDeslocamentoX(-100); // Mobile
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
      if (shouldBeHidden && dispatchedHeaderVisible) { // Se deve esconder E AINDA está marcado como visível
        console.log('[AnimacaoGrafico] Dispatching toggleHeader: false'); // LOG
        setDispatchedHeaderVisible(false);
        document.dispatchEvent(new CustomEvent('toggleHeader', { detail: { visible: false } }));
      } else if (!shouldBeHidden && !dispatchedHeaderVisible) { // Se deve mostrar E AINDA está marcado como invisível
        console.log('[AnimacaoGrafico] Dispatching toggleHeader: true'); // LOG
        setDispatchedHeaderVisible(true);
        document.dispatchEvent(new CustomEvent('toggleHeader', { detail: { visible: true } }));
      }
    });

    // Limpeza: cancelar a inscrição no onChange quando o componente desmontar
    return () => unsubscribe();
  }, [scrollYProgress, dispatchedHeaderVisible]); // Dependências: scrollYProgress e o estado de controle

  // Transformação para Y da seta
  const ySeta = useTransform(
    scrollYProgress, 
    [0, 0.2, 1], // Pontos chave para Y
    [-1200, 0, -200] // Começa EXTREMAMENTE acima (-1200px), atinge o centro (0), termina acima (-200px)
  );

  // Transformação para X da seta (Direita para Esquerda)
  const xSeta = useTransform(
    scrollYProgress,
    [0, 0.2, 1], // Pontos chave para o movimento X
    [800, 0, -800] // Começa EXTREMAMENTE à direita (800px), passa pelo centro, termina EXTREMAMENTE à esquerda (-800px)
  );

  // Rotação da seta - Ajustada para apontar diagonalmente
  const rotateSeta = 225; // 180 (baixo) + 45 (esquerda) = 225

  // Texto do título - Dividido em duas linhas
  const titleLine1 = "Veja sua empresa";
  const titleChars1 = titleLine1.split("");
  const titleLine2 = "alcançar novos patamares";
  const titleChars2 = titleLine2.split("");

  // Controles de animação para o título
  const titleControls = useAnimation();

  // Variantes para o container do título (h2)
  const containerVariants = {
    hidden: { opacity: 1 }, // Container sempre visível
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, // Retornado para 0.04 para desacelerar
      },
    },
  };

  // Variantes para cada letra (span)
  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      color: "#36C03B" // Cor inicial (verde da marca)
    },
    visible: {
      opacity: 1,
      y: 0,
      color: "#024570", // Cor final (azul da marca)
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Inicia a animação do título quando o scroll começa
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.01) { // Começa um pouco depois do início do scroll na seção
        titleControls.start("visible");
        unsubscribe(); // Anima só uma vez
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, titleControls]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative h-[400vh] bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Container para centralizar conteúdo se necessário */}
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex flex-col items-center h-full relative">
            <div className="sticky top-20 flex flex-col items-center w-full h-[80vh]">
              {/* Título Linha 1 - Tamanho intermediário para mobile */}
              <h2 className="text-[1.7rem] sm:text-4xl md:text-5xl font-mono font-semibold text-[#024570] text-center tracking-tight mb-2 leading-tight"> {/* Mobile: ~2.7xl, added leading-tight */}
                <motion.span
                  aria-label={titleLine1}
                  variants={containerVariants}
                  initial="hidden"
                  animate={titleControls}
                  style={{ display: 'inline-block' }} 
                >
                  {titleChars1.map((char, index) => (
                    <motion.span key={index} variants={childVariants} style={{ display: 'inline-block' }}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </h2>
              {/* Título Linha 2 - Tamanho intermediário para mobile */}
              <h2 className="text-[1.7rem] sm:text-4xl md:text-5xl font-mono font-semibold text-[#024570] text-center tracking-tight mb-12 leading-tight"> {/* Mobile: ~2.7xl, added leading-tight */}
                <motion.span
                  aria-label={titleLine2}
                  variants={containerVariants}
                  initial="hidden"
                  animate={titleControls}
                  style={{ display: 'inline-block' }} 
                >
                  {titleChars2.map((char, index) => (
                    <motion.span key={index} variants={childVariants} style={{ display: 'inline-block' }}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </h2>

              <div className="w-full flex-1 flex items-center justify-center relative z-20">
                {/* Container principal para os elementos do gráfico */}
                <div className="w-full h-full relative">
                  {/* Fase 1: Seta inicial animada - Aumentado z-index */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 z-50"
                    style={{
                      translateY: ySeta, // Movimento Vertical
                      translateX: xSeta, // Movimento Horizontal (NOVO)
                      rotate: rotateSeta, // Rotação ajustada
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
    </motion.section>
  );
};

export default AnimacaoGrafico;
