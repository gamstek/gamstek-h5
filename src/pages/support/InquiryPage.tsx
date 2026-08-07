import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { PrivacyPolicyModal } from '../../components/PrivacyPolicyModal';
import { UserAgreementModal } from '../../components/UserAgreementModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function InquiryPage() {
  useDocumentTitle('在线咨询');
  const [searchParams] = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';
  
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isUserAgreementOpen, setIsUserAgreementOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    region: '江苏',
    productModel: productFromUrl,
    inquiry: '',
    agreed: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('请先同意隐私政策声明和用户协议');
      return;
    }
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('提交成功！我们将尽快与您联系。');
  };

  return (
    <div className="w-full bg-[#f9fafb] min-h-screen pt-20 pb-12 font-sans">
      <div className="px-6 pt-6">
        
        {/* Title */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[32px] font-bold text-black tracking-widest">立即咨询</h1>
          <div className="absolute -top-1 -right-4 w-4 h-4 bg-[#cc0000] z-[-1]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
        </div>

        {/* Intro Text */}
        <div className="relative mb-8 text-[#555] text-[15px] leading-relaxed">
          <p className="mb-2">尊敬的客户，您好！感谢您对引力波质谱产品的关注，如需获取产品相关信息，请您填写下方表单，我们将在第一时间与您取得联系！</p>
          
          <div className="absolute right-0 bottom-[-20px] w-32 opacity-80 mix-blend-multiply">
            <img 
              src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=300" 
              alt="MS System" 
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div>
            <label className="block text-[15px] text-[#333] mb-2">姓名<span className="text-[#cc0000]">*</span></label>
            <input 
              type="text" 
              name="name"
              placeholder="请输入姓名" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">联系电话<span className="text-[#cc0000]">*</span></label>
            <div className="relative">
               <input 
                 type="tel" 
                 name="phone"
                 placeholder="请输入联系电话" 
                 value={formData.phone}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
               </div>
            </div>
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">单位（公司/院校/研究所）全称 <span className="text-[#cc0000]">*</span></label>
            <input 
              type="text" 
              name="company"
              placeholder="企业用户请输入企业名称" 
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[15px] text-[#333] mb-2">地区</label>
              <div className="relative">
                <select 
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px] appearance-none"
                >
                  <option value="江苏">江苏</option>
                  <option value="北京">北京</option>
                  <option value="上海">上海</option>
                  <option value="广东">广东</option>
                  <option value="其他">其他</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-[15px] text-[#333] mb-2">产品型号</label>
              <input 
                type="text" 
                name="productModel"
                value={formData.productModel}
                onChange={handleChange}
                placeholder="请输入型号"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">咨询问题 <span className="text-[#cc0000]">*</span></label>
            <textarea 
              name="inquiry"
              placeholder="请输入想咨询的问题" 
              value={formData.inquiry}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px] resize-none"
            ></textarea>
          </div>

          <p className="text-[14px] text-gray-400 py-1">温馨提示：推荐拨打400-0233-929 快速咨询</p>

          <div className="flex items-start gap-2 pt-2">
            <input 
              type="checkbox" 
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 border-gray-300 rounded"
            />
            <label htmlFor="agreed" className="text-[14px] text-[#333] leading-relaxed">
              我已阅读并同意{' '}
              <button 
                type="button" 
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-blue-600 hover:underline inline-block"
              >
                《隐私政策声明》
              </button>{' '}
              和{' '}
              <button 
                type="button" 
                onClick={() => setIsUserAgreementOpen(true)}
                className="text-blue-600 hover:underline inline-block"
              >
                《引力波智谱用户协议》
              </button>
            </label>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              className="w-32 py-3 rounded-full border border-gray-300 text-gray-700 bg-white hover:border-[#cc0000] hover:text-[#cc0000] transition-colors text-[16px] tracking-widest text-center block"
            >
              提交
            </button>
          </div>

        </form>
      </div>
      
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
      <UserAgreementModal isOpen={isUserAgreementOpen} onClose={() => setIsUserAgreementOpen(false)} />
    </div>
  );
}
