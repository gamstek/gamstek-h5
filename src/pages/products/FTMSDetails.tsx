import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { FTMSOpticsStory } from './FTMSOpticsStory';
import ftmsHero from '../../assets/ftms/hero.jpg';
import ftmsIonOptics from '../../assets/ftms/ion-optics.jpg';
import ftmsMagnet from '../../assets/ftms/magnet.jpg';
import ftmsControlSystem from '../../assets/ftms/control-system.jpg';

import img1 from '../../assets/ftms/img.png';
import img2 from '../../assets/ftms/img2.png';
import img3 from '../../assets/ftms/img3.png';
import pImg from '../../assets/ftms/p.png';
import superconductingMagnet from '../../assets/ftms/systems/superconducting-magnet.png';
import ftmsSystem from '../../assets/ftms/systems/control-system.png';
import ftmsSoftware from '../../assets/ftms/systems/software.png';

export function FTMSDetails() {
  useDocumentTitle('FTMS/FTMS+');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="bg-[#111] text-white min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative h-[640px] px-6 pt-[52px] bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] flex flex-col items-center justify-start text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={pImg} 
            alt="FTMS System" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>
        <div className="relative z-10 w-full max-w-md">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[2.5rem] font-bold mb-4 tracking-wider"
          >
            FTMS / FTMS+
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-gray-300 mb-2 tracking-widest"
          >
            突破分辨率天花板
          </motion.p>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-[15px] text-gray-300 mb-8 tracking-widest"
          >
            全新高分辨质谱仪
          </motion.p>
          
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/inquiry?product=FTMS')}
            className="bg-white text-black px-8 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            购买咨询
          </motion.button>
        </div>
      </div>

      {/* 分辨率突破千万级 */}
      <div className="py-20 px-[14px] bg-[#1d1d1d] flex flex-col items-center">
        <h3 className="text-[22px] font-normal mb-9 tracking-normal">分辨率突破千万级</h3>
        <div className="grid grid-cols-2 gap-2 w-full max-w-md">
          
          {/* Card 1 */}
          <div className="relative h-[240px] overflow-hidden rounded-xl border border-[#333] text-center">
            <img src={ftmsHero} alt="极致分辨率" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 pt-8 text-[15px] leading-[26px] text-white">
              <h4>极致分辨率</h4>
              <p>洞察细微之差</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative h-[240px] overflow-hidden rounded-xl border border-[#333] text-center">
            <img src={ftmsIonOptics} alt="亚ppm级质量精度" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 pt-8 text-[15px] leading-[26px] text-white">
              <h4>亚ppm级质量精度</h4>
              <p>锁定分子指纹</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-[240px] overflow-hidden rounded-xl border border-[#333] text-center">
            <img src={ftmsMagnet} alt="灵活的多级鉴定" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 pt-8 text-[15px] leading-[26px] text-white">
              <h4>灵活的多级鉴定</h4>
              <p>（MS^n）能力</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative h-[240px] overflow-hidden rounded-xl border border-[#333] text-center">
            <img src={ftmsControlSystem} alt="智能工作流与高速数据采集" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 pt-8 text-[15px] leading-[26px] text-white">
              <h4>智能工作流与高速</h4>
              <p>数据采集</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* 多型离子光源 */}
      <div className="py-20 px-6 bg-[#0a0a0a] flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mb-4 tracking-widest">多型离子光源</h3>
        <p className="text-[16px] text-gray-300 mb-16 tracking-wider">灵活适配多种需求</p>
        
        <div className="space-y-16 w-full max-w-sm">
          <div>
            <img src={img1} alt="ESI" className="w-full rounded-lg mb-4 mix-blend-screen opacity-90" />
            {/* <p className="text-xl font-medium tracking-wider"><span className="text-[#00a8e8]">E</span>SI</p> */}
          </div>
          <div>
            <img src={img2} alt="APCI" className="w-full rounded-lg mb-4 mix-blend-screen opacity-90" />
            {/* <p className="text-xl font-medium tracking-wider"><span className="text-[#00a8e8]">AP</span>CI</p> */}
          </div>
          <div>
            <img src={img3} alt="NanoESI" className="w-full rounded-lg mb-4 mix-blend-screen opacity-90" />
            {/* <p className="text-xl font-medium tracking-wider"><span className="text-[#00a8e8]">Nano</span>ESI</p> */}
          </div>
        </div>
      </div>

      {/* 先进的离子光学系统 */}
      <FTMSOpticsStory />

      {/* 超导磁体 */}
      <section className="relative aspect-[750/1140] overflow-hidden bg-[#0b0b0b]">
        <img src={superconductingMagnet} alt="超导磁体" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-[58px] z-10">
          <h3 className="text-center text-[16px] font-normal">超导磁体</h3>
          <ul className="mx-auto mt-6 w-fit space-y-2 text-[12px] leading-5 text-white">
            <li><span className="mr-3 text-[#00a8e8]">·</span>超高稳定性</li>
            <li><span className="mr-3 text-[#00a8e8]">·</span>低磁场漂移：优于50ppb/h</li>
            <li><span className="mr-3 text-[#00a8e8]">·</span>高均匀性：优于10ppm</li>
          </ul>
        </div>
      </section>

      {/* FTMS控制系统 */}
      <section className="relative aspect-[750/1140] overflow-hidden bg-[#0b0b0b]">
        <img src={ftmsSystem} alt="FTMS控制系统" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-[58px] z-10">
          <h3 className="text-center text-[16px] font-normal">FTMS控制系统</h3>
          <ul className="mx-auto mt-6 w-fit space-y-2 text-[12px] leading-5 text-white">
            <li><span className="mr-3 text-[#00a8e8]">·</span>集成式电子学控制系统</li>
            <li><span className="mr-3 text-[#00a8e8]">·</span>在线FFT算法</li>
            <li><span className="mr-3 text-[#00a8e8]">·</span>模块化设计</li>
          </ul>
        </div>
      </section>

      {/* FTMS软件 */}
      <section className="relative aspect-[750/1140] overflow-hidden bg-[#0b0b0b]">
        <img src={ftmsSoftware} alt="FTMS软件界面" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-6 top-[58px] z-10">
          <h3 className="text-center text-[16px] font-normal">FTMS软件</h3>
          <p className="mt-7 text-justify text-[12px] leading-[22px] text-white">
            FTMS软件进一步构建了完整的数据采集与方法管理能力。软件支持单TOF全扫描、实时TOF离子流图采集、Cell模式全扫描，并集成SIM、MRM、MS/MS快速采集以及DIA应用方法编辑等功能，可根据不同研究任务构建灵活的数据采集方案
          </p>
        </div>
      </section>
    </div>
  );
}
