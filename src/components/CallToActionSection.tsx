import { motion } from 'framer-motion';
import { AnimationWrapper, staggerContainer, fadeInUp, scaleIn } from './AnimationWrapper';
import { HoverButton } from './ui/hover-button';
import './animations.css';

const CallToActionSection = () => {
  return (
    <section className="py-16 overflow-hidden relative">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Efeitos de blur decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-300 rounded-full opacity-10 blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 right-0 w-56 h-56 bg-blue-300 rounded-full opacity-10 blur-3xl translate-x-1/4 animate-pulse-slow animation-delay-1000"></div>
        
        {/* Elementos gráficos de prestígio */}
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
      
      <AnimationWrapper>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-offwhite-pale to-offwhite-misty rounded-2xl shadow-xl p-10 md:p-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.1, 0.25, 1.0] 
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-blue-500 mb-4"
                variants={fadeInUp}
                custom={1}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0.2
                }}
              >
                Pronto para Transformar seu Negócio?
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 0.4
                }}
              >
                Não perca mais tempo! Entre em contato conosco agora mesmo para saber como podemos ajudar a impulsionar seus resultados.
              </motion.p>
            </motion.div>
            
            {/* Options */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form Option */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-100"
                whileHover={{ 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  scale: 1.02
                }}
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: 0.3,
                  mass: 1
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.6
                    }}
                  >
                    📝
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-500">Cadastre-se</h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Preencha o formulário abaixo e nossa equipe entrará em contato com você em até 24 horas com uma proposta personalizada.
                </motion.p>
                
                <motion.form 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { type: "text", placeholder: "Nome completo", required: true },
                    { type: "email", placeholder: "E-mail", required: true },
                    { type: "tel", placeholder: "Telefone", required: true },
                    { type: "text", placeholder: "Empresa" }
                  ].map((input, index) => (
                    <motion.input
                      key={index}
                      type={input.type}
                      placeholder={input.placeholder}
                      required={input.required}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                    />
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <HoverButton
                      className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle form submission
                      }}
                    >
                      Quero Saber Mais
                    </HoverButton>
                  </motion.div>
                </motion.form>
              </motion.div>
              
              {/* Contact Option */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-100"
                whileHover={{ 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  scale: 1.02
                }}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: 0.4,
                  mass: 1
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl"
                    initial={{ scale: 0, rotate: 45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.7
                    }}
                  >
                    💬
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-500">Fale Conosco</h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Prefere um atendimento mais ágil? Converse agora mesmo com um de nossos consultores via WhatsApp e tire todas as suas dúvidas.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <HoverButton
                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mb-6"
                    onClick={() => window.open('https://api.whatsapp.com/message/E52BSCML5YW6K1?autoload=1&app_absent=0', '_blank')}
                  >
                    Falar no WhatsApp
                  </HoverButton>
                </motion.div>
                
                <motion.div 
                  className="flex items-center my-6"
                  initial={{ opacity: 0, scaleX: 0.7 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex-1 border-t border-gray-200"></div>
                  <motion.span 
                    className="px-4 text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    ou
                  </motion.span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Se preferir, você também pode nos ligar:
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <HoverButton
                    className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    onClick={() => window.open('tel:+551199999999', '_blank')}
                  >
                    Ligar Agora
                  </HoverButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimationWrapper>
    </section>
  );
};

export default CallToActionSection;
