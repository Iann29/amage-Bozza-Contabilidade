import { motion } from 'framer-motion';
import { AnimationWrapper } from './AnimationWrapper';
import { HoverButton } from './ui/hover-button';
import { Phone, Mail } from 'lucide-react';
import './animations.css';

const ContactSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-offwhite-pale to-offwhite-misty">
      <div className="absolute inset-0 bg-blue-500/5" />
      
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Imagem de fundo com baixa opacidade */}
        <div className="absolute inset-0">
          <img 
            src="/LogoHero.png" 
            alt="" 
            className="absolute left-0 bottom-0 transform translate-y-1/4 h-[350px] opacity-[0.03] object-contain"
            style={{ maxWidth: '50%' }}
          />
        </div>
        
        {/* Efeitos de blur decorativos */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-300 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300 rounded-full opacity-10 blur-3xl animate-pulse-slow animation-delay-1000"></div>
        
        {/* Elementos gráficos de prestígio */}
        <div className="absolute top-1/3 right-20 w-32 h-32 border border-gold-300/10 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 border border-gold-300/5 rounded-full scale-125 animate-spin-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-20 w-40 h-40 border border-blue-300/10 rounded-full animate-spin-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-20 w-40 h-40 border border-blue-300/5 rounded-full scale-125 animate-spin-slow"></div>
        
        {/* Formas geométricas */}
        <svg className="absolute top-40 left-1/3 w-16 h-16 text-blue-400 opacity-20 animate-float" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-40 right-1/3 w-20 h-20 text-gold-300 opacity-20 animate-float animation-delay-1000" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="10" fill="currentColor" />
        </svg>
        <svg className="absolute top-2/3 left-2/3 w-12 h-12 text-blue-300 opacity-20 animate-float animation-delay-2000" viewBox="0 0 60 60" fill="none">
          <polygon points="30,0 60,52 0,52" fill="currentColor" />
        </svg>
        
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <AnimationWrapper>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="px-6 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-full inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Transforme Sua Gestão
            </motion.span>
            
            <motion.h2
              className="text-4xl font-bold text-blue-500 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Comece Sua Jornada Conosco Hoje!
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Simplifique sua contabilidade com soluções personalizadas que crescem com seu negócio
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card de Formulário */}
            <motion.div
              className="bg-offwhite-warm p-8 rounded-xl shadow-lg border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-500 text-xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-500 mb-2">Solicite uma Proposta</h3>
                <p className="text-gray-600">Receba uma consultoria gratuita em até 24h</p>
              </div>
              
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="E-mail profissional"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <HoverButton
                  className="w-full py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => {}}
                >
                  Enviar Solicitação
                </HoverButton>
              </form>
            </motion.div>

            {/* Card de Contato Direto */}
            <motion.div
              className="bg-offwhite-warm p-8 rounded-xl shadow-lg border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="text-green-600 text-xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-500 mb-2">Contato Imediato</h3>
                <p className="text-gray-600">Converse agora com nosso time especializado</p>
              </div>
              
              <div className="space-y-4">
                <HoverButton
                  className="w-full py-4 text-lg bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                >
                  WhatsApp Instantâneo
                </HoverButton>
                
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-gray-500">ou</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">(11) 9999-9999</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">contato@bozzacontabilidade.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimationWrapper>
    </section>
  );
};

export default ContactSection;
