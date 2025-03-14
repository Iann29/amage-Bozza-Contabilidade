import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NossosServicos from './components/NossosServicos';
import QuestionarioPage from './pages/questionario/QuestionarioPage';
import { initSmoothScroll } from './lib/smoothScroll';
import SplineViewer from './components/SplineViewer';

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
    initSmoothScroll();
    
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
      
      {/* Chatbot 3D fixo no canto inferior direito */}
      <div 
        className="fixed bottom-4 right-4 z-50 w-24 h-24 cursor-pointer transition-all duration-300 hover:scale-110"
        title="Clique para abrir o chatbot"
        onClick={() => alert('Chatbot em desenvolvimento!')}
      >
        <SplineViewer url="https://prod.spline.design/VsEIjTj5rS3fq5DF/scene.splinecode" className="w-full h-full" />
      </div>
    </div>
  );
}

export default App;
