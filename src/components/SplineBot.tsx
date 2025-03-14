import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

const SplineBot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpar qualquer renderizador existente
    if (rendererRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
    }

    // Configuração de tamanho para o container
    const width = 80; // Tamanho do container em pixels
    const height = 80;

    // Camera
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, 
      height / 2, height / -2, 
      -50000, 10000
    );
    camera.position.set(0, 0, 0);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

    // Scene
    const scene = new THREE.Scene();

    // Spline scene - usando o arquivo local
    const loader = new SplineLoader();
    loader.load(
      '/logo.splinecode', // Carrega do diretório public
      (splineScene) => {
        scene.add(splineScene);
      }
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Fundo transparente
    });
    renderer.setSize(width, height);
    
    // Configurações da cena
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearAlpha(0); // Fundo transparente
    
    // Adiciona o renderer ao container
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit controls com restrições de movimento
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    controls.enableZoom = false; // Desabilita zoom
    controls.enablePan = false;  // Desabilita pan
    controls.rotateSpeed = 0.5;  // Reduz velocidade de rotação

    // Função de animação
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    // Inicia a animação
    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 w-20 h-20 cursor-pointer transition-all duration-300 hover:scale-110 rounded-full bg-white/90 shadow-lg border border-blue-100 overflow-hidden flex items-center justify-center"
      ref={containerRef}
      title="Clique para abrir o chatbot"
      onClick={() => alert('Chatbot em desenvolvimento!')}
    />
  );
};

export default SplineBot;
