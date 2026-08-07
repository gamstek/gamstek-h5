import React, { useEffect } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { CaseCarousel } from '../components/CaseCarousel';
import { Link } from 'react-router-dom';
import { homeCarouselSlides, homeProducts, homeApplicationCases } from '../data/config';
import { useCaseStore } from '../store/useCaseStore';
import { useNewsStore } from '../store/useNewsStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Reusable Components
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">{title}</h2>
);

interface ProductCardProps {
  title: string;
  subtitle: string;
  links?: { label: string; href: string }[];
  image: string;
  imageClassName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  subtitle, 
  links, 
  image, 
  imageClassName 
}) => (
  <div className="bg-[#f2f3f5] rounded-3xl p-8 flex flex-col items-center text-center">
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{subtitle}</p>
    {links && (
      <div className="flex gap-6 mb-8 text-sm text-gray-700">
        {links.map((link, idx) => (
          <Link key={idx} to={link.href} className="hover:text-black transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    )}
    <img src={image} alt={title} className={`w-full max-w-[280px] object-contain ${imageClassName || ''}`} />
  </div>
);

export function HomePage() {
  useDocumentTitle('首页');
  const { cases, isLoading: casesLoading, fetchData: fetchCases } = useCaseStore();
  const { homeNews, isLoading: newsLoading, fetchHomeNewsData } = useNewsStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCases();
    fetchHomeNewsData();
  }, []);

  const carouselItems = cases.length > 0 
    ? cases.map(c => ({ id: c.id.toString(), tag: c.name, image: c.coverUrl }))
    : homeApplicationCases;

  return (
    <>
      {/* Hero Section */}
      <HeroCarousel slides={homeCarouselSlides} />

      {/* Products Section */}
      <section className="px-4 py-8 space-y-4">
        {homeProducts.map((product, idx) => (
          <ProductCard 
            key={idx}
            title={product.title} 
            subtitle={product.subtitle}
            links={product.links}
            image={product.image}
            imageClassName={product.imageClassName}
          />
        ))}
      </section>

      {/* Application Cases */}
      <section className="py-10 bg-white">
        <SectionTitle title="应用案例" />
        <CaseCarousel items={carouselItems} />
        
        <div className="flex justify-center mt-2">
          <Link to="/cases" className="border border-gray-400 text-gray-700 px-10 py-2 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
            了解更多
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 bg-[#fafafa] px-4">
        <SectionTitle title="新闻动态" />
        
        <div className="space-y-4 mb-8">
          {newsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : homeNews.length > 0 ? (
            homeNews.map((news) => (
              <a 
                key={news.id} 
                href={news.sourceUrl || '#'} 
                target={news.sourceUrl ? "_blank" : "_self"}
                rel={news.sourceUrl ? "noopener noreferrer" : ""}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col block hover:shadow-md transition-shadow"
              >
                {news.coverUrl && (
                  <div className="h-[140px] w-full bg-gray-100 relative overflow-hidden">
                    <img src={news.coverUrl} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 leading-snug line-clamp-2">{news.title}</h4>
                    {news.summary && (
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{news.summary}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(news.publishTime || new Date()).toISOString().split('T')[0]}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">
              暂无新闻动态
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Link to="/news" className="border border-gray-400 text-gray-700 px-10 py-2 rounded-full font-medium text-sm hover:bg-white transition-colors">
            了解更多
          </Link>
        </div>
      </section>

    </>
  );
}
