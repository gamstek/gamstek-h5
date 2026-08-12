import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  detailsLink?: string;
  hideSecondaryButton?: boolean;
  // 主按钮跳转链接（未设置时默认跳转在线咨询）
  primaryLink?: string;
  // 图片本身已含文字时置 true，隐藏叠加的标题/副标题/描述/按钮
  hideContent?: boolean;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}

export function HeroCarousel({
  slides,
  autoPlay = true,
  interval = 5000,
  className = 'aspect-[9/16] w-full',
  contentClassName = 'pt-32',
  titleClassName = 'text-[2.5rem]',
}: HeroCarouselProps & { className?: string; contentClassName?: string; titleClassName?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const currentIndexRef = useRef(0);
  const x = useMotionValue(0);
  const navigate = useNavigate();
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indicatorIndex, setIndicatorIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => {
      animationRef.current?.stop();
      x.set(0);
      setIsAnimating(false);
      setIndicatorIndex(currentIndexRef.current);
      setContainerWidth(viewport.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [x]);

  const slideTo = useCallback((direction: 1 | -1, targetIndex?: number, isManual = false) => {
    if (!hasMultipleSlides || !containerWidth || isAnimating) return;
    if (isManual) setLastInteraction(Date.now());

    const nextIndex = targetIndex ?? (currentIndex + direction + slides.length) % slides.length;
    setIndicatorIndex(nextIndex);
    setIsAnimating(true);
    animationRef.current?.stop();
    animationRef.current = animate(x, -direction * containerWidth, {
      type: 'spring',
      stiffness: 280,
      damping: 32,
      mass: 0.8,
      velocity: 0,
      onComplete: () => {
        currentIndexRef.current = nextIndex;
        flushSync(() => setCurrentIndex(nextIndex));
        x.set(0);
        setIsAnimating(false);
      },
    });
  }, [containerWidth, currentIndex, hasMultipleSlides, isAnimating, slides.length, x]);

  useEffect(() => {
    if (!autoPlay || !hasMultipleSlides || isDragging || isAnimating) return;
    const timer = window.setInterval(() => slideTo(1), interval);
    return () => window.clearInterval(timer);
  }, [autoPlay, hasMultipleSlides, interval, isAnimating, isDragging, lastInteraction, slideTo]);

  useEffect(() => () => animationRef.current?.stop(), []);

  const handleDragEnd = (_event: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false);
    const shouldChange = Math.abs(info.offset.x) > Math.min(70, containerWidth * 0.18)
      || Math.abs(info.velocity.x) > 500;

    if (shouldChange) {
      slideTo(info.offset.x < 0 ? 1 : -1, undefined, true);
      return;
    }

    animationRef.current?.stop();
    animationRef.current = animate(x, 0, {
      type: 'spring',
      stiffness: 320,
      damping: 34,
    });
    setLastInteraction(Date.now());
  };

  const handleDotClick = (targetIndex: number) => {
    if (targetIndex === currentIndex || isAnimating) return;
    const forwardDistance = (targetIndex - currentIndex + slides.length) % slides.length;
    const backwardDistance = (currentIndex - targetIndex + slides.length) % slides.length;
    slideTo(forwardDistance <= backwardDistance ? 1 : -1, targetIndex, true);
  };

  const renderSlide = (slide: HeroSlide, offset: number) => (
    <motion.div
      key={slide.id}
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{ x: offset * containerWidth }}
    >
      <div className="absolute inset-0 w-full h-full bg-[#111]">
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-80" />
      </div>

      {offset === 0 && (
        <div className={`absolute inset-0 flex flex-col items-center justify-start px-4 z-10 ${contentClassName}`}>
          <div className={slide.hideContent ? 'invisible' : ''}>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className={`${titleClassName} opacity-0 font-bold text-white mb-3 tracking-wider text-center`}>
              {slide.title}
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="opacity-0 text-lg font-medium text-white mb-2 tracking-widest text-center">
              {slide.subtitle}
            </motion.p>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="opacity-0 text-sm text-gray-300 mb-8 tracking-widest text-center">
              {slide.description}
            </motion.p>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="opacity-0 flex gap-4">
            <button onClick={() => navigate(slide.primaryLink || `/inquiry?product=${encodeURIComponent(slide.title)}`)} className="bg-white text-black px-8 py-2.5 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors w-32 shadow-lg">
              {slide.primaryButtonText || '购买咨询'}
            </button>
            {!slide.hideSecondaryButton && (
              slide.detailsLink ? (
                <Link to={slide.detailsLink} className="border border-white text-white px-8 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors w-32 shadow-lg backdrop-blur-sm bg-black/20 text-center flex items-center justify-center">
                  {slide.secondaryButtonText || '了解更多'}
                </Link>
              ) : (
                <button className="border border-white text-white px-8 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors w-32 shadow-lg backdrop-blur-sm bg-black/20">
                  {slide.secondaryButtonText || '了解更多'}
                </button>
              )
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );

  const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  return (
    <div ref={viewportRef} className={`relative w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center ${className}`}>
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{ x }}
        drag={hasMultipleSlides && !isAnimating ? 'x' : false}
        dragConstraints={{ left: -containerWidth, right: containerWidth }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          animationRef.current?.stop();
          setIsDragging(true);
        }}
        onDragEnd={handleDragEnd}
      >
        {hasMultipleSlides && renderSlide(slides[previousIndex], -1)}
        {renderSlide(slides[currentIndex], 0)}
        {hasMultipleSlides && renderSlide(slides[nextIndex], 1)}
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              indicatorIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
