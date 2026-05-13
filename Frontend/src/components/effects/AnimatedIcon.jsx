import Lottie from "lottie-react";
import { useRef, useEffect } from "react";

const BLACK_RE = /^(#000|#000000|rgb\(0,\s*0,\s*0\)|rgba\(0,\s*0,\s*0,\s*1\)|black)$/i;
const BRAND_COLORS = ['#f97316']; 

const isBrand = (c) => {
  if (!c) return false;
  return BRAND_COLORS.includes(c.toLowerCase());
};

const AnimatedIcon = ({ animationData, size = 24, isHovered = false }) => {
  const lottieRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isHovered) lottieRef.current?.play?.();
    else lottieRef.current?.stop?.();
    
    const syncColors = () => {
      const svg = container.querySelector('svg');
      if (!svg) return;
      const els = svg.querySelectorAll('[fill],[stroke]');
      els.forEach((el) => {
        const fill = el.getAttribute('fill');
        const stroke = el.getAttribute('stroke');

        if (fill && BLACK_RE.test(fill) && !isBrand(fill)) {
          el.setAttribute('fill', 'currentColor');
          el.classList.add('icon-neutral');
        }
        if (stroke && BLACK_RE.test(stroke) && !isBrand(stroke)) {
          el.setAttribute('stroke', 'currentColor');
          el.classList.add('icon-neutral');
        }
      });
    };

    // primeira aplicação
    syncColors();

    // reaplicar quando Lottie/Lordicon modificar o SVG
    const mo = new MutationObserver(syncColors);
    mo.observe(container, { childList: true, subtree: true, attributes: true });

    return () => mo.disconnect();
  }, [animationData, isHovered]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center icon-theme-filter"
      style={{ width: size, height: size }}
    >
      <div
        onMouseEnter={() => lottieRef.current?.play?.()}
        onMouseLeave={() => lottieRef.current?.stop?.()}
        style={{ width: '100%', height: '100%' }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default AnimatedIcon;