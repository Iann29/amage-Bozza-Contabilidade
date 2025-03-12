import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Agradecimento: React.FC = () => {
  return (
    <motion.section 
      className="form-section active thank-you" 
      id="section7"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <svg 
          className="checkmark mx-auto mb-6" 
          xmlns="http://www.w3.org/2000/svg" 
          width="80" 
          height="80" 
          viewBox="0 0 52 52"
        >
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#2ecc71" strokeWidth="2" />
          <path className="checkmark__check" fill="none" stroke="#2ecc71" strokeWidth="2" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        
        <h2>Obrigado pelo envio!</h2>
        <p className="mb-8">
          Recebemos suas informações com sucesso. Nossa equipe analisará os dados
          e entrará em contato o mais breve possível para apresentar uma proposta
          personalizada para sua empresa.
        </p>
        
        <p className="mb-8">
          Se tiver alguma dúvida ou precisar adicionar mais informações,
          não hesite em entrar em contato conosco pelos canais disponíveis
          no rodapé do site.
        </p>
        
        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-block px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Voltar para a Página Inicial
          </Link>
        </motion.div>
      </motion.div>
      
      <style>
        {`
          .checkmark {
            display: block;
          }
          .checkmark__circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          }
          .checkmark__check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
          }
          @keyframes stroke {
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </motion.section>
  );
};

export default Agradecimento;
