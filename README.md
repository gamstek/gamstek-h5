# GAMSTEK H5

移动端优先的 H5 官网（手机竖屏浏览），用于展示 GAMSTEK 质谱仪与科学仪器产品。站点所有文案为简体中文，页面以手机框架列（`max-w-md mx-auto`）居中渲染，固定 `h-[76px]` 顶栏，页面内容以 `pt-[76px]` 补偿。

## 技术栈

- **React 19** · **Vite 6** · **TypeScript 5.8**
- **Tailwind CSS v4**（`@tailwindcss/vite` 插件，无 `tailwind.config.js`）
- **react-router-dom v7**（声明式 `<Routes>` 模式）
- **Zustand 5**（无 persist / immer 中间件）
- **`motion` v12**（`import { motion, AnimatePresence } from 'motion/react'`）
- **lucide-react**（图标）· **recharts**（产品页图表）

## 开发命令

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器，端口 3000
npm run build      # 生产构建
npm run preview    # 预览生产构建
npm run lint       # 类型检查（tsc --noEmit）
```

> 项目**没有** ESLint / Prettier 配置，也**没有**测试套件；`npm run lint` 是唯一的静态检查手段，改动后请运行。

## 目录结构

```
src/
├── App.tsx               # 路由入口：两棵嵌套路由树，均挂载在 /
├── api/                  # fetch 函数，每个领域一个文件
│   ├── campus.ts         # 校园招聘 API（登录/职位/简历/投递记录）
│   ├── cases.ts          # 应用案例
│   └── news.ts           # 新闻动态
├── store/                # Zustand stores，与 api/ 一一对应
├── components/           # 布局外壳 + 共享 UI（Header/Footer/BottomSheet/轮播/弹窗等）
├── pages/                # 路由页面，按站点板块分目录
│   ├── products/         # MS8100 / MS8000 / FTMS 产品详情页
│   ├── recruitment/      # 社会招聘 + 校园招聘（含简历投递）
│   └── ...
├── hooks/                # 自定义 hooks（如 useDocumentTitle）
└── data/                 # 静态配置 + 兜底内容（config.tsx）
```

## 路由结构

`src/App.tsx` 挂载两棵嵌套路由树（均以 `/` 为父路径），新增页面时注意选择正确的树：

- **主站**（`<Layout />`：Header + Outlet + Footer）：`/`、`products/ms8100`、`products/ms8000`、`products/ftms`、`cases`、`news`、`about`、`support`、`inquiry`、`recruitment`、`massclaw`
- **校园招聘**（`<CampusLayout />`：独立固定顶栏 + 登录态）：`campus-recruitment`、`campus-recruitment/job/:id`、`campus-recruitment/resume`、`campus-recruitment/submit-success`、`campus-recruitment/records`

## 与后端接口约定

- 所有请求使用原生 `fetch`，基础地址**硬编码**为 `https://admin.gamstek.com`（无环境变量、无 axios、无统一 URL 常量）。
- 响应包络：`{ code, success, message, data }` —— 判断 `success`，空数据降级为 `[]`/`null`，失败 `console.error` 中文信息并重新抛出。
- 需登录的接口从 `localStorage.getItem('campus_token')` 读取 token，请求头为小写 `authorization: Bearer <token>`。
- 文件上传以原始文件体 POST，携带 `x-file-name: encodeURIComponent(file.name)` 请求头。
- 新增接口请写入对应领域文件（`src/api/*.ts`），不要在组件内直接 `fetch`。

## 约定与注意事项

- 组件使用具名函数导出（`export function Header()`），props 接口导出、可选参数在解构中给默认值（如 `confirmText = '确定'`）。
- 样式只用 Tailwind 工具类，任意值写法是常态（`text-[15px]`、`pt-[76px]`、`z-[200]`）；品牌色临时定义：CTA 红 `#e60012`、底部弹窗红 `#d32f2f`、页面底 `#f5f5f5`。
- 所有用户可见文案与控制台错误信息均为简体中文。
- 弹层统一用 `motion` 做 `opacity` 背景 + `y:'100%'` 滑入的 spring 动画，并通过 `useEffect` 锁定 `document.body.style.overflow`。
- 日期选择用自定义滚轮组件 `DatePickerDrawer`，选项选择用 `BottomSheet`（`default` / `action` 两种变体）。
- 校园登录为模拟流程：手机号 `11111111111` + 验证码 `111111`；阿里云验证码为占位实现（恒通过）。

## 部署

```bash
npm run build
```

构建产物输出到 `dist/`。API 地址如需切换环境，需修改 `src/api/*.ts` 中硬编码的 `https://admin.gamstek.com`（目前没有集中的配置入口）。
