import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const coreFeatures = [
  {
    id: 1,
    title: '智能数据处理',
    desc: 'MassClaw 可自动识别峰区间、完成积分与异常预警，减少人工选峰和重复校正工作，让质谱数据处理更高效、更稳定',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    highlight: '相对误差小于 1%\n成本降低超 50%'
  },
  {
    id: 2,
    title: '自动峰识别',
    desc: '基于深度学习的峰识别算法，精准区分噪声与真实信号，提升数据可靠性。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    highlight: '识别准确率 99%\n抗噪能力强'
  },
  {
    id: 3,
    title: '批量自动化分析',
    desc: '支持大批量样本数据的自动化比对与分析，快速生成可视化报告。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    highlight: '分析速度提升 10倍\n报告一键生成'
  }
];

const tabs = ['知识库', '痛点', '流程图'];

export function MassClawPage() {
  useDocumentTitle('MassClaw');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('知识库');

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % coreFeatures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + coreFeatures.length) % coreFeatures.length);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="w-full relative bg-[#0a192f] text-white py-16 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 to-[#0a192f]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-wider"
          >
            MassClaw
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-light mb-8 text-blue-200"
          >
            AI寻峰解谱智能体
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-48 h-48 md:w-64 md:h-64 mb-8 bg-blue-900/50 rounded-full flex items-center justify-center p-4"
          >
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400" alt="MassClaw Robot" className="w-full h-full object-cover rounded-full shadow-2xl shadow-blue-500/20" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base leading-relaxed text-gray-300 max-w-2xl text-justify"
          >
            MassClaw作为一款面向质谱解析的对话式智能体，其以对话方式串联多模型流程，可自动完成谱图转换、库匹配、化学式预测与De novo推断并输出对话说明、结构图片和带置信度评分的top-k smiles。
          </motion.p>
        </div>
      </section>

      {/* Core Features - Carousel */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">核心功能</h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-4">{coreFeatures[currentSlide].title}</h3>
                <p className="text-gray-600 text-center mb-8 max-w-2xl text-sm leading-relaxed">
                  {coreFeatures[currentSlide].desc}
                </p>

                <div className="w-full bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="text-center mb-6">
                    <p className="text-lg font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                      {coreFeatures[currentSlide].highlight}
                    </p>
                  </div>
                  <img src={coreFeatures[currentSlide].image} alt="Chart" className="w-full max-w-lg rounded-lg shadow-sm border border-gray-200" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button onClick={prevSlide} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {coreFeatures.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === idx ? 'w-6 bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service & Support */}
      <section className="w-full py-16 px-6 bg-[#1a1a1a] text-white flex flex-col items-center rounded-3xl max-w-5xl mx-auto my-8 overflow-hidden shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">服务与支持</h2>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-xl">
          帮助客户更高效地运用<br/>科学获得成功
        </p>
        <div className="w-full max-w-3xl rounded-xl overflow-hidden border border-gray-800">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Service Platform" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* Parsing Flow & Advantages */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">智能谱图解析流程</h2>
            <div className="w-full max-w-3xl mx-auto bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-16">
              {/* Flowchart abstraction using flex */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-700">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center mb-2 border border-blue-200 text-blue-600">
                    打开
                  </div>
                  <span>MassClaw</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden md:block" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center mb-2 border border-blue-200 text-blue-600">
                    搜索
                  </div>
                  <span>标准谱图库</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden md:block" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center mb-2 border border-blue-200 text-blue-600">
                    预测
                  </div>
                  <span>化学式查询</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 hidden md:block" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center mb-2 border border-blue-200 text-blue-600">
                    De novo
                  </div>
                  <span>预测分子结构</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">谱图解析优势</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src="https://images.unsplash.com/photo-1614064641913-a53b34b7f8e8?auto=format&fit=crop&q=80&w=600" alt="Chat UI" className="w-full h-auto object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {[
                '自动解谱，节省人力',
                '智能体验合多AI模型',
                '多路信号耦合输出top-k候选结构',
                '独立软件形态，支持raw格式数据，便于跨品牌仪器谱图分析'
              ].map((adv, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{adv}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tuning & Opt */}
      <section className="w-full py-16 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">智能离子光学调谐</h2>
          <p className="text-lg font-medium text-gray-200 mb-6">一键即得最优参数</p>
          <p className="text-sm text-gray-400 max-w-2xl mb-12">
            质谱仪需要专业的工程师花费若干天时间进行参数调谐，优化过程随机试错，耗费人力。
            <br/><br/>
            主动学习算法学习仪器参数响应规律，自动设置、迭代优化参数，使用者一键即可得到各种最优参数。
          </p>
          
          <div className="w-full max-w-3xl bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Tuning Algorithm" className="w-full rounded-lg opacity-80" />
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="w-full py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Tab Headers */}
          <div className="flex justify-center border-b border-gray-300 mb-10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-base font-medium transition-colors relative ${
                  activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === '知识库' && (
                <motion.div
                  key="knowledge"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-gray-600 text-center mb-12 max-w-2xl leading-relaxed">
                    MassClaw 构建了基于大语言模型与检索增强生成（RAG）技术的知识库问答系统
                  </p>
                  
                  <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
                    {/* Center node */}
                    <div className="absolute w-32 h-32 bg-white rounded-full shadow-lg border-4 border-blue-500 flex flex-col items-center justify-center z-10 text-center p-4">
                      <span className="font-bold text-gray-800 text-sm">化学与物质特性</span>
                    </div>
                    
                    {/* Satellite nodes */}
                    <div className="absolute top-0 left-1/4 -translate-x-1/2 w-28 h-28 bg-white rounded-full shadow-md border-2 border-indigo-300 flex items-center justify-center text-center p-3 text-xs text-gray-700">
                      仪器与硬件知识
                    </div>
                    <div className="absolute top-0 right-1/4 translate-x-1/2 w-28 h-28 bg-white rounded-full shadow-md border-2 border-indigo-300 flex items-center justify-center text-center p-3 text-xs text-gray-700">
                      标准方法与法规
                    </div>
                    <div className="absolute bottom-10 left-10 w-28 h-28 bg-white rounded-full shadow-md border-2 border-indigo-300 flex items-center justify-center text-center p-3 text-xs text-gray-700">
                      辅助决策工具
                    </div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full shadow-md border-2 border-indigo-300 flex items-center justify-center text-center p-3 text-xs text-gray-700">
                      实验室私有 SOP<br/>与历史数据
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === '痛点' && (
                <motion.div
                  key="painpoints"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-6">传统流程的痛点</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                      { t: '耗时耗力', d: '人工筛查图谱效率低下，极度依赖专家经验' },
                      { t: '准确率波动', d: '人工处理存在主观误差，难以保持一致的高标准' },
                      { t: '孤岛效应', d: '不同仪器品牌数据格式不一，难以集中化统一管理' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <XIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">{item.t}</h4>
                        <p className="text-sm text-gray-500">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === '流程图' && (
                <motion.div
                  key="flowchart"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center py-10"
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-8">完整工作流解析</h3>
                  <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Flowchart" className="w-full max-w-2xl mx-auto rounded opacity-80" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}

function XIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
