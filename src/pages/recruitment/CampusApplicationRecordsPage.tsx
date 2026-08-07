import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, User, UserSearch, Mail, X } from 'lucide-react';
import { fetchApplications, fetchApplicationDetails, ApplicationRecord, ApplicationHistory } from '../../api/campus';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function CampusApplicationRecordsPage() {
  useDocumentTitle('投递记录');
  const navigate = useNavigate();
  const [records, setRecords] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem('campus_token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const apps = await fetchApplications();
        
        // Fetch details for each to get history
        const appsWithHistory = await Promise.all(
          apps.map(async (app) => {
            const detail = await fetchApplicationDetails(app.id);
            return detail || app;
          })
        );
        
        setRecords(appsWithHistory);
      } catch (error) {
        console.error('Failed to fetch applications', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadApplications();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] pt-[76px] flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] pt-[76px] flex flex-col px-6">
        <h2 className="text-[24px] font-medium text-gray-900 mt-6 mb-12">应聘记录</h2>
        
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          <div className="relative w-32 h-32 mb-6 text-blue-500">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M10 35C10 32.2386 12.2386 30 15 30H35L42.5 40H85C87.7614 40 90 42.2386 90 45V80C90 82.7614 87.7614 85 85 85H15C12.2386 85 10 82.7614 10 80V35Z" fill="#ebf5ff" stroke="#3b82f6" strokeWidth="3" strokeLinejoin="round"/>
              <path d="M25 20C25 17.2386 27.2386 15 30 15H65C67.7614 15 70 17.2386 70 20V30H25V20Z" fill="white" stroke="#3b82f6" strokeWidth="3" strokeLinejoin="round"/>
              <line x1="35" y1="22" x2="60" y2="22" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              <line x1="35" y1="28" x2="50" y2="28" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
              <text x="50" y="65" fontSize="16" fill="#3b82f6" textAnchor="middle" dominantBaseline="middle" fontWeight="500">暂无</text>
            </svg>
          </div>
          <div className="text-[16px] text-gray-600 mb-10">暂无数据</div>
          
          <button
            onClick={() => navigate('/campus-recruitment')}
            className="w-full py-3.5 bg-[#d32f2f] text-white text-[16px] font-medium rounded-md shadow-sm hover:bg-red-700 transition-colors"
          >
            查看工作机会
          </button>
        </div>
      </div>
    );
  }

  const renderTimelineStatus = (record: ApplicationRecord, stepStatus: string, label: string, Icon: React.ElementType, isTopRow = false) => {
    const historyItem = record.history?.find(h => h.toStatus === stepStatus || h.statusLabel === label);
    const isCompleted = !!historyItem || record.status === stepStatus;
    // Special case for REJECTED
    const isRejected = record.status === 'REJECTED' && record.statusLabel === label;
    
    const bgColor = isCompleted ? 'bg-[#10b981]' : (isRejected ? 'bg-[#e60012]' : 'bg-gray-200');
    const iconColor = isCompleted || isRejected ? 'text-white' : 'text-gray-500';
    
    let dateStr = 'YYY-MM';
    if (historyItem && historyItem.createdAt) {
      dateStr = new Date(historyItem.createdAt).toISOString().split('T')[0];
    } else if (isCompleted && record.createdAt) {
      dateStr = new Date(record.createdAt).toISOString().split('T')[0];
    }

    return (
      <div className="flex flex-col items-center flex-1 relative z-10">
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mb-2`}>
          {isRejected ? <X className={`w-5 h-5 ${iconColor}`} /> : <Icon className={`w-5 h-5 ${iconColor}`} />}
        </div>
        <div className="text-[13px] text-gray-900 font-medium mb-1">{label}</div>
        <div className="text-[12px] text-gray-500">{isCompleted || isRejected ? dateStr : 'YYY-MM'}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] pt-[76px] flex flex-col px-4">
      <h2 className="text-[24px] font-medium text-gray-900 mt-6 mb-4 px-2">应聘记录</h2>
      
      <div className="space-y-4 pb-12">
        {records.map(record => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-[18px] font-medium text-gray-900 mb-2">{record.job?.title}</h3>
            <div className="text-[14px] text-gray-600 mb-8">
              {record.job?.city} | {record.job?.category} | {record.job?.projectName}
            </div>

            {/* Timeline Area */}
            <div className="flex flex-col gap-8">
              {/* Top Row */}
              <div className="flex items-start justify-between relative">
                {/* Horizontal lines */}
                <div className="absolute top-5 left-[20%] right-[55%] h-[1px] bg-gray-200"></div>
                <div className="absolute top-5 left-[55%] right-[20%] h-[1px] bg-gray-200"></div>
                
                {renderTimelineStatus(record, 'SUBMITTED', '投递成功', Check, true)}
                {renderTimelineStatus(record, 'RESUME_SCREENING', '简历初筛', User, true)}
                {renderTimelineStatus(record, 'DEPARTMENT_SCREENING', '用人部门筛选', UserSearch, true)}
              </div>

              {/* Bottom Row */}
              <div className="flex items-start justify-between relative">
                {/* Horizontal lines */}
                <div className="absolute top-5 left-[20%] right-[55%] h-[1px] bg-gray-200"></div>
                <div className="absolute top-5 left-[55%] right-[20%] h-[1px] bg-gray-200"></div>
                
                {renderTimelineStatus(record, 'FIRST_INTERVIEW', '初面', User, false)}
                {renderTimelineStatus(record, 'FINAL_INTERVIEW', '终面', User, false)}
                {renderTimelineStatus(record, 'OFFER', 'offer', Mail, false)}
              </div>
            </div>
            
            {record.rejectionMessage && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-[14px]">
                {record.rejectionMessage}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
