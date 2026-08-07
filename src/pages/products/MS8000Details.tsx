import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export function MS8000Details() {
  useDocumentTitle('MS8000系列');
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#111] text-white min-h-screen pt-20">
      
      {/* Hero Section */}
      <div className="relative pt-12 pb-16 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] flex flex-col items-center text-center overflow-hidden">
        <div className="relative z-10 w-full max-w-md">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[2.5rem] font-bold mb-2 tracking-wider"
          >
            MS8000系列
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-300 mb-8 tracking-widest"
          >
            三重四极杆串联质谱联用仪
          </motion.p>
          
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white text-black px-8 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors mb-12 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            购买咨询
          </motion.button>
          
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full px-4 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800" 
              alt="MS8000 System" 
              className="w-full max-w-sm mx-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] rounded-lg"
            />
            {/* Robot placeholder */}
            <div className="absolute -bottom-4 right-2 w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-lg border-2 border-gray-200">
               <img src="https://api.dicebear.com/7.x/bottts/svg?seed=GAMSTEK" alt="Robot" className="w-full h-full rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 四极杆 */}
      <div className="py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#111] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">四极杆</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>精密装配，综合误差优于±1 μm</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>陶瓷基材热稳定性强</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>表面镀金，抗污染、抗氧化</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>陶瓷底座，绝缘、抗干扰</li>
        </ul>
        <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800" alt="Quadrupole" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* 离子源 */}
      <div className="py-20 px-6 bg-[#0f0f0f] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-10 tracking-widest">离子源</h3>
        <ul className="text-left space-y-4 mb-12 inline-block text-[15px] text-gray-200">
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>配置双陶瓷加热棒，离子化效率更高</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>更高的离子响应，更低的检出限</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>ESI/APCI 灵活切换，操作便捷</li>
          <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>无需卸真空，拆卸方便</li>
        </ul>
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" alt="Ion Source" className="w-full max-w-sm rounded-lg opacity-80 mix-blend-screen" />
      </div>

      {/* 超强整机性能 */}
      <div className="py-20 px-6 bg-gradient-to-b from-[#111] to-[#1a1a1a] flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold mb-6 tracking-widest">超强整机性能</h3>
        <p className="text-[13px] text-gray-300 mb-10 leading-relaxed max-w-xs">灵敏度达到国际先进水平，以卓越性能<br/>赋能痕量分析极限突破</p>
        <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800" alt="Machine Close up" className="w-full max-w-sm rounded-lg shadow-2xl" />
      </div>

      {/* 核心亮点 */}
      <div className="py-20 px-6 bg-[#161616] flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-12 tracking-widest">核心亮点</h3>
        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-6 border border-gray-800 shadow-lg flex flex-col items-center text-center">
            <h4 className="font-bold text-lg mb-3 text-gray-100 tracking-wider">运行稳定可靠</h4>
            <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">超长连续稳定运行<br/>护航高通量检测</p>
            <div className="w-full h-24 border-b border-l border-gray-600 flex items-end pl-2 pb-2 relative mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M0,80 Q10,75 20,80 T40,80 T60,82 T80,78 T100,80" fill="none" stroke="#00a8e8" strokeWidth="2" />
                 <line x1="0" y1="0" x2="0" y2="100" stroke="#444" strokeWidth="1" strokeDasharray="2 2" />
                 <line x1="25" y1="0" x2="25" y2="100" stroke="#444" strokeWidth="1" strokeDasharray="2 2" />
                 <line x1="50" y1="0" x2="50" y2="100" stroke="#444" strokeWidth="1" strokeDasharray="2 2" />
                 <line x1="75" y1="0" x2="75" y2="100" stroke="#444" strokeWidth="1" strokeDasharray="2 2" />
                 <line x1="100" y1="0" x2="100" y2="100" stroke="#444" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
          
          {/* Grid for Cards 2 and 3 */}
          <div className="grid grid-cols-2 gap-4">
             {/* Card 2 */}
            <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-4 border border-gray-800 shadow-lg flex flex-col items-center text-center">
              <h4 className="font-bold text-[15px] mb-3 text-gray-100 tracking-wider">抗污染能力强</h4>
              <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">超强抗污染设计，从容应对复杂基质无需频繁清洗维护，降低使用成本</p>
              <div className="w-full h-24 relative mt-auto flex items-center justify-center">
                  <div className="w-16 h-20 border-l-2 border-b-2 border-[#00a8e8] transform -skew-x-12 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#00a8e8]/20 to-transparent"></div>
                     <div className="absolute right-0 top-1/2 w-full h-0.5 bg-[#00a8e8] shadow-[0_0_8px_#00a8e8]"></div>
                  </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-[#222] to-[#181818] rounded-2xl p-4 border border-gray-800 shadow-lg flex flex-col items-center text-center">
              <h4 className="font-bold text-[15px] mb-3 text-gray-100 tracking-wider">核心部件可控</h4>
              <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">核心部件完全自研，摆脱进口依赖，保障仪器长期稳定运行与高效售后响应</p>
              <div className="w-full h-24 relative mt-auto">
                 <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=400" alt="Core component" className="w-full h-full object-contain mix-blend-screen opacity-80 transform scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MassNova 1.0 */}
      <div className="py-24 px-6 bg-gradient-to-b from-[#111] to-[#000] flex flex-col items-center">
        <h3 className="text-3xl font-bold mb-16 tracking-wider text-white">MassNova 1.0</h3>
        
        {/* Block 1 */}
        <div className="w-full max-w-md mb-16 flex flex-col items-center">
           <div className="relative w-full h-[200px] mb-10">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Software UI Background" className="absolute top-0 right-4 w-[85%] rounded-lg shadow-2xl border border-gray-700 opacity-80 object-cover h-[140px]" />
             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Software UI Foreground" className="absolute bottom-0 left-4 w-[85%] rounded-lg shadow-2xl border border-gray-500 z-10 object-cover h-[140px]" />
          </div>
          <ul className="text-left space-y-4 inline-block text-[15px] text-gray-200">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>设备实时状态监测</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>定量分析自动积分，便于数据统计</li>
          </ul>
        </div>

        {/* Block 2 */}
        <div className="w-full max-w-md flex flex-col items-center">
           <div className="relative w-full h-[200px] mb-10">
             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Software UI Background" className="absolute top-0 right-4 w-[85%] rounded-lg shadow-2xl border border-gray-700 opacity-80 object-cover h-[140px]" />
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Software UI Foreground" className="absolute bottom-0 left-4 w-[85%] rounded-lg shadow-2xl border border-gray-500 z-10 object-cover h-[140px]" />
          </div>
          <ul className="text-left space-y-4 inline-block text-[15px] text-gray-200">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>Mass自动调谐功能</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>日志分类查看功能</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#e60012] shadow-[0_0_8px_rgba(230,0,18,0.8)]"></div>用户角色管理功能</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
