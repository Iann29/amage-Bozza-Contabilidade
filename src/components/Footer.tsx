"use client"

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import { AnimationWrapper } from "./AnimationWrapper"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-offwhite-pale to-offwhite-misty">
      <div className="absolute top-0 right-0 -mt-12 w-40 h-40 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e8f5e9] rounded-full opacity-20 blur-3xl"></div>
      
      <AnimationWrapper>
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-2xl font-bold text-blue-900"
              >
                Fique por dentro
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-gray-600 text-sm"
              >
                Receba nossas atualizações e novidades fiscais diretamente no seu email.
              </motion.p>
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Inscrever-se</span>
                </button>
              </motion.form>
            </div>
            
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 text-lg font-semibold text-blue-900"
              >
                Links Rápidos
              </motion.h3>
              <motion.nav 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2 text-sm"
              >
                <a href="#inicio" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Início
                </a>
                <a href="#sobre" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Sobre Nós
                </a>
                <a href="#servicos" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Serviços
                </a>
                <a href="#depoimentos" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Depoimentos
                </a>
                <a href="#contato" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Contato
                </a>
                <Link to="/questionario" className="block transition-colors hover:text-blue-600 text-gray-600">
                  Solicitar Proposta
                </Link>
              </motion.nav>
            </div>
            
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-lg font-semibold text-blue-900"
              >
                Contato
              </motion.h3>
              <motion.address 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3 text-sm not-italic text-gray-600"
              >
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                  <span>Rua André da Rocha 126<br />Centro, Lagoa Vermelha - RS</span>
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  <span>(11) 4567-8901</span>
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                  <span>contato@bozzacontabilidade.com.br</span>
                </p>
              </motion.address>
            </div>
            
            <div className="relative">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 text-lg font-semibold text-blue-900"
              >
                Siga-nos
              </motion.h3>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-6 flex space-x-4"
              >
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-blue-600 hover:border-blue-600 hover:text-white text-gray-600"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-blue-600 hover:border-blue-600 hover:text-white text-gray-600"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:bg-blue-600 hover:border-blue-600 hover:text-white text-gray-600"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-xs text-gray-500">
                  Horário de funcionamento:<br />
                  Segunda à Sexta: 8h às 18h
                </p>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-center md:flex-row"
          >
            <p className="text-sm text-gray-500">
              {new Date().getFullYear()} Bozza Contabilidade. Todos os direitos reservados.
            </p>
            <nav className="flex gap-4 text-sm">
              <a href="#" className="transition-colors hover:text-blue-600 text-gray-500">
                Política de Privacidade
              </a>
              <a href="#" className="transition-colors hover:text-blue-600 text-gray-500">
                Termos de Serviço
              </a>
            </nav>
          </motion.div>
        </div>
      </AnimationWrapper>
    </footer>
  )
}

export { Footer }
