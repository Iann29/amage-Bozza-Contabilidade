import Lenis from 'lenis';

// Configuração do Lenis para rolagem suave
let lenis: Lenis | null = null;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return;
  
  // Desabilita o scroll nativo para evitar conflitos
  document.documentElement.style.scrollBehavior = 'auto';
  
  // Inicializa o Lenis se ainda não estiver inicializado
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.6, // Aumentado para uma sensação mais suave
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Mantém a curva de easing
      smoothWheel: true, // Garante suavidade no scroll com roda do mouse
      wheelMultiplier: 0.8, // Reduzido para maior suavidade
      touchMultiplier: 1.5, // Ajustado para melhor resposta em dispositivos touch
      syncTouch: true, // Sincroniza o touch para evitar conflitos
      orientation: 'vertical', // Especifica a orientação explicitamente
      gestureOrientation: 'vertical', // Especifica a orientação dos gestos
      lerp: 0.1, // Adiciona um linear interpolation fator para transições mais suaves
      autoRaf: false, // Desativa o raf automático para controlar manualmente
    });

    // Otimiza o loop de requestAnimationFrame para melhor performance
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    // Inicia o loop de animação com alta prioridade
    requestAnimationFrame(raf);
    
    // Adiciona evento para lidar com atualizações da página que podem afetar o scroll
    window.addEventListener('resize', () => {
      lenis?.resize();
    });
    
    // Configura o evento de scroll para acessibilidade e debug
    lenis.on('scroll', (_e: any) => {
      // Aqui podemos adicionar callback para o evento de scroll, se necessário
      // O parâmetro foi prefixado com _ para indicar que não é usado
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
      duration: 1.6, // Aumentado para combinar com a duração global
      immediate: false, // Garante que a animação ocorra
    });
  } else {
    // Fallback para navegadores que não suportam o Lenis
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: 'smooth'
    });
  }
};

// Método para pausar o Lenis temporariamente (útil durante animações pesadas)
export const pauseLenis = () => {
  if (lenis) {
    lenis.stop();
  }
};

export const resumeLenis = () => {
  if (lenis) {
    lenis.start();
  }
};

// Exporta o Lenis para acessar a instância em outros componentes
export const getLenis = () => lenis; 