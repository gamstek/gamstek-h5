import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/config';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import companyImg1 from '../../assets/about/company/1@2x.png';
import companyImg2 from '../../assets/about/company/2@2x.png';
import companyImg3 from '../../assets/about/company/3@2x.png';
import companyBg from '../../assets/about/company/bg.png';
import companyTopBg from '../../assets/about/company/top-bg.png';

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
      {/* Top Banner & Intro Section - 背景图 top-bg.png (750x1940, 9:23.28)，按比例 aspect-[750/1940] 呈现 */}
      <section className="relative aspect-[750/1940] w-full overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6">
        <img 
          src={companyTopBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        {/* Hero Title */}
        <div className="relative z-10 text-center mt-2 mb-6">
          <h1 className="text-4xl font-bold tracking-widest mb-3">{siteConfig.title}</h1>
          <p className="text-lg font-light tracking-[0.2em] opacity-90">{siteConfig.subtitle}</p>
        </div>

        {/* Intro Text Section on top of background */}
        <div className="relative z-10 text-[14px] leading-relaxed tracking-wide text-gray-100 mb-4">
          {siteConfig.aboutText.map((paragraph, index) => (
            <p key={index} className="mb-3 indent-8 text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="bg-[#f8f9fa] text-gray-900 py-16 px-6">
        <h2 className="text-2xl font-medium text-center mb-10">核心能力</h2>
        
        <div className="space-y-6 max-w-sm mx-auto">
          {/* Card 1 - 团队硕士以上学历 */}
          <div className="bg-[#F5F5F5] rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">70</span>
              <span className="text-xl ml-1">%</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">团队硕士以上学历</p>
            {/* @2x 图：缩小一倍显示 */}
            <img src={companyImg1} alt="团队硕士以上学历" className="w-1/2 h-auto rounded-xl" />
          </div>

          {/* Card 2 - 零部件实现完全自主可控 */}
          <div className="bg-[#F5F5F5] rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">95</span>
              <span className="text-xl ml-1">%</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">零部件实现完全自主可控</p>
            {/* @2x 图：缩小一倍显示 */}
            <img src={companyImg2} alt="零部件实现完全自主可控" className="w-1/2 h-auto rounded-xl" />
          </div>

          {/* Card 3 - 生态合作伙伴 */}
          <div className="bg-[#F5F5F5] rounded-3xl p-8 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-[#e60012] font-bold mb-2 flex items-baseline">
              <span className="text-5xl">20</span>
              <span className="text-3xl ml-1">+</span>
            </div>
            <p className="text-[15px] text-gray-700 mb-8 font-medium">生态合作伙伴</p>
            {/* @2x 图：缩小一倍显示 */}
            <img src={companyImg3} alt="生态合作伙伴" className="w-1/2 h-auto rounded-xl" />
          </div>
        </div>
      </section>

      {/* Join Us Section - 背景图 about/company/bg.png */}
      <section className="relative bg-[#f8f9fa] text-gray-900 pb-16 pt-8 px-6 overflow-hidden">
        <img 
          src={companyBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10">
        <h2 className="text-2xl font-medium text-center mb-10 mt-16">加入我们</h2>
        
        <div className="bg-white rounded-3xl p-10 text-center relative z-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-sm mx-auto">
          <p className="text-[16px] text-gray-800 leading-loose mb-10 font-medium whitespace-pre-line">
            {siteConfig.joinUsText}
          </p>
          <Link to="#" className="inline-block bg-[#e60012] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:bg-red-700 transition-colors shadow-sm">
            查看所有职位
          </Link>
        </div>
        </div>
      </section>
    </div>
  );
}
