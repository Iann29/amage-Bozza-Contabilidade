// src/components/ConteudoTeste.tsx
import React from 'react';

const ConteudoTeste: React.FC = () => {
  return (
    <section className="py-16 bg-offwhite-pale">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
          Nossos Diferenciais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-blue-800">Precisão</h3>
            <p className="text-gray-600 text-center">
              Analisamos cada detalhe da sua empresa para oferecer soluções contábeis precisas e confiáveis.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-green-800">Eficiência</h3>
            <p className="text-gray-600 text-center">
              Otimizamos processos para economizar seu tempo e recursos, permitindo que você foque no crescimento do seu negócio.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3 text-blue-800">Atendimento Personalizado</h3>
            <p className="text-gray-600 text-center">
              Trabalhamos lado a lado com você, entendendo as necessidades específicas da sua empresa.
            </p>
          </div>
        </div>
        
        {/* Estatísticas */}
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-8">Nossos Números</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-green-400">+500</p>
              <p className="mt-2">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">15</p>
              <p className="mt-2">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">98%</p>
              <p className="mt-2">Taxa de Retenção</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">24h</p>
              <p className="mt-2">Suporte Ágil</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Pronto para transformar a contabilidade da sua empresa?</h3>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            Agende uma Consulta
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConteudoTeste;
