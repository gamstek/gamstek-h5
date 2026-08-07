import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function SupportPage() {
  useDocumentTitle('服务与支持');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Add a small delay to ensure the page is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full bg-[#f9fafb] pb-20">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 bg-gray-900 overflow-hidden min-h-[400px] flex items-center">
        {/* Background image placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
            alt="Support" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 w-full text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-white mb-6 tracking-wider"
          >
            服务与支持
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-200 px-4 max-w-sm mx-auto leading-relaxed"
          >
            欢迎使用引力波智谱服务支持，在这里您可以获取更为详细的产品内容文档和专家全天服务
          </motion.p>
        </div>
      </div>

      {/* Downloads Section */}
      <div id="downloads" className="pt-16 px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 tracking-wider">下载中心</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
           <div className="flex-1 z-10">
             <h3 className="text-xl font-medium text-gray-900 mb-6 leading-tight">
               三重四极杆<br/>串联质谱联用仪系列
             </h3>
             <button className="bg-[#cc0000] text-white px-8 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors">
               下载手册
             </button>
           </div>
           <div className="w-full sm:w-1/2 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1568205612837-017257d2310a?auto=format&fit=crop&q=80&w=400" 
                alt="Brochure" 
                className="w-full h-auto rounded-lg shadow-md bg-gray-100"
              />
           </div>
           {/* Decorative background element */}
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 rounded-full z-0"></div>
        </div>
      </div>

      {/* Services Section */}
      <div id="service" className="pt-20 px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 tracking-wider">服务与支持</h2>
        
        <div className="space-y-6">
          {/* Online Support Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative h-40">
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" 
              alt="Online Support" 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">在线客服</h3>
              <p className="text-gray-600">周一至周日：9:00 - 21:00</p>
            </div>
          </div>

          {/* Hotline Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative h-40">
            <img 
              src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800" 
              alt="Hotline Support" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">热线客服</h3>
              <p className="text-xl font-bold text-gray-800 mb-1">400-0233-929</p>
              <p className="text-gray-600 text-sm">周一至周日：9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
