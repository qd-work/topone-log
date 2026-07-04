# 01 · 整站规划（TopOne Logistics）

> 段2 产出。🔴 **整站规划用户确认后才进段3（codex 跑）**。风格方向给 codex 生图用；具体视觉由用户在 codex 选定后回填"风格定稿"。
> 货代站适配：产品页 → 服务/航线页；制造业调性 → 货代 B2B 同行调性。

## 品牌 & 定位
- **品牌**：TopOne Logistics（青岛千灏国际物流有限公司 / Qianhao International Logistics Co., Ltd.）
- **一句话定位**：Your reliable China freight forwarding partner.
- **目标客户画像**：海外本地货代公司（co-loader 模式 —— 对方是目的国货代，TopOne 做其中国起运港代理）；决策角色：对方 Operation Manager / Owner
- **目标市场**：核心优势 非洲 / 南美 / 东南亚；亦覆盖 欧地 / 美线 / 澳新

## 核心卖点（每条带支撑依据，依据不足标 🟡/🔴，上线前补或降级）
1. ✅ **NVOCC-licensed China freight forwarder** ← 依据：NVOCC 备案资质
2. 🟡 **Founder-led by an industry veteran** ← 依据待补：创始人从业年限/前东家/专长航线（About 页信任核心）
3. 🟡 **Competitive rates on emerging-market routes** ← 依据待补：船司直签/舱位协议（非洲/南美/东南亚）
4. 🟡 **One-stop service: sea · air · land + customs + insurance** ← 依据：业务板块；自营范围待确认
5. 🔴 **Fast quote response** ← 依据待补：报价响应承诺（如 24h，须朋友能做到）

## 信息架构（MVP 页面清单，中英双语 / 英文为主）
- **Home** `/` （区块顺序见下）
- **Services** `/services` + 服务详情 `/services/[slug]`（Velite services collection）
- **Routes** `/routes`（航线总览）
- **About** `/about`
- **Contact** `/contact`（询盘表单 + 联系方式）
- *后续阶段*：Cases `/cases`、Blog `/blog`（待有素材后加，MVP 不做）
- 通用：Header（Nav + Get a Quote CTA + 语言切换）、Footer（联系方式 + 公司信息 + NVOCC + 备案号占位）

## 内容结构（每页要点）

### Home（区块顺序）
1. **Hero**：定位语 "Your reliable China freight forwarding partner." + 副标（面向海外货代的利益）+ 主 CTA "Get a Quote" + 次级 CTA "Our Services"；背景大幅港口/集装箱实景；叠加 NVOCC 信任徽章
2. **Trust bar**：NVOCC-licensed · China-origin specialist · `<!-- TODO: WCA/CIFA 等徽章待会员确认 -->`
3. **Services overview**：3 卡 —— Sea Freight (FCL/LCL) / Air Freight / Land & Multimodal（图标 + 一句话 + CTA）
4. **Core routes**：核心优势 3 条突出（Africa / South America / Southeast Asia，标 "Core Strengths"）+ 亦覆盖 3 条（Europe&Med / Americas / Oceania，标 "Also Covered"）
5. **Why TopOne**：创始人经验锚定信任 + 一站式 + 快速响应（🟡/🔴 卖点，留依据占位）
6. **How we work**：简化流程 Inquiry → Quote → Booking → Tracking → Delivery
7. **CTA band**：Get a Quote
8. Footer

### Services 列表 + 详情 `[slug]`
- 列表：服务卡片网格（Sea FCL / Sea LCL / Air Freight / Land & Multimodal）
- 详情（每个 MDX）：概述 → 服务范围 → 适用货物/行业 → `<!-- TODO: 航线/船期参数 -->` → FAQ → 询盘 CTA

### Routes
- 6 条航线卡：核心 3 条（视觉突出）+ 亦覆盖 3 条；每卡：主要港口 / 航程 / 船期 `<!-- TODO: 客户确认真实参数 -->`

### About
- 公司一句话（2025 成立，青岛，NVOCC）→ **创始人履历（信任核心）** `<!-- TODO: 创始人年限/前东家/专长 -->` → 团队/能力（"老带新 + 流程标准化"）→ 价值观（英文站转 Reliability / Transparency / Partnership，淡化"本分·分享·服务"）→ 资质（NVOCC + `<!-- TODO: WCA等 -->`）

### Contact
- 询盘表单（Name / Company / Email / Country / WhatsApp + Origin port / Destination port / Cargo type / Container or weight / Expected transit time / Notes）+ 备用联系方式 `<!-- TODO: 企业邮箱/WhatsApp/Skype/LinkedIn -->` + 办公地（青岛）

## 风格方向（给段3 codex 生图用）
- **调性**：专业稳重商务（船司/银行级可靠感），信息密集可信，非消费电商花哨；移动端友好
- **配色倾向**：主 深海军蓝 `#0A2540` / 辅 钢蓝 `#1E4D8B` / 底 白 `#FFFFFF` / 强调 可用更亮一档蓝或金作 CTA 点缀
- **字体倾向**：标题 Inter Bold（粗、权威）；正文 Inter Regular（清晰）；行高/留白充足
- **参考站 / 情绪板**：马士基 Maersk / MSC / CMA CGM 一类的稳重专业感；Hero 用大幅港口/集装箱/堆场实景 + 实力徽章
- **图像**：港口、集装箱堆场、货船、仓库操作场景；AI 生图须标 representative，优先客户实拍

## 风格定稿（段3 你在 codex 选定风格后写回这里）
- 定稿配色：____
- 定稿字体：____
- 定稿调性：____
- 布局风格：____

## 用户确认（🔴 闸门）
- [ ] 定位 & 卖点确认
- [ ] 信息架构确认
- [ ] 风格方向确认 → 进段3 codex 跑

> 段3 你在 codex 选定风格后写回"风格定稿"段（codex 继续按该风格做完成站）。
> 资料缺口与 🔴TODO 详见 `00-brief.md`「待客户确认」区，与本规划保持一致。
