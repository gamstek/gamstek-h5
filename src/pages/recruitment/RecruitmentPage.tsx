import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useJobStore } from '../../store/useJobStore';
import { Job } from '../../api/jobs';
import recruitmentBg from '../../assets/recruitment/bg.jpg';
import { contactInfo } from '../../data/config';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
        <a 
          href={`mailto:${contactInfo.hrEmail || 'hr@gamstek.com'}?subject=${encodeURIComponent(`应聘 - ${job.title}`)}`}
          className="shrink-0 bg-[#e60012] text-white text-xs px-3.5 py-1.5 rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          投递简历
        </a>
      </div>

      {/* 职位标签：薪资 / 学历 / 人数 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.salary && (
          <span className="text-[12px] px-2.5 py-1 rounded-full bg-red-50 text-[#e60012]">{job.salary}</span>
        )}
        {job.education && (
          <span className="text-[12px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{job.education}</span>
        )}
        {job.headcount && (
          <span className="text-[12px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">招聘 {job.headcount} 人</span>
        )}
      </div>

      {job.summary && (
        <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{job.summary}</p>
      )}

      <div 
        className={`text-[#333] text-[15px] leading-relaxed ${!isExpanded ? 'max-h-[220px] overflow-hidden relative' : ''}`}
      >
        {job.responsibilities.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-gray-900 mb-2">岗位职责</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              {job.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        )}
        {job.requirements.length > 0 && (
          <div>
            <p className="font-semibold text-gray-900 mb-2">任职要求</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              {job.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        )}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-gray-500 text-sm flex items-center justify-center w-full py-2 hover:text-gray-900 transition-colors"
      >
        {isExpanded ? (
          <>向上收起 <ChevronUp className="w-4 h-4 ml-1" /></>
        ) : (
          <>向下展开 <ChevronDown className="w-4 h-4 ml-1" /></>
        )}
      </button>
    </div>
  );
};

export function RecruitmentPage() {
  useDocumentTitle('人才招聘');
  const [activeTab, setActiveTab] = useState<'rd' | 'product' | 'business'>('rd');
  const { jobs, isLoading, error, fetchJobs } = useJobStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, [fetchJobs]);

  const jobsByCategory = (category: string) =>
    jobs
      .filter(job => job.category === category)
      .sort((a, b) => a.sort - b.sort);

  const currentJobs = jobsByCategory(activeTab);

  return (
    <div className="bg-[#f9fafb] min-h-screen pb-12">
      <div className="relative aspect-[750/844] w-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={recruitmentBg} 
          alt="加入我们" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 tracking-widest text-white"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            加入我们
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] font-medium tracking-wider"
          >
            文化认同 | 竞争择优 | 以人为本 | 海纳百川
          </motion.div>
        </div>
      </div>

      {/* Tabs - sticky 吸顶 */}
      <div className="flex px-6 py-4 items-center sticky top-[76px] bg-white z-30 shadow-sm">
        <span className="text-gray-900 font-medium text-lg mr-6 shrink-0">招聘岗位</span>
        {([
          ['rd', '研发'],
          ['product', '产品&方案类'],
          ['business', '市场&销售类'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`mr-4 text-[16px] whitespace-nowrap transition-colors ${activeTab === key ? 'text-[#e60012] font-medium' : 'text-gray-500'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-[15px]">加载中...</div>
        ) : error ? (
          <div className="py-16 text-center text-gray-400 text-[15px]">
            职位加载失败，请稍后重试
          </div>
        ) : currentJobs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-[15px]">
            暂无在招岗位
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
