import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function CampusSubmitSuccessPage() {
  useDocumentTitle('投递成功');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-[76px] flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full flex flex-col items-center mt-20"
      >
        {/* Placeholder for the illustration - combining icons and shapes to mimic the design */}
        <div className="relative w-64 h-48 mb-8 flex justify-center items-center">
           {/* Decorative elements representing the illustration */}
           <div className="absolute inset-0 bg-[#e6f7f2] rounded-full opacity-40 blur-3xl"></div>
           <div className="relative z-10 flex items-center justify-center bg-white w-32 h-32 rounded-full shadow-lg">
             <CheckCircle2 className="w-16 h-16 text-[#10b981]" />
           </div>
           
           {/* Floating elements to mimic the graphic's lively feel */}
           <div className="absolute top-4 right-10 bg-[#10b981] w-8 h-8 rounded-full flex items-center justify-center z-20 shadow-md">
             <CheckCircle2 className="w-6 h-6 text-white" />
           </div>
           <div className="absolute bottom-8 left-4 bg-blue-100 w-12 h-8 rounded-md -rotate-12 opacity-60"></div>
           <div className="absolute top-1/2 right-0 bg-red-50 w-10 h-10 rounded-full opacity-60"></div>
        </div>

        <h2 className="text-[20px] font-medium text-gray-900 mb-12">投递成功</h2>

        <div className="w-full space-y-4 max-w-sm">
          <button
            onClick={() => navigate('/campus-recruitment')}
            className="w-full py-3.5 bg-[#d32f2f] text-white text-[16px] font-medium rounded-md shadow-sm hover:bg-red-700 transition-colors"
          >
            继续浏览职位
          </button>
          
          <button
            onClick={() => navigate('/campus-recruitment/records')}
            className="w-full py-3.5 bg-transparent border border-[#d32f2f] text-[#d32f2f] text-[16px] font-medium rounded-md hover:bg-red-50 transition-colors"
          >
            查看应聘记录
          </button>
        </div>
      </motion.div>
    </div>
  );
}
