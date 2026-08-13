import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import opticsStep1 from '../../assets/ftms/ion-optics/step-1.png';
import opticsStep2 from '../../assets/ftms/ion-optics/step-2.png';
import opticsStep3 from '../../assets/ftms/ion-optics/step-3.png';
import opticsStep4 from '../../assets/ftms/ion-optics/step-4.png';
import opticsStep5 from '../../assets/ftms/ion-optics/step-5.png';
import opticsStep6 from '../../assets/ftms/ion-optics/step-6.png';
import opticsStep7 from '../../assets/ftms/ion-optics/step-7.png';

const opticsSteps = [
  opticsStep1,
  opticsStep2,
  opticsStep3,
  opticsStep4,
  opticsStep5,
  opticsStep6,
  opticsStep7,
];

export function FTMSOpticsStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(opticsSteps.length - 1, Math.floor(progress * opticsSteps.length));
    setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
  });

  return (
    <section ref={sectionRef} className="relative h-[700svh] bg-[#0a0a0a]">
      <div className="sticky top-[76px] h-[calc(100svh-76px)] overflow-hidden px-3 flex flex-col items-center">
        <h3 className="shrink-0 pt-20 text-[21px] font-normal tracking-normal absolute">先进的离子光学系统</h3>

        <div className="relative flex-1 w-full max-w-md flex items-center justify-center">
          <AnimatePresence initial={false}>
            <motion.img
              key={activeIndex}
              src={opticsSteps[activeIndex]}
              alt={`先进的离子光学系统 ${activeIndex + 1}/${opticsSteps.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="absolute w-full max-h-full object-contain"
            />
          </AnimatePresence>
        </div>

        <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex flex-col gap-2" aria-hidden="true">
          {opticsSteps.map((_, index) => (
            <span
              key={index}
              className={`w-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'h-5 bg-[#00a8e8]' : 'h-1 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
