import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Inicializa o Lenis focando na janela (window)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1, // Quanto menor, mais "pesado/suave" é o scroll
    });

    // O "coração" da animação: liga o Lenis ao RequestAnimationFrame do navegador
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpa tudo quando o componente for desmontado
    return () => {
      lenis.destroy();
    };
  }, []);
};