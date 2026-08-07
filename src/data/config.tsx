import { FlaskConical, Soup, Stethoscope, Pill, Factory, LucideIcon } from 'lucide-react';
import React from 'react';

// Contact Info
export const contactInfo = {
  phone: '400-0233-929',
  email: 'service@gmastek.cn',
  address: '合肥市高新区孔雀台路1969号量子科仪谷6F',
  qrCodeText: '关注我们获取咨询与服务',
  companyName: 'GAMSTEK',
  copyright: 'Copyright © 2026 GAMSTEK Co., Ltd',
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
    { label: 'MS7000', href: '#' },
    { label: 'MS6000', href: '#' },
    { label: 'MassClaw', href: '/massclaw' },
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
    { label: 'MS7000', href: '#' },
    { label: 'MS6000', href: '#' },
    { label: 'MassClaw', href: '/massclaw' },
  ],
  support: [
    { label: '下载中心', href: '/support#downloads' },
    { label: '维保与技术支持', href: '/support#service' },
  ],
  about: [
    { label: '公司介绍', href: '/about' },
    { label: '核心能力', href: '/about#capabilities' },
    { label: '人才发展', href: '/recruitment' },
  ]
};

// Cases
export const caseCategories = ['全部', '食品安全', '环境检测', '公安/司法'];

export const casesData: Array<{id: number, title: string, description: string, category: string, Icon: LucideIcon}> = [
  {
    id: 1,
    title: 'LC-MS/MS法分析食品中多环芳烃类化合物',
    description: '多环芳烃（PAHs）因强致癌性与生物累积性成为食品安全重点管控污染物。预制菜等食品在烟熏、油炸等加工环节及包装加热迁移过程中易富集PAHs。',
    category: '食品安全',
    Icon: FlaskConical,
  },
  {
    id: 2,
    title: 'LC-MS/MS法检测坚果中4种黄曲霉毒素',
    description: '黄曲霉毒素是黄曲霉、寄生曲霉等真菌产生的高毒性次级代谢产物，其急性毒性远超氰化物，长期低剂量暴露会增加肝癌等恶性肿瘤风险。',
    category: '食品安全',
    Icon: Soup,
  },
  {
    id: 3,
    title: 'LC-MS/MS法检测动物性食品中四环素类、磺胺类和喹诺酮类药物残留',
    description: '兽药及兽药添加剂因为其在降低牲畜发病率和死亡率、促进生长和改善肉品品质方面作用明显，已成为现代畜牧业不可缺少的物质基础。',
    category: '食品安全',
    Icon: Stethoscope,
  },
  {
    id: 4,
    title: 'LC-MS/MS法检测动物性食品中18种β-受体激动剂',
    description: 'β-受体激动剂属于苯乙醇胺类药物，在生物体内具有“再分配效应”，可使营养组分由脂肪组织向肌肉组织转移，能直接导致体内的脂肪分解代谢增强、蛋白质合成增加、明显...',
    category: '食品安全',
    Icon: Pill,
  },
  {
    id: 5,
    title: '使用LC-MS/MS系统测定水质中4种硝基酚类化合物',
    description: '硝基酚类物质（如2,4-二硝基酚、2,6-二硝基酚等）通常为工业生产的副产物（如染料、农药、炸药制造），其具有高毒性、难降解性和生物累积性。',
    category: '环境检测',
    Icon: Factory,
  }
];

// Application Cases for Home Page
export const homeApplicationCases = [
  {
    id: 'case-1',
    tag: '医疗诊断',
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=400',
    width: 140,
  },
  {
    id: 'case-2',
    tag: '食品安全',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
    width: 180,
  },
  {
    id: 'case-3',
    tag: '环境检测',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400',
    width: 140,
  }
];

// Home Products
export const homeProducts = [
  {
    title: "LC-MS/MS",
    subtitle: "三重四极杆串联质谱联用仪",
    links: [{ label: "了解更多 >", href: "/products/ms8100" }, { label: "购买咨询 >", href: "#" }],
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=800",
    imageClassName: "rounded-xl h-[160px] object-cover"
  },
  {
    title: "FTMS / FTMS+",
    subtitle: "全新高分辨质谱仪",
    links: [{ label: "了解更多 >", href: "/products/ftms" }, { label: "购买咨询 >", href: "#" }],
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800",
    imageClassName: "rounded-xl h-[160px] object-cover"
  },
  {
    title: "MassClaw",
    subtitle: "解谱智能体",
    links: [{ label: "了解更多 >", href: "/massclaw" }],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    imageClassName: "rounded-xl h-[240px] object-cover"
  },
  {
    title: "服务与支持",
    subtitle: "帮助客户更高效地运用科学获得成功",
    links: [{ label: "立即获取 >", href: "#" }],
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    imageClassName: "rounded-xl h-[160px] object-cover"
  }
];

// Home Carousel
export const homeCarouselSlides = [
  {
    id: 'got-team',
    title: 'GAMSTEK ONE TEAM',
    subtitle: '引力波智谱 整机青年计划',
    description: '入场，成为关键变量',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    primaryButtonText: '查看职位',
    hideSecondaryButton: true,
  },
  {
    id: 'ms8100',
    title: 'MS8100',
    subtitle: '高端质谱全新旗舰',
    description: '三重四极杆串联质谱联用仪',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800',
    detailsLink: '/products/ms8100'
  },
  {
    id: 'ftms',
    title: 'FTMS / FTMS+',
    subtitle: '突破分辨率天花板',
    description: '全新高分辨质谱仪',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    detailsLink: '/products/ftms'
  }
];

