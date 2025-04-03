import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, Variants } from 'framer-motion';

// Componente de efeito de digitação
const TypingEffect = ({ text, className, speed = 40, pauseFor = 2000 }: { 
  text: string, 
  className: string, 
  speed?: number,
  pauseFor?: number 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Se o texto atual está completo e não estamos deletando, espere um pouco
    if (displayText === text && !isDeleting && !isWaiting) {
      setIsWaiting(true);
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseFor);
      return () => clearTimeout(timer);
    }
    
    // Se estamos esperando, não faça nada
    if (isWaiting) return;
    
    // Se estamos deletando e não há mais texto, comece a digitar de novo
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      return;
    }
    
    // Determine o próximo texto a ser exibido
    const nextText = isDeleting 
      ? displayText.substring(0, displayText.length - 1)
      : text.substring(0, displayText.length + 1);
    
    // Configura o timer para atualizar o texto
    timer = setTimeout(() => {
      setDisplayText(nextText);
    }, isDeleting ? speed/2 : speed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isWaiting, text, speed, pauseFor]);
  
  return (
    <div className={className}>
      <span>{displayText}</span>
      
      {/* Linha animada abaixo da palavra */}
      <motion.div 
        className="h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-[#35c13e] to-[#024570]/50 rounded-full mt-1 sm:mt-2"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: "100%", 
          opacity: 1,
          transition: { duration: 0.4 }
        }}
      />
    </div>
  );
};

const Hero: React.FC = () => {
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Efeitos de parallax usando o progresso de rolagem
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  // Array de palavras para alternar
  const palavras = ["contabilidade", "consultoria", "assessoria", "planejamento"];
  const [palavraAtual, setPalavraAtual] = useState(0);

  useEffect(() => {
    // Iniciar animações quando o componente montar
    controls.start("visible");

    // Alternar as palavras a cada 6 segundos (tempo suficiente para o efeito de digitação)
    const interval = setInterval(() => {
      setPalavraAtual((atual) => (atual + 1) % palavras.length);
    }, 6000);

    // Cleanup ao desmontar
    return () => {
      clearInterval(interval);
    };
  }, [controls, palavras.length]);

  // Variantes de animação para elementos principais
  const mainTextVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.05
      }
    }
  };

  const tagVariants: Variants = {
    hidden: { y: -20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: 1.1
      }
    }
  };

  return (
    <motion.section
      ref={heroRef}
      id="inicio"
      style={{
        backgroundImage: "url('/imgs/back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
      className="relative w-full overflow-hidden"
      initial="hidden"
      animate={controls}
    >
      {/* Conteúdo principal com efeitos de escala e opacidade */}
      <motion.div 
        className="w-full h-full"
        style={{ 
          opacity, 
          scale,
          minHeight: "100vh"
        }}
      >
        {/* Padrão geométrico */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern" style={{
            backgroundImage: 'radial-gradient(#024570 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 md:py-32 flex flex-col justify-center items-center relative z-10" style={{ minHeight: "calc(100vh - 100px)" }}>
          {/* Conteúdo de texto */}
          <div className="w-full max-w-xl md:max-w-2xl text-center mb-2 md:mb-0 mt-6 md:mt-0">
            
            {/* Tag "Há mais de 50 anos no mercado" */}
            <motion.div
              className="inline-block px-3 py-1 mb-3 rounded-full bg-gradient-to-r from-[#024570] to-[#35c13e] text-white text-sm font-medium shadow-md"
              variants={tagVariants}
              initial="hidden"
              animate="visible"
            >
              Há mais de 50 anos no mercado
            </motion.div>
            
            {/* Título principal "Soluções em" */}
            <motion.h2 
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#024570] tracking-wide mb-0 sm:mb-2"
              variants={mainTextVariants}
              style={{ y: y1 }}
            >
              Soluções em
            </motion.h2>
            
            {/* Palavras que se alternam com animação de digitação */}
            <div className="h-20 sm:h-24 md:h-28 lg:h-32 relative overflow-hidden">
              <motion.div
                key={palavraAtual}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 right-0 text-center"
              >
                <TypingEffect
                  text={palavras[palavraAtual]}
                  className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#024570] to-[#35c13e] text-transparent bg-clip-text"
                  speed={60}
                  pauseFor={3000}
                />
              </motion.div>
            </div>
            
            {/* Botão "Solicite uma proposta exclusiva" */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.4,
                duration: 0.6,
                type: "spring",
                stiffness: 50
              }}
            >
              <motion.button
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#024570] to-[#35c13e] text-white font-medium shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(2, 69, 112, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#35c13e] to-[#024570] opacity-0 group-hover:opacity-100"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">Solicite uma proposta exclusiva</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Ondas decorativas que NÃO são afetadas pelos efeitos de scroll */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-20" style={{ height: "155px" }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 320" 
          className="absolute -bottom-1 w-full h-full"
        >
          <path 
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#024570"
            fillOpacity="0.25"
          />
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,240C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#024570"
            fillOpacity="1"
          />
          <path 
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#024570"
            fillOpacity="0.15"
          />
        </svg>
      </div>
    </motion.section>
  );
};

export default Hero;