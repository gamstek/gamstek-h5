import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNewsStore } from '../../store/useNewsStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import newsBg from '../../assets/news/bg.jpg';

export function NewsPage() {
  useDocumentTitle('新闻动态');
  const { newsList, isLoading, isLoadingMore, hasMore, fetchNewsList, error } = useNewsStore();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNewsList(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          fetchNewsList();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, isLoadingMore, fetchNewsList]);

  return (
    <div className="bg-[#f5f5f7] min-h-screen pb-12">
      {/* Hero Section - 背景图 750x1334 (9:16)，容器按同比例自适应 */}
      <section className="relative aspect-[9/16] w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-white pt-12">
        <img 
          src={newsBg} 
          alt="News Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-widest mb-4">新闻中心</h1>
          <p className="text-sm font-medium tracking-wide opacity-90">为您提供官方发布的第一手资讯</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">新闻动态</h2>
        
        {isLoading && newsList.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error && newsList.length === 0 ? (
          <div className="text-center py-12 text-red-500 text-sm">
            {error}
            <button 
              onClick={() => fetchNewsList(true)}
              className="block mx-auto mt-4 px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
            >
              重试
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {newsList.map(news => (
                <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col">
                  {/* Card Header (Image/Banner) */}
                  {news.coverUrl && (
                    <div className="h-[140px] w-full bg-gray-100 relative overflow-hidden">
                      <img src={news.coverUrl} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-[17px] font-medium text-gray-900 leading-snug mb-3">
                      {news.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-gray-400">
                        {new Date(news.publishTime || new Date()).toISOString().split('T')[0]}
                      </div>
                      <a href={news.sourceUrl || '#'} target={news.sourceUrl ? "_blank" : "_self"} rel="noreferrer" className="text-blue-600 text-[14px] whitespace-nowrap">
                        查看详情&gt;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Intersection Observer Target for Infinite Scroll */}
            <div ref={observerTarget} className="py-6 flex justify-center">
              {isLoadingMore && (
                <div className="w-6 h-6 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
              )}
              {!hasMore && newsList.length > 0 && (
                <span className="text-sm text-gray-400">到底了</span>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
