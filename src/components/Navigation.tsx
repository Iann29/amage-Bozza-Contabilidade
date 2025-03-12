import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { StarBorder } from './StarBorder';
import ScrollLink from './ScrollLink';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <AnimatePresence>
      {true && (
        <motion.nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-offwhite-pale/95 backdrop-blur-md shadow-md" : "bg-transparent"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <motion.div 
                className="flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src="/LOGOHEADER (2).png" alt="Bozza Contabilidade" className="h-16 w-auto" />
              </motion.div>
              
              <div className="hidden md:flex items-center justify-center flex-1">
                <motion.div
                  className="flex items-center justify-center space-x-10"
                >
                  <motion.div>
                    <ScrollLink 
                      href="#inicio" 
                      className={`text-sm font-medium transition-colors ${
                        scrolled ? "text-blue-500 hover:text-blue-400" : "text-blue-500 hover:text-blue-400"
                      }`}
                    >
                      Início
                    </ScrollLink>
                  </motion.div>
                  
                  <motion.div>
                    <ScrollLink 
                      href="#servicos" 
                      className={`text-sm font-medium transition-colors ${
                        scrolled ? "text-blue-500 hover:text-blue-400" : "text-blue-500 hover:text-blue-400"
                      }`}
                    >
                      Serviços
                    </ScrollLink>
                  </motion.div>
                  
                  <motion.div>
                    <ScrollLink 
                      href="#sobre" 
                      className={`text-sm font-medium transition-colors ${
                        scrolled ? "text-blue-500 hover:text-blue-400" : "text-blue-500 hover:text-blue-400"
                      }`}
                    >
                      Sobre
                    </ScrollLink>
                  </motion.div>
                  
                  <motion.div>
                    <ScrollLink 
                      href="#contato" 
                      className={`text-sm font-medium transition-colors ${
                        scrolled ? "text-blue-500 hover:text-blue-400" : "text-blue-500 hover:text-blue-400"
                      }`}
                    >
                      Contato
                    </ScrollLink>
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StarBorder as={ScrollLink} href="#contato" color="#10b981">
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Fale Conosco
                    </span>
                  </StarBorder>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:hidden flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  className={`p-2 rounded-full ${
                    scrolled ? "text-blue-500" : "text-blue-500"
                  } hover:bg-blue-50/50`}
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </motion.div>
            </div>
          </div>
          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="fixed inset-0 bg-offwhite-soft z-40 flex flex-col p-4"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <img src="/LOGOHEADER (2).png" alt="Bozza Contabilidade" className="h-16 w-auto" />
                  <button
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    onClick={toggleMenu}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col space-y-6 items-center justify-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ScrollLink
                      href="#inicio"
                      className="text-xl font-medium text-blue-500 hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Início
                    </ScrollLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <ScrollLink
                      href="#servicos"
                      className="text-xl font-medium text-blue-500 hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Serviços
                    </ScrollLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <ScrollLink
                      href="#sobre"
                      className="text-xl font-medium text-blue-500 hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Sobre
                    </ScrollLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <ScrollLink
                      href="#contato"
                      className="text-xl font-medium text-blue-500 hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Contato
                    </ScrollLink>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <StarBorder as={ScrollLink} href="#contato" color="#10b981" className="mt-4" onClick={toggleMenu}>
                      <span className="flex items-center gap-2">
                        <Phone className="w-5 h-5" /> Fale Conosco
                      </span>
                    </StarBorder>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
