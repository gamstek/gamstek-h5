import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface CaseItem {
  id: string;
  tag: string;
  image: string;
}

export function CaseCarousel({ items }: { items: CaseItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getOffset = (index: number, active: number, total: number) => {
    let offset = (index - active) % total;
    if (offset < 0) offset += total;
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    }
    return offset;
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  const dragInfo = useRef({ isDragging: false, startX: 0, startY: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    dragInfo.current = {
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY
    };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    if (Math.sqrt(dx * dx + dy * dy) > 5) {
      dragInfo.current.isDragging = true;
    } else {
      dragInfo.current.isDragging = false;
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 30;
    if (info.offset.x < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <div 
        className="w-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[220px] overflow-hidden mb-6 touch-pan-y">
        <motion.div 
          className="w-full h-full relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onPointerDownCapture={handlePointerDown}
          onPointerUpCapture={handlePointerUp}
        >
          {items.map((item, index) => {
            const offset = getOffset(index, activeIndex, items.length);
            
            let x = "-50%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            
            if (offset === 0) {
              x = "-50%";
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (offset === -1) {
              x = "calc(-150% - 12px)";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 5;
            } else if (offset === 1) {
              x = "calc(50% + 12px)";
              scale = 0.85;
              opacity = 0.5;
              zIndex = 5;
            } else {
              x = offset < 0 ? "calc(-250% - 24px)" : "calc(150% + 24px)";
              scale = 0.75;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={item.id}
                className="absolute top-0 left-[50%] w-[55%] h-full rounded-2xl overflow-hidden shadow-sm bg-gray-100 cursor-pointer pointer-events-auto"
                initial={false}
                animate={{ x, scale, opacity, zIndex }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={(e) => {
                  if (dragInfo.current.isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  navigate('/cases');
                }}
              >
                <div className="absolute top-2 left-2 z-10 bg-[#e60012] text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm pointer-events-none">
                  {item.tag}
                </div>
                <img src={item.image} alt={item.tag} className="w-full h-full object-cover pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-1.5 mb-8">
        {items.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'w-4 bg-gray-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
