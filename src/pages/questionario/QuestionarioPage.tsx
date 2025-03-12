import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimationWrapper } from '../../components/AnimationWrapper';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import InformacoesEmpresa from './components/InformacoesEmpresa';
import EstruturaOperacao from './components/EstruturaOperacao';
import ServicosNecessidades from './components/ServicosNecessidades';
import InformacoesAdicionais from './components/InformacoesAdicionais';
import Contato from './components/Contato';
import Revisao from './components/Revisao';
import Agradecimento from './components/Agradecimento';
import './components/QuestionarioStyles.css';

// Elementos decorativos para o fundo
const BackgroundElements = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Efeitos de blur decorativos */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-300 rounded-full opacity-10 blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulse-slow animation-delay-2000"></div>
    <div className="absolute top-1/2 right-0 w-56 h-56 bg-blue-300 rounded-full opacity-10 blur-3xl translate-x-1/4 animate-pulse-slow animation-delay-1000"></div>
    
    {/* Elementos gráficos circulares */}
    <div className="absolute top-1/4 left-10 w-32 h-32 border border-gold-300/10 rounded-full animate-spin-slow"></div>
    <div className="absolute top-1/4 left-10 w-32 h-32 border border-gold-300/5 rounded-full scale-125 animate-spin-slow animation-delay-2000"></div>
    <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-blue-300/10 rounded-full animate-spin-slow animation-delay-1000"></div>
    <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-blue-300/5 rounded-full scale-125 animate-spin-slow"></div>
    
    {/* Formas geométricas */}
    <svg className="absolute top-20 right-1/4 w-16 h-16 text-blue-400 opacity-20 animate-float" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="40" fill="currentColor" />
    </svg>
    <svg className="absolute bottom-40 left-1/4 w-20 h-20 text-gold-300 opacity-20 animate-float animation-delay-1000" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="10" fill="currentColor" />
    </svg>
    
    {/* Padrão de pontos */}
    <div className="absolute inset-0 opacity-5" style={{ 
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)', 
      backgroundSize: '20px 20px' 
    }}></div>
  </div>
);

const QuestionarioPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const totalSections = 7;

  useEffect(() => {
    const newProgress = ((currentSection - 1) / (totalSections - 1)) * 100;
    setProgress(newProgress);
  }, [currentSection]);

  const handleNext = (sectionData?: any) => {
    if (sectionData) {
      setFormData(prev => ({ ...prev, ...sectionData }));
    }
    setCurrentSection(prev => Math.min(prev + 1, totalSections));
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Aqui você implementaria a lógica para enviar os dados do formulário
      console.log('Dados do formulário:', formData);
      
      // Simulação de envio bem-sucedido
      setTimeout(() => {
        handleNext();
      }, 1000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div className="relative py-16 overflow-hidden bg-gradient-to-b from-offwhite-pale to-offwhite-misty min-h-screen">
      <BackgroundElements />
      
      <AnimationWrapper>
        <div className="questionario-container relative z-10">
          <Header />
          
          <ProgressBar progress={progress} />
          
          <form id="questionario-form" onSubmit={handleSubmit}>
            {currentSection === 1 && (
              <InformacoesEmpresa 
                onNext={handleNext}
              />
            )}
            
            {currentSection === 2 && (
              <EstruturaOperacao 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentSection === 3 && (
              <ServicosNecessidades 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentSection === 4 && (
              <InformacoesAdicionais 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentSection === 5 && (
              <Contato 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentSection === 6 && (
              <Revisao 
                formData={formData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSubmit={handleSubmit}
              />
            )}
            
            {currentSection === 7 && (
              <Agradecimento />
            )}
          </form>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default QuestionarioPage;
