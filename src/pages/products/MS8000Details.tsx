import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import heroImage from '../../assets/ms8000/details/hero.jpg';
import quadrupoleImage from '../../assets/ms8000/details/quadrupole.png';
import ionSourceImage from '../../assets/ms8000/details/ion-source.png';
import performanceImage from '../../assets/ms8000/details/performance.png';
import massnovaMonitor from '../../assets/ms8000/details/massnova-monitor.png';
import massnovaAdmin from '../../assets/ms8000/details/massnova-admin.png';
import stabilityCardImage from '../../assets/ms8000/hero.jpg';
import antipollutionCardImage from '../../assets/ms8000/performance.jpg';
import coreComponentCardImage from '../../assets/ms8000/software.jpg';

const quadrupoleFeatures = [
  '精密装配，综合误差优于 ±1 μm',
  '陶瓷基材热稳定性强',
  '表面镀金，抗污染、抗氧化',
  '陶瓷底座，绝缘、抗干扰',
];

const ionSourceFeatures = [
  '配置双陶瓷加热棒，离子化效率更高',
  '更高的离子响应，更低的检出限',
  'ESI/APCI 灵活切换，操作便捷',
  '无需卸真空，拆卸方便',
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-[9px] text-[11px] leading-[1.55] text-[#d8d9dd]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-[9px]">
          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#e60012]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MS8000Details() {
  useDocumentTitle('MS8000系列');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] pt-[76px] text-white">
      <section className="relative aspect-[750/1050] w-full overflow-hidden bg-black">
        <img src={heroImage} alt="MS8000 系列三重四极杆串联质谱仪" className="absolute inset-0 h-full w-full object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-[67%] bg-black" />
        <img src={performanceImage} alt="" className="absolute inset-x-0 top-[15%] h-auto w-full mix-blend-screen" />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 flex flex-col items-center pt-[54px] text-center"
        >
          <h1 className="text-[24px] font-medium tracking-[0.02em]">MS8000系列</h1>
          <p className="mt-[8px] text-[11px] tracking-[0.05em] text-white/75">三重四极杆串联质谱联用仪</p>
          <button
            type="button"
            onClick={() => navigate('/inquiry?product=MS8000')}
            className="mt-[25px] rounded-full bg-white px-[29px] py-[8px] text-[11px] font-medium text-[#111] transition-transform active:scale-95"
          >
            购买咨询
          </button>
        </motion.div>
      </section>

      <section className="relative aspect-[750/1200] w-full overflow-hidden bg-[#252830]">
        <img src={quadrupoleImage} alt="MS8000 四极杆结构" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-[15%] top-[10%] z-10">
          <h2 className="text-center text-[17px] font-medium">四极杆</h2>
          <div className="mt-[30px]"><FeatureList items={quadrupoleFeatures} /></div>
        </div>
      </section>

      <section className="relative aspect-[750/1200] w-full overflow-hidden bg-[#080a0e]">
        <img src={ionSourceImage} alt="MS8000 离子源结构" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-[15%] top-[10%] z-10">
          <h2 className="text-center text-[17px] font-medium">离子源</h2>
          <div className="mt-[30px]"><FeatureList items={ionSourceFeatures} /></div>
        </div>
      </section>

      <section className="relative bg-[#090a0d] text-center">
        <img src={performanceImage} alt="MS8000 超强整机性能" className="block h-auto w-full" />
        <div className="absolute inset-x-0 top-[10%] z-10">
          <h2 className="text-[17px] font-medium">超强整机性能</h2>
          <p className="mt-[22px] text-[10px] leading-[1.8] text-[#d0d2d6]">
            灵敏度达到国际先进水平，以卓越性能<br />赋能痕量分析极限突破
          </p>
        </div>
      </section>

      <section className="bg-[#111] px-[16px] pt-[52px] pb-[55px]">
        <h2 className="text-center text-[20px] font-normal">核心亮点</h2>
        <article className="relative mt-[39px] aspect-[391/195] overflow-hidden rounded-[11px] border border-[#272b33] bg-[#121723]">
          <img src={stabilityCardImage} alt="运行稳定可靠折线图" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute left-[25px] top-[55px] z-10">
            <h3 className="text-[17px] font-normal">运行稳定可靠</h3>
            <p className="mt-[20px] text-[12px] leading-[1.8] text-[#e2e3e5]">超长连续稳定运行<br />护航高通量检测</p>
          </div>
        </article>

        <div className="mt-[7px] grid grid-cols-2 gap-[8px]">
          <article className="relative aspect-[192/313] overflow-hidden rounded-[11px] border border-[#272b33] bg-[#121723] text-center">
            <img src={antipollutionCardImage} alt="抗污染能力结构示意" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 top-[47px] z-10">
              <h3 className="text-[17px] font-normal">抗污染能力强</h3>
              <p className="mt-[17px] text-[12px] leading-[1.8] text-[#e2e3e5]">超强抗污染设计，从容应<br />对复杂基质无需频繁清<br />洗维护，降低使用成本</p>
            </div>
          </article>
          <article className="relative aspect-[192/313] overflow-hidden rounded-[11px] border border-[#272b33] bg-[#121723] text-center">
            <img src={coreComponentCardImage} alt="自主可控核心部件" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 top-[47px] z-10">
              <h3 className="text-[17px] font-normal">核心部件可控</h3>
              <p className="mt-[17px] text-[12px] leading-[1.8] text-[#e2e3e5]">核心部件完全自研，摆脱<br />进口依赖，保障仪器长期<br />稳定运行与高效售后响应</p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#17191e] to-[#07080a] px-[14px] pt-[57px] pb-[60px]">
        <h2 className="text-center text-[19px] font-medium">MassNova 1.0</h2>
        <img src={massnovaMonitor} alt="MassNova 1.0 实时监测与定量分析界面" className="mt-[38px] block h-auto w-full" />
        <div className="mx-auto mt-[20px] w-fit"><FeatureList items={['设备实时状态监测', '定量分析自动积分，便于数据统计']} /></div>
        <img src={massnovaAdmin} alt="MassNova 1.0 调谐与管理界面" className="mt-[45px] block h-auto w-full" />
        <div className="mx-auto mt-[18px] w-fit"><FeatureList items={['Mass 自动调谐功能', '日志分类查看功能', '用户角色管理功能']} /></div>
      </section>
    </main>
  );
}
