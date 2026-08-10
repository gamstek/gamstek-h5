import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottomSheet } from '../../components/BottomSheet';
import { useCampusStore } from '../../store/useCampusStore';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import campusBg from '../../assets/campus-recruitment/bg.png';

export function CampusRecruitmentPage() {
  useDocumentTitle('校园招聘');
  const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isCityFilterOpen, setIsCityFilterOpen] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProject, setSelectedProject] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedCity, setSelectedCity] = useState('全部');

  const [tempProject, setTempProject] = useState('全部');
  const [tempCategory, setTempCategory] = useState('全部');
  const [tempCity, setTempCity] = useState('全部');

  const { jobs, isLoading, error, fetchJobs } = useCampusStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [jobs.length, fetchJobs]);

  const projectNames = ['全部', ...Array.from(new Set(jobs.map(j => j.projectName).filter(Boolean)))];
  const categories = ['全部', ...Array.from(new Set(jobs.map(j => j.category).filter(Boolean)))];
  const cities = ['全部', ...Array.from(new Set(jobs.map(j => j.city).filter(Boolean)))];

  const filteredJobs = jobs.filter(job => {
    if (selectedProject !== '全部' && job.projectName !== selectedProject) return false;
    if (selectedCategory !== '全部' && job.category !== selectedCategory) return false;
    if (selectedCity !== '全部' && job.city !== selectedCity) return false;
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      const titleMatch = job.title?.toLowerCase().includes(keyword);
      const categoryMatch = job.category?.toLowerCase().includes(keyword);
      const cityMatch = job.city?.toLowerCase().includes(keyword);
      const projectMatch = job.projectName?.toLowerCase().includes(keyword);
      const descMatch = job.description?.some(d => d.toLowerCase().includes(keyword));
      const reqMatch = job.requirements?.some(r => r.toLowerCase().includes(keyword));
      if (!titleMatch && !categoryMatch && !cityMatch && !projectMatch && !descMatch && !reqMatch) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-12 font-sans">
      {/* Hero Section - 顶部为横向宽图，使用固定高度避免按旧比例过度拉高 */}
      <div className="relative w-full h-[360px] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
           {/* 背景图铺满 */}
           <img 
             src={campusBg} 
             alt="" 
             className="w-full h-full object-cover object-center"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
        </div>
        
        <div className="relative z-10 pt-[76px] pb-6 px-6 text-center w-full h-full flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/90 text-sm tracking-widest mb-4 font-medium"
          >
            GAMSTEK <span className="bg-gradient-to-r from-[#ff8fb3] to-[#c77dff] bg-clip-text text-transparent">ONE</span> TEAM
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-wider mb-2 bg-gradient-to-b from-[#f3f0ff] to-[#d7d1ff] bg-clip-text text-transparent"
          >
            引力波智谱
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[2.5rem] font-bold tracking-wider mb-6 leading-tight bg-gradient-to-b from-[#eef0ff] to-[#cfd2ff] bg-clip-text text-transparent"
          >
            整机青年计划
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium tracking-widest"
          >
            <span className="bg-gradient-to-r from-[#ffd84d] to-[#f6d64f] bg-clip-text text-transparent">入场，</span>
            <span className="bg-gradient-to-r from-[#f5f0d8] to-[#ffffff] bg-clip-text text-transparent">成为关键</span>
            <span className="bg-gradient-to-r from-[#d38cff] to-[#a855f7] bg-clip-text text-transparent">变量</span>
          </motion.div>
        </div>
      </div>

      {/* Search Bar - 用 translate 上移自身高度一半，精确骑跨在 hero 底部与 filters 顶部交界处 */}
      <div className="relative z-20 px-6">
        <div className="bg-white rounded h-[46px] flex items-center px-4 shadow-lg -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
          <input 
            type="text" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索职位名称、类别、描述..." 
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 h-full"
          />
          {searchKeyword && (
            <button 
              type="button" 
              onClick={() => setSearchKeyword('')}
              className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2 shrink-0 hover:bg-gray-200"
            >
              清除
            </button>
          )}
        </div>
      </div>

      {/* Filters - 顶部留出搜索框下半部分空间；被选中的 filter 按钮背景变 #E8EBF0 */}
      <div className="bg-[#f5f5f5] px-6 pt-[23.5px] pb-4 flex gap-3 overflow-x-auto hide-scrollbar sticky top-[76px] z-30">
        <button 
          onClick={() => { setTempProject(selectedProject); setIsProjectFilterOpen(true); }}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] shadow-sm whitespace-nowrap ${selectedProject !== '全部' ? 'bg-[#E8EBF0] text-gray-900' : 'bg-white text-gray-700'}`}
        >
          招聘项目 <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <button 
          onClick={() => { setTempCategory(selectedCategory); setIsCategoryFilterOpen(true); }}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] shadow-sm whitespace-nowrap ${selectedCategory !== '全部' ? 'bg-[#E8EBF0] text-gray-900' : 'bg-white text-gray-700'}`}
        >
          职位类别({selectedCategory !== '全部' ? '1' : '0'}) <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
        <button 
          onClick={() => { setTempCity(selectedCity); setIsCityFilterOpen(true); }}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] shadow-sm whitespace-nowrap ${selectedCity !== '全部' ? 'bg-[#E8EBF0] text-gray-900' : 'bg-white text-gray-700'}`}
        >
          城市 <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Job List */}
      <div className="px-5 pb-8 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">
            {error}
            <button 
              onClick={() => fetchJobs()}
              className="block mx-auto mt-4 px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
            >
              重试
            </button>
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => (
            <Link to={`/campus-recruitment/job/${job.id}`} key={job.id} className="block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <div className="text-[14px] text-gray-600 mb-5 flex items-center gap-2">
                  <span>{job.city}</span>
                  <span className="text-gray-300">|</span>
                  <span>{job.category}</span>
                  <span className="text-gray-300">|</span>
                  <span>{job.projectName}</span>
                </div>
                <div className="text-[15px] text-[#444] leading-relaxed whitespace-pre-wrap line-clamp-3">
                  {job.description?.join('\n')}
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            暂无职位
          </div>
        )}
      </div>
      
      {/* Project Filter Bottom Sheet */}
      <BottomSheet
        isOpen={isProjectFilterOpen}
        onClose={() => setIsProjectFilterOpen(false)}
        title="招聘项目"
        variant="action"
        onConfirm={() => { setSelectedProject(tempProject); setIsProjectFilterOpen(false); }}
        heightClass="max-h-[60vh]"
      >
        <div className="py-2">
          {projectNames.map(project => (
            <div 
              key={project}
              className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0 cursor-pointer"
              onClick={() => setTempProject(project)}
            >
              <div className="flex shrink-0 mt-0.5">
                {tempProject === project ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#d32f2f"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#9ca3af" strokeWidth="1"/>
                  </svg>
                )}
              </div>
              <span className="text-[16px] text-gray-900 flex-1">{project}</span>
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* Category Filter Bottom Sheet */}
      <BottomSheet
        isOpen={isCategoryFilterOpen}
        onClose={() => setIsCategoryFilterOpen(false)}
        title="职位类别"
        variant="action"
        onConfirm={() => { setSelectedCategory(tempCategory); setIsCategoryFilterOpen(false); }}
        heightClass="max-h-[60vh]"
      >
        <div className="py-2">
          {categories.map((category) => (
            <div 
              key={category}
              className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0 cursor-pointer"
              onClick={() => setTempCategory(category)}
            >
              <div className="flex shrink-0 mt-0.5">
                {tempCategory === category ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#d32f2f"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#9ca3af" strokeWidth="1"/>
                  </svg>
                )}
              </div>
              <span className="text-[16px] text-gray-900 flex-1">{category}</span>
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* City Filter Bottom Sheet */}
      <BottomSheet
        isOpen={isCityFilterOpen}
        onClose={() => setIsCityFilterOpen(false)}
        title="城市"
        variant="action"
        onConfirm={() => { setSelectedCity(tempCity); setIsCityFilterOpen(false); }}
        heightClass="max-h-[60vh]"
      >
        <div className="py-2">
          {cities.map((city) => (
            <div 
              key={city}
              className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0 cursor-pointer"
              onClick={() => setTempCity(city)}
            >
              <div className="flex shrink-0 mt-0.5">
                {tempCity === city ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#d32f2f"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#9ca3af" strokeWidth="1"/>
                  </svg>
                )}
              </div>
              <span className="text-[16px] text-gray-900 flex-1">{city}</span>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
