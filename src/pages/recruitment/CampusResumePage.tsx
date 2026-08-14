import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Trash2, FileText, ArrowUpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DatePickerDrawer } from '../../components/DatePickerDrawer';
import { OptionPickerDrawer } from '../../components/OptionPickerDrawer';
import { uploadFile, submitResume, fetchResume, fetchCampusFiles, CampusFile } from '../../api/campus';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../components/Toast';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="px-4 py-4 flex items-center bg-white border-b border-gray-100">
    <div className="w-1 h-[14px] bg-[#e60012] mr-2"></div>
    <span className="text-[15px] text-gray-900 font-medium">{title}</span>
  </div>
);

const FormField = ({ label, name, required = false, placeholder, type = 'text', value, defaultValue = '', readonly = false, hasArrow = false, readOnlyInput = false, onClick, onChange }: any) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 mx-4 bg-white" onClick={onClick}>
    <div className="text-[15px] text-gray-900 shrink-0">
      {label}
      {required && <span className="text-[#e60012] ml-0.5">*</span>}
    </div>
    <div className="flex items-center flex-1 justify-end ml-4">
      {readonly ? (
        <span className="text-[15px] text-gray-400">{value}</span>
      ) : (
        <input 
          type={type} 
          name={name}
          required={required}
          placeholder={placeholder} 
          {...(value !== undefined ? { value } : { defaultValue })}
          onChange={onChange}
          readOnly={readOnlyInput}
          className={`text-right text-[15px] text-gray-900 placeholder:text-gray-300 outline-none w-full bg-transparent ${readOnlyInput ? 'pointer-events-none' : ''}`}
        />
      )}
      {hasArrow && <ChevronRight className="w-4 h-4 text-gray-300 ml-1 shrink-0" />}
    </div>
  </div>
);

function DynamicSection({ 
  title, 
  items, 
  setItems, 
  renderItem 
}: { 
  title: string, 
  items: string[], 
  setItems: React.Dispatch<React.SetStateAction<string[]>>,
  renderItem: (id: string, index: number) => React.ReactNode
}) {
  const handleAdd = () => setItems([...items, Date.now().toString() + Math.random()]);
  const handleRemove = (idToRemove: string) => setItems(items.filter(id => id !== idToRemove));

  if (items.length === 0) {
    return (
      <div className="bg-white mb-2">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center">
            <div className="w-1 h-[14px] bg-[#e60012] mr-2"></div>
            <span className="text-[15px] text-gray-900 font-medium">{title}</span>
          </div>
          <button type="button" onClick={handleAdd} className="flex items-center text-gray-600 text-[15px]">
            <Plus className="w-4 h-4 mr-1" /> 添加
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-2 bg-white">
      <SectionTitle title={title} />
      {items.map((id, index) => (
        <div key={id} className={index !== items.length - 1 ? 'border-b-8 border-[#f5f5f5]' : ''}>
          {renderItem(id, index)}
          <div className="py-4 flex items-center justify-center relative bg-white">
            <div className="flex items-center w-full">
              <button type="button" onClick={() => handleRemove(id)} className="flex-1 flex items-center justify-center text-gray-600 text-[15px]">
                <Trash2 className="w-4 h-4 mr-1" /> 删除
              </button>
              <div className="w-[1px] h-4 bg-gray-200"></div>
              <button type="button" onClick={handleAdd} className="flex-1 flex items-center justify-center text-gray-600 text-[15px]">
                <Plus className="w-4 h-4 mr-1" /> 继续添加
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CampusResumePage() {
  useDocumentTitle('我的简历');
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadResumeData = async () => {
      try {
        const [resumeData, filesData] = await Promise.all([
          fetchResume(),
          fetchCampusFiles()
        ]);

        const fileMap = new Map<number, CampusFile>();
        if (Array.isArray(filesData)) {
          filesData.forEach(f => fileMap.set(f.id, f));
        }

        if (resumeData && resumeData.content) {
          const content = resumeData.content;
          if (content.basic) {
            setBasicInfo({
              name: content.basic.name || '',
              email: content.basic.email || ''
            });
          }
          if (content.attachmentFileId) {
            setResumeFileId(content.attachmentFileId);
            const fileObj = fileMap.get(content.attachmentFileId);
            setResumeFileName(fileObj ? fileObj.originalName : '已有已上传简历文件');
          }
          if (content.portfolioUrl || content.portfolioAttachmentFileId) {
            const portfolioId = '1';
            setPortfolios([portfolioId]);
            if (content.portfolioUrl) {
              setPortfolioData({ [portfolioId]: { link: content.portfolioUrl } });
            }
            if (content.portfolioAttachmentFileId) {
              setPortfolioFileIds({ [portfolioId]: content.portfolioAttachmentFileId });
              const portfolioFileObj = fileMap.get(content.portfolioAttachmentFileId);
              setPortfolioFileNames({ [portfolioId]: portfolioFileObj ? portfolioFileObj.originalName : '已有作品附件' });
            }
          }
          if (Array.isArray(content.education) && content.education.length > 0) {
            const eduIds: string[] = [];
            const eduObj: Record<string, any> = {};
            content.education.forEach((item: any, idx: number) => {
              const id = String(idx + 1);
              eduIds.push(id);
              eduObj[id] = {
                school: item.school || '',
                degree: item.degree || '',
                major: item.major || '',
                date: item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ''
              };
            });
            setEducations(eduIds);
            setEduData(eduObj);
          }
          if (Array.isArray(content.workExperiences) && content.workExperiences.length > 0) {
            const workIds: string[] = [];
            const workObj: Record<string, any> = {};
            content.workExperiences.forEach((item: any, idx: number) => {
              const id = String(idx + 1);
              workIds.push(id);
              workObj[id] = {
                company: item.organization || '',
                role: item.role || '',
                date: item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ''
              };
            });
            setWorkExperiences(workIds);
            setWorkData(workObj);
          }
          if (Array.isArray(content.projects) && content.projects.length > 0) {
            const projIds: string[] = [];
            const projObj: Record<string, any> = {};
            content.projects.forEach((item: any, idx: number) => {
              const id = String(idx + 1);
              projIds.push(id);
              projObj[id] = {
                name: item.organization || '',
                role: item.role || '',
                date: item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ''
              };
            });
            setProjects(projIds);
            setProjectData(projObj);
          }
          if (Array.isArray(content.awards) && content.awards.length > 0) {
            const awardIds: string[] = [];
            const awardObj: Record<string, any> = {};
            content.awards.forEach((item: any, idx: number) => {
              const id = String(idx + 1);
              awardIds.push(id);
              awardObj[id] = {
                name: item.name || '',
                date: item.date || ''
              };
            });
            setAwards(awardIds);
            setAwardData(awardObj);
          }
          if (Array.isArray(content.languages) && content.languages.length > 0) {
            const langIds: string[] = [];
            const langObj: Record<string, any> = {};
            content.languages.forEach((item: any, idx: number) => {
              const id = String(idx + 1);
              langIds.push(id);
              langObj[id] = {
                name: item.language || '',
                proficiency: item.proficiency || ''
              };
            });
            setLanguages(langIds);
            setLangData(langObj);
          }
        }
      } catch (err) {
        console.error('获取简历数据失败:', err);
      }
    };
    loadResumeData();
  }, []);

  const phone = localStorage.getItem('campus_phone') || '+86 158****0721';

  const [basicInfo, setBasicInfo] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [educations, setEducations] = useState<string[]>(['1']);
  const [workExperiences, setWorkExperiences] = useState<string[]>(['1']);
  const [projects, setProjects] = useState<string[]>([]);
  const [portfolios, setPortfolios] = useState<string[]>([]);
  const [awards, setAwards] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const [datePickerConfig, setDatePickerConfig] = useState<{
    isOpen: boolean;
    section: 'edu' | 'work' | 'project' | 'award';
    id: string;
    value: string;
    mode?: 'range' | 'single';
  }>({ isOpen: false, section: 'edu', id: '', value: '', mode: 'range' });
  const [optionPickerConfig, setOptionPickerConfig] = useState<{
    isOpen: boolean;
    section: 'edu_degree' | 'lang_proficiency';
    id: string;
    options: string[];
    value: string;
  }>({ isOpen: false, section: 'edu_degree', id: '', options: [], value: '' });

  const [eduData, setEduData] = useState<Record<string, any>>({});
  const [workData, setWorkData] = useState<Record<string, any>>({});
  const [projectData, setProjectData] = useState<Record<string, any>>({});
  const [awardData, setAwardData] = useState<Record<string, any>>({});
  const [langData, setLangData] = useState<Record<string, any>>({});
  const [resumeFileId, setResumeFileId] = useState<number | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [portfolioData, setPortfolioData] = useState<Record<string, { link: string }>>({});
  const [portfolioFileIds, setPortfolioFileIds] = useState<Record<string, number>>({});
  const [portfolioFileNames, setPortfolioFileNames] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (val: string) => {
    if (optionPickerConfig.section === 'edu_degree') {
      setEduData(prev => ({ ...prev, [optionPickerConfig.id]: { ...prev[optionPickerConfig.id], degree: val } }));
    } else if (optionPickerConfig.section === 'lang_proficiency') {
      setLangData(prev => ({ ...prev, [optionPickerConfig.id]: { ...prev[optionPickerConfig.id], proficiency: val } }));
    }
    setOptionPickerConfig(prev => ({ ...prev, isOpen: false }));
  };

  const openOptionPicker = (section: 'edu_degree' | 'lang_proficiency', id: string, options: string[], currentValue: string) => {
    setOptionPickerConfig({ isOpen: true, section, id, options, value: currentValue });
  };

  const handleDateConfirm = (start: string, end: string) => {
    const value = `${start} - ${end}`;
    if (datePickerConfig.section === 'edu') {
      setEduData(prev => ({ ...prev, [datePickerConfig.id]: { ...prev[datePickerConfig.id], date: value } }));
    } else if (datePickerConfig.section === 'work') {
      setWorkData(prev => ({ ...prev, [datePickerConfig.id]: { ...prev[datePickerConfig.id], date: value } }));
    } else if (datePickerConfig.section === 'project') {
      setProjectData(prev => ({ ...prev, [datePickerConfig.id]: { ...prev[datePickerConfig.id], date: value } }));
    } else if (datePickerConfig.section === 'award') {
      setAwardData(prev => ({ ...prev, [datePickerConfig.id]: { ...prev[datePickerConfig.id], date: start } }));
    }
    setDatePickerConfig(prev => ({ ...prev, isOpen: false }));
  };

  const openDatePicker = (section: 'edu' | 'work' | 'project' | 'award', id: string, currentValue: string = '', mode: 'range' | 'single' = 'range') => {
    setDatePickerConfig({ isOpen: true, section, id, value: currentValue, mode });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (id: number, name: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await uploadFile(file);
      if (data?.data?.id) {
        onSuccess(data.data.id, file.name);
        toast.success('上传成功');
      } else if (data?.id) {
        onSuccess(data.id, file.name);
        toast.success('上传成功');
      } else {
        toast.error('文件上传失败，请重试');
      }
    } catch (error) {
      console.error('Upload error', error);
      toast.error('文件上传失败，请重试');
    }
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'].includes(extension)) {
      toast.error('仅支持上传 PDF、DOC、DOCX、PNG、JPG、JPEG 文件');
      e.target.value = '';
      return;
    }

    handleFileUpload(e, (id, name) => {
      setResumeFileId(id);
      setResumeFileName(name);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      toast.error('请完善必填项');
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const basic = {
      name: formData.get('basic_name') as string,
      gender: '',
      birthDate: '',
      email: formData.get('basic_email') as string,
      city: '',
      researchDirection: '',
      expectedLocation: '合肥',
      availableDate: ''
    };
    
    const educationList = educations.map(id => {
       const dates = (eduData[id]?.date || '').split(' - ');
       return {
         school: formData.get(`edu_school_${id}`) as string,
         degree: eduData[id]?.degree || '',
         major: formData.get(`edu_major_${id}`) as string,
         startDate: dates[0] || '',
         endDate: dates[1] || '',
         graduationDate: dates[1] || ''
       };
    });
    
    const workList = workExperiences.map(id => {
       const dates = (workData[id]?.date || '').split(' - ');
       return {
         organization: formData.get(`work_company_${id}`) as string,
         role: formData.get(`work_role_${id}`) as string,
         startDate: dates[0] || '',
         endDate: dates[1] || '',
         link: '',
         description: ''
       };
    });
    
    const projectList = projects.map(id => {
       const dates = (projectData[id]?.date || '').split(' - ');
       return {
         organization: formData.get(`project_name_${id}`) as string,
         role: formData.get(`project_role_${id}`) as string,
         startDate: dates[0] || '',
         endDate: dates[1] || '',
         link: '',
         description: ''
       };
    });
    
    const awardList = awards.map(id => {
       return {
         name: formData.get(`award_name_${id}`) as string,
         date: awardData[id]?.date || '',
         description: ''
       };
    });
    
    const languageList = languages.map(id => {
       return {
         language: formData.get(`lang_name_${id}`) as string,
         proficiency: langData[id]?.proficiency || ''
       };
    });
    
    const firstPortfolioId = portfolios[0];
    const portfolioUrl = firstPortfolioId ? (formData.get(`portfolio_link_${firstPortfolioId}`) as string) : '';
    const portfolioAttachmentFileId = firstPortfolioId ? portfolioFileIds[firstPortfolioId] : undefined;

    const payload = {
      content: {
        basic,
        education: educationList,
        workExperiences: workList,
        internships: [],
        projects: projectList,
        awards: awardList,
        languages: languageList,
        socialAccounts: [],
        skills: '',
        portfolioUrl,
        portfolioDescription: '',
        attachmentFileId: resumeFileId,
        ...(portfolioAttachmentFileId && { portfolioAttachmentFileId }),
        selfEvaluation: ''
      }
    };

    try {
      const response = await submitResume(payload);
      
      if (response.ok) {
        toast.success('简历保存成功');
      } else {
        toast.error('保存失败，请重试');
      }
    } catch (error) {
      console.error('Submit error', error);
      toast.error('保存失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f5f5f5] min-h-screen pt-[76px] pb-12 font-sans">
      <DatePickerDrawer 
        isOpen={datePickerConfig.isOpen}
        onClose={() => setDatePickerConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleDateConfirm}
        value={datePickerConfig.value}
        mode={datePickerConfig.mode}
      />
      <OptionPickerDrawer 
        isOpen={optionPickerConfig.isOpen}
        onClose={() => setOptionPickerConfig(prev => ({ ...prev, isOpen: false }))}
        options={optionPickerConfig.options}
        value={optionPickerConfig.value}
        onSelect={handleOptionSelect}
        title="请选择"
      />

      {/* 附件简历 */}
      <div className="mb-2 bg-white">
        <SectionTitle title="附件简历" />
        <div className="px-4 py-4">
          <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center relative">
            <div className="relative mb-4">
              <FileText className="w-12 h-12 text-gray-400 stroke-[1.5]" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                <ArrowUpCircle className="w-5 h-5 text-[#e60012] bg-white rounded-full" />
              </div>
            </div>
            <div className="text-[15px] text-gray-900 mb-2">{resumeFileName || '上传并解析附件简历'}</div>
            <div className="text-[12px] text-gray-400 text-center leading-relaxed">
              支持格式：PDF、DOC、DOCX、PPT、PPTX、PNG、JPG、JPEG、HTML
            </div>
            <div className="text-[12px] text-gray-400 text-center leading-relaxed mt-1">
              将文件控制在10MB以内
            </div>
            <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleResumeFileUpload} />
          </div>
        </div>
      </div>

      {/* 基本信息 */}
      <div className="mb-2 bg-white pb-2">
        <SectionTitle title="基本信息" />
        <FormField 
          label="姓名" 
          name="basic_name" 
          required 
          placeholder="请输入" 
          value={basicInfo.name} 
          onChange={(e: any) => setBasicInfo(prev => ({ ...prev, name: e.target.value }))} 
        />
        <FormField label="手机号码" required value={phone} readonly />
        <FormField 
          label="邮箱" 
          name="basic_email" 
          required 
          placeholder="请输入" 
          value={basicInfo.email} 
          onChange={(e: any) => setBasicInfo(prev => ({ ...prev, email: e.target.value }))} 
        />
      </div>

      <DynamicSection 
        title="教育经历" 
        items={educations} 
        setItems={setEducations} 
        renderItem={(id) => (
          <>
            <FormField 
              label="校园名称" 
              name={`edu_school_${id}`} 
              required 
              placeholder="请输入" 
              value={eduData[id]?.school || ''} 
              onChange={(e: any) => setEduData(prev => ({ ...prev, [id]: { ...prev[id], school: e.target.value } }))} 
            />
            <FormField 
              label="学历" 
              required 
              placeholder="请选择" 
              hasArrow 
              readOnlyInput 
              value={eduData[id]?.degree || ''}
              onClick={() => openOptionPicker('edu_degree', id, ['大专', '本科', '硕士', '博士', '其他'], eduData[id]?.degree || '')}
            />
            <FormField 
              label="专业" 
              name={`edu_major_${id}`} 
              required 
              placeholder="请输入" 
              value={eduData[id]?.major || ''} 
              onChange={(e: any) => setEduData(prev => ({ ...prev, [id]: { ...prev[id], major: e.target.value } }))} 
            />
            <FormField 
              label="起止时间" 
              required 
              placeholder="请选择" 
              hasArrow 
              readOnlyInput 
              value={eduData[id]?.date || ''}
              onClick={() => openDatePicker('edu', id, eduData[id]?.date || '')}
            />
          </>
        )}
      />

      <DynamicSection 
        title="工作经历" 
        items={workExperiences} 
        setItems={setWorkExperiences} 
        renderItem={(id) => (
          <>
            <FormField 
              label="公司名称" 
              name={`work_company_${id}`} 
              required 
              placeholder="请输入" 
              value={workData[id]?.company || ''} 
              onChange={(e: any) => setWorkData(prev => ({ ...prev, [id]: { ...prev[id], company: e.target.value } }))} 
            />
            <FormField 
              label="职位名称" 
              name={`work_role_${id}`} 
              required 
              placeholder="请输入" 
              value={workData[id]?.role || ''} 
              onChange={(e: any) => setWorkData(prev => ({ ...prev, [id]: { ...prev[id], role: e.target.value } }))} 
            />
            <FormField 
              label="起止时间" 
              required 
              placeholder="请选择" 
              hasArrow 
              readOnlyInput 
              value={workData[id]?.date || ''}
              onClick={() => openDatePicker('work', id, workData[id]?.date || '')}
            />
          </>
        )}
      />

      <DynamicSection 
        title="项目经历" 
        items={projects} 
        setItems={setProjects} 
        renderItem={(id) => (
          <>
            <FormField 
              label="项目名称" 
              name={`project_name_${id}`} 
              required 
              placeholder="请输入" 
              value={projectData[id]?.name || ''} 
              onChange={(e: any) => setProjectData(prev => ({ ...prev, [id]: { ...prev[id], name: e.target.value } }))} 
            />
            <FormField 
              label="项目角色" 
              name={`project_role_${id}`} 
              required 
              placeholder="请输入" 
              value={projectData[id]?.role || ''} 
              onChange={(e: any) => setProjectData(prev => ({ ...prev, [id]: { ...prev[id], role: e.target.value } }))} 
            />
            <FormField 
              label="起止时间" 
              required 
              placeholder="请选择" 
              hasArrow 
              readOnlyInput 
              value={projectData[id]?.date || ''}
              onClick={() => openDatePicker('project', id, projectData[id]?.date || '')}
            />
          </>
        )}
      />

      <DynamicSection 
        title="作品" 
        items={portfolios} 
        setItems={setPortfolios} 
        renderItem={(id) => (
          <>
            <FormField 
              label="作品链接" 
              name={`portfolio_link_${id}`} 
              required 
              placeholder="请输入" 
              value={portfolioData[id]?.link || ''}
              onChange={(e: any) => setPortfolioData(prev => ({ ...prev, [id]: { ...prev[id], link: e.target.value } }))}
            />
            <div className="py-4 border-b border-gray-100 mx-4 bg-white">
              <div className="text-[15px] text-gray-900 shrink-0 mb-4">
                作品附件<span className="text-[#e60012] ml-0.5">*</span>
              </div>
              <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center relative">
                <div className="relative mb-3">
                  <FileText className="w-10 h-10 text-gray-400 stroke-[1.5]" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                    <ArrowUpCircle className="w-4 h-4 text-[#e60012] bg-white rounded-full" />
                  </div>
                </div>
                <div className="text-[14px] text-gray-900 mb-1">{portfolioFileNames[id] || '上传作品'}</div>
                <div className="text-[12px] text-gray-400 text-center leading-relaxed">
                  将文件控制在300MB以内
                </div>
                <input required={!portfolioFileIds[id]} type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, (fileId, fileName) => { setPortfolioFileIds(prev => ({...prev, [id]: fileId})); setPortfolioFileNames(prev => ({...prev, [id]: fileName})); })} />
              </div>
            </div>
          </>
        )}
      />

      <DynamicSection 
        title="获奖" 
        items={awards} 
        setItems={setAwards} 
        renderItem={(id) => (
          <>
            <FormField 
              label="获奖名称" 
              name={`award_name_${id}`} 
              required 
              placeholder="请输入" 
              value={awardData[id]?.name || ''} 
              onChange={(e: any) => setAwardData(prev => ({ ...prev, [id]: { ...prev[id], name: e.target.value } }))} 
            />
            <FormField 
              label="获奖时间" 
              required 
              placeholder="请选择" 
              hasArrow 
              readOnlyInput 
              value={awardData[id]?.date || ''}
              onClick={() => openDatePicker('award', id, awardData[id]?.date || '', 'single')}
            />
          </>
        )}
      />

      <DynamicSection 
        title="语言能力" 
        items={languages} 
        setItems={setLanguages} 
        renderItem={(id) => (
          <>
            <FormField 
              label="语言" 
              name={`lang_name_${id}`} 
              required 
              placeholder="请输入" 
              value={langData[id]?.name || ''}
              onChange={(e: any) => setLangData(prev => ({ ...prev, [id]: { ...prev[id], name: e.target.value } }))}
            />
            <FormField 
              label="精通程度" 
              required 
              placeholder="请选择" 
              value={langData[id]?.proficiency || ''}
              hasArrow 
              readOnlyInput
              onClick={() => openOptionPicker('lang_proficiency', id, ['一般', '熟练', '精通', '母语'], langData[id]?.proficiency || '')}
            />
          </>
        )}
      />

      {/* Submit Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 mb-4 flex justify-center px-5"
      >
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-48 py-3 bg-[#e60012] text-white text-[16px] font-medium rounded-full shadow-md hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : '保存'}
        </button>
      </motion.div>
    </form>
  );
}
