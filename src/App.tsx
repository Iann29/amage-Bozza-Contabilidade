import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import QuestionarioPage from './pages/questionario/QuestionarioPage';

// Página inicial simplificada que será reconstruída
const HomePage = () => (
  <div className="min-h-screen bg-offwhite-pale">
    {/* Espaço para adicionar novos componentes na página inicial */}
    <section id="inicio" className="h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">Bozza Contabilidade</h1>
        <p className="text-xl text-gray-600">Página inicial em construção</p>
      </div>
    </section>
    
    {/* Seção de serviços vazia para o link da navegação funcionar */}
    <section id="servicos" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Nossos Serviços</h2>
      </div>
    </section>
    
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
  return (
    <div className="min-h-screen bg-offwhite-pale">
      {/* Navigation - mantido como componente separado */}
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionario" element={<QuestionarioPage />} />
      </Routes>
    </div>
  );
}

export default App;
