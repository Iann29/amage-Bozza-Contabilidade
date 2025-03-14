import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplineViewer from './SplineViewer';

const ChatbotMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Menu do chatbot (aparece quando está aberto) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="bg-white rounded-lg shadow-xl mb-4 w-72 overflow-hidden"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <h3 className="text-lg font-semibold">Assistente Bozza</h3>
              <p className="text-sm opacity-80">Como posso ajudar?</p>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto flex flex-col">
              <div className="bg-gray-100 p-3 rounded-lg self-start max-w-[80%] mb-3">
                <p className="text-sm">Olá! Sou o assistente da Bozza Contabilidade. 
                Como posso ajudar você hoje?</p>
              </div>
              
              {/* Outros elementos do chat iriam aqui */}
            </div>
            
            <div className="p-3 border-t flex items-center">
              <input 
                type="text" 
                placeholder="Digite sua mensagem..." 
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botão do chatbot com o objeto 3D */}
      <motion.div
        className="cursor-pointer w-24 h-24 relative"
        onClick={toggleMenu}
        initial={{ y: 0 }}
        animate={{ 
          y: isOpen ? -10 : 0,
          scale: isOpen ? 0.9 : 1
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Objeto 3D do Spline */}
        <SplineViewer url="https://prod.spline.design/VsEIjTj5rS3fq5DF/scene.splinecode" className="w-full h-full" />
      </motion.div>
    </div>
  );
};

export default ChatbotMenu;
