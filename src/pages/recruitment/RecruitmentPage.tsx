import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import recruitmentBg from '../../assets/recruitment/bg.png';

const techJobs = [
  {
    title: '系统工程师',
    content: `岗位职责：
1. 关注质谱技术最新进展，跟踪新产品和新技术的发展趋势；
2. 从事质谱仪器开发工作，包括产品原理研究、机械结构、离子光学设计仿真、功能开发调试、验证测试优化等工作；
3. 负责质谱整机系统方案设计、原型机开发、产品性能提升优化；
4. 负责质谱仪器的核心技术问题解决和技术方案可行性评估；
5. 协助质量分析器、离子聚焦透镜、离化源、真空系统、控制电路等分系统的工程师完成方案设计和解决问题；
6. 配合并支持产品研发生产部门解决产品开发和使用中遇到的技术问题；
7. 负责编制仪器开发过程、专利与文献等相关技术文档。`
  },
  {
    title: '仿真系统工程师',
    content: `岗位职责：
1. 负责多物理场建模，包括热力场耦合、电磁场仿真、离子光学、流体动力学、机械动力学计算、建模、仿真，评估方案可行性，优化系统设计；
2. 负责质谱仪器中离子光学装置的设计与模拟分析，包括：
(1) 模拟带电离子在电场、流场、磁场中的运动轨迹，研究利用电磁场控制离子运动的方法；
(2) 开展离子光学器件的仿真实验设计；
(3) 在不同真空条件下进行离子运动模拟，指导系统设计，并参与功能验证与性能优化；
3. 将复杂现象简化为可解的模型，参与或负责系统需求及指标拆解，并保留主要物理过程，和实验对接，评估并验证模型及参数的准确性，迭代优化模型。
4. 深入理解主流质谱仪的工作原理，参与或主导仿真方法体系和平台建设，总结设计规律；
5. 配合实验人员进行整机或模块的开发与调试；
6. 负责完成相关项目技术文档的编写。`
  },
  {
    title: '维修专家',
    content: `岗位职责：
1. 负责公司产品故障排查与精准维修，使用专业工具确保仪器性能达标；
2. 完成仪器校准与参数优化，保障检测数据准确；制定预防性维护计划，减少停机时间，延长设备寿命；
3. 提供远程及现场技术支持，快速响应客户需求，开展仪器操作、维护等培训；编写完整维修文档，提升服务口碑；
4. 开展内部培训与经验分享，跟踪技术动态优化维修流程。`
  },
  {
    title: '结构工程师（精密加工）',
    content: `岗位职责：
1. 负责公司产品的机柜，插箱，传动，机电，外壳，人机交互等部件设计；
2. 参与或主导研发，质谱仪分析器、真空腔体、离子光学器件、探测器、飞行管等关键机械零部件的研发；
3. 完成超高精度零部件的设计、加工工艺、工序以及检测的工艺开发；
4. 负责完成机械相关的原理方案设计，包括专利分析、竞品分析、理论计算、机械、材料、热等分析、仿真设计；
5. 负责机械结构件的详细设计，包括产品详细功能设计、结构零部件设计、材料与工艺设计、生产及检验工装设计等；转移开发的技术到生产部门实现量产，包括负责供应商选择与沟通，图纸与工艺文件编制，样机试制与测试验证；
6. 负责相关文档编写，如设计方案报告、计算说明书、图纸等文件。`
  },
  {
    title: '硬件工程师（高压电源）',
    content: `岗位职责：
1. 负责高压电路的方案设计和电路仿真设计、电路拓扑选型（如谐振变换器、倍压电路）、关键器件选型、原理图绘制和PCB布局审核和整机电路验证调试等，需解决高压绝缘、局部放电抑制和电磁兼容（EMC）等关键技术问题；
2. 按照硬件的设计原则进行设计及物料的选型和成本评估；
3. 制定高压测试方案（如耐压测试、纹波测试、长期稳定性测试），并与系统工程师协作完成高压模块上机测试，排查问题并制定解决方案；
4. 根据研发流程，完成相关技术文档整理、编写及归档，测试问题分析报告等；
5. 编制生产工艺文件，指导生产人员开展生产任务，并为售后提供技术支持，分析现场故障；
6. 完成其他部门主管安排的工作。`
  },
  {
    title: 'FPGA工程师',
    content: `岗位职责：
1. 负责公司产品核心部件FPGA代码开发和交付；
2. 负责系统的数据和控制链路的定义和设计，FPGA选型等；
3. 参与设计方案制定及文档撰写；
4. 完成FPGA代码的模块级、单板级仿真验证；
5. 完成单板调试和测试和系统调试和测试。分析现场故障；
6. 完成其他部门主管安排的工作。`
  },
  {
    title: '嵌入式开发工程师',
    content: `岗位职责：
1. 理解产品需求和系统规格,参与硬件选型（MCU/MPU、传感器、通信模块等）评估；
2. 设计软件系统架构，进行模块划分，制定通信协议和数据流；
3. 根据系统方案完成MCU/SoC的外设（如GPIO、ADC、PWM、I2C、SPI、UART、USB、CAN、以太网等）底层驱动程序编写；
4. 根据系统方案实现产品核心功能逻辑，传感器数据采集、执行器控制、通信处理、电源管理等；
5. 基于系统方案完成FreeRTOS、RT-Thread、uC/OS或Linux系统的部署和并完成核心功能的开发和调试测试。
6. 完成其他部门主管安排的工作。`
  }
];

const bizJobs = [
  {
    title: '销售经理',
    content: `岗位职责：
1. 负责公司产品在指定区域的销售工作，完成销售目标；
2. 开拓新市场，发展新客户，增加产品销售范围；
3. 维护及增进已有客户关系；
4. 负责收集市场和行业信息，加深理解；
5. 负责区域内相关展会、学术会议等市场活动的策划和执行。`
  }
];

const JobCard: React.FC<{ title: string, content: string }> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 relative overflow-hidden transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div 
        className={`text-[#333] text-[15px] leading-relaxed whitespace-pre-wrap ${!isExpanded ? 'max-h-[220px] overflow-hidden relative' : ''}`}
      >
        {content}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-gray-500 text-sm flex items-center justify-center w-full py-2 hover:text-gray-900 transition-colors"
      >
        {isExpanded ? (
          <>向上收起 <ChevronUp className="w-4 h-4 ml-1" /></>
        ) : (
          <>向下展开 <ChevronDown className="w-4 h-4 ml-1" /></>
        )}
      </button>
    </div>
  );
};

export function RecruitmentPage() {
  useDocumentTitle('人才招聘');
  const [activeTab, setActiveTab] = useState<'tech' | 'biz'>('tech');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen pb-12">
      {/* Hero Section - 背景图 750x1334 (9:16)，容器按同比例自适应，从页面顶部开始 */}
      <div className="relative aspect-[9/16] w-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={recruitmentBg} 
          alt="加入我们" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 tracking-widest text-[#e60012]"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            加入我们
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] font-medium tracking-wider"
          >
            文化认同 | 竞争择优 | 以人为本 | 海纳百川
          </motion.div>
        </div>
      </div>

      {/* Tabs - sticky 吸顶 */}
      <div className="flex px-6 py-4 items-center sticky top-[76px] bg-white z-30 shadow-sm">
        <span className="text-gray-900 font-medium text-lg mr-6">招聘岗位</span>
        <button 
          onClick={() => setActiveTab('tech')}
          className={`mr-6 text-[16px] transition-colors ${activeTab === 'tech' ? 'text-[#e60012] font-medium' : 'text-gray-500'}`}
        >
          技术
        </button>
        <button 
          onClick={() => setActiveTab('biz')}
          className={`text-[16px] transition-colors ${activeTab === 'biz' ? 'text-[#e60012] font-medium' : 'text-gray-500'}`}
        >
          业务
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'tech' ? (
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {techJobs.map((job, idx) => (
                <JobCard key={idx} title={job.title} content={job.content} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="biz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {bizJobs.map((job, idx) => (
                <JobCard key={idx} title={job.title} content={job.content} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
