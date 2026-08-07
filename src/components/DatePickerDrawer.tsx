import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface DatePickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
}

const Wheel = ({ options, value, onChange }: { options: number[], value: number, onChange: (v: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 44; 
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !isScrollingRef.current) {
      const index = options.indexOf(value);
      if (index !== -1) {
        containerRef.current.scrollTo({ top: index * itemHeight, behavior: 'smooth' });
      }
    }
  }, [value, options]);

  const handleScroll = () => {
    isScrollingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      if (containerRef.current) {
        const index = Math.round(containerRef.current.scrollTop / itemHeight);
        if (options[index] !== undefined && options[index] !== value) {
          onChange(options[index]);
        }
      }
    }, 100);
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[220px] overflow-y-auto snap-y snap-mandatory hide-scrollbar flex flex-col flex-1"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="h-[88px] shrink-0 pointer-events-none"></div>
      {options.map((opt) => (
        <div 
          key={opt}
          onClick={() => onChange(opt)}
          className={`h-[44px] shrink-0 flex items-center justify-center snap-center text-[18px] transition-all duration-300 cursor-pointer select-none ${value === opt ? 'text-gray-900 font-medium scale-110' : 'text-gray-400 scale-100'}`}
        >
          {opt}
        </div>
      ))}
      <div className="h-[88px] shrink-0 pointer-events-none"></div>
    </div>
  );
}

export function DatePickerDrawer({ isOpen, onClose, onConfirm }: DatePickerDrawerProps) {
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start');
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const [startYear, setStartYear] = useState(currentYear - 4);
  const [startMonth, setStartMonth] = useState(9);
  
  const [endYear, setEndYear] = useState(currentYear);
  const [endMonth, setEndMonth] = useState(currentMonth);

  // Constraints enforcement
  useEffect(() => {
    let newEndYear = endYear;
    let newEndMonth = endMonth;

    if (newEndYear < startYear) {
      newEndYear = startYear;
    }
    if (newEndYear === startYear && newEndMonth < startMonth) {
      newEndMonth = startMonth;
    }
    if (newEndYear > currentYear) {
      newEndYear = currentYear;
    }
    if (newEndYear === currentYear && newEndMonth > currentMonth) {
      newEndMonth = currentMonth;
    }

    if (newEndYear !== endYear) setEndYear(newEndYear);
    if (newEndMonth !== endMonth) setEndMonth(newEndMonth);
  }, [startYear, startMonth, endYear, endMonth, currentYear, currentMonth]);

  const baseYears = Array.from({length: 50}, (_, i) => currentYear - 49 + i);
  const allMonths = Array.from({length: 12}, (_, i) => i + 1);

  // START constraints: cannot exceed current date, and arguably shouldn't exceed end date, 
  // but if it does, the effect above moves the end date forward.
  const startYearOptions = baseYears.filter(y => y <= currentYear);
  const startMonthOptions = allMonths.filter(m => {
    if (startYear === currentYear) return m <= currentMonth;
    return true;
  });

  // END constraints: cannot be less than start date, cannot exceed current date
  const endYearOptions = baseYears.filter(y => y >= startYear && y <= currentYear);
  const endMonthOptions = allMonths.filter(m => {
    if (endYear === startYear && endYear === currentYear) return m >= startMonth && m <= currentMonth;
    if (endYear === startYear) return m >= startMonth;
    if (endYear === currentYear) return m <= currentMonth;
    return true;
  });

  const handleConfirm = () => {
    const startStr = `${startYear}.${startMonth.toString().padStart(2, '0')}`;
    const endStr = `${endYear}.${endMonth.toString().padStart(2, '0')}`;
    onConfirm(startStr, endStr);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-none z-[101] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button type="button" onClick={onClose} className="text-[15px] text-gray-500 px-2 py-1">取消</button>
              <button type="button" onClick={handleConfirm} className="text-[15px] text-gray-900 font-medium px-2 py-1">确定</button>
            </div>

            {/* Picker Area */}
            <div className="relative flex w-full bg-white">
              {/* Selection Band */}
              <div className="absolute top-[50%] left-0 right-0 h-[44px] -translate-y-1/2 border-y border-gray-100 pointer-events-none"></div>
              
              {activeTab === 'start' ? (
                <>
                  <Wheel options={startYearOptions} value={startYear} onChange={setStartYear} />
                  <Wheel options={startMonthOptions} value={startMonth} onChange={setStartMonth} />
                </>
              ) : (
                <>
                  <Wheel options={endYearOptions} value={endYear} onChange={setEndYear} />
                  <Wheel options={endMonthOptions} value={endMonth} onChange={setEndMonth} />
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setActiveTab('start')}
                className={`flex-1 py-4 text-[15px] font-medium transition-colors ${activeTab === 'start' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                开始时间
              </button>
              <div className="w-[1px] bg-gray-200 my-4"></div>
              <button 
                type="button"
                onClick={() => setActiveTab('end')}
                className={`flex-1 py-4 text-[15px] font-medium transition-colors ${activeTab === 'end' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                结束时间
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
