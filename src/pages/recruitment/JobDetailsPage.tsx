import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCampusStore } from '../../store/useCampusStore';
import { fetchResume, submitApplication } from '../../api/campus';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../components/Toast';

export function JobDetailsPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs, fetchJobs, isLoading } = useCampusStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [jobs.length, fetchJobs]);

  const job = useMemo(() => {
    return jobs.find((j) => j.id.toString() === id);
  }, [id, jobs]);

  useDocumentTitle(job?.title || '职位详情');

  if (isLoading) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen pt-[76px] pb-12 font-sans flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job && !isLoading && jobs.length > 0) {
    return <Navigate to="/campus-recruitment" replace />;
  }

  if (!job) return null;

  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-[76px] pb-12 font-sans">
      {/* Top Header Info Section */}
      <div className="bg-white px-6 py-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <div className="text-[15px] text-gray-600 flex items-center gap-2">
          <span>{job.city}</span>
          <span className="text-gray-300">|</span>
          <span>{job.category}</span>
          <span className="text-gray-300">|</span>
          <span>{job.projectName}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 mt-6 space-y-6">
        {/* Description Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="w-8 h-1 bg-[#e60012] mb-4"></div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">职位描述</h2>
          <div className="text-[15px] text-[#333] leading-loose whitespace-pre-wrap">
            {job.description.join('\n')}
          </div>
        </motion.div>

        {/* Requirements Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="w-8 h-1 bg-[#e60012] mb-4"></div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">职位要求</h2>
          <div className="text-[15px] text-[#333] leading-loose whitespace-pre-wrap">
            {job.requirements.join('\n')}
          </div>
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-10 flex justify-center px-5"
      >
        <button 
          onClick={async () => {
            const token = localStorage.getItem('campus_token');
            if (!token) {
              window.dispatchEvent(new Event('open-login-menu'));
            } else {
              try {
                const resumeData = await fetchResume();
                const content = resumeData?.content;
                const basicComplete = Boolean(content?.basic?.name?.trim() && content?.basic?.email?.trim());
                const educationComplete = Array.isArray(content?.education)
                  && content.education.length > 0
                  && content.education.every((item: any) => item.school && item.degree && item.major && item.startDate && item.endDate);
                const languageComplete = Array.isArray(content?.languages)
                  && content.languages.length > 0
                  && content.languages.every((item: any) => item.language && item.proficiency);
                const attachmentComplete = Boolean(content?.attachmentFileId);

                if (!basicComplete || !educationComplete || !languageComplete || !attachmentComplete) {
                  toast.error('请先完善简历后再投递');
                  navigate('/campus-recruitment/resume');
                  return;
                }

                const res = await submitApplication(job.id, true, 'V1.0');
                if (res.success) {
                  toast.success('投递成功');
                } else {
                  toast.error(res.message || '投递失败');
                }
              } catch (e) {
                toast.error('网络请求失败');
              }
            }
          }}
          className="w-48 py-3.5 bg-[#e60012] text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          投递
        </button>
      </motion.div>
    </div>
  );
}
