# 给 Codex 桌面版的指令：生成 TopOne Logistics 网站（生图 → 选风格 → 做完成站）

> 把本文件**全文复制到 codex 桌面版**跑。codex 会：① 先生 5 张 key 页效果图 → ② 用户在 codex 选定风格 → ③ codex 按选定风格做成完整 Next.js 站。然后回 Claude Code，claude 段4 接手检查修复（文案诚实化 + SEO + 询盘接通）。
> **货代站**（非制造业产品站）：产品页 → 服务/航线页；认证 → NVOCC/WCA；价格 → 询盘报价（不上运价）。

---

## 背景
- **品牌**：TopOne Logistics（青岛千灏国际物流有限公司 / Qianhao International Logistics Co., Ltd.），2025 年成立，中国青岛，NVOCC 备案资质。
- **定位**：Your reliable China freight forwarding partner.（中国起运港货代，做海外货代的 co-loader 供应商）
- **目标客户**：海外本地货代公司（目的国货代，需要中国端代理帮其订舱/拖车/报关/目的港协调）；决策角色：对方 Operation Manager / Owner。**受众是专业人士（同行），不是终端消费者。**
- **目标市场**：核心优势 非洲 / 南美 / 东南亚；亦覆盖 欧地 / 美线 / 澳新。
- **语言**：中英双语，**英文为主**（客户在海外）；中文为辅。
- **关键背景**：公司 2025 年新成立，网站**第一任务是建立信任**，不是堆功能。Hero 和 About 要稳、可信。

---

## 第一步：要生成的页面效果图（先出 5 张，供用户选风格）
1. **首页 Home**：Hero（定位语 + 主 CTA "Get a Quote" + NVOCC 信任徽章 + 大幅港口/集装箱实景背景）→ 服务概览（海/空/陆 3 卡）→ 优势航线（核心 3 条突出 + 亦覆盖 3 条）→ Why TopOne → CTA
2. **服务列表页 Services**：分类导航 + 服务卡片网格（Sea FCL / Sea LCL / Air Freight / Land & Multimodal）
3. **服务详情页 Service detail**：服务概述 + 服务范围 + 适用货物 + 航线/参数区（占位）+ FAQ + 询盘 CTA
4. **关于页 About**：公司一句话 + **创始人/团队** + 能力 + 价值观 + 资质徽章
5. **Contact / 询盘页**：询盘表单（含货代字段）+ 备用联系方式

---

## 风格方向（给方向，具体由用户在 codex 选）
- **调性**：专业稳重商务（船司/银行级可靠感），信息密集可信，**不要消费电商花哨**；移动端友好。
- **配色**：主 深海军蓝 `#0A2540` / 辅 钢蓝 `#1E4D8B` / 底 白 `#FFFFFF`；CTA 可用更亮一档蓝或克制金色点缀。
- **字体**：标题 Inter Bold（粗、权威）；正文 Inter Regular（清晰）；留白充足。
- **参考站/情绪板**：马士基 Maersk / MSC / CMA CGM 一类的稳重专业感。
- **图像**：港口、集装箱堆场、货船、仓库操作场景；AI 生图标注「representative, real photos TBD」。

---

## 第二步：用户选定风格后，按该风格做成完整 Next.js 站

### 技术栈要求（必须严格遵守）
- **Next.js (App Router) + TypeScript + Tailwind**
- **内容层 Velite**：建 `services` collection（货代服务，`content/services/{locale}/*.mdx`），frontmatter：
  `slug` / `language` / `title` / `description` / `keywords` / `category`（Sea FCL / Sea LCL / Air / Land）/ `serviceSpecs`（对象：origin / destination / transit / schedule / cutoff / minVolume / scope）/ `cargoTypes`（适用货物数组）/ `certifications`（仅有依据的，如 NVOCC）/ `images` / `seo` / `faq` / `body`(MDX)。
  另建 `blog` collection（`content/blog/{locale}/*.mdx`，MVP 可空）。
  `lib/services.ts`、`lib/blog.ts` 用 **`readFileSync` 读 `.velite/*.json`**（**不要 import**，会撑爆 chunk）；服务详情走 `services/[slug]` 动态路由，`generateStaticParams` 从 Velite 查（**不要静态路由与 `[slug]` 并存**）。
- **询盘 Server Action**：`app/actions/inquiry.ts` 的 `submitInquiry`。
  - **本次后端不接通真实通知**：保留 skill 标准 3 路结构（飞书 bitable + SMTP `smtp.feishu.cn` + 飞书群机器人 webhook，`Promise.allSettled`），但加一个**模拟模式开关**——当 `FEISHU_APP_ID` 等环境变量**未配置**时，走模拟（校验通过 + `console.log` 记录询盘 + 返回成功），不实际调用飞书/SMTP；env 配置后自动走真实 3 路。
  - 代码里标注 `<!-- TODO: 客户提供 FEISHU_*/SMTP_* 环境变量后自动接通 3 路 -->`。
  - 表单组件：`contact-form` + `quote-modal`（共用同一 action）。
  - env 清单（留空占位，本次不填）：`FEISHU_APP_ID/SECRET/APP_TOKEN/TABLE_ID`、`FEISHU_BOT_WEBHOOK_URL/SECRET`、`SMTP_HOST/PORT/USER/PASS`、`NOTIFY_EMAIL(_CC)`。
  - **不要** Hermes 第 4 路、**不要** Twenty CRM。
- **SEO / 结构化数据**：每页独立 metadata（title ≤60 / description ≤155 / 单 H1）；`lib/json-ld.ts` 用 **Service schema（刻意不带 offers/price —— B2B 询盘报价制）** + `faqPageJsonLd`；`layout.tsx` 注入 Organization + WebSite JSON-LD；服务页 Service + BreadcrumbList + FAQPage；`sitemap.ts`（静态 + Velite 动态）+ `robots.ts`。
- **多语**：next-intl，中英双语（`messages/{locale}.json`），含 hreflang 自引用 + x-default。

### 页面结构（逐页，照此实现）
- **Home `/`**：Hero（定位语 + Get a Quote + 次级 Our Services + NVOCC 徽章 + 港口实景背景）→ Trust bar（NVOCC-licensed · China-origin specialist · `<!-- TODO: WCA/CIFA 徽章 -->`）→ Services overview（3 卡）→ Core routes（核心 3 突出 + 亦覆盖 3）→ Why TopOne → How we work（Inquiry→Quote→Booking→Tracking→Delivery）→ CTA band → Footer
- **Services `/services` + `/services/[slug]`**：列表卡网格；详情 MDX（概述/范围/适用货物/`<!-- TODO: 航线船期参数 -->`/FAQ/询盘 CTA）
- **Routes `/routes`**：6 条航线卡（核心 3 突出 + 亦覆盖 3），每卡主要港口/航程/船期 `<!-- TODO: 客户确认真实参数 -->`
- **About `/about`**：公司一句话 → 创始人履历 `<!-- TODO: 创始人年限/前东家/专长 -->` → 团队/能力（老带新）→ 价值观（Reliability/Transparency/Partnership）→ 资质（NVOCC + `<!-- TODO: WCA等 -->`）
- **Contact `/contact`**：询盘表单（Name/Company/Email/Country/WhatsApp + Origin port/Destination port/Cargo type/Container or weight/Expected transit time/Notes）+ 联系方式 `<!-- TODO: 企业邮箱/WhatsApp/Skype/LinkedIn -->` + 办公地（青岛）

---

## 硬约束（货代 B2B 同行调性 + 诚信，必须遵守）
- **调性**：专业、可信、信息密集，面向海外货代**同行**（懂行的人），不要消费电商花哨语态；移动端友好。
- **所有事实性内容**（航线参数 / 船期 / 时效 / 运力 / 案例 / 资质会员 / 创始人履历）→ 一律留 `<!-- TODO: 客户确认 XXX -->` 占位，**不要填真实值**（claude 段4 照资料包填，未确认的保持 TODO）。
- **Service schema 不带 offers / price**（货代询盘报价制，运价浮动不公开）。
- **不编造资质/会员**：只写已确认的 NVOCC；WCA/CIFA/IATA/FMC 一律 TODO 占位，不写。
- **不放未授权客户 logo / 不写无依据案例 / 不写无依据最高级**（best / leading / world-class / #1 等）。
- **AI 生图不冒充真实照**：生成的逼真港口/仓库/集装箱图是参考图，标注「representative, real photos TBD」，不能当真实办公/仓库照。
- **量化数据（年柜量/仓库面积/员工数/从业年限）无依据不写**，留 TODO。
- 文案统一英文（站点对外）；代码注释/TODO 用中文标注待确认项。

---

## 产出
**直接修改现有站 `<client_dir>`（E:\Github\topone-log）的全部页面**，套用用户选定的风格/布局（**不产出到新仓库、不另起 `site/`**）。交付一个可 `pnpm install && pnpm dev` 跑起来的完整仓库：
- 页面布局/视觉/组件（按选定风格）
- Velite services + blog collection 配置 + `lib/services.ts`/`lib/blog.ts`
- 询盘 Server Action（模拟模式 + 3 路结构，env 未配走模拟）
- SEO 基建（每页 metadata + Service/Organization/WebSite/BreadcrumbList/FAQPage JSON-LD + sitemap + robots）
- next-intl 中英双语
- Tailwind 主题（深海军蓝配色）

**文案留占位或示例 + `<!-- TODO -->`**（claude 段4 填真实内容 + 诚实化复核，**不动 codex 的风格布局**）。

跑完后，用户回 Claude Code 跟 claude 说"codex 跑完了"，claude 进段4（检查修复）。
