import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { getLenis } from '../lib/smoothScroll';
import SplineViewer from './SplineViewer';

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

const Hero: React.FC = () => {
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Efeitos de parallax usando o progresso de rolagem
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  
  // Menor variação para as ondas
  const waveScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.9]);

  // Array de palavras para alternar
  const palavras = ["contabilidade", "consultoria", "assessoria", "planejamento"];
  const [palavraAtual, setPalavraAtual] = useState(0);

  useEffect(() => {
    // Iniciar animações quando o componente montar
    controls.start("visible");

    // Alternar as palavras a cada 3 segundos
    const interval = setInterval(() => {
      setPalavraAtual((atual) => (atual + 1) % palavras.length);
    }, 3000);

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

  const alternatingTextVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.7
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Animações para formas decorativas
  const shapeVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -15 },
    visible: (i) => ({
      opacity: 0.9,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        delay: 0.3 + (i * 0.1)
      }
    }),
    floating: (i) => ({
      y: [0, -10, 0],
      rotate: [0, i % 2 === 0 ? 2 : -2, 0],
      transition: {
        duration: 4 + (i % 3),
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
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
        {/* Formas decorativas que flutuam */}
        <motion.div 
          className="absolute right-[15%] top-[20%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#35c13e]/20 blur-2xl"
          variants={shapeVariants}
          custom={1}
          initial="hidden"
          animate={["visible", "floating"]}
        />
        <motion.div 
          className="absolute left-[10%] bottom-[25%] w-36 h-36 md:w-48 md:h-48 rounded-full bg-[#024570]/15 blur-xl"
          variants={shapeVariants}
          custom={2}
          initial="hidden"
          animate={["visible", "floating"]}
        />
        <motion.div 
          className="absolute left-[25%] top-[12%] w-20 h-20 rounded-full bg-[#35c13e]/10 blur-lg"
          variants={shapeVariants}
          custom={3}
          initial="hidden"
          animate={["visible", "floating"]}
        />
        <motion.div 
          className="absolute right-[30%] bottom-[15%] w-28 h-28 rounded-full bg-blue-400/10 blur-lg"
          variants={shapeVariants}
          custom={4}
          initial="hidden"
          animate={["visible", "floating"]}
        />

        {/* Padrão geométrico */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern" style={{
            backgroundImage: 'radial-gradient(#024570 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 sm:px-6 pt-28 pb-20 md:py-32 flex flex-col md:flex-row justify-between items-center relative z-10" style={{ minHeight: "calc(100vh - 100px)" }}>
          {/* Conteúdo de texto */}
          <div className="w-full max-w-xl md:max-w-2xl md:flex-1 text-center md:text-left mb-2 md:mb-0 mt-6 md:mt-0">
            
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
            
            {/* Palavras que se alternam com animação */}
            <div className="h-16 sm:h-24 md:h-28 lg:h-32 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={palavraAtual}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#024570] to-[#35c13e] text-transparent bg-clip-text absolute left-0 right-0 text-center md:text-left"
                  variants={alternatingTextVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {palavras[palavraAtual]}
                  
                  {/* Linha animada abaixo da palavra */}
                  <motion.div 
                    className="h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-[#35c13e] to-[#024570]/50 rounded-full mt-1 sm:mt-2"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: "100%", 
                      opacity: 1,
                      transition: { delay: 0.2, duration: 0.8 }
                    }}
                    exit={{ 
                      width: 0, 
                      opacity: 0,
                      transition: { duration: 0.4 }
                    }}
                  />
                </motion.h1>
              </AnimatePresence>
            </div>
            
            {/* Estatísticas animadas */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 sm:mt-8">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border-l-4 border-[#024570] relative overflow-hidden"
                variants={statsVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 8px 20px -5px rgba(2, 69, 112, 0.3)"
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#024570]/10 to-transparent"
                  initial={{ opacity: 0, x: "-100%" }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="text-xl sm:text-2xl font-bold text-[#024570]">
                    <CountUp end={3500} duration={3} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600">empresas atendidas</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border-l-4 border-[#35c13e] relative overflow-hidden"
                variants={statsVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 8px 20px -5px rgba(53, 193, 62, 0.3)"
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#35c13e]/10 to-transparent" 
                  initial={{ opacity: 0, x: "-100%" }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="text-xl sm:text-2xl font-bold text-[#35c13e]">
                    <CountUp end={15} duration={3} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-600">anos de experiência</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border-l-4 border-[#024570] relative overflow-hidden"
                variants={statsVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 8px 20px -5px rgba(2, 69, 112, 0.3)"
                }}
                transition={{ duration: 0.1 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#024570]/10 via-[#35c13e]/10 to-transparent" 
                  initial={{ opacity: 0, x: "-100%" }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#024570] to-[#35c13e] text-transparent bg-clip-text">
                    <CountUp end={98} duration={3} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-600">de satisfação dos clientes</div>
                </div>
              </motion.div>
            </div>
            
            {/* Botão "Solicite uma proposta exclusiva" */}
            <motion.div
              className="mt-8 text-center md:text-left"
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

          {/* Modelo 3D Spline */}
          <motion.div
            className="w-[90%] sm:w-[80%] md:w-[45%] lg:w-[40%] h-[380px] sm:h-[380px] md:h-[450px] lg:h-[500px] relative mx-auto md:mx-0 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              delay: 1.2, 
              duration: 1,
              type: "spring",
              stiffness: 50
            }}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Efeito de brilho atrás do modelo 3D */}
            <div className="absolute inset-0 bg-gradient-radial from-[#35c13e]/10 via-transparent to-transparent rounded-full blur-2xl transform scale-110 -z-10"></div>
            
            {/* Container do modelo 3D com reflexo */}
            <div className="w-full h-full relative">
              <SplineViewer 
                url="https://prod.spline.design/VsEIjTj5rS3fq5DF/scene.splinecode" 
                className="w-full h-full z-10"
              />
              
              {/* Reflexo sutil */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#024570]/5 to-transparent blur-sm -z-10 transform scale-y-[-0.5] opacity-40"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Ondas decorativas que NÃO são afetadas pelos efeitos de scroll */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-20" style={{ height: "150px" }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-full"
        >
          <path 
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#024570"
            fillOpacity="0.25"
          />
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,240C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#35c13e"
            fillOpacity="0.2"
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