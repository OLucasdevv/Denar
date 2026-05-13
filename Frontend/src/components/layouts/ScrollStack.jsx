import { useLayoutEffect, useRef, useCallback } from 'react';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      };
    }

    const scroller = scrollerRef.current;

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }

      return element.offsetTop;
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(
      stackPosition,
      containerHeight
    );

    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement
      ? getElementOffset(endElement)
      : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);

      const triggerStart =
        cardTop - stackPositionPx - itemStackDistance * i;

      const triggerEnd =
        cardTop - scaleEndPositionPx;

      const pinStart =
        cardTop - stackPositionPx - itemStackDistance * i;

      const pinEnd =
        endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );

      const targetScale = baseScale + i * itemScale;

      const scale =
        1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount
        ? i * rotationAmount * scaleProgress
        : 0;

      let blur = 0;

      if (blurAmount) {
        let topCardIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);

          const jTriggerStart =
            jCardTop -
            stackPositionPx -
            itemStackDistance * j;

          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;

          blur = Math.max(
            0,
            depthInStack * blurAmount
          );
        }
      }

      let translateY = 0;

      const isPinned =
        scrollTop >= pinStart &&
        scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop -
          cardTop +
          stackPositionPx +
          itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd -
          cardTop +
          stackPositionPx +
          itemStackDistance * i;
      }

      const newTransform = {
        translateY:
          Math.round(translateY * 100) / 100,
        scale:
          Math.round(scale * 1000) / 1000,
        rotation:
          Math.round(rotation * 100) / 100,
        blur:
          Math.round(blur * 100) / 100
      };

      const lastTransform =
        lastTransformsRef.current.get(i);

      const hasChanged =
        !lastTransform ||
        Math.abs(
          lastTransform.translateY -
            newTransform.translateY
        ) > 0.1 ||
        Math.abs(
          lastTransform.scale -
            newTransform.scale
        ) > 0.001 ||
        Math.abs(
          lastTransform.rotation -
            newTransform.rotation
        ) > 0.1 ||
        Math.abs(
          lastTransform.blur -
            newTransform.blur
        ) > 0.1;

      if (hasChanged) {
        const transform = `
          translate3d(0, ${newTransform.translateY}px, 0)
          scale(${newTransform.scale})
          rotate(${newTransform.rotation}deg)
        `;

        const filter =
          newTransform.blur > 0
            ? `blur(${newTransform.blur}px)`
            : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(
          i,
          newTransform
        );
      }

      if (i === cardsRef.current.length - 1) {
        const isInView =
          scrollTop >= pinStart &&
          scrollTop <= pinEnd;

        if (
          isInView &&
          !stackCompletedRef.current
        ) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (
          !isInView &&
          stackCompletedRef.current
        ) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;

    requestAnimationFrame(() => {
      updateCardTransforms();
      tickingRef.current = false;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(
            '.scroll-stack-card'
          )
        : scroller.querySelectorAll(
            '.scroll-stack-card'
          )
    );

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange =
        'transform, filter';

      card.style.transformOrigin =
        'top center';

      card.style.backfaceVisibility =
        'hidden';

      card.style.transform = 'translateZ(0)';

      card.style.webkitTransform =
        'translateZ(0)';

      card.style.perspective = '1000px';

      card.style.webkitPerspective =
        '1000px';
    });

    const scrollTarget = useWindowScroll
      ? window
      : scroller;

    scrollTarget.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    updateCardTransforms();

    return () => {
      scrollTarget.removeEventListener(
        'scroll',
        handleScroll
      );

      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      tickingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    handleScroll,
    updateCardTransforms
  ]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div
      className={containerClassName}
      ref={scrollerRef}
      style={containerStyles}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}

        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;