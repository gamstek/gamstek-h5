import React, { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ms8100Hero from '../../assets/ms8100/hero.jpg';
import ms8100Quadrupole from '../../assets/ms8100/quadrupole.jpg';
import ms8100IonSource from '../../assets/ms8100/ion-source.jpg';
import ms8100Stability from '../../assets/ms8100/stability.jpg';
import ms8100Comparison from '../../assets/ms8100/comparison.jpg';
import ms8100Software from '../../assets/ms8100/software.jpg';

// Dummy data for charts
const generateStabilityData = () => {
  return Array.from({ length: 200 }, (_, i) => ({
    x: i * 5,
    PFOA: 1.5e7 + (Math.random() - 0.5) * 0.15e7,
    PFOS: 0.7e7 + (Math.random() - 0.5) * 0.08e7,
  }));
};

const generateSensitivityData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const x = i * 0.016; 
    const peak8100 = 500 * Math.exp(-Math.pow(x - 0.8, 2) / 0.002);
    const peak7000 = 200 * Math.exp(-Math.pow(x - 0.81, 2) / 0.002);
    const peak6000 = 100 * Math.exp(-Math.pow(x - 0.79, 2) / 0.002);
    return { x, MS8100: peak8100, MS7000: peak7000, MS6000: peak6000 };
  });
};

export function MS8100Details() {
  useDocumentTitle('MS8100');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stabilityData = useMemo(() => generateStabilityData(), []);
  const sensitivityData = useMemo(() => generateSensitivityData(), []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans text-white selection:bg-red-500/30">
      {/* Hero Section */}
      <div className="relative w-full pt-28 pb-16 flex flex-col items-center bg-gradient-to-b from-[#111] to-[#0a0a0a]">
         <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[2.5rem] font-bold mb-2 tracking-wider"
          >
            MS8100
          </motion.h1>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-4 tracking-widest"
          >
            LC-MS/MS
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-300 mb-8 tracking-widest"
          >
            三重四极杆串联质谱联用仪
          </motion.p>
          
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/inquiry?product=MS8100')}
            className="bg-white text-black px-10 py-2.5 rounded-full font-medium text-sm mb-12 hover:bg-gray-200 transition-colors"
          >
            购买咨询
          </motion.button>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="w-full px-4"
          >
            <img 
              src={ms8100Hero}
              alt="MS8100 System" 
              className="w-full max-w-sm mx-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            />
          </motion.div>
      </div>

      {/* 四极杆 (Quadrupole) */}
      <div className="py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#111] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">四极杆</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>精密装配，综合误差优于±1 μm</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>陶瓷基材热稳定性强</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>表面镀金，抗污染、抗氧化</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>陶瓷底座，绝缘、抗干扰</li>
        </ul>
        <img src={ms8100Quadrupole} alt="Quadrupole" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* 离子源 (Ion Source) */}
      <div className="py-20 px-6 bg-[#0f0f0f] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">离子源</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>配置双陶瓷加热棒，离子化效率更高</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>更高的离子响应，更低的检出限</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>ESI/APCI 灵活切换，操作便捷</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>无需卸真空，拆卸方便</li>
        </ul>
        <img src={ms8100IonSource} alt="Ion Source" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* 核心亮点 (Core Highlights) */}
      <div className="py-20 px-4 bg-[#141414] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-12 tracking-widest">核心亮点</h3>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {/* Cards */}
          {[
            { title: '超强整机性能', desc: '灵敏度达到先进水平\n以卓越性能赋能痕量\n分析极限突破', icon: 'M4 12V4m8 16V8m8 12v-6' },
            { title: '运行稳定可靠', desc: '超长连续稳定运行\n护航高通量检测数据\n重现性始终如一', icon: 'M3 3v18h18 M3 15l6-6 4 4 8-8' },
            { title: '操作便捷友好', desc: '全中文操作，极简交互设计\n深度契合国内用户操作\n习惯与工作流程', icon: 'M4 6h16v10H4z M2 18h20v2H2z' },
            { title: '核心部件可控', desc: '核心部件完全自研，摆脱\n进口依赖保障仪器长期稳定\n运行与高效售后响应', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
            { title: '抗污染能力强', desc: '超强抗污染设计，从容应对\n复杂基质，无需频繁清洗维\n护降低使用成本', icon: 'M11 5L6 9H2v6h4l5 4V5z M22 9l-6 6 M16 9l6 6' },
            { title: '维护简易高效', desc: '高度模块化架构设计显\n著简化日常维护流程\n提升设备可用性', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-4 flex flex-col items-center text-center border border-gray-800 shadow-lg">
              <h4 className="font-bold text-[15px] mb-3 text-gray-100">{item.title}</h4>
              <p className="text-[11px] text-gray-400 mb-6 leading-relaxed whitespace-pre-line">{item.desc}</p>
              <div className="mt-auto pb-2 text-gray-400 opacity-80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                   <path d={item.icon} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 超凡稳定性与重现性 */}
      <div className="py-20 px-2 bg-[#0a0a0a] flex flex-col items-center text-center overflow-hidden">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">超凡稳定性与重现性</h3>
        <h4 className="text-[15px] font-bold text-gray-200 mb-4">血清基质中全氟稳定性实验</h4>
        <p className="text-[12px] text-gray-400 mb-10 px-6 leading-relaxed max-w-sm">
          血清按照1:4甲醇沉淀蛋白后，离心，加入全氟PFOA，PFOS连续进样1000针峰面积RSD为3.25%（PFOA） 1.99%（PFOS）
        </p>
        
        <div className="w-[100%] max-w-lg h-[350px] relative text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 10, bottom: 20, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={true} horizontal={true} />
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={[0, 1000]} 
                stroke="#444" 
                tick={{fill: '#888', fontSize: 10}} 
                tickCount={11} 
                label={{ value: '进样针数', position: 'bottom', fill: '#888', fontSize: 10, dy: 10 }}
              />
              <YAxis 
                dataKey="y" 
                type="number" 
                stroke="#444" 
                tick={{fill: '#888', fontSize: 10}} 
                tickFormatter={(val) => val.toExponential(2).toUpperCase()} 
                domain={[0, 3e7]}
                label={{ value: '峰面积', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 10, dx: 10 }}
              />
              <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#fff'}} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, top: -10 }} />
              <Scatter name="PFOA" data={stabilityData.map(d => ({x: d.x, y: d.PFOA}))} fill="#00a8e8" />
              <Scatter name="PFOS" data={stabilityData.map(d => ({x: d.x, y: d.PFOS}))} fill="#e60012" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 产品对比 */}
      <div className="py-20 px-4 bg-[#141414] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-12 tracking-widest">产品对比</h3>
        
        <div className="w-full max-w-md border border-gray-800 rounded-lg overflow-hidden text-sm bg-[#0a0a0a]">
          {/* Header */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-gray-800 bg-[#1f1f1f] py-3 text-center text-gray-200 font-medium">
            <div></div>
            <div className="border-l border-gray-800 flex items-center justify-center">质量范围</div>
            <div className="border-l border-gray-800 flex items-center justify-center">标配离子源</div>
          </div>
          
          {/* Row 1: MS8100 */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-gray-800 items-stretch bg-[#111]">
            <div className="p-3 flex flex-col items-center justify-center">
              <img src={ms8100Hero} alt="MS8100" className="w-20 h-14 object-contain mb-2 rounded bg-white/5 p-1" />
              <span className="text-xs font-medium text-gray-200">MS8100</span>
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex flex-col justify-center text-center text-gray-300 gap-0.5">
              <span>5-1250 amu</span>
              <span>5-2000 amu</span>
              <span className="text-gray-500">（两档）</span>
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex items-center justify-center text-gray-300">
              ESI / APCI
            </div>
          </div>
          
          {/* Row 2: MS7000 */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-gray-800 items-stretch bg-[#1a1a1a]">
            <div className="p-3 flex flex-col items-center justify-center">
              <img src={ms8100Comparison} alt="MS7000" className="w-20 h-14 object-cover mb-2 rounded bg-white/5 p-1" />
              <span className="text-xs font-medium text-gray-200">MS7000</span>
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex items-center justify-center text-center text-gray-300">
              5-1250 amu
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex items-center justify-center text-gray-300">
              ESI / APCI
            </div>
          </div>

          {/* Row 3: MS6000 */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] items-stretch bg-[#111]">
            <div className="p-3 flex flex-col items-center justify-center">
              <img src={ms8100Stability} alt="MS6000" className="w-20 h-14 object-cover mb-2 rounded bg-white/5 p-1" />
              <span className="text-xs font-medium text-gray-200">MS6000</span>
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex items-center justify-center text-center text-gray-300">
              5-1250 amu
            </div>
            <div className="border-l border-gray-800 p-2 text-[11px] flex items-center justify-center text-gray-300">
              ESI
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md border border-gray-800 mt-6 rounded-lg bg-[#0a0a0a] p-4">
           <h4 className="text-[12px] mb-6 text-gray-300 text-center">ESI正离子灵敏度 1pg 利血平</h4>
           <div className="w-[100%] h-[250px] text-xs">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={sensitivityData} margin={{ top: 10, right: 10, bottom: 20, left: -20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                 <XAxis 
                    dataKey="x" 
                    type="number" 
                    stroke="#444" 
                    tick={{fill: '#888', fontSize: 10}} 
                    domain={[0, 1.6]} 
                    tickCount={9}
                    label={{ value: '时间 (min)', position: 'bottom', fill: '#888', fontSize: 10, dy: 10 }}
                 />
                 <YAxis 
                    stroke="#444" 
                    tick={{fill: '#888', fontSize: 10}} 
                    domain={[0, 500]}
                    label={{ value: '强度 (%)', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 10, dx: 15 }} 
                 />
                 <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#fff'}} labelFormatter={(l) => `时间: ${Number(l).toFixed(2)} min`} />
                 <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, top: -10 }} />
                 <Line name="8100" type="monotone" dataKey="MS8100" stroke="#00a8e8" strokeWidth={2} dot={false} isAnimationActive={false} />
                 <Line name="7000" type="monotone" dataKey="MS7000" stroke="#e60012" strokeWidth={2} dot={false} isAnimationActive={false} />
                 <Line name="6000" type="monotone" dataKey="MS6000" stroke="#8884d8" strokeWidth={2} dot={false} isAnimationActive={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* MassNova 2.0 */}
      <div className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#000] flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-16 tracking-wider text-white">MassNova 2.0</h3>
        
        <div className="relative w-full max-w-md h-[240px] mb-20">
           <img src={ms8100Software} alt="Software UI Background" className="absolute top-0 right-2 w-[85%] rounded-lg shadow-2xl border border-gray-700 opacity-60 mix-blend-screen" />
           <img src={ms8100Software} alt="Software UI Foreground" className="absolute bottom-0 left-2 w-[85%] rounded-lg shadow-2xl border border-gray-600 z-10 mix-blend-screen" />
        </div>

        <ul className="text-left space-y-5 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>软件布局更简洁明确</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>用户体验显著提升</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>更全面的谱图库功能</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>更加优化的方法建立途径</li>
        </ul>
      </div>

    </div>
  );
}
