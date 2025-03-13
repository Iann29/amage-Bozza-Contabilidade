import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initSmoothScroll, scrollToSection as lenisScrollToSection } from '../lib/smoothScroll';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
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
  }, [scrolled]);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-gradient-to-r from-offwhite-pale/95 via-offwhite-warm/95 to-offwhite-pale/95 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo com animação */}
          <div className="flex-shrink-0 transform transition-all duration-300 hover:scale-105">
            <Link to="/" className="block">
              <img 
                src="/LOGOHEADER (2).png" 
                alt="Bozza Contabilidade" 
                className="h-16 w-auto transition-all duration-500 filter hover:brightness-110" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-12">
            {['inicio', 'servicos', 'sobre', 'contato'].map((section) => (
              <div key={section} className="relative">
                <button 
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === section 
                      ? "text-blue-600 font-semibold" 
                      : "text-blue-500 hover:text-blue-600"
                  } capitalize px-1 py-1`}
                >
                  {section === 'inicio' ? 'Início' : section}
                  
                  {/* Indicador de seção ativa */}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 transform origin-left transition-transform duration-300 ${
                    activeSection === section ? 'scale-x-100' : 'scale-x-0'
                  } group-hover:scale-x-100`}></span>
                </button>
              </div>
            ))}
          </div>
          
          {/* Call to Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contato')}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-7 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:from-blue-500 hover:to-blue-600 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 group"
            >
              {/* Efeito de ondulação no hover */}
              <span className="absolute inset-0 w-full h-full bg-blue-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              
              {/* Ícone de telefone */}
              <span className="flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Fale Conosco
              </span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-full bg-blue-50/80 text-blue-500 transition-all duration-300 hover:bg-blue-100/80 active:bg-blue-200/80"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gradient-to-b from-offwhite-pale/98 to-offwhite-warm/98 backdrop-blur-lg z-40 transition-all duration-500 transform ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } md:translate-x-full pt-24 px-4`}>
        <div className="flex flex-col space-y-6 items-center justify-center pt-8">
          {['inicio', 'servicos', 'sobre', 'contato'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`relative overflow-hidden text-xl font-medium transition-all duration-300 ${
                activeSection === section 
                  ? "text-blue-600 font-semibold" 
                  : "text-blue-500 hover:text-blue-600"
              } capitalize px-8 py-2`}
            >
              {/* Efeito de destaque no hover */}
              <span className="absolute inset-0 w-full h-full bg-blue-50 rounded-lg transform scale-x-0 scale-y-0 transition-transform duration-300 hover:scale-x-100 hover:scale-y-100"></span>
              <span className="relative z-10">{section === 'inicio' ? 'Início' : section}</span>
              
              {/* Indicador de seção ativa */}
              {activeSection === section && (
                <span className="absolute -bottom-1 left-1/2 w-10 h-0.5 bg-blue-500 transform -translate-x-1/2"></span>
              )}
            </button>
          ))}
          
          <button
            onClick={() => scrollToSection('contato')}
            className="mt-6 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 group"
          >
            {/* Efeito de ondulação no hover */}
            <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            
            <span className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Fale Conosco
            </span>
          </button>
          
          {/* Elementos decorativos do menu mobile */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-blue-100/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-50/40 rounded-full blur-xl"></div>
        </div>
      </div>
    </header>
  );
};

export default Header; 