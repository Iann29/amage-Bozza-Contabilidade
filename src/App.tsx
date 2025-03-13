import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NossosServicos from './components/NossosServicos';
import QuestionarioPage from './pages/questionario/QuestionarioPage';
import { initSmoothScroll } from './lib/smoothScroll';

// Página inicial simplificada que será reconstruída
const HomePage = () => (
  <div className="min-h-screen bg-offwhite-pale">
    {/* Hero section com animações */}
    <Hero />
    
    {/* Seção de serviços com o novo componente */}
    <NossosServicos />
    
    {/* Seção sobre vazia para o link da navegação funcionar */}
    <section id="sobre" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Sobre Nós</h2>
      </div>
    </section>
    
    {/* Seção de contato vazia para o link da navegação funcionar */}
    <section id="contato" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Contato</h2>
      </div>
    </section>
  </div>
);

function App() {
  // Inicializa o Lenis quando o componente montar
  useEffect(() => {
    // Inicializar o Lenis para rolagem suave
    const lenis = initSmoothScroll();
    
    return () => {
      // Cleanup se necessário no futuro
    };
  }, []);

  return (
    <div className="min-h-screen bg-offwhite-pale">
      {/* Header - componente de navegação simplificado */}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionario" element={<QuestionarioPage />} />
      </Routes>
    </div>
  );
}

export default App;
