import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ms8100Bg from '../../assets/ms8100/bg.jpg';
import quadrupoleImage from '../../assets/ms8100/details/quadrupole.png';
import ionSourceImage from '../../assets/ms8100/details/ion-source.png';
import highlightPerformance from '../../assets/ms8100/details/highlight-performance-portrait-ai.jpg';
import highlightStability from '../../assets/ms8100/details/highlight-stability-portrait-ai.jpg';
import highlightOperation from '../../assets/ms8100/details/highlight-operation-portrait-ai.jpg';
import highlightControl from '../../assets/ms8100/details/highlight-control-portrait-ai.jpg';
import highlightAntipollution from '../../assets/ms8100/details/highlight-antipollution-portrait-ai.jpg';
import highlightMaintenance from '../../assets/ms8100/details/highlight-maintenance-portrait-ai.jpg';
import ms8100Image from '../../assets/ms8100/details/ms8100.png';
import ms7000Image from '../../assets/ms8100/details/ms7000.png';
import ms6000Image from '../../assets/ms8100/details/ms6000.png';
import stabilityChart from '../../assets/ms8100/details/stability-chart.png';
import sensitivityChart from '../../assets/ms8100/details/sensitivity-chart.png';
import massnovaDashboard from '../../assets/ms8100/details/massnova-dashboard.png';
import massnovaMethod from '../../assets/ms8100/details/massnova-method.png';

const quadrupoleFeatures = [
  '精密装配，综合误差优于 ±1 μm',
  '陶瓷基材热稳定性强',
  '表面镀金，抗污染、抗氧化',
  '陶瓷底座，绝缘、抗干扰',
];

const ionSourceFeatures = [
  '配置双陶瓷加热棒，离子化效率更高',
  '更高的离子响应，更低的检测限',
  'ESI/APCI 灵活切换，操作便捷',
  '无需卸真空，拆卸方便',
];

const highlights = [
  {
    title: '超强整机性能',
    description: '灵敏度达到先进水平\n以卓越性能赋能痕量\n分析极限突破',
    image: highlightPerformance,
  },
  {
    title: '运行稳定可靠',
    description: '超长连续稳定运行\n护航高通量检测数据\n重现性始终如一',
    image: highlightStability,
  },
  {
    title: '操作便捷友好',
    description: '全中文操作，极简交互设计\n深度契合国内用户操作\n习惯与工作流程',
    image: highlightOperation,
  },
  {
    title: '核心部件可控',
    description: '核心部件完全自研，摆脱\n进口依赖保障仪器长期稳定\n运行与高效售后响应',
    image: highlightControl,
  },
  {
    title: '抗污染能力强',
    description: '超强抗污染设计，从容应对\n复杂基质，无需频繁清洗维\n护降低使用成本',
    image: highlightAntipollution,
  },
  {
    title: '维护简易高效',
    description: '高度模块化架构设计显\n著简化日常维护流程\n提升设备可用性',
    image: highlightMaintenance,
  },
];

const products = [
  { name: 'MS8100', image: ms8100Image, range: ['5–1250 amu', '5–2000 amu', '（两档）'], source: 'ESI / APCI' },
  { name: 'MS7000', image: ms7000Image, range: ['5–1250 amu'], source: 'ESI / APCI' },
  { name: 'MS6000', image: ms6000Image, range: ['5–1250 amu'], source: 'ESI' },
];

function FeatureList({ items, color = '#e60012' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-[9px] text-[12px] leading-[1.55] text-[#d8d9dc]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-[9px]">
          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ backgroundColor: color }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MS8100Details() {
  useDocumentTitle('MS8100');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-white">
      <section className="relative aspect-[750/1200] min-h-[600px] w-full overflow-hidden">
        <img src={ms8100Bg} alt="MS8100 三重四极杆质谱仪" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-black/65 via-black/15 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center pt-[66px] text-center"
        >
          <h1 className="text-[24px] font-semibold tracking-[0.02em]">MS8100</h1>
          <p className="mt-[8px] text-[21px] font-medium tracking-[0.04em]">LC-MS/MS</p>
          <p className="mt-[13px] text-[11px] tracking-[0.12em] text-white/70">三重四极杆串联质谱联用仪</p>
          <button
            type="button"
            onClick={() => navigate('/inquiry?product=MS8100')}
            className="mt-[25px] rounded-full bg-white px-[28px] py-[9px] text-[12px] font-medium text-[#111] transition-transform active:scale-95"
          >
            购买咨询
          </button>
        </motion.div>
      </section>

      <section className="relative aspect-[750/1200] w-full overflow-hidden bg-[#202329]">
        <img src={quadrupoleImage} alt="MS8100 四极杆结构" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-[15.5%] top-[9%] z-10">
          <h2 className="text-center text-[17px] font-medium tracking-[0.08em]">四极杆</h2>
          <div className="mt-[30px]"><FeatureList items={quadrupoleFeatures} color="#00aee9" /></div>
        </div>
      </section>

      <section className="relative aspect-[750/1200] w-full overflow-hidden bg-[#0b0d11]">
        <img src={ionSourceImage} alt="MS8100 离子源结构" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-[15.5%] top-[9%] z-10">
          <h2 className="text-center text-[17px] font-medium tracking-[0.08em]">离子源</h2>
          <div className="mt-[30px]"><FeatureList items={ionSourceFeatures} /></div>
        </div>
      </section>

      <section className="bg-[#090a0e] px-[15px] py-[29px]">
        <h2 className="text-center text-[22px] font-medium tracking-[0.03em]">核心亮点</h2>
        <div className="mt-[44px] grid grid-cols-2 gap-x-[9px] gap-y-[10px]">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="relative flex aspect-[203/291] min-h-0 flex-col items-center overflow-hidden rounded-[13px] border border-[#292c33] bg-[#0d0f14] px-[6px] pt-[36px] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.018)]"
            >
              <img
                src={item.image}
                alt={`${item.title} 3D 图标`}
                className="absolute inset-0 h-full w-full"
              />
              <h3 className="relative z-10 text-[15px] font-normal leading-none text-[#e8e8ea]">{item.title}</h3>
              <p className="relative z-10 mt-[14px] whitespace-pre-line text-[11px] leading-[1.7] text-[#e2e3e6]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#17191e] px-[20px] py-[58px] text-center">
        <h2 className="text-[17px] font-medium tracking-[0.04em]">超凡稳定性与重现性</h2>
        <h3 className="mt-[35px] text-[12px] font-medium text-[#e1e3e8]">血清基质中全氟稳定性实验</h3>
        <p className="mx-auto mt-[14px] max-w-[340px] text-left text-[9px] leading-[1.8] text-[#a9adb5]">
          血清按照 1:4 甲醇沉淀蛋白后离心，加入全氟 PFOA、PFOS 连续进样 1000 针，峰面积 RSD 分别为 3.25%（PFOA）和 1.99%（PFOS）。
        </p>
        <img src={stabilityChart} alt="血清基质中全氟稳定性实验图表" className="mt-[22px] w-full" />
      </section>

      <section className="bg-[#111318] px-[17px] py-[57px]">
        <h2 className="text-center text-[18px] font-medium tracking-[0.08em]">产品对比</h2>
        <div className="mt-[38px] overflow-hidden border border-[#00a4c8]/70 text-[9px] text-[#d5d8de]">
          <div className="grid grid-cols-[1.25fr_1fr_0.9fr] border-b border-[#00a4c8]/55 bg-[#151a20] py-[9px] text-center">
            <span>产品</span><span>质量范围</span><span>标配离子源</span>
          </div>
          {products.map((product) => (
            <div key={product.name} className="grid min-h-[95px] grid-cols-[1.25fr_1fr_0.9fr] items-stretch border-b border-[#00a4c8]/35 last:border-b-0">
              <div className="flex flex-col items-center justify-center border-r border-[#00a4c8]/35 p-[7px]">
                <img src={product.image} alt={product.name} className="h-[54px] w-full object-contain" />
                <span className="mt-[2px]">{product.name}</span>
              </div>
              <div className="flex flex-col items-center justify-center border-r border-[#00a4c8]/35 leading-[1.5]">
                {product.range.map((line) => <span key={line}>{line}</span>)}
              </div>
              <div className="flex items-center justify-center text-center">{product.source}</div>
            </div>
          ))}
        </div>
        <p className="mt-[12px] text-center text-[8px] text-[#aeb3bc]">ESI 正离子灵敏度 1 pg 利血平</p>
        <img src={sensitivityChart} alt="MS8100、MS7000 与 MS6000 灵敏度对比" className="mx-auto mt-[10px] w-full max-w-[330px]" />
      </section>

      <section className="bg-gradient-to-b from-[#111318] to-[#07080a] px-[14px] pt-[59px] pb-[62px]">
        <h2 className="text-center text-[19px] font-medium tracking-[0.02em]">MassNova 2.0</h2>
        <img src={massnovaDashboard} alt="MassNova 2.0 工作台界面" className="mt-[38px] w-full" />
        <FeatureList items={['软件布局更简洁明确', '用户体验显著提升']} />
        <img src={massnovaMethod} alt="MassNova 2.0 方法编辑界面" className="mt-[44px] w-full" />
        <div className="mt-[16px]"><FeatureList items={['更全面的谱图库功能', '更加优化的方法建立途径']} /></div>
      </section>
    </main>
  );
}
