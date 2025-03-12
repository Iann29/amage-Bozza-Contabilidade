import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface QuestionarioButtonProps
  extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  children: React.ReactNode;
  variant?: 'next' | 'prev' | 'submit';
  icon?: React.ReactNode;
}

export const QuestionarioButton: React.FC<QuestionarioButtonProps> = ({
  className,
  children,
  variant = 'next',
  icon,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [circles, setCircles] = useState<Array<{
    id: number;
    x: number;
    y: number;
  }>>([]);
  const lastAddedRef = useRef(0);

  // Definindo as cores com base na variante
  const getColors = () => {
    switch (variant) {
      case 'next':
        return { main: '#36c03b', gradient: 'linear-gradient(90deg, #36c03b, #2aa020)' };
      case 'prev':
        return { main: '#475b73', gradient: 'linear-gradient(90deg, #5c7693, #475b73)' };
      case 'submit':
        return { main: '#3e5992', gradient: 'linear-gradient(90deg, #3e5992, #1d4d85)' };
      default:
        return { main: '#36c03b', gradient: 'linear-gradient(90deg, #36c03b, #2aa020)' };
    }
  };

  const colors = getColors();

  // Criando um círculo na posição do mouse
  const createCircle = useCallback((x: number, y: number) => {
    setCircles((prev) => [
      ...prev,
      { id: Date.now(), x, y },
    ]);
  }, []);

  // Tratando o movimento do mouse sobre o botão
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!isHovering) return;
      
      const currentTime = Date.now();
      if (currentTime - lastAddedRef.current > 100) {
        lastAddedRef.current = currentTime;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createCircle(x, y);
      }
    },
    [isHovering, createCircle]
  );

  // Limpando os círculos após um tempo
  useEffect(() => {
    if (circles.length > 0) {
      const timer = setTimeout(() => {
        setCircles((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [circles]);

  // Classe CSS baseada na variante
  const getVariantClass = () => {
    switch (variant) {
      case 'next': return 'btn-next';
      case 'prev': return 'btn-prev';
      case 'submit': return 'btn-submit';
      default: return 'btn-next';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${getVariantClass()} ${className || ''} relative isolate overflow-hidden`}
      style={{
        background: colors.gradient,
        '--circle-color': colors.main,
      } as React.CSSProperties}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerMove={handlePointerMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {circles.map((circle) => (
        <span
          key={circle.id}
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md pointer-events-none z-10 opacity-70 animate-pulse-fast"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            background: colors.main,
          }}
        />
      ))}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
    </motion.button>
  );
};

export default QuestionarioButton;
