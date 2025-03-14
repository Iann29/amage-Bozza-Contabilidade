import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { getLenis } from '../lib/smoothScroll';

const NossosServicos: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Efeito para animar quando o componente estiver em visualização
  useEffect(() => {
    // Iniciar animações imediatamente, sem esperar pelo scroll
    controls.start('visible');
  }, [controls]);

  // Efeito para registrar no Lenis para scroll suave
  useEffect(() => {
    // Removido o código de pré-carregamento condicional para que o componente apareça imediatamente
    const lenis = getLenis();
    return () => {
      // Cleanup se necessário
    };
  }, []);

  // Variantes para animação
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: i * 0.1
      }
    }),
    hover: {
      y: -12,
      scale: 1.03,
      boxShadow: "0 20px 30px rgba(3, 70, 110, 0.13)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 15px 25px rgba(3, 70, 110, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const iconContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const decorativeCircleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 0.8,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.2 + (i * 0.2)
      }
    }),
    float: (i) => ({
      y: [0, i % 2 === 0 ? -15 : -10, 0],
      x: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 5 + (i % 3),
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    })
  };

  // Dados dos serviços
  const services = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Contabilidade Empresarial",
      description: "Serviços contábeis completos para empresas de todos os portes, garantindo conformidade e organização fiscal.",
      color: "#03466e",
      bgColor: "from-[#03466e] to-[#0961a3]",
      iconBgColor: "#cfe7ff",
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Consultoria Fiscal",
      description: "Orientação especializada em impostos e obrigações fiscais para otimizar a carga tributária da sua empresa.",
      color: "#36c03b",
      bgColor: "from-[#36c03b] to-[#25872a]",
      iconBgColor: "#e3f9e4",
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Departamento Pessoal",
      description: "Gestão completa de folha de pagamento, admissões, demissões e todas as rotinas trabalhistas.",
      color: "#03466e",
      bgColor: "from-[#03466e] to-[#0961a3]",
      iconBgColor: "#cfe7ff",
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Abertura de Empresas",
      description: "Assessoria completa na constituição de empresas, desde o registro até a obtenção de todas as licenças necessárias.",
      color: "#36c03b",
      bgColor: "from-[#36c03b] to-[#25872a]",
      iconBgColor: "#e3f9e4",
    },
    {
      id: 5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: "Análise Financeira",
      description: "Relatórios financeiros detalhados e análises para tomada de decisões estratégicas em seu negócio.",
      color: "#03466e",
      bgColor: "from-[#03466e] to-[#0961a3]",
      iconBgColor: "#cfe7ff",
    },
    {
      id: 6,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Planejamento Tributário",
      description: "Estratégias personalizadas para reduzir a carga tributária de forma legal e maximizar os resultados da sua empresa.",
      color: "#36c03b",
      bgColor: "from-[#36c03b] to-[#25872a]",
      iconBgColor: "#e3f9e4",
    },
  ];

  return (
    <motion.section
      id="servicos"
      ref={sectionRef}
      className="relative py-24 overflow-hidden -mt-1"
      initial="visible"
      animate={controls}
      variants={containerVariants}
    >
      {/* Background com a nova cor sólida */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03466d] to-[#033152] z-0"></div>
      
      {/* Elemento de ponte para eliminar qualquer linha branca */}
      <div className="absolute top-0 -translate-y-[2px] left-0 right-0 h-4 bg-[#03466d] z-10"></div>
      
      {/* Wavey connector do Hero para esta seção */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden translate-y-[-105%]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 sm:h-24 md:h-28"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#03466e"
            opacity="0.1"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="#36c03b"
            opacity="0.075"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#03466e"
            opacity="0.05"
          ></path>
        </svg>
      </div>

      {/* Elementos decorativos circulares animados */}
      <motion.div 
        className="absolute top-32 right-[5%] w-64 h-64 rounded-full bg-[#03466e] opacity-[0.03] blur-3xl"
        variants={decorativeCircleVariants}
        custom={1}
        initial="hidden"
        animate={["visible", "float"]}
      />
      <motion.div 
        className="absolute bottom-40 left-[5%] w-80 h-80 rounded-full bg-[#03466e] opacity-[0.05] blur-3xl"
        variants={decorativeCircleVariants}
        custom={2}
        initial="hidden"
        animate={["visible", "float"]}
      />
      <motion.div 
        className="absolute top-40 left-[15%] w-40 h-40 rounded-full bg-[#03466e] opacity-[0.04] blur-2xl"
        variants={decorativeCircleVariants}
        custom={3}
        initial="hidden"
        animate={["visible", "float"]}
      />
      <motion.div 
        className="absolute bottom-32 right-[15%] w-56 h-56 rounded-full bg-[#03466e] opacity-[0.03] blur-2xl"
        variants={decorativeCircleVariants}
        custom={4}
        initial="hidden"
        animate={["visible", "float"]}
      />

      {/* Pattern de grid sutil */}
      <div className="absolute inset-0 opacity-[0.02] z-0">
        <div className="h-full w-full" style={{
          backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#36c03b 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
              variants={titleVariants}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-semibold tracking-wider uppercase">
                Nossos Serviços
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 text-white"
              variants={titleVariants}
            >
              Soluções Contábeis Completas
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/80 max-w-3xl mx-auto"
              variants={titleVariants}
            >
              Escolha os serviços que sua empresa precisa para crescer com segurança e conformidade fiscal sem preocupações.
            </motion.p>
          </div>
        </div>
        
        {/* Grid de serviços com cards modernos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="relative overflow-hidden group"
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Card com gradiente de background */}
              <div className="relative h-full rounded-3xl overflow-hidden flex flex-col">
                {/* Topo do card com gradiente */}
                <div className={`bg-gradient-to-br ${service.bgColor} p-8 pb-10 rounded-t-3xl`}>
                  {/* Círculos decorativos no background */}
                  <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/4 right-0 w-16 h-16 rounded-full bg-white/5 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    {/* Icon container com fundo claro */}
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center`}
                      style={{ backgroundColor: service.iconBgColor, color: service.color }}
                      variants={iconContainerVariants}
                      whileHover="hover"
                    >
                      {service.icon}
                    </motion.div>
                    
                    {/* Título sobre fundo escuro */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                {/* Parte inferior do card com fundo branco */}
                <div className="bg-white p-8 pt-6 rounded-b-3xl shadow-lg flex-grow flex flex-col justify-between">
                  {/* Descrição */}
                  <p className="text-[#03466e]/80 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Botão "Saiba mais" */}
                  <div className="mt-auto">
                    <button 
                      className={`text-sm font-medium py-2.5 px-5 rounded-full bg-gradient-to-r ${service.bgColor} text-white flex items-center justify-center overflow-hidden relative group-hover:shadow-lg transition-all duration-300`}
                    >
                      {/* Efeito de brilho no hover */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
                      
                      <span className="mr-2">Saiba mais</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action button */}
        <motion.div
          className="mt-16 text-center"
          variants={titleVariants}
        >
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-r from-[#36c03b] to-[#1d8f12] text-white font-semibold rounded-full shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 30px rgba(54, 192, 59, 0.3)",
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated light effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
            
            <span className="flex items-center">
              <span>Solicite uma Proposta Personalizada</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NossosServicos;