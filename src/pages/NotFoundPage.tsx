import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('页面不存在');
  return (
    <div className="max-w-md mx-auto bg-[#f5f5f5] min-h-screen relative shadow-2xl font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 h-[76px] flex items-center shrink-0">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold leading-tight tracking-wider text-[#e60012]">
            GAMSTEK
          </span>
          <span className="text-[10px] tracking-widest font-medium text-black">
            引 力 波 智 谱
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-24 px-8 text-center pb-12">
        
        {/* Illustration */}
        <div className="relative w-64 h-48 mb-12 flex justify-center items-center">
          {/* Base gradient element */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent rounded-[100%] scale-x-[1.5] scale-y-50 bottom-0 top-auto h-24 blur-xl"></div>
          
          <div className="relative z-10 w-40 h-44 bg-gradient-to-b from-[#8fb4ff] to-[#4b7fff] rounded-xl shadow-lg border border-white/20 p-4 flex flex-col gap-3">
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-white/90"></div>
               <div className="h-2.5 bg-white/90 rounded-full w-20"></div>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-white/90"></div>
               <div className="h-2.5 bg-white/90 rounded-full w-24"></div>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-white/90"></div>
               <div className="h-2.5 bg-white/90 rounded-full w-16"></div>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-white/90"></div>
               <div className="h-2.5 bg-white/90 rounded-full w-12"></div>
             </div>
          </div>

          <div className="absolute z-20 -right-2 top-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#dce8ff] to-[#a4c0ff] border-4 border-white/40 shadow-xl flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#8fb4ff]/30"></div>
            </div>
            <div className="absolute top-[80px] right-0 w-4 h-12 bg-[#8fb4ff] rounded-full rotate-[-45deg] origin-top shadow-lg"></div>
          </div>
          
          {/* Small floating spheres */}
          <div className="absolute top-4 right-10 w-8 h-8 rounded-full bg-gradient-to-br from-white to-[#a4c0ff] shadow-md opacity-80"></div>
          <div className="absolute bottom-16 left-6 w-4 h-4 rounded-full bg-gradient-to-br from-white to-[#a4c0ff] shadow-md opacity-60"></div>
          
          {/* Floating triangles */}
          <div className="absolute top-1/2 -left-4 w-4 h-8 bg-blue-500 clip-path-triangle opacity-70 transform -rotate-12">
            <svg viewBox="0 0 24 24" fill="#3b82f6" className="w-6 h-8 text-blue-500 drop-shadow-md">
              <polygon points="12,2 22,22 2,22" />
            </svg>
          </div>
          <div className="absolute bottom-10 -left-2 w-6 h-10 bg-blue-500 clip-path-triangle opacity-80">
            <svg viewBox="0 0 24 24" fill="#60a5fa" className="w-8 h-10 text-blue-400 drop-shadow-md">
              <polygon points="12,2 22,22 2,22" />
            </svg>
          </div>
          <div className="absolute top-1/2 -right-10 w-4 h-8 bg-blue-500 clip-path-triangle opacity-70 transform rotate-12">
            <svg viewBox="0 0 24 24" fill="#3b82f6" className="w-5 h-7 text-blue-500 drop-shadow-md">
              <polygon points="12,2 22,22 2,22" />
            </svg>
          </div>

        </div>

        <h2 className="text-[26px] font-bold text-gray-900 mb-6 tracking-wide">
          网站维护中...
        </h2>
        
        <div className="text-[15px] leading-relaxed text-gray-600 space-y-1 mb-12 tracking-wide font-medium">
          <p>为您带来更优质、稳定的服务体验，</p>
          <p>我们将进行系统技术升级。升级期间</p>
          <p>给您造成的不便，敬请谅解</p>
        </div>

        <Link 
          to="/support#service"
          className="bg-[#e60012] text-white text-[16px] font-medium py-3.5 px-12 rounded-full shadow-lg hover:bg-red-700 transition-colors tracking-widest inline-block"
        >
          联系客服
        </Link>
      </div>
    </div>
  );
}
