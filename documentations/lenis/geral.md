Introdução e Visão Geral
Você pode integrar uma animação Lottie exportada do LottieLab em um projeto React + Vite (TypeScript) e controlá-la pelo scroll do usuário usando o Lenis 1.2.3 (biblioteca de scroll suave). Em vez de reproduzir automaticamente em loop, a animação Lottie pode avançar quadro-a-quadro conforme o usuário rola a página​
HELP.LOTTIEFILES.COM
. Isso permite efeitos semelhantes aos de sites interativos modernos (como animações que acompanham a rolagem). A seguir, apresentamos um passo a passo de como conseguir isso, incluindo as dependências necessárias e um exemplo de código.
1. Exportando a animação do LottieLab
No LottieLab (ou LottieFiles), crie ou edite sua animação e então exporte-a como um arquivo Lottie (JSON). Esse arquivo (por exemplo, animacao.json) contém os vetores e keyframes da animação. Guarde-o no seu projeto (por exemplo, na pasta src/assets ou similar). No código React, vamos importar esse JSON para reproduzir a animação. Dica: Garanta que o TypeScript esteja configurado para importar arquivos JSON (ativando resolveJsonModule no tsconfig.json se necessário).
2. Instalando dependências (Vite + React + Lottie + Lenis)
No seu projeto React com Vite, instale as bibliotecas necessárias via npm ou Yarn:
Lottie-web: O player JavaScript oficial do Lottie para web. Será usado para carregar e controlar a animação Lottie​
CSS-TRICKS.COM
.
Lenis (versão 1.2.3): Biblioteca de rolagem suave da Studio Freight, para capturar o scroll do usuário de forma fluida e emitir eventos de rolagem contínuos​
GITHUB.COM
.
(Opcional) React Lottie wrapper: Se preferir, você pode instalar um wrapper como react-lottie ou lottie-react para integrar a animação no React. Entretanto, mesmo com esses wrappers, geralmente acessaremos a instância do Lottie-web por trás deles para controlar manualmente o progresso. Usaremos aqui o lottie-web diretamente para simplicidade.
Tipos do Lottie (opcional): @types/lottie-web para ter intellisense e tipagens no TypeScript. Lenis já inclui definições TS embutidas.

Exemplo:
bash
Copiar
Editar
npm install lottie-web lenis
# opcional:
npm install react-lottie @types/lottie-web

Além disso, inclua o CSS recomendado pelo Lenis para garantir o funcionamento correto. Você pode importar o CSS diretamente no seu projeto (ex: no main.tsx ou no arquivo de estilo global):
jsx
Copiar
Editar
import 'lenis/dist/lenis.css';
Esse CSS adiciona regras para o <html> e <body> quando o Lenis está ativo (por exemplo, definindo height: auto e desabilitando o scroll-behavior nativo)​
NPMJS.COM
, o que previne conflitos entre o scroll nativo e o scroll suave do Lenis.
3. Importando e carregando a animação Lottie no React
Com as dependências instaladas, podemos carregar a animação Lottie no front-end. Em um componente React, importe o JSON da animação e a biblioteca Lottie-web. Em seguida, use o lottie.loadAnimation() para inicializar a animação dentro de um elemento container:
tsx
Copiar
Editar
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './animacao.json';  // arquivo Lottie exportado
// ... (importe Lenis na próxima etapa)

function MinhaAnimacao() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializa a animação Lottie dentro do container
    const anim = lottie.loadAnimation({
      container: containerRef.current!,    // div onde a animação será renderizada
      animationData: animationData,        // dados da animação Lottie
      renderer: 'svg',                     // renderizador (SVG oferece boa qualidade)
      loop: false,                         // não loopar automaticamente
      autoplay: false,                     // não iniciar automaticamente
    });

    // ... (código do Lenis será inserido aqui em seguida)

    // Cleanup opcional na desmontagem do componente:
    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: 400, height: 400 }} />;
}

export default MinhaAnimacao;
Explicação: Nesse código, usamos um ref (containerRef) para referenciar uma <div> onde a animação será desenhada. Chamamos lottie.loadAnimation(...) passando o container e os dados JSON. Desativamos loop e autoplay porque queremos controlar manualmente o momento de avanço da animação (quem “dirigirá” a animação será o scroll do usuário, e não o relógio de tempo). Ao desabilitar o autoplay, a animação fica parada no primeiro quadro até mandarmos avançar.
🔹 Observação: Você também poderia usar um componente de alto nível (como <Lottie /> do react-lottie) passando as opções acima. O importante é que tenhamos acesso à instância da animação para chamar métodos como goToAndStop. No exemplo acima, armazenamos a instância em anim. Se usar um wrapper React, consulte a documentação para acessar a instância ou use event callbacks.
4. Integrando o Lenis para controlar o scroll suave
Agora vamos configurar o Lenis para obter o progresso do scroll e sincronizá-lo com a animação. O Lenis substitui a rolagem padrão por uma rolagem suave baseada em requestAnimationFrame, e expõe eventos e propriedades úteis. Em particular, podemos escutar o evento 'scroll' do Lenis – ele dispara constantemente enquanto ocorre uma rolagem suave, fornecendo a posição atual. A instância do Lenis possui um getter progress que indica a porcentagem da página rolada de 0 a 1​
GITHUB.COM
. Usaremos esse valor para determinar em qual frame a animação deve estar. Dentro do mesmo useEffect do componente React, adicione:
tsx
Copiar
Editar
import Lenis from 'lenis';

useEffect(() => {
  // ... (código de inicialização do Lottie acima)

  // 1. Inicializa o Lenis (scroll suave)
  const lenis = new Lenis({
    lerp: 0.1,           // intensidade da inércia (0 a 1, default 0.1)
    smoothWheel: true,   // ativar scroll suave em mouse wheel (default true)
    // você pode ajustar outras opções conforme necessidade
  });

  // 2. Escuta o evento de rolagem do Lenis
  lenis.on('scroll', (e: any) => {
    // `e` é a instância Lenis ou um objeto com propriedades; podemos usar e.progress
    const scrollProgress = e.progress;              // progresso do scroll (0 a 1)
    anim.goToAndStop(scrollProgress * anim.getDuration(true), true);
  });

  // 3. Inicia o loop de animação do Lenis via rAF (requestAnimationFrame)
  function raf(time: number) {
    lenis.raf(time);    // informa ao Lenis o tick de tempo para atualizar a posição
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Cleanup na desmontagem:
  return () => {
    anim.destroy();
    lenis.destroy();
  };
}, []);
O que este código faz:
Instanciamos new Lenis(...). Aqui usamos configurações padrão (um lerp baixo para suavidade). O Lenis automaticamente aplica classes CSS no HTML (e.g. adiciona class="lenis lenis-smooth" no <html> durante a rolagem) e gerencia a interceptação dos eventos de scroll.
Registramos um listener: lenis.on('scroll', ...). Sempre que o usuário rolar, o Lenis emite este evento continuamente. O objeto e passado possui propriedades como e.scroll (posição em pixels), e.limit (tamanho máximo de scroll) e e.progress (posição normalizada 0-1)​
GITHUB.COM
. Usamos progress para representar quanto da página foi rolada em relação ao total. No callback, calculamos o frame correspondente da animação multiplicando scrollProgress pelo total de frames da animação. Em seguida, usamos anim.goToAndStop(frame, true) para avançar a animação para o frame calculado e pausá-la ali​
CSS-TRICKS.COM
. – Isso efetivamente sincroniza o frame da animação com a posição do scroll. Quando progress for 0.5 (meio da página), a animação irá para ~50% de seus frames (meio da animação); quando o usuário estiver no final da página (progress ~1.0), a animação chega ao último frame. Ao rolar para cima, progress diminui e a animação anda de trás para frente, pois estamos sempre definindo o frame com goToAndStop.
Iniciamos o loop de renderização do Lenis usando requestAnimationFrame. Essa parte é crucial: como o Lenis não sabe quando atualizar a tela, precisamos chamá-lo a cada quadro. Chamamos lenis.raf(time) dentro de um loop rAF contínuo. Isso garantirá que mesmo os pequenos incrementos de scroll (interpolados pelo lerp) sejam aplicados e gerem eventos. (Observação: alternativamente, poderíamos instanciar o Lenis com autoRaf: true para que ele mesmo gerencie o loop interno. Contudo, usar o loop manual nos dá mais controle e é o método ilustrado na documentação básica​
GITHUB.COM
.)
💡 Dica: Certifique-se de que exista conteúdo suficiente na página para rolar e acionar o Lenis. Por exemplo, se a animação Lottie é o único conteúdo, talvez você queira envolver o componente em uma <div> com altura extra (ou usar CSS) para permitir scroll. Caso contrário, e.limit será 0 e progress não mudará. Alternativamente, se deseja que a animação em si ocupe a tela inteira durante o efeito, você pode ajustar a lógica para calcular scrollProgress relativo a uma seção específica (por exemplo, usando o offset do elemento da animação em relação ao topo da página). Mas para simplificar, consideremos o scroll da página inteira.
5. Exemplo completo de integração (React + Vite + Leis + Lottie)
Abaixo está um exemplo completo combinando os passos acima em um único componente React em TypeScript. Este componente renderiza a animação Lottie e a sincroniza com o scroll suave do Lenis:
tsx
Copiar
Editar
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import lottie from 'lottie-web';
import animationData from './animacao.json';  // seu arquivo Lottie exportado

export default function LottieScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializa a animação Lottie no container designado
    const anim = lottie.loadAnimation({
      container: containerRef.current!,
      animationData: animationData,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });

    // Configura instância do Lenis para scroll suave
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // ... (outras opções como smoothTouch se necessário)
    });

    // Vincula o progresso do scroll ao progresso da animação
    lenis.on('scroll', (e: any) => {
      const progress = e.progress; 
      anim.goToAndStop(progress * anim.getDuration(true), true);
    });

    // Inicia o loop de atualização do Lenis (usando rAF)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Limpeza na desmontagem do componente
    return () => {
      anim.destroy();
      lenis.destroy();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '500px', margin: '0 auto' }}
    />
  );
}
Como funciona: quando este componente é montado, ele carrega a animação Lottie em containerRef. Em seguida, cria o Lenis e, a cada tick de scroll suave, calcula progress e define o frame correspondente na animação (goToAndStop). Assim, conforme o usuário rola a página suavemente (graças ao Lenis), a animação Lottie avança proporcionalmente ao deslocamento. O resultado é uma animação controlada pelo scroll do usuário – scrollando para baixo a animação progride, scrollando para cima ela retrocede, de forma fluida e sincronizada (sem os trancos comuns do scroll nativo, já que o Lenis normaliza o movimento).
6. Considerações Finais
Lenis progress vs. range personalizado: No exemplo acima, usamos e.progress (0 a 1 do topo ao final da página). Se você quiser que a animação Lottie complete antes do usuário chegar 100% ao fundo da página (por exemplo, terminar em 50% do scroll), pode escalar esse valor. Ex: anim.goToAndStop((progress * 2) * totalFrames, true) para terminar a animação no meio do scroll (quando progress for 0.5, 0.5*2 = 1.0, ou 100% dos frames). Outra abordagem é calcular o progresso relativo a um contêiner específico: suponha que a animação esteja dentro de uma seção que ocupa 1000px de altura; você pode usar scrollY (ou e.scroll) do Lenis e calcular (scrollY - offsetTop) / sectionHeight para obter o progresso somente daquela seção. Ajuste conforme seu layout.
Dependências opcionais: Caso prefira não usar o Lenis, bibliotecas como GSAP ScrollTrigger ou a API de interatividade do LottieFiles também permitem controlar animações pelo scroll. Contudo, o Lenis oferece a vantagem do scroll suave nativo e fácil integração com frameworks (conforme vimos). A documentação do Lenis demonstra como sincronizar com outras animações e frameworks (e.g. integração com GSAP)​
NPMJS.COM
, o que indica que casos de uso como sincronizar com Lottie também são possíveis de maneira similar.
Performance: Animações Lottie são vetoriais e podem pesar dependendo da complexidade. Controlá-las quadro a quadro via scroll é custoso, mas usando SVG e mantendo a animação relativamente simples, costuma funcionar bem. Se a animação for muito complexa e houver travamentos, considere rasterizar alguns elementos ou reduzir detalhes. Além disso, garantir que o Lenis esteja destruído/instanciado corretamente em roteamentos do React evita múltiplos loops rAF consumindo CPU.
Lenis versão: A resposta considera Lenis 1.2.3. Certifique-se de usar essa versão ou adaptar caso futuras versões tenham API diferente. Por exemplo, o Lenis 1.x usa lenis.on('scroll', ...) conforme mostramos; alterações na API seriam documentadas no repositório oficial.
Em resumo, é totalmente possível controlar uma animação Lottie pelo scroll do usuário usando Lenis. Basta importar a animação JSON, renderizá-la com lottie-web (desativando o autoplay), e então usar o evento de scroll suave do Lenis para definir continuamente o frame atual da animação com base na posição da página. Esse método aproveita a suavidade do Lenis para eliminar travamentos e atrasos, resultando em uma interação fluida onde a animação responde imediatamente ao scroll do usuário​
HELP.LOTTIEFILES.COM
​
CSS-TRICKS.COM
. Com as instruções e exemplo de código fornecidos, você deve conseguir implementar a solução nessa stack específica (Vite + React + TS + Lenis + Lottie). Boa codificação!