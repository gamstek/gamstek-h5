# 立即咨询表单提交 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为立即咨询页提供完整地区/产品选择和真实咨询接口提交能力。

**Architecture:** API 请求封装在独立领域文件中，页面维护选择器、表单和提交状态。复用现有移动端底部抽屉，不引入新依赖或全局状态。

**Tech Stack:** React 19、TypeScript 5.8、Tailwind CSS v4、原生 fetch、motion。

## Global Constraints

- 所有用户可见文案和控制台错误使用简体中文。
- API 基地址硬编码为 `https://admin.gamstek.com`。
- 仓库无测试套件，不新增测试依赖；使用类型检查、生产构建和定向代码检查验证。
- 不修改 `vite.config.ts` 或无关的现有工作区改动。

---

### Task 1: 咨询 API 封装

**Files:**
- Create: `src/api/consult.ts`

**Interfaces:**
- Produces: `ConsultPayload` 和 `submitConsult(payload: ConsultPayload): Promise<void>`。

- [ ] 创建请求类型和响应信封类型。
- [ ] 使用 `POST /api/consult` 发送 JSON，请求失败或业务失败时抛出带服务端消息的错误。
- [ ] 运行 `npm run lint`，确认新文件通过类型检查。

### Task 2: 地区与产品选择器

**Files:**
- Modify: `src/pages/support/InquiryPage.tsx`

**Interfaces:**
- Consumes: 现有 `OptionPickerDrawer`。
- Produces: 34 项地区选择、5 项产品选择、受控表单值和合法 URL 预选。

- [ ] 定义精确的地区和产品常量，URL 产品值仅在合法集合内生效。
- [ ] 将地区原生下拉框和产品文本框替换为触发底部抽屉的按钮。
- [ ] 增加两个 `OptionPickerDrawer` 实例并连接选择回调。
- [ ] 运行 `npm run lint`，确认组件类型正确。

### Task 3: 表单校验与提交状态

**Files:**
- Modify: `src/pages/support/InquiryPage.tsx`

**Interfaces:**
- Consumes: `submitConsult`。
- Produces: 完整字段映射、重复提交防护、成功清空与失败保留。

- [ ] 将提交处理器改为异步，校验地区、产品和协议并映射接口字段。
- [ ] 提交中禁用按钮并显示“提交中...”。
- [ ] 成功时显示 Toast 并恢复初始表单；失败时显示服务端消息并保留输入。
- [ ] 运行 `npm run lint` 与 `npm run build`。
- [ ] 检查差异只包含计划内源文件和文档，并报告现有工作区状态。
