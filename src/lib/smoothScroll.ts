import Lenis from '@studio-freight/lenis';

// Configuração do Lenis para rolagem suave
let lenis: Lenis | null = null;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return;
  
  // Inicializa o Lenis se ainda não estiver inicializado
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2, // Duração da animação (ajuste para mais lento ou mais rápido)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de easing
      wheelMultiplier: 1, // Multiplicador da roda
      touchMultiplier: 2, // Multiplicador de toque
    });

    // Função para atualizar o Lenis em cada frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    // Inicia o loop de animação
    requestAnimationFrame(raf);
    
    // Opcional: registrar eventos para depuração
    lenis.on('scroll', () => {
      // console.log({ scroll, limit, velocity, direction, progress });
    });
  }
  
  return lenis;
};

// Método para rolar suavemente para uma seção específica
export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;
  
  if (lenis) {
    // Usa o Lenis para rolar suavemente
    lenis.scrollTo(targetElement, { 
      offset,
      duration: 1.2,
      // Note: a função easing é tratada internamente pelo Lenis
    });
  } else {
    // Fallback para navegadores que não suportam o Lenis
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: 'smooth'
    });
  }
};

// Exporta o Lenis para acessar a instância em outros componentes
export const getLenis = () => lenis; 