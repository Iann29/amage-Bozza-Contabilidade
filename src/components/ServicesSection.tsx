import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, BarChart, Shield, Users, FileText, Briefcase, CheckCircle, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { AnimationWrapper } from './AnimationWrapper';
import { HoverButton } from './ui/hover-button';
import { GlowingEffect } from './ui/glowing-effect';

interface Service {
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  features: string[];
  color: string;
  id: number;
}

const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      icon: <Calculator size={28} />,
      title: "Contabilidade Empresarial",
      shortDescription: "Serviços contábeis completos para empresas de todos os portes e segmentos.",
      features: [
        "Elaboração de balancetes mensais",
        "Demonstrativos contábeis",
        "Análise econômico-financeira",
        "Conciliação de contas"
      ],
      color: "#36c03b" // green
    },
    {
      id: 2,
      icon: <BarChart size={28} />,
      title: "Planejamento Tributário",
      shortDescription: "Estratégias personalizadas para otimização fiscal e redução da carga tributária.",
      features: [
        "Análise de enquadramento tributário",
        "Simulações de carga tributária",
        "Identificação de oportunidades fiscais",
        "Auditoria preventiva"
      ],
      color: "#36c03b" // green
    },
    {
      id: 3,
      icon: <Users size={28} />,
      title: "Departamento Pessoal",
      shortDescription: "Gestão completa de folha de pagamento e todas as obrigações trabalhistas.",
      features: [
        "Admissão e desligamento",
        "Folha de pagamento",
        "e-Social e CAGED",
        "Controle de férias e afastamentos"
      ],
      color: "#36c03b" // green
    },
    {
      id: 4,
      icon: <Shield size={28} />,
      title: "Consultoria Contábil",
      shortDescription: "Orientação estratégica para tomada de decisões empresariais com base em dados.",
      features: [
        "Análise de viabilidade",
        "Projeções financeiras",
        "Consultoria para investimentos",
        "Relatórios gerenciais"
      ],
      color: "#36c03b" // green
    },
    {
      id: 5,
      icon: <FileText size={28} />,
      title: "Escrituração Fiscal",
      shortDescription: "Elaboração e entrega de todas as obrigações acessórias exigidas pelo fisco.",
      features: [
        "Apuração de impostos",
        "SPED Fiscal e Contribuições",
        "EFD-REINF",
        "Obrigações municipais"
      ],
      color: "#36c03b" // green
    },
    {
      id: 6,
      icon: <Briefcase size={28} />,
      title: "Abertura de Empresas",
      shortDescription: "Assessoria completa para legalização e abertura de novos negócios.",
      features: [
        "Registro na Junta Comercial",
        "Inscrições municipais e estaduais",
        "Alvarás e licenças",
        "Registro em órgãos de classe"
      ],
      color: "#36c03b" // green
    }
  ];

  return (
    <section 
      id="servicos" 
      className="py-16 relative overflow-hidden"
      data-component-name="ServicesSection"
      style={{ backgroundColor: '#03466e !important' }}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Imagem de fundo com baixa opacidade */}
        <div className="absolute inset-0">
          <img 
            src="/LogoHero.png" 
            alt="" 
            className="absolute right-0 top-1/3 transform -translate-y-1/2 h-[400px] opacity-[0.05] object-contain"
            style={{ maxWidth: '60%' }}
          />
        </div>
        
        {/* Efeitos de blur decorativos - atualizados */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-0 w-56 h-56 bg-green-500 rounded-full opacity-15 blur-3xl -translate-x-1/4 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-green-500 rounded-full opacity-15 blur-3xl translate-x-1/4 animate-pulse-slow animation-delay-3000"></div>
        
        {/* Elementos gráficos de prestígio */}
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-blue-300/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-blue-300/10 rounded-full scale-125 animate-spin-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-10 w-40 h-40 border border-blue-300/20 rounded-full animate-spin-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-10 w-40 h-40 border border-blue-300/10 rounded-full scale-125 animate-spin-slow"></div>
        
        {/* Formas geométricas */}
        <svg className="absolute top-20 left-1/4 w-16 h-16 text-blue-400 opacity-30 animate-float" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-40 right-1/4 w-20 h-20 text-green-400 opacity-30 animate-float animation-delay-1000" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="10" fill="currentColor" />
        </svg>
        <svg className="absolute top-1/3 right-1/3 w-12 h-12 text-blue-300 opacity-30 animate-float animation-delay-2000" viewBox="0 0 60 60" fill="none">
          <polygon points="30,0 60,52 0,52" fill="currentColor" />
        </svg>
        
        {/* Padrão de pontos */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
        
        {/* GlowingEffect para a seção de serviços */}
        <div className="absolute inset-0 rounded-md overflow-hidden">
          <GlowingEffect 
            blur={8}
            spread={40}
            borderWidth={2}
            disabled={false}
            movementDuration={3}
            proximity={100}
          />
        </div>
      </div>
      
      <AnimationWrapper>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 text-xs font-medium text-green-500 bg-green-100 rounded-full inline-block mb-3"
            >
              NOSSOS SERVIÇOS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-white mb-3"
            >
              Soluções Contábeis Completas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-green-100 text-sm max-w-xl mx-auto mb-8"
            >
              Escolha os serviços que sua empresa precisa para crescer com segurança e conformidade fiscal sem preocupações.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-10"
          >
            {/* Grid de serviços para desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-offwhite-warm rounded-xl shadow-lg overflow-hidden relative group transition-all duration-300 hover:shadow-xl`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedCard === service.id}
                  onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedCard(expandedCard === service.id ? null : service.id);
                    }
                  }}
                  style={{
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                    transform: expandedCard === service.id ? 'translateY(-5px)' : 'none',
                    backgroundColor: '#F5F0E5' // Warm Off-White mais perceptível
                  }}
                >
                  {/* Linha colorida no topo */}
                  <div 
                    className="h-2 w-full" 
                    style={{ backgroundColor: service.color }}
                  ></div>

                  <div className="p-6">
                    {/* Ícone do serviço */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto transition-all duration-500"
                      style={{ 
                        backgroundColor: `${service.color}10`,
                      }}
                    >
                      <div 
                        className="transition-all duration-300"
                        style={{ color: service.color }}
                      >
                        {service.icon}
                      </div>
                    </div>

                    {/* Título do serviço */}
                    <h3 className="text-xl font-bold text-center mb-3 text-blue-500">
                      {service.title}
                    </h3>

                    {/* Descrição curta */}
                    <p className="text-gray-600 text-sm text-center mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Lista de funcionalidades - visível apenas quando expandido em mobile ou hover em desktop */}
                    <div 
                      className={`
                        mt-4 space-y-2 transition-all duration-300 
                        ${expandedCard === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:group-hover:max-h-96 md:group-hover:opacity-100 overflow-hidden'}
                      `}
                    >
                      <p className="font-medium text-sm text-green-500 mb-2">Este serviço inclui:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                            <span className="mr-2 mt-0.5 text-[#36c03b]">
                              <CheckCircle size={16} />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Call-to-action no card expandido */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <a 
                          href="#contato" 
                          className="inline-flex items-center text-sm font-medium text-[#36c03b] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Solicitar este serviço
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Indicador visual de expansão */}
                    <div className="mt-4 flex justify-center">
                      <div 
                        className={`
                          flex items-center justify-center text-green-500 text-sm font-medium gap-1
                          transition-all duration-300
                          ${expandedCard === service.id ? 'opacity-100' : 'opacity-50 md:group-hover:opacity-100'}
                        `}
                      >
                        <span className="md:hidden">
                          {expandedCard === service.id ? 'Ver menos' : 'Ver mais'}
                        </span>
                        <span className="hidden md:inline">
                          {expandedCard === service.id ? 'Fechar detalhes' : 'Ver detalhes'}
                        </span>
                        {expandedCard === service.id ? (
                          <ChevronUp size={16} className="animate-bounce" />
                        ) : (
                          <ChevronDown size={16} className="md:group-hover:animate-bounce" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-10"
          >
            <HoverButton 
              className="py-4 px-8 mx-auto text-lg font-medium bg-offwhite-pale/10 backdrop-blur-md"
              onClick={() => window.location.href = "#contato"}
            >
              Solicite uma proposta personalizada para sua empresa <ArrowRight className="ml-2 w-5 h-5" />
            </HoverButton>
          </motion.div>
        </div>
      </AnimationWrapper>
    </section>
  );
};

export default ServicesSection;
