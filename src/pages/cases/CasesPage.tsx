import React, { useEffect, useState } from 'react';
import { caseCategories, casesData } from '../../data/config';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import casesBg from '../../assets/cases/bg.jpg';

export function CasesPage() {
  useDocumentTitle('应用案例');
  const [activeCategory, setActiveCategory] = useState('全部');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCases = activeCategory === '全部' 
    ? casesData 
    : casesData.filter(c => c.category === activeCategory);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <section className="relative aspect-[750/844] w-full">
        <img 
          src={casesBg} 
          alt="Laboratory" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center py-12 text-white">
          <div className="text-center px-4">
            <h1 className="text-[28px] font-bold mb-3 tracking-wide">引力波智谱应用中心</h1>
            <p className="text-[15px] font-medium opacity-90">帮助客户更高效地运用科学，获得成功</p>
          </div>
        </div>
      </section>

      {/* Tabs - 除"全部"外的分类暂不可点击 */}
      <section className="bg-white sticky top-[76px] z-30 border-b border-gray-100">
        <div className="flex items-center px-4 h-14">
          <div className="text-gray-900 font-medium mr-4 flex-shrink-0 text-[15px]">
            应用案例
          </div>
          <div className="flex-1 overflow-x-auto hide-scrollbar flex items-center space-x-6 relative h-full">
            {caseCategories.map(cat => {
              const isDisabled = cat !== '全部';
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (isDisabled) return;
                    setActiveCategory(cat);
                  }}
                  disabled={isDisabled}
                  className={`whitespace-nowrap text-[15px] transition-colors relative h-full flex flex-col justify-center ${
                    isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : activeCategory === cat 
                        ? 'text-[#e60012] font-medium' 
                        : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#e60012] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case List */}
      <section className="p-4 space-y-4">
        {filteredCases.map(caseItem => (
          <a
            key={caseItem.id}
            href={caseItem.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 text-[#e60012]">
              <caseItem.Icon size={24} strokeWidth={2} />
            </div>
            <h3 className="text-[17px] font-medium text-gray-900 leading-snug mb-2.5">
              {caseItem.title}
            </h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              {caseItem.description}
            </p>
          </a>
        ))}
      </section>
    </div>
  );
}

