import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  transitionType = 'slide', 
  className = 'h-[100dvh]',
  contentClassName = 'pt-32',
  titleClassName = 'text-[2.5rem]',
}: HeroCarouselProps & { transitionType?: 'slide' | 'fade', className?: string, contentClassName?: string, titleClassName?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const navigate = useNavigate();

  const paginate = (newDirection: number, absoluteIndex?: number, isManual = false) => {
    setDirection(newDirection);
    if (isManual) {
      setLastInteraction(Date.now());
    }
    if (absoluteIndex !== undefined) {
      setCurrentIndex(absoluteIndex);
    } else {
      setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlay, interval, lastInteraction]);

  // Handlers for manual swipe if needed
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      paginate(1, undefined, true);
    } else if (info.offset.x > 50) {
      paginate(-1, undefined, true);
    }
  };

  const variants = {
    enter: (direction: number) => {
      if (transitionType === 'fade') {
        return { opacity: 0, scale: 1.05 };
      }
      return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      if (transitionType === 'fade') {
        return { opacity: 0, scale: 0.95 };
      }
      return { zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 };
    }
  };

  return (
    <div className={`relative w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {/* Background Image / Floor Gradient */}
          <div className="absolute inset-0 w-full h-full bg-[#111]">
            <img 
              src={slides[currentIndex].image} 
              alt={slides[currentIndex].title} 
              className="w-full h-full object-cover opacity-80"
            />
            {/* Gradient overlay to make text readable and blend edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/80"></div>
          </div>
          
          {/* Content */}
          <div className={`absolute inset-0 flex flex-col items-center justify-start px-4 z-10 ${contentClassName}`}>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`${titleClassName} font-bold text-white mb-3 tracking-wider text-center`}
            >
              {slides[currentIndex].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg font-medium text-white mb-2 tracking-widest text-center"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm text-gray-300 mb-8 tracking-widest text-center"
            >
              {slides[currentIndex].description}
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4"
            >
              <button 
                onClick={() => navigate(`/inquiry?product=${encodeURIComponent(slides[currentIndex].title)}`)}
                className="bg-white text-black px-8 py-2.5 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors w-32 shadow-lg"
              >
                {slides[currentIndex].primaryButtonText || '购买咨询'}
              </button>
              {!slides[currentIndex].hideSecondaryButton && (
                slides[currentIndex].detailsLink ? (
                  <Link to={slides[currentIndex].detailsLink} className="border border-white text-white px-8 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors w-32 shadow-lg backdrop-blur-sm bg-black/20 text-center flex items-center justify-center">
                    {slides[currentIndex].secondaryButtonText || '了解更多'}
                  </Link>
                ) : (
                  <button className="border border-white text-white px-8 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors w-32 shadow-lg backdrop-blur-sm bg-black/20">
                    {slides[currentIndex].secondaryButtonText || '了解更多'}
                  </button>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => paginate(idx > currentIndex ? 1 : -1, idx, true)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
