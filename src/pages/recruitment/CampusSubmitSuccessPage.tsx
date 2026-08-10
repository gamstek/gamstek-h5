import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import successImage from '../../assets/campus-recruitment/success.png';

export function CampusSubmitSuccessPage() {
  useDocumentTitle('校园招聘');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-[76px] flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full flex flex-col items-center mt-20"
      >
        <div className="w-64 mb-8">
          <img
            src={successImage}
            alt="投递成功"
            className="w-full h-auto object-contain"
          />
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
