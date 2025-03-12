import { useEffect, useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, ChevronDown, Briefcase, Award, CheckCircle } from "lucide-react";
import { AnimationWrapper } from "./AnimationWrapper"; 
import { MovingBorderButton } from "./ui/moving-border-button";
import { HoverButton } from "./ui/hover-button";
import { useNavigate } from "react-router-dom";
import "./animations.css";

export function HeroGeometric() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const titles = useMemo(
    () => ["contabilidade", "consultoria", "assessoria", "planejamento", "sucesso"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Stats to display
  const stats = [
    { icon: <Briefcase className="w-5 h-5 text-gold-500" />, value: "3500+", label: "Empresas atendidas" },
    { icon: <Award className="w-5 h-5 text-gold-500" />, value: "15+", label: "Anos de experiência" },
    { icon: <CheckCircle className="w-5 h-5 text-gold-500" />, value: "98%", label: "Satisfação dos clientes" }
  ];

  return (
    <div ref={heroRef} className="w-full min-h-screen bg-gradient-to-b from-[#e8f5e9] via-offwhite-pale to-offwhite-soft relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        {/* Imagem de fundo com baixa opacidade */}
        <div className="absolute inset-0">
          <img 
            src="/LogoHero.png" 
            alt="" 
            className="absolute left-0 top-1/3 transform -translate-y-1/2 h-[500px] opacity-[0.07] object-contain"
            style={{ maxWidth: '70%' }}
          />
        </div>
        
        {/* Elementos decorativos sutis */}
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-blue-500 opacity-30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#e8f5e9] opacity-40 blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-gold-100 opacity-20 blur-3xl animate-pulse-slow animation-delay-1000"></div>
        
        {/* Letreiro Bozza com alta transparência */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full flex justify-center items-center overflow-hidden z-0">
          <img 
            src="/BozzaLetreiro.png" 
            alt="Bozza" 
            className="w-full object-cover opacity-[0.08] mix-blend-overlay"
          />
        </div>
        
        {/* Elementos gráficos de prestígio */}
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-gold-300/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-gold-300/10 rounded-full scale-125 animate-spin-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-10 w-40 h-40 border border-gold-300/20 rounded-full animate-spin-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-10 w-40 h-40 border border-gold-300/10 rounded-full scale-125 animate-spin-slow"></div>
        
        {/* Additional decorative elements */}
        <svg className="absolute top-20 left-1/4 w-16 h-16 text-blue-500 opacity-40 animate-float" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-40 right-1/4 w-20 h-20 text-[#e8f5e9] opacity-40 animate-float animation-delay-1000" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="10" fill="currentColor" />
        </svg>
        <svg className="absolute top-1/3 right-1/3 w-12 h-12 text-gold-100 opacity-30 animate-float animation-delay-2000" viewBox="0 0 60 60" fill="none">
          <polygon points="30,0 60,52 0,52" fill="currentColor" />
        </svg>
      </motion.div>
      
      <motion.div style={{ opacity }} className="w-full px-4 md:px-6 relative z-10">
        <div className="flex gap-8 py-28 lg:py-32 items-center justify-center flex-col max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-offwhite-warm shadow-xl shadow-blue-500/70 rounded-full px-6 py-2 border-b border-gold-300/30"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gap-4 bg-transparent text-blue-500 font-medium flex items-center"
            >
              Há mais de 50 anos no mercado <MoveRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
          
          <AnimationWrapper 
            delay={0.2}
            duration={0.8}
            className="flex gap-8 flex-col w-full"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto tracking-tight text-center font-regular">
              <span className="text-blue-500 font-semibold block mb-2">Soluções em</span>
              <span className="relative flex w-full items-center justify-center overflow-visible text-center md:pb-4 md:pt-1 h-[70px] md:h-[90px] lg:h-[100px]">
                <div className="relative w-[320px] md:w-[400px] lg:w-[480px] h-full flex items-center justify-center">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-bold bg-gradient-to-r from-[#36c03b] to-[#2aa020] bg-clip-text text-transparent drop-shadow-sm text-center w-full"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </div>
              </span>
            </h1>

            {/* Estatísticas impressionantes */}
            <AnimationWrapper 
              delay={0.4}
              duration={0.8}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto w-full mt-8"
            >
              {stats.map((stat, index) => (
                <MovingBorderButton
                  key={index}
                  as="div"
                  containerClassName="h-auto w-full"
                  borderClassName="bg-[radial-gradient(var(--tw-gradient-stops))] from-[#a7e9a5] via-blue-500 to-[#36c03b] opacity-70"
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-offwhite-pale/90 hover:bg-offwhite-warm transition-colors duration-200"
                  borderRadius="1rem"
                >
                  <div className="bg-blue-500 p-3 rounded-full mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold text-blue-500">{stat.value}</span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </MovingBorderButton>
              ))}
            </AnimationWrapper>
            
            {/* Indicadores de credibilidade - Removidos conforme solicitado */}
            
          </AnimationWrapper>
          
          <AnimationWrapper 
            delay={0.8}
            duration={0.8}
            className="flex justify-center mt-8"
          >
            <HoverButton 
              className="py-4 px-8 text-lg font-medium"
              color="#36c03b"
              onClick={() => navigate("/questionario")}
            >
              Solicite uma proposta exclusiva <MoveRight className="w-5 h-5 ml-2" />
            </HoverButton>
          </AnimationWrapper>
          
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 1.5 }
            }}
            onClick={scrollToNextSection}
          >
            <div className="p-2 rounded-full bg-offwhite-pale/90 backdrop-blur-sm shadow-md border border-gold-300/20">
              <ChevronDown className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
