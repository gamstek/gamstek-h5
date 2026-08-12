# 立即咨询表单提交设计

## 目标

将立即咨询页的“地区”和“产品型号”改为移动端选择器，并把表单提交到 `https://admin.gamstek.com/api/consult`。

## 范围

- 地区提供：中国大陆 31 个省级行政区，以及台湾、香港、澳门，共 34 项。
- 产品型号固定为：`MS8100`、`MS8000`、`FTMS / FTMS+`、`MS7000`、`MS6000`。
- URL 查询参数 `product` 只有与上述产品之一完全匹配时才作为初始值，否则保持未选择。
- 不增加验证码、提交成功页或新的全局状态。

## 页面交互

地区和产品型号使用现有 `OptionPickerDrawer` 底部抽屉选择器，保持项目移动端交互一致。两个字段都显示当前值或选择提示，并带下拉图标。

姓名、联系电话、单位全称、地区、产品型号、咨询问题和协议勾选均为提交前必填。提交期间按钮禁用并显示“提交中...”，防止重复请求。

提交成功后显示成功提示，并清空姓名、电话、单位、咨询问题和协议状态；地区与产品型号恢复各自初始状态。提交失败时保留所有输入并显示失败提示，方便用户重试。

## 数据与接口

新增 `src/api/consult.ts`，定义咨询请求数据并封装原生 `fetch`：

```ts
export interface ConsultPayload {
  name: string;
  phone: string;
  organization: string;
  region: string;
  productModel: string;
  question: string;
  source: 'consult_page';
}

export async function submitConsult(payload: ConsultPayload): Promise<void>
```

请求使用 `POST https://admin.gamstek.com/api/consult`，请求头为 `content-type: application/json` 和 `accept: application/json`。响应按 `{ code, success, message, data }` 信封处理；HTTP 非成功状态或 `success` 为假时抛出错误，并以中文记录控制台错误。

页面字段映射如下：

- `company` → `organization`
- `inquiry` → `question`
- `source` 固定为 `consult_page`

## 错误处理与验证

浏览器 `required` 校验负责文本必填项，页面逻辑额外校验地区、产品型号与协议。接口异常由 API 层抛出，页面捕获后恢复按钮状态并显示错误 Toast。

仓库没有测试框架，因此不引入新的测试依赖；实施后运行 `npm run lint` 和 `npm run build`，并检查选择、URL 预选、成功清空、失败保留和重复提交防护。
