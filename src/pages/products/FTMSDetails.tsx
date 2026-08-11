import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ftmsHero from '../../assets/ftms/hero.jpg';
import ftmsIonOptics from '../../assets/ftms/ion-optics.jpg';
import ftmsMagnet from '../../assets/ftms/magnet.jpg';
import ftmsControlSystem from '../../assets/ftms/control-system.jpg';

import img1 from '../../assets/ftms/img.png';
import img2 from '../../assets/ftms/img2.png';
import img3 from '../../assets/ftms/img3.png';
import pImg from '../../assets/ftms/p.png';

export function FTMSDetails() {
  useDocumentTitle('FTMS/FTMS+');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#111] text-white min-h-screen pt-20">
      
      {/* Hero Section */}
      <div className="relative h-[640px] px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] flex flex-col items-center justify-center text-center overflow-hidden">
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
      <div className="py-20 px-6 bg-[#161616] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-12 tracking-widest">分辨率突破千万级</h3>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-6 border border-gray-800 shadow-lg flex flex-col items-center text-center h-48">
            <h4 className="font-bold text-[15px] mb-1 text-gray-100 tracking-wider">极致分辨率</h4>
            <p className="text-[13px] text-gray-400 mb-auto">洞察细微之差</p>
            <div className="w-16 h-16 mt-4 opacity-80 text-red-500">
               <img src={ftmsHero} alt="Resolution" className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" />
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-6 border border-gray-800 shadow-lg flex flex-col items-center text-center h-48">
            <h4 className="font-bold text-[15px] mb-1 text-gray-100 tracking-wider">亚ppm级质量精度</h4>
            <p className="text-[13px] text-gray-400 mb-auto">锁定分子指纹</p>
            <div className="w-16 h-16 mt-4 opacity-80 text-red-500">
               <img src={ftmsIonOptics} alt="Mass Accuracy" className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-6 border border-gray-800 shadow-lg flex flex-col items-center text-center h-48">
            <h4 className="font-bold text-[15px] mb-1 text-gray-100 tracking-wider">灵活的多级鉴定</h4>
            <p className="text-[13px] text-gray-400 mb-auto">（MS^n）能力</p>
            <div className="w-16 h-16 mt-4 opacity-80 text-red-500">
                <img src={ftmsMagnet} alt="Multi-stage Identification" className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-6 border border-gray-800 shadow-lg flex flex-col items-center text-center h-48">
            <h4 className="font-bold text-[15px] mb-1 text-gray-100 tracking-wider">智能工作流与高速</h4>
            <p className="text-[13px] text-gray-400 mb-auto">数据采集</p>
            <div className="w-16 h-16 mt-4 opacity-80 text-red-500">
                <img src={ftmsControlSystem} alt="Intelligent Workflow" className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" />
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
      <div className="py-20 px-6 bg-[#111] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-16 tracking-widest">先进的离子光学系统</h3>
        
        <div className="w-full max-w-md relative pb-10">
           {/* Connecting Line */}
           <div className="absolute left-8 top-10 bottom-10 w-[1px] bg-gray-700"></div>

           <div className="space-y-16">
              {/* Item 1 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-16 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">前级离子漏斗</h4>
                    </div>
                    <p className="text-gray-300 text-sm tracking-wide">优秀的离子聚焦</p>
                 </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-24 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">陶瓷镀金四极杆</h4>
                    </div>
                    <p className="text-gray-300 text-sm tracking-wide mb-3">稳定的离子筛选性能</p>
                    <ul className="text-left space-y-1 text-xs text-gray-400">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>圆柱度优于±1 um</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>装配精度优于± 1um</li>
                    </ul>
                 </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-32 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-4">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">六级杆碰撞池</h4>
                    </div>
                    <p className="text-gray-300 text-sm tracking-wide mb-3">极高且稳定的碎裂效率</p>
                    <ul className="text-left space-y-1 text-xs text-gray-400">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>支持CID、HCD碎裂</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>兼容氮气和氩气</li>
                    </ul>
                 </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-32 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">弯曲型囚禁离子阱</h4>
                    </div>
                    <p className="text-gray-300 text-sm tracking-wide mb-3">充分利用离子</p>
                    <ul className="text-left space-y-1 text-xs text-gray-400">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>MS1富集，增强灵敏度</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>碎裂离子高效聚焦推斥</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>超过百万离子容量</li>
                    </ul>
                 </div>
              </div>
              
              {/* Item 5 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-28 shrink-0 relative z-10">
                    <img src={ftmsHero} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">反射式飞行时间系统</h4>
                    </div>
                    <ul className="text-left space-y-1 text-xs text-gray-400 mt-3">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>反射式飞行时间测量</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>分辨率 {">"}35,000</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>扫描速度 ≥100Hz</li>
                    </ul>
                 </div>
              </div>

              {/* Item 6 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-24 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">离子隔离系统</h4>
                    </div>
                    <p className="text-[#00a8e8] text-sm tracking-wide">降低离子干扰</p>
                 </div>
              </div>

              {/* Item 7 */}
              <div className="flex gap-6 relative">
                 <div className="w-16 h-32 shrink-0 relative z-10">
                    <img src={ftmsIonOptics} className="w-full h-full object-cover rounded shadow-lg border border-gray-600 mix-blend-screen" alt="part" />
                 </div>
                 <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[#00a8e8]">------</span>
                       <h4 className="text-[#00a8e8] font-bold text-lg tracking-wider">高精度回旋共振池</h4>
                    </div>
                    <ul className="text-left space-y-1 text-xs text-gray-400 mt-3">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>优于500ppb的质量准确度</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>高分辨率探测</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[#00a8e8]"></div>超百万高离子容量</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 超导磁体 */}
      <div className="py-20 px-6 bg-[#0a0a0a] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">超导磁体</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>超高稳定性</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>低磁场漂移：优于50ppb/h</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>高均匀性：优于10ppm</li>
        </ul>
        <img src={ftmsMagnet} alt="Superconducting Magnet" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* FTMS控制系统 */}
      <div className="py-20 px-6 bg-[#111] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">FTMS控制系统</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>集成式电子学控制系统</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>在线FFT算法</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] shadow-[0_0_8px_rgba(0,168,232,0.8)]"></div>模块化设计</li>
        </ul>
        <img src={ftmsControlSystem} alt="Control System" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* FTMS软件 */}
      <div className="py-24 px-6 bg-gradient-to-b from-[#111] to-[#000] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest text-white">FTMS软件</h3>
        <p className="text-[14px] text-gray-300 leading-relaxed mb-16 max-w-md">
           FTMS软件进一步构建了完整的数据采集与方法管理能力。软件支持单TOF全扫描、实时TOF离子流图采集、Cell模式全扫描，并集成SIM、MRM、MS/MS快速采集以及DIA应用方法编辑等功能，可根据不同研究任务构建灵活的数据采集方案
        </p>
        
        <div className="relative w-full max-w-md h-[240px]">
           <img src={ftmsControlSystem} alt="Software UI Background" className="absolute top-0 right-2 w-[85%] rounded-lg shadow-2xl border border-gray-700 opacity-60 mix-blend-screen" />
           <img src={ftmsHero} alt="Software UI Foreground" className="absolute bottom-0 left-2 w-[85%] rounded-lg shadow-2xl border border-gray-600 z-10 mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}
