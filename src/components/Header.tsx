import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { initSmoothScroll, scrollToSection as lenisScrollToSection } from '../lib/smoothScroll';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const controls = useAnimation();

  // Variantes de animação para elementos do header
  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        delay: 0.2
      }
    }
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 200, 
        delay: 0.4 
      }
    }
  };

  const navItemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        delay: 0.6 + (i * 0.1) 
      }
    })
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 200,
        delay: 1.0
      }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { 
      x: '100%', 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 20 
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  useEffect(() => {
    // Animação inicial ao carregar a página
    controls.start('visible');
    
    // Inicializa o Lenis para rolagem suave
    const lenis = initSmoothScroll();
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determinar a seção ativa com base na posição de rolagem
      const sections = ['inicio', 'servicos', 'sobre', 'contato'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, controls]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Previne scrolling quando o menu está aberto
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Usa a função Lenis para rolagem suave
    lenisScrollToSection(sectionId, 100);
    setActiveSection(sectionId);
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-offwhite-pale/95 via-offwhite-warm/95 to-offwhite-pale/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
      variants={headerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-24">
          {/* Navegação à esquerda */}
          <div className="hidden md:flex items-center justify-start space-x-8">
            {['inicio', 'servicos', 'sobre', 'contato'].map((section, index) => (
              <motion.div 
                key={section} 
                className="relative"
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate={controls}
              >
                <motion.button 
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium px-1 py-1 ${
                    activeSection === section 
                      ? "text-blue-600 font-semibold" 
                      : "text-blue-500"
                  } capitalize`}
                  whileHover={{ 
                    scale: 1.05, 
                    color: '#2563EB', 
                    transition: { type: 'spring', stiffness: 400 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section === 'inicio' ? 'Início' : section}
                  
                  {/* Indicador de seção ativa animado */}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection === section ? '100%' : 0,
                      transition: { duration: 0.3, ease: 'easeInOut' }
                    }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>
          
          {/* Logo no centro com animação avançada */}
          <motion.div 
            className="flex items-center justify-center"
            variants={logoVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="w-auto inline-block"
              whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
            >
              <Link to="/" className="block">
                <img 
                  src="/LOGOHEADER (2).png" 
                  alt="Bozza Contabilidade" 
                  className="h-16 w-auto filter drop-shadow-md" 
                />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Call to Action Button à direita com animação avançada */}
          <div className="flex justify-end">
            <motion.div 
              className="hidden md:block"
              variants={buttonVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.button
                onClick={() => scrollToSection('contato')}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-7 rounded-full shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Efeito de ondulação avançado no hover */}
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-white/20"
                  initial={{ scale: 0, x: '-100%' }}
                  whileHover={{ 
                    scale: 1, 
                    x: '100%',
                    transition: { 
                      repeat: Infinity, 
                      repeatType: 'loop', 
                      duration: 1 
                    } 
                  }}
                />
                
                {/* Ícone de telefone animado */}
                <span className="flex items-center gap-2 relative z-10">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </motion.svg>
                  Fale Conosco
                </span>
              </motion.button>
            </motion.div>
            
            {/* Mobile Menu Button com animação */}
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1,
                type: 'spring', 
                stiffness: 200 
              }}
            >
              <motion.button
                className="p-2 rounded-full bg-blue-50/80 text-blue-500"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'rgba(219, 234, 254, 0.9)' 
                }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-6 relative flex items-center justify-center">
                  <motion.span 
                    className="absolute w-full h-0.5 bg-current"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      translateY: isMenuOpen ? 0 : -6,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <motion.span 
                    className="absolute w-full h-0.5 bg-current"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <motion.span 
                    className="absolute w-full h-0.5 bg-current"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      translateY: isMenuOpen ? 0 : 6,
                      transition: { duration: 0.3 }
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu com Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-b from-offwhite-pale/98 via-offwhite-warm/98 to-offwhite-pale/98 backdrop-blur-lg z-40 pt-24 px-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col space-y-6 items-center justify-center pt-8">
              {['inicio', 'servicos', 'sobre', 'contato'].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative overflow-hidden text-xl font-medium ${
                    activeSection === section 
                      ? "text-blue-600 font-semibold" 
                      : "text-blue-500"
                  } capitalize px-8 py-2`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.3 + (index * 0.1),
                      type: 'spring',
                      stiffness: 100
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20,
                    transition: { 
                      delay: 0.1 * (4 - index),
                      duration: 0.3
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: '#2563EB',
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background animado no hover */}
                  <motion.span 
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: 1,
                      transition: { type: 'spring', stiffness: 400 }
                    }}
                  />
                  
                  <span className="relative z-10">{section === 'inicio' ? 'Início' : section}</span>
                  
                  {/* Indicador de seção ativa animado */}
                  {activeSection === section && (
                    <motion.span 
                      className="absolute -bottom-1 left-1/2 w-10 h-0.5 bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: '40px',
                        x: '-50%',
                        transition: { duration: 0.3 }
                      }}
                    />
                  )}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => scrollToSection('contato')}
                className="mt-6 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.8,
                    type: 'spring',
                    stiffness: 200
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  transition: { type: 'spring', stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Efeito de ondulação avançado no hover */}
                <motion.span 
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ 
                    x: '100%',
                    transition: { 
                      repeat: Infinity, 
                      repeatType: 'loop', 
                      duration: 1 
                    } 
                  }}
                />
                
                <span className="flex items-center gap-2 relative z-10">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    animate={{ 
                      rotate: [0, 15, 0],
                      transition: { 
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1.5
                      }
                    }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </motion.svg>
                  Fale Conosco
                </span>
              </motion.button>
              
              {/* Elementos decorativos animados */}
              <motion.div 
                className="absolute top-20 right-10 w-24 h-24 bg-blue-100/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  transition: { 
                    repeat: Infinity,
                    duration: 4
                  }
                }}
              />
              <motion.div 
                className="absolute bottom-20 left-10 w-32 h-32 bg-blue-50/40 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                  transition: { 
                    repeat: Infinity,
                    duration: 5,
                    delay: 1
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;