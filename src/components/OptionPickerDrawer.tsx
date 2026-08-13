import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface OptionPickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  title: string;
}

export function OptionPickerDrawer({ isOpen, onClose, options, value, onSelect, title }: OptionPickerDrawerProps) {
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
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-none z-[101] flex flex-col overflow-hidden shadow-2xl pb-safe"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button type="button" onClick={onClose} className="text-[15px] text-gray-500 px-2 py-1">取消</button>
              <div className="text-[16px] font-medium text-gray-900">{title}</div>
              <div className="w-[46px]"></div> {/* Spacer to balance the '取消' button */}
            </div>

            {/* Options */}
            <div className="max-h-[300px] overflow-y-auto" style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}>
              {options.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => {
                    onSelect(opt);
                    onClose();
                  }}
                  className={`py-4 text-center text-[16px] transition-colors border-b border-gray-50 last:border-0 cursor-pointer ${value === opt ? 'text-blue-600 font-medium bg-blue-50/30' : 'text-gray-900'}`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
