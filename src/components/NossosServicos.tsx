import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { getLenis } from '../lib/smoothScroll';

const NossosServicos: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // Efeito para animar quando o componente estiver em visualização
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Efeito para registrar no Lenis para scroll suave
  useEffect(() => {
    const lenis = getLenis();
    if (lenis && sectionRef.current) {
      // Opcional: adicionar um callback para efeitos baseados em scroll
      const scrollCallback = ({ scroll }: { scroll: number }) => {
        // Você pode adicionar efeitos baseados em scroll aqui
      };
      
      lenis.on('scroll', scrollCallback);
      
      return () => {
        lenis.off('scroll', scrollCallback);
      };
    }
  }, []);

  // Variantes para animação de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12
      }
    }
  };

  return (
    <motion.section
      id="servicos"
      ref={sectionRef}
      className="relative bg-offwhite-pale pt-16 pb-24 overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Gradiente de conexão com as ondas do Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#024570]/10 to-transparent"></div>
      
      {/* Ondas decorativas na parte superior que se conectam com o Hero */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden transform rotate-180" style={{ height: "80px", zIndex: 5 }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 320" 
          className="absolute top-0 w-full h-full"
        >
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,240C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#024570"
            fillOpacity="0.05"
          />
          <path 
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#35c13e"
            fillOpacity="0.07"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Etiqueta "Nossos Serviços" */}
        <motion.div 
          className="inline-block bg-primary-light text-primary rounded-full px-4 py-1 mb-3"
          variants={itemVariants}
        >
          <span className="text-sm font-medium">Nossos Serviços</span>
        </motion.div>
        
        {/* Título e descrição */}
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4"
          variants={itemVariants}
        >
          Soluções Contábeis Completas
        </motion.h2>
        
        <motion.p 
          className="text-lg text-blue-700 max-w-3xl mb-12"
          variants={itemVariants}
        >
          Escolha os serviços que sua empresa precisa para crescer com segurança e conformidade fiscal sem preocupações.
        </motion.p>
        
        {/* Grade de serviços - os serviços podem ser personalizados conforme necessário */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Serviço 1 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Contabilidade Empresarial</h3>
            <p className="text-gray-600">Serviços contábeis completos para empresas de todos os portes, garantindo conformidade e organização fiscal.</p>
          </motion.div>
          
          {/* Serviço 2 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Consultoria Fiscal</h3>
            <p className="text-gray-600">Orientação especializada em impostos e obrigações fiscais para otimizar a carga tributária da sua empresa.</p>
          </motion.div>
          
          {/* Serviço 3 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Departamento Pessoal</h3>
            <p className="text-gray-600">Gestão completa de folha de pagamento, admissões, demissões e todas as rotinas trabalhistas.</p>
          </motion.div>
          
          {/* Serviço 4 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Abertura de Empresas</h3>
            <p className="text-gray-600">Assessoria completa na constituição de empresas, desde o registro até a obtenção de todas as licenças necessárias.</p>
          </motion.div>
          
          {/* Serviço 5 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Análise Financeira</h3>
            <p className="text-gray-600">Relatórios financeiros detalhados e análises para tomada de decisões estratégicas em seu negócio.</p>
          </motion.div>
          
          {/* Serviço 6 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-primary transition-all duration-300">Planejamento Tributário</h3>
            <p className="text-gray-600">Estratégias personalizadas para reduzir a carga tributária de forma legal e maximizar os resultados da sua empresa.</p>
          </motion.div>
        </div>
        
        {/* Botão de saiba mais ou contato */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Solicite uma Proposta
          </button>
        </motion.div>
      </div>
      
      {/* Elementos decorativos flutuantes */}
      <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
      
      {/* Ondas decorativas na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden" style={{ height: "120px" }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-full"
        >
          <path 
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#024570"
            fillOpacity="0.03"
          />
        </svg>
      </div>
    </motion.section>
  );
};

export default NossosServicos; 