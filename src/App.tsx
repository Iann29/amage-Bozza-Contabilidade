import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NossosServicos from './components/NossosServicos';
import QuestionarioPage from './pages/questionario/QuestionarioPage';
import SmoothScroll from './components/SmoothScroll';

// Página inicial simplificada que será reconstruída
const HomePage = () => (
  <div className="min-h-screen bg-offwhite-pale">
    {/* Hero section com animações */}
    <Hero />
    
    {/* Seção de serviços com o novo componente */}
    <NossosServicos />
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
