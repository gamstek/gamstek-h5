import { FlaskConical, Soup, Stethoscope, Pill, Droplets, LucideIcon } from 'lucide-react';
import React from 'react';
import homeProductLcmsms from '../assets/home/product-lcmsms.jpg';
import homeProductFtms from '../assets/home/product-ftms.jpg';
import homeProductMassclaw from '../assets/home/product-massclaw.jpg';
import homeProductSupport from '../assets/home/product-support.jpg';
import carouselSlide1 from '../assets/home/carousel/slide-1.jpg';
import carouselSlide2 from '../assets/home/carousel/slide-2.jpg';
import carouselSlide3 from '../assets/home/carousel/slide-3.jpg';
import homeCase1 from '../assets/home/cases/case-1.jpg';
import homeCase2 from '../assets/home/cases/case-2.jpg';
import homeCase3 from '../assets/home/cases/case-3.jpg';

const currentYear = new Date().getFullYear();

// Contact Info
export const captchaConfig = {
  region: 'cn',
  prefix: 'z2tn8d',
  sceneId: 'tb0562pi',
  mode: 'popup',
  slideStyle: { width: 360, height: 40 },
  language: 'cn'
};

export const contactInfo = {
  phone: '400-0233-929',
  email: 'service@gamstek.com',
  hrEmail: 'hr@gamstek.com',
  address: '合肥市高新区孔雀台路1969号量子科仪谷6F',
  qrCodeText: '关注我们获取咨询与服务',
  companyName: 'GAMSTEK',
  copyright: `Copyright © ${currentYear} GAMSTEK Co., Ltd`,
  icp: '合肥引力波智谱科技有限公司 皖 ICP 备2024066510号-1',
};

// Site Config
export const siteConfig = {
  title: '引力波智谱',
  subtitle: '高 端 质 谱 新 选 择',
  aboutText: [
    '合肥引力波智谱科技有限公司专注于以高端质谱为核心的科学仪器产品的研发、生产、销售及技术服务。公司产品广泛应用于食品安全、环境监测、生物医药、公安法医、临床诊断、科学研究、材料科学、石油化工等多个领域。',
    '目前，公司仪器设备性能指标已达到国际先进水平，尤其在离子源、四极杆质量分析器、高稳定性高压电源以及离子光学仿真等关键部件上，已完成自主研发，实现技术可控。依托扎实的技术积累与开放协同的合作理念，公司已与国内多所顶尖高校、科研院所、政府机构及行业龙头企业建立深度合作。公司紧密对接前沿科研与国际市场对高端质谱仪器的需求，高效推动技术成果向高可靠性、高性能产品的转化，并通过持续迭代不断提升产品在全球范围内的竞争力。'
  ],
  joinUsText: '加入引力波智谱，我们期待与您一起\n帮助客户更高效地运用科学，获得成功！'
};

// Header Links
export const headerLinks = {
  products: [
    { label: 'FTMS/FTMS+', href: '/products/ftms' },
    { label: 'MS8100', href: '/products/ms8100' },
    { label: 'MS8000', href: '/products/ms8000' },
    { label: 'MS7000', href: '/products/ms7000' },
    { label: 'MS6000', href: '/products/ms6000' },
    { label: 'MassClaw', href: 'https://mp.weixin.qq.com/s/Y81jVYGrWOCoBdHB_kHuqg', external: true },
  ],
  support: [
    { label: '下载中心', href: '/support#downloads' },
    { label: '维保与技术支持', href: '/support#service' },
  ],
  about: [
    { label: '公司介绍', href: '/about' },
    { label: '核心能力', href: '/about#capabilities' },
    { label: '社会招聘', href: '/recruitment' },
    { label: '校园招聘', href: '/campus-recruitment' },
  ]
};

// Footer Links
export const footerLinks = {
  products: [
    { label: 'FTMS/FTMS+', href: '/products/ftms' },
    { label: 'MS8100', href: '/products/ms8100' },
    { label: 'MS8000', href: '/products/ms8000' },
    { label: 'MS7000', href: '/products/ms7000' },
    { label: 'MS6000', href: '/products/ms6000' },
    { label: 'MassClaw', href: 'https://mp.weixin.qq.com/s/Y81jVYGrWOCoBdHB_kHuqg', external: true },
  ],
  support: [
    { label: '下载中心', href: '/support#downloads' },
    { label: '维保与技术支持', href: '/support#service' },
  ],
  about: [
    { label: '公司介绍', href: '/about' },
    { label: '核心能力', href: '/about#capabilities' },
    { label: '社会招聘', href: '/recruitment' },
    { label: '校园招聘', href: '/campus-recruitment' },
  ]
};

// Cases (数据与 https://gamstek.com/technology/ecology 页面一致,分类除"全部"外不可点击)
export const caseCategories = ['全部', '食品安全', '环境检测', '公安/法医', '药企/CRO', '临床诊断', '化工', '生命科学', '能源'];

export const casesData: Array<{id: number, title: string, description: string, category: string, pdfUrl: string, Icon: LucideIcon}> = [
  {
    id: 1,
    title: 'LC-MS/MS法分析食品中多环芳烃类化合物',
    description: '多环芳烃（PAHs）因强致癌性与生物累积性成为食品安全重点管控污染物。预制菜等食品在烟熏、油炸等加工环节及包装加热迁移过程中易富集PAHs。',
    category: '食品安全',
    pdfUrl: 'https://gamstek.com/ecology/多环芳烃测.pdf',
    Icon: FlaskConical,
  },
  {
    id: 2,
    title: 'LC-MS/MS法检测坚果中4种黄曲霉毒素',
    description: '黄曲霉毒素是黄曲霉、寄生曲霉等真菌产生的高毒性次级代谢产物，其急性毒性远超氰化物，长期低剂量暴露会增加肝癌等恶性肿瘤风险。',
    category: '食品安全',
    pdfUrl: 'https://gamstek.com/ecology/黄曲霉素.pdf',
    Icon: Soup,
  },
  {
    id: 3,
    title: 'LC-MS/MS法检测动物性食品中四环素类、磺胺类和喹诺酮类药物残留',
    description: '兽药及兽药添加剂因为其在降低牲畜发病率和死亡率、促进生长和改善肉品品质方面作用明显，已成为现代畜牧业不可缺少的物质基础。',
    category: '食品安全',
    pdfUrl: 'https://gamstek.com/ecology/磺胺.pdf',
    Icon: Stethoscope,
  },
  {
    id: 4,
    title: 'LC-MS/MS法检测动物性食品中18种β-受体激动剂',
    description: 'β-受体激动剂属于苯乙醇胺类药物，在生物体内具有“再分配效应”，可使营养组分由脂肪组织向肌肉组织转移，能直接导致体内的脂肪分解代谢增强、蛋白质合成增加、明显提高酮体瘦肉率、提高饲料转化率，使得用药个体增重。',
    category: '食品安全',
    pdfUrl: 'https://gamstek.com/ecology/受体激动剂.pdf',
    Icon: Pill,
  },
  {
    id: 5,
    title: '使用LC-MS/MS系统测定水质中4种硝基酚类化合物',
    description: '硝基酚类物质（如2,4-二硝基酚、2,6-二硝基酚等）通常为工业生产的副产物（如染料、农药、炸药制造），其具有高毒性、难降解性和生物累积性。',
    category: '环境检测',
    pdfUrl: 'https://gamstek.com/ecology/GAMSTEK%20MS%208000%20液质联用系统测定水质中4种硝基酚.pdf',
    Icon: Droplets,
  }
];

// Application Cases for Home Page
export const homeApplicationCases = [
  {
    id: 'case-1',
    tag: '医疗诊断',
    image: homeCase1,
    width: 140,
  },
  {
    id: 'case-2',
    tag: '食品安全',
    image: homeCase2,
    width: 180,
  },
  {
    id: 'case-3',
    tag: '环境检测',
    image: homeCase3,
    width: 140,
  }
];

// Home Products
export const homeProducts = [
  {
    title: "LC-MS/MS",
    subtitle: "三重四极杆串联质谱联用仪",
    links: [{ label: "了解更多 >", href: "/products/ms8100" }, { label: "购买咨询 >", href: "/inquiry?product=LC-MS%2FMS" }],
    image: homeProductLcmsms,
    // 图片实际比例 690x792，卡片高度按此比例自适应
    imageClassName: "aspect-[690/792]"
  },
  {
    title: "FTMS / FTMS+",
    subtitle: "全新高分辨质谱仪",
    links: [{ label: "了解更多 >", href: "/products/ftms" }, { label: "购买咨询 >", href: "/inquiry?product=FTMS%20%2F%20FTMS%2B" }],
    image: homeProductFtms,
    imageClassName: "aspect-[690/792]"
  },
  {
    title: "MassClaw",
    subtitle: "解谱智能体",
    links: [{ label: "了解更多 >", href: "https://mp.weixin.qq.com/s/Y81jVYGrWOCoBdHB_kHuqg", external: true }],
    image: homeProductMassclaw,
    imageClassName: "aspect-[690/792]"
  },
  {
    title: "服务与支持",
    subtitle: "帮助客户更高效地运用科学获得成功",
    links: [{ label: "立即获取 >", href: "/support" }],
    image: homeProductSupport,
    imageClassName: "aspect-[690/792]"
  }
];

// Home Carousel
export const homeCarouselSlides = [
  {
    id: 'got-team',
    title: 'GAMSTEK ONE TEAM',
    subtitle: '引力波智谱 整机青年计划',
    description: '入场，成为关键变量',
    image: carouselSlide1,
    primaryButtonText: '查看职位',
    primaryLink: '/campus-recruitment',
    hideSecondaryButton: true,
    // 图片本身已含标题文字，隐藏叠加的 HTML 文字与按钮
    hideContent: true,
    // 按钮位置下移（图片为 9:16 竖图，用百分比相对宽度计算更稳）
    contentClassName: 'pt-[50%]',
  },
  {
    id: 'ms8100',
    title: 'MS8100',
    subtitle: '高端质谱全新旗舰',
    description: '三重四极杆串联质谱联用仪',
    image: carouselSlide2,
    detailsLink: '/products/ms8100'
  },
  {
    id: 'ftms',
    title: 'FTMS / FTMS+',
    subtitle: '突破分辨率天花板',
    description: '全新高分辨质谱仪',
    image: carouselSlide3,
    detailsLink: '/products/ftms'
  }
];

