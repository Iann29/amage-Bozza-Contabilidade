import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NossosServicos from './components/NossosServicos';
import QuestionarioPage from './pages/questionario/QuestionarioPage';
import SmoothScroll from './components/SmoothScroll';
import LottieScrollAnimation from './components/LottieScrollAnimation';

// Página inicial simplificada que será reconstruída
const HomePage = () => (
  <div className="min-h-screen bg-offwhite-pale">
    {/* Hero section com animações */}
    <Hero />
    
    {/* Seção de serviços com o novo componente */}
    <NossosServicos />
    
    {/* Animação controlada por scroll */}
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#024570]">Nossos Resultados</h2>
        <LottieScrollAnimation />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-offwhite-pale">
        {/* Header - componente de navegação simplificado */}
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionario" element={<QuestionarioPage />} />
        </Routes>
      </div>
    </SmoothScroll>
  );
}

export default App;
