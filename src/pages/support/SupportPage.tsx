import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import supportBg from '../../assets/support/bg.jpg';
import supportHeroBg from '../../assets/support/hero-bg.jpg';
import supportBrochure from '../../assets/support/brochure.jpg';
import supportService from '../../assets/support/service.jpg';

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
      <div className="relative aspect-[750/844] w-full bg-gray-900 overflow-hidden flex items-center justify-center">
        <img 
          src={supportBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-full text-center px-4 pt-12">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[28px] font-bold text-white mb-6 tracking-wider"
          >
            服务与支持
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-gray-200 px-4 max-w-sm mx-auto leading-relaxed"
          >
            欢迎使用引力波智谱服务支持，在这里您可以获取更为详细的产品内容文档和专家全天服务
          </motion.p>
        </div>
      </div>

      {/* Downloads Section */}
      <div id="downloads" className="pt-16 px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 tracking-wider">下载中心</h2>
        {/* 卡片背景图 hero-bg 为 690x542，容器按同比例自适应 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center overflow-hidden relative aspect-[690/542]">
           {/* 背景图：hero-bg */}
           <div className="absolute inset-0 z-0">
             <img 
               src={supportHeroBg} 
               alt="" 
               className="w-full h-full object-cover"
             />
           </div>
           <div className="flex-1 z-10 flex flex-col justify-center">
             <h3 className="text-[15px] font-medium text-gray-900 mb-6 leading-tight">
               三重四极杆<br/>串联质谱联用仪系列
             </h3>
             <Link to="/inquiry" className="self-start inline-block bg-[#cc0000] text-white px-8 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors">
               下载手册
             </Link>
           </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="service" className="pt-20 px-4 scroll-mt-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 tracking-wider">服务与支持</h2>
        
        <div className="space-y-6">
          {/* Online Support Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative h-40">
            <img 
              src={supportBrochure} 
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
              src={supportService} 
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
