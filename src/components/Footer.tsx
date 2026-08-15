import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactInfo, footerLinks } from '../data/config';
import wechatQr from '../assets/common/wechat-qr.png';

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-black text-white px-6 pt-10 pb-8">
      
      {/* Accordion Links */}
      <div className="space-y-0 mb-10">
        
        {/* 产品 Section */}
        <div className="border-b border-gray-800">
          <button 
            onClick={() => toggleSection('products')}
            className="w-full flex justify-between items-center py-4"
          >
            <span className="text-sm font-medium">产品</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openSection === 'products' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'products' && (
            <div className="flex flex-col gap-3 pb-4 text-gray-400 text-sm">
              {footerLinks.products.map((link, idx) => link.external ? (
                <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{link.label}</a>
              ) : (
                <Link key={idx} to={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          )}
        </div>

        {/* 支持 Section */}
        <div className="border-b border-gray-800">
          <button 
            onClick={() => toggleSection('support')}
            className="w-full flex justify-between items-center py-4"
          >
            <span className="text-sm font-medium">支持</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openSection === 'support' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'support' && (
            <div className="flex flex-col gap-3 pb-4 text-gray-400 text-sm">
              {footerLinks.support.map((link, idx) => (
                <Link key={idx} to={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          )}
        </div>

        {/* 关于我们 Section */}
        <div className="border-b border-gray-800">
          <button 
            onClick={() => toggleSection('about')}
            className="w-full flex justify-between items-center py-4"
          >
            <span className="text-sm font-medium">关于我们</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openSection === 'about' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'about' && (
            <div className="flex flex-col gap-3 pb-4 text-gray-400 text-sm">
              {footerLinks.about.map((link, idx) => (
                <Link key={idx} to={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <h5 className="text-sm font-medium mb-4">联系我们</h5>
        <div className="space-y-3 text-xs text-gray-400">
          <p className="flex items-center">
            <span className="w-12 text-gray-500">电话 :</span> 
            <a href={`tel:${contactInfo.phone}`} className="text-base text-gray-300 font-medium hover:text-white transition-colors">{contactInfo.phone}</a>
          </p>
          <p className="flex items-start">
            <span className="w-12 text-gray-500">邮箱 :</span> 
            <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
          </p>
          <p className="flex items-start">
            <span className="w-12 text-gray-500 shrink-0">地址 :</span> 
            <span className="leading-relaxed">{contactInfo.address}</span>
          </p>
        </div>
      </div>

      {/* Follow Us */}
      <div className="mb-10">
        <h5 className="text-sm font-medium mb-4">关注我们</h5>
        <div className="flex gap-4 items-end">
          <div className="flex items-center gap-1.5 border border-gray-600 rounded-full px-3 py-1 mb-1 opacity-50">
             {/* Minimal WeChat Icon Placeholder */}
             <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8.5 14.5c-2.8 0-5-1.9-5-4.2s2.2-4.2 5-4.2 5 1.9 5 4.2-2.2 4.2-5 4.2zm6.5 4.5c-2.3 0-4.2-1.6-4.2-3.5s1.9-3.5 4.2-3.5 4.2 1.6 4.2 3.5-1.9 3.5-4.2 3.5z"/></svg>
             <span className="text-[10px]">官方微信</span>
          </div>
          <img src={wechatQr} alt="微信公众号二维码" className="w-16 h-16 rounded shadow-sm border-2 border-white" />
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-6 border-t border-gray-800">
        <div className="mb-3">
          <span className="text-xl font-bold tracking-wider text-gray-400">{contactInfo.companyName}</span>
        </div>
        <div className="space-y-1.5 text-[10px] text-gray-500">
          <p>{contactInfo.copyright}</p>
          <p>{contactInfo.icp}</p>
        </div>
      </div>
    </footer>
  );
}
