import React, { useEffect } from 'react';
import { GraduationCap, Cpu, Handshake } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/config';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function CompanyIntroPage() {
  useDocumentTitle('公司介绍');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#capabilities') {
      const element = document.getElementById('capabilities');
      if (element) {
        // Adding a slight delay ensures layout is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[360px] w-full overflow-hidden flex flex-col items-center justify-start pt-16">
        <div className="relative z-10 text-center mt-6">
          <h1 className="text-4xl font-bold tracking-widest mb-4">{siteConfig.title}</h1>
          <p className="text-lg font-light tracking-[0.2em] opacity-90">{siteConfig.subtitle}</p>
        </div>
        
        {/* Colorful glowing waves effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[100px] bg-gradient-to-r from-blue-700 via-orange-500 to-blue-700 rounded-[100%] blur-[25px] opacity-70 mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60px] bg-gradient-to-r from-blue-400 via-white to-blue-400 rounded-[100%] blur-[15px] opacity-90 mix-blend-overlay" />
          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-30" />
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="px-6 py-12 text-[15px] leading-relaxed tracking-wide text-gray-200">
        {siteConfig.aboutText.map((paragraph, index) => (
          <p key={index} className="mb-6 indent-8 text-justify">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="bg-[#f8f9fa] text-gray-900 py-16 px-6">
        <h2 className="text-2xl font-medium text-center mb-10">核心能力</h2>
        
        <div className="space-y-6 max-w-sm mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">70</span>
              <span className="text-xl ml-1">%</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">团队硕士以上学历</p>
            <div className="w-24 h-24 text-gray-200">
              <GraduationCap className="w-full h-full text-gray-300 fill-gray-200 drop-shadow-md" strokeWidth={1} />
              <div className="relative -mt-10 ml-12 text-[#e60012]">
                <div className="w-1.5 h-10 bg-[#e60012] origin-top rotate-[25deg]" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">95</span>
              <span className="text-xl ml-1">%</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">零部件实现完全自主可控</p>
            <div className="w-24 h-24 relative flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg relative z-10 shadow-sm border border-gray-100" />
              <div className="absolute left-0 w-8 h-2 bg-gray-300 top-8 rounded-full" />
              <div className="absolute left-0 w-8 h-2 bg-gray-300 top-14 rounded-full" />
              <div className="absolute right-0 w-8 h-2 bg-gray-300 top-8 rounded-full" />
              <div className="absolute right-0 w-8 h-2 bg-gray-300 top-14 rounded-full" />
              <div className="absolute left-4 top-10 w-2 h-2 rounded-full bg-[#e60012] z-20 shadow-sm" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">20</span>
              <span className="text-3xl ml-1">+</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">生态合作伙伴</p>
            <div className="w-24 h-24 relative">
              <Handshake className="w-full h-full text-gray-300 fill-gray-200 drop-shadow-sm" strokeWidth={1} />
              <div className="absolute bottom-2 left-4 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#e60012]" />
                <div className="w-2 h-2 rounded-full bg-[#e60012]" />
                <div className="w-2 h-2 rounded-full bg-[#e60012]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-[#f8f9fa] text-gray-900 pb-16 pt-8 px-6 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        
        <h2 className="text-2xl font-medium text-center mb-10 relative z-10">加入我们</h2>
        
        <div className="bg-white rounded-3xl p-10 text-center relative z-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-sm mx-auto">
          <p className="text-[16px] text-gray-800 leading-loose mb-10 font-medium whitespace-pre-line">
            {siteConfig.joinUsText}
          </p>
          <Link to="#" className="inline-block bg-[#e60012] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:bg-red-700 transition-colors shadow-sm">
            查看所有职位
          </Link>
        </div>
      </section>
    </div>
  );
}
