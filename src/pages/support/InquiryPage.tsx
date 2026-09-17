import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { PrivacyPolicyModal } from '../../components/PrivacyPolicyModal';
import { UserAgreementModal } from '../../components/UserAgreementModal';
import { OptionPickerDrawer } from '../../components/OptionPickerDrawer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../components/Toast';
import { submitConsult } from '../../api/consult';
import inquiryProduct from '../../assets/inquiry/product-placeholder.png';

const REGION_OPTIONS = [
  '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江',
  '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南',
  '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾',
  '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门',
];

const PRODUCT_OPTIONS = ['MS8100', 'MS8000', 'FTMS / FTMS Pro', 'MS7000', 'MS6000'];

export function InquiryPage() {
  const toast = useToast();
  useDocumentTitle('在线咨询');
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') || '';
  const initialProduct = PRODUCT_OPTIONS.includes(productParam) ? productParam : '';

  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isUserAgreementOpen, setIsUserAgreementOpen] = useState(false);
  const [isRegionPickerOpen, setIsRegionPickerOpen] = useState(false);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    region: '',
    productModel: initialProduct,
    inquiry: '',
    agreed: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox') {
      setFormData((previous) => ({
        ...previous,
        [name]: (event.target as HTMLInputElement).checked,
      }));
      return;
    }
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formData.region) {
      toast.error('请选择地区');
      return;
    }
    if (!/^(1\d{10}|0\d{2,3}-?\d{7,8})$/.test(formData.phone.trim())) {
      toast.error('请输入正确的手机号码或座机号码');
      return;
    }
    if (!formData.productModel) {
      toast.error('请选择产品型号');
      return;
    }
    if (!formData.agreed) {
      toast.error('请先同意隐私政策声明和用户协议');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitConsult({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        organization: formData.company.trim(),
        region: formData.region,
        productModel: formData.productModel,
        question: formData.inquiry.trim(),
        source: 'consult_page',
      });
      toast.success('提交成功！我们将尽快与您联系。');
      setFormData({
        name: '',
        phone: '',
        company: '',
        region: '',
        productModel: initialProduct,
        inquiry: '',
        agreed: false,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SelectField = ({
    label,
    value,
    placeholder,
    onClick,
  }: {
    label: string;
    value: string;
    placeholder: string;
    onClick: () => void;
  }) => (
    <div className="flex-1 min-w-0">
      <label className="block text-[15px] text-[#333] mb-2">
        {label}<span className="text-[#cc0000]">*</span>
      </label>
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full px-4 py-3 pr-9 bg-white border border-gray-300 rounded text-left text-[15px] focus:outline-none focus:border-gray-500 ${value ? 'text-[#333]' : 'text-gray-400'}`}
      >
        <span className="block truncate">{value || placeholder}</span>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>
  );

  return (
    <div className="w-full bg-[#f9fafb] min-h-screen pt-20 pb-12 font-sans">
      <div className="px-6 pt-6">
        <div className="relative inline-block mb-6">
          <h1 className="text-[32px] font-bold text-black tracking-widest">立即咨询</h1>
          <motion.span aria-hidden="true" animate={{ y: [0, 4, 0], scale: [1, 1.08, 1], rotate: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-[20px] -top-[7px] h-[17px] w-[17px] bg-[#d7193f]" style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%)' }} />
        </div>

        <div className="relative mb-8 text-[#555] text-[15px] leading-relaxed">
          <p className="mb-2">尊敬的客户，您好！感谢您对引力波质谱产品的关注，如需获取产品相关信息，请您填写下方表单，我们将在第一时间与您取得联系。</p>
          <div className="absolute right-0 bottom-[-20px] w-32 opacity-80 mix-blend-multiply">
            <img src={inquiryProduct} alt="质谱仪产品" className="w-full object-contain" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[15px] text-[#333] mb-2">姓名<span className="text-[#cc0000]">*</span></label>
            <input type="text" name="name" placeholder="请输入姓名" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]" />
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">联系电话<span className="text-[#cc0000]">*</span></label>
            <input type="tel" name="phone" placeholder="请输入手机号或座机号" value={formData.phone} onChange={handleChange} required pattern="(1\d{10}|0\d{2,3}-?\d{7,8})" inputMode="tel" className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]" />
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">单位（公司/院校/研究所）全称<span className="text-[#cc0000]">*</span></label>
            <input type="text" name="company" placeholder="请输入单位全称" value={formData.company} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px]" />
          </div>

          <div className="flex gap-4">
            <SelectField label="地区" value={formData.region} placeholder="请选择地区" onClick={() => setIsRegionPickerOpen(true)} />
            <SelectField label="产品型号" value={formData.productModel} placeholder="请选择型号" onClick={() => setIsProductPickerOpen(true)} />
          </div>

          <div>
            <label className="block text-[15px] text-[#333] mb-2">咨询问题<span className="text-[#cc0000]">*</span></label>
            <textarea name="inquiry" placeholder="请输入想咨询的问题" value={formData.inquiry} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-[15px] resize-none" />
          </div>

          <p className="text-[14px] text-gray-400 py-1">温馨提示：推荐拨打 400-0233-929 快速咨询</p>

          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" name="agreed" id="agreed" checked={formData.agreed} onChange={handleChange} className="mt-1 shrink-0 border-gray-300 rounded" />
            <label htmlFor="agreed" className="min-w-0 text-[13px] text-[#333] leading-relaxed break-words">
              我已阅读并同意{' '}
              <button type="button" onClick={() => setIsPrivacyPolicyOpen(true)} className="inline whitespace-nowrap text-blue-600 hover:underline">《隐私政策声明》</button>{' '}
              和{' '}
              <button type="button" onClick={() => setIsUserAgreementOpen(true)} className="inline whitespace-nowrap text-blue-600 hover:underline">《引力波智谛用户协议》</button>
            </label>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={isSubmitting} className="w-32 py-3 rounded-full border border-gray-300 text-gray-700 bg-white hover:border-[#cc0000] hover:text-[#cc0000] disabled:cursor-not-allowed disabled:opacity-60 transition-colors text-[16px] tracking-widest text-center block">
              {isSubmitting ? '提交中...' : '提交'}
            </button>
          </div>
        </form>
      </div>

      <OptionPickerDrawer isOpen={isRegionPickerOpen} onClose={() => setIsRegionPickerOpen(false)} options={REGION_OPTIONS} value={formData.region} onSelect={(region) => setFormData((previous) => ({ ...previous, region }))} title="选择地区" />
      <OptionPickerDrawer isOpen={isProductPickerOpen} onClose={() => setIsProductPickerOpen(false)} options={PRODUCT_OPTIONS} value={formData.productModel} onSelect={(productModel) => setFormData((previous) => ({ ...previous, productModel }))} title="选择产品型号" />
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
      <UserAgreementModal isOpen={isUserAgreementOpen} onClose={() => setIsUserAgreementOpen(false)} />
    </div>
  );
}
