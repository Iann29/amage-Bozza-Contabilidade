import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, Variants } from 'framer-motion';
import { getLenis } from '../lib/smoothScroll';

// Componente de contador animado
const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, inView]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

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

    // Adicionar um efeito de scroll para mostrar como o Lenis funciona
    const lenis = getLenis();
    
    // Cleanup ao desmontar
    return () => {
      clearInterval(interval);
      if (lenis) {
        // Cleanup para Lenis se necessário
      }
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
        delay: 0.3
      }
    }
  };

  // Variantes para estatísticas
  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        delay: 0.8 + (i * 0.2)
      }
    })
  };

  return (
    <motion.section
      ref={heroRef}
      id="inicio"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8f9fb] via-[#f1f9ff] to-[#e9f7ff]"
      style={{ minHeight: "100vh" }}
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#024570] tracking-wide mb-0 sm:mb-2"
              variants={mainTextVariants}
              style={{ y: y1 }}
            >
              Soluções em
            </motion.h2>
            
            {/* Palavras que se alternam com animação de digitação */}
            <div className="h-16 sm:h-24 md:h-28 lg:h-32 relative overflow-hidden">
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
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#024570] to-[#35c13e] text-transparent bg-clip-text"
                  speed={60}
                  pauseFor={3000}
                />
              </motion.div>
            </div>
            
            {/* Estatísticas animadas - Cards redesenhados e maiores */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 sm:mt-12 w-full max-w-4xl">
              <motion.div 
                className="flex-1 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border-t-4 border-[#024570] relative overflow-hidden group transition-all duration-300"
                variants={statsVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  boxShadow: "0 15px 30px -10px rgba(2, 69, 112, 0.2)",
                  borderColor: "#024570",
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#024570]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-[#024570]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#024570]/15 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#024570] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#024570] tracking-tight group-hover:scale-105 origin-center transition-transform duration-300">
                    <CountUp end={3500} duration={3} suffix="+" />
                  </div>
                  <div className="text-base sm:text-lg text-gray-600 mt-2 font-medium">empresas atendidas</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border-t-4 border-[#35c13e] relative overflow-hidden group transition-all duration-300"
                variants={statsVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  boxShadow: "0 15px 30px -10px rgba(53, 193, 62, 0.2)",
                  borderColor: "#35c13e",
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#35c13e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-[#35c13e]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#35c13e]/15 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#35c13e] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-[#35c13e] tracking-tight group-hover:scale-105 origin-center transition-transform duration-300">
                    <CountUp end={15} duration={3} suffix="+" />
                  </div>
                  <div className="text-base sm:text-lg text-gray-600 mt-2 font-medium">anos de experiência</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border-t-4 border-gradient-to-r from-[#024570] to-[#35c13e] relative overflow-hidden group transition-all duration-300"
                variants={statsVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  boxShadow: "0 15px 30px -10px rgba(2, 69, 112, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#024570]/5 via-[#35c13e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#024570]/10 to-[#35c13e]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:from-[#024570]/15 group-hover:to-[#35c13e]/15 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#024570] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#024570] to-[#35c13e] text-transparent bg-clip-text tracking-tight group-hover:scale-105 origin-center transition-transform duration-300">
                    <CountUp end={98} duration={3} suffix="%" />
                  </div>
                  <div className="text-base sm:text-lg text-gray-600 mt-2 font-medium">de satisfação dos clientes</div>
                </div>
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