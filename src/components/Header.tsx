import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { useLenis } from 'lenis/react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [headerVisivel, setHeaderVisivel] = useState(true);
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

  // Acesso à instância do Lenis usando o hook do lenis-react
  const lenis = useLenis();
  
  // Hook para ouvir o evento personalizado que controla a visibilidade do header
  useEffect(() => {
    const toggleHeaderVisibility = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('[Header] Received toggleHeader event:', customEvent.detail); // LOG
      if (customEvent.detail && typeof customEvent.detail.visible === 'boolean') {
        console.log(`[Header] Setting headerVisivel to: ${customEvent.detail.visible}`); // LOG
        setHeaderVisivel(customEvent.detail.visible);
      }
    };
    
    // Adiciona o listener para o evento personalizado
    document.addEventListener('toggleHeader', toggleHeaderVisibility);
    
    // Limpeza
    return () => {
      document.removeEventListener('toggleHeader', toggleHeaderVisibility);
    };
  }, []); // O listener do evento não precisa de dependências

  // Novo useEffect para controlar a animação baseada em headerVisivel
  useEffect(() => {
    if (headerVisivel) {
      console.log("[Header] Starting 'visible' animation"); // LOG
      controls.start("visible");
    } else {
      console.log("[Header] Starting 'hidden' animation"); // LOG
      // Usamos uma variante "instantHidden" para sumir sem animar o Y
      // Diminuindo a duração para 0.1s
      controls.start({ opacity: 0, y: 0, transition: { duration: 0.1 } }); 
    }
  }, [headerVisivel, controls]); // Reage à mudança de headerVisivel

  useEffect(() => {
    // Animação inicial ao carregar a página - REMOVIDO DAQUI, controlado pelo useEffect acima
    // controls.start('visible'); 
    
    const handleScroll = () => {
      // Lógica para detectar se a página foi rolada
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Apenas detecta a seção ativa se o menu móvel não estiver aberto
      if (!isMenuOpen) {
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, controls, isMenuOpen]);

  // Efeito específico para controlar o Lenis quando o menu está aberto/fechado
  useEffect(() => {
    if (isMenuOpen) {
      // Pausa o Lenis quando o menu está aberto
      lenis?.stop();
      // Previne scrolling quando o menu está aberto
      document.body.style.overflow = 'hidden';
    } else {
      // Retoma o Lenis quando o menu está fechado
      lenis?.start();
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      // Garante que o Lenis seja retomado se o componente for desmontado
      lenis?.start();
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função que rola suavemente para a seção desejada
  const scrollToSection = (sectionId: string) => {
    // Fecha o menu móvel se estiver aberto
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Usa a instância do Lenis para rolar até a seção desejada
    const targetElement = document.getElementById(sectionId);
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, { offset: 50 });
    }
    
    // Atualiza a seção ativa
    setActiveSection(sectionId);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-24">
          {/* Logo no canto esquerdo */}
          <motion.div 
            className="flex-shrink-0"
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
                  className="h-16 w-auto filter drop-shadow-lg" 
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Navegação centralizada */}
          <div className="hidden md:flex items-center justify-center space-x-8">
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
                  className={`text-base font-medium px-1 py-1 ${
                    activeSection === section 
                      ? "text-blue-600 font-semibold" 
                      : "text-blue-500"
                  } capitalize font-poppins tracking-wide`}
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
          
          {/* Call to Action Button à direita com animação avançada */}
          <div className="flex items-center justify-end">
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
            
            {/* Mobile Menu Button */}
            {!isMenuOpen && (
              <motion.div 
                className="md:hidden ml-4 fixed top-6 right-6 z-[90]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.5,
                  type: 'spring', 
                  stiffness: 200 
                }}
                style={{ zIndex: 90 }}
              >
                <motion.button
                  className="p-2 rounded-full bg-blue-50/80 text-blue-500 shadow-md"
                  onClick={toggleMenu}
                  aria-label="Abrir menu"
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
                        rotate: 0,
                        translateY: -6,
                        transition: { duration: 0.3 }
                      }}
                    />
                    <motion.span 
                      className="absolute w-full h-0.5 bg-current"
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.3 }
                      }}
                    />
                    <motion.span 
                      className="absolute w-full h-0.5 bg-current"
                      animate={{
                        rotate: 0,
                        translateY: 6,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </div>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu com Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-b from-offwhite-pale/98 via-offwhite-warm/98 to-offwhite-pale/98 backdrop-blur-lg z-[100] pt-24 px-4 overflow-auto"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              height: '100vh',
              width: '100vw',
              maxHeight: '100vh',
              overflowY: 'auto'
            }}
          >
            {/* Botão X explícito no menu móvel para melhor visibilidade */}
            <motion.button
              className="absolute top-6 right-6 p-3 rounded-full bg-white text-blue-500 shadow-lg z-[101]"
              onClick={toggleMenu}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200
                }
              }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'rgba(255, 255, 255, 0.95)' 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <div className="flex flex-col space-y-6 items-center justify-center pt-8 min-h-[70vh]">
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