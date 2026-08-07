import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: 'default' | 'action';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  heightClass?: string;
}

export function BottomSheet({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  variant = 'default',
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
  heightClass = 'max-h-[90vh]'
}: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-x-0 bottom-0 ${variant === 'default' ? 'top-[76px] z-[90]' : 'top-0 z-[200]'} flex flex-col justify-end pointer-events-none`}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto max-w-md mx-auto"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`relative w-full max-w-md mx-auto bg-[#f9fafb] shadow-2xl flex flex-col pointer-events-auto ${variant === 'default' ? 'h-full rounded-none' : `rounded-t-2xl ${heightClass}`}`}
          >
            {/* Header */}
            {variant === 'default' ? (
              <div className="flex items-center justify-between px-6 py-5 shrink-0">
                <h2 className="text-[20px] font-bold text-gray-900 tracking-wider">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-1 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-8 h-8 stroke-[1.2]" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center px-6 py-4 shrink-0 relative border-b border-gray-100">
                <h2 className="text-[17px] font-medium text-gray-900">{title}</h2>
                <button 
                  onClick={onClose}
                  className="absolute right-4 p-1 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>
            )}
            
            {/* Content Container */}
            <div className={`px-6 overflow-y-auto hide-scrollbar text-[15px] leading-[1.8] text-[#333] relative flex-1 ${variant === 'default' ? 'pb-6' : 'pb-0'}`}>
              {children}
            </div>
            
            {/* Action Footer */}
            {variant === 'action' && (
              <div className="px-6 py-4 flex gap-4 shrink-0 bg-[#f9fafb]">
                <button 
                  onClick={onCancel || onClose}
                  className="flex-1 py-2.5 border border-[#d32f2f] text-[#d32f2f] rounded-full text-[16px] font-medium transition-colors hover:bg-red-50"
                >
                  {cancelText}
                </button>
                <button 
                  onClick={onConfirm}
                  className="flex-1 py-2.5 bg-[#d32f2f] text-white rounded-full text-[16px] font-medium transition-colors hover:bg-red-700"
                >
                  {confirmText}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
