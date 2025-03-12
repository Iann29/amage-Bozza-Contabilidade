import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import { HeroGeometric } from './components/HeroGeometric';
import ServicesSection from './components/ServicesSection';
import Navigation from './components/Navigation';
import { Footer } from './components/Footer';
import CallToActionSection from './components/CallToActionSection';
import QuestionarioPage from './pages/questionario/QuestionarioPage';

// Página inicial
const HomePage = () => (
  <>
    {/* Hero Section */}
    <section id="inicio">
      <HeroGeometric />
    </section>

    {/* Services */}
    <ServicesSection />

    {/* About */}
    <section id="sobre" className="py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7" alt="Equipe" className="rounded-lg" />
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Sobre Nós</h2>
          <p className="text-gray-600">Fundada em 2008, oferecemos soluções contábeis personalizadas com mais de 15 anos de experiência.</p>
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <CallToActionSection />
  </>
);

function App() {
  return (
    <motion.div className="min-h-screen bg-offwhite-pale">
      {/* Navigation */}
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionario" element={<QuestionarioPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

export default App;
