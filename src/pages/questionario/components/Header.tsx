import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="questionario-header">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Questionário para Elaboração de Proposta
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Preencha o formulário abaixo para recebermos as informações necessárias
        para elaborar uma proposta personalizada para sua empresa.
      </motion.p>
    </header>
  );
};

export default Header;
