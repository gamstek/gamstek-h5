import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string, type?: ToastType) => void;
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((options: ToastOptions | string, type: ToastType = 'info') => {
    const opts: ToastOptions = typeof options === 'string' ? { message: options, type } : options;
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const toastItem: ToastItem = {
      id,
      message: opts.message,
      type: opts.type || 'info',
      duration: opts.duration || 2000
    };

    setToasts(prev => [...prev, toastItem]);

    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, toastItem.duration);
  }, []);

  const toast = {
    success: useCallback((message: string, duration?: number) => showToast({ message, type: 'success', duration }), [showToast]),
    error: useCallback((message: string, duration?: number) => showToast({ message, type: 'error', duration }), [showToast]),
    info: useCallback((message: string, duration?: number) => showToast({ message, type: 'info', duration }), [showToast])
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {/* Fixed Toast Portal Overlay */}
      <div className="fixed inset-x-0 top-[88px] z-[300] pointer-events-none flex flex-col items-center justify-start gap-3 px-6">
        <AnimatePresence>
          {toasts.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 0.85, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#2b2b2b] backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 max-w-[85vw] pointer-events-auto"
            >
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-white shrink-0 stroke-[1.8]" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-white shrink-0 stroke-[1.8]" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-white shrink-0 stroke-[1.8]" />}
              <span className="text-[14px] font-medium leading-snug break-words text-center">{item.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}
