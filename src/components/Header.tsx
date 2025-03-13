import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-offwhite-pale/95 backdrop-blur-md shadow-md" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/LOGOHEADER (2).png" alt="Bozza Contabilidade" className="h-16 w-auto" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-10">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Contato
            </button>
          </div>
          
          {/* Call to Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors duration-300"
            >
              Fale Conosco
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-blue-500"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-offwhite-pale z-40 pt-24 px-4">
          <div className="flex flex-col space-y-6 items-center justify-center pt-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-xl font-medium text-blue-500 hover:text-blue-400"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-xl font-medium text-blue-500 hover:text-blue-400"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-xl font-medium text-blue-500 hover:text-blue-400"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-xl font-medium text-blue-500 hover:text-blue-400"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full mt-4"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 