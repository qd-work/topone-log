# 03 · 段5 审查报告（TopOne Logistics）

> 段5 产出。landing 设计 + SEO + 诚信自检 + 技术实测,三色分级。

## 总览
- Landing 设计分:**85 / 100**(专业稳重、信任导向、CTA 清晰;扣分:内容偏声明式、缺实拍/案例)
- 🔴 必改(代码层面):**0 项**
- 🟡 建议:**8 项**
- 🟢 通过:多项
- 诚信自检:**✅ 零违规**

---

## 1. Landing 设计审查
> 维度:排版/留白/配色/字体/CTA/卡片/响应式 + 货代专项(信任要素/询盘路径)

| 维度 | 级别 | 问题 / 建议 |
|---|---|---|
| 排版 / 留白 | 🟢 | 容器 1160px,section padding 充足,层级清晰 |
| 配色 | 🟢 | navy #0A2540 / steel #1E4D8B / gold #C9A24A 落地,符合稳重商务定位 |
| 字体 | 🟡 | Inter 靠 Tailwind fontFamily(系统回退),建议 next/font 加载保证跨端一致 |
| CTA | 🟢 | "Get a Quote" 贯穿 hero/nav/footer/详情页,询盘路径清晰 |
| 卡片 | 🟢 | 服务/航线卡片结构清晰,核心优势 vs 亦覆盖区分到位 |
| 响应式 | 🟢 | 三端正常,移动端汉堡菜单 OK |
| 信任要素 | 🟡 | NVOCC + 创始人18年 + WCA申请中;缺实拍/案例/证书号(待补料) |
| 询盘路径 | 🟢 | 多入口表单 + 详情页侧栏 RFQ,字段针对货代(origin/destination/cargo) |
| 内容转化 | 🟡 | Why TopOne 偏"声明式"(诚信声明多于实力卖点),补料后可升级为实力型 |

## 2. SEO 审计

### 技术 SEO
| 项 | 状态 | 说明 |
|---|---|---|
| metadata(title≤60/desc≤155/单H1) | ✅ | 每页独立,title 长度合规,单 H1 |
| hreflang / canonical | ✅ | en/zh/x-default 自引用 + canonical 正确 |
| 结构化数据 | ✅ | Organization+WebSite(layout) / Service+Breadcrumb+FAQ(详情),Service 无 price |
| sitemap / robots | ✅ | 静态+Velite 动态;robots 指向 sitemap |
| 图片 alt | ✅ | 段5 已修(7 处空 alt → 描述性+含关键词) |
| 死链 | ✅ | 无(Customs/Warehousing 卡片指向 /contact,非假详情页) |

### 内容 SEO
| 项 | 状态 | 说明 |
|---|---|---|
| 采购意图词覆盖 | ✅ | China freight forwarder / FCL / LCL / origin agent / 海运空运 覆盖 |
| 内链 | ✅ | home → services → 详情 → contact,每页 ≥1 上下文内链 |
| 内容质量 | 🟡 | 诚实但偏声明式,补料(创始人细节/航线/案例)后充实 |

## 3. 诚信自检(reference/05 全量)
| 红线 | 结果 | 修正动作 |
|---|---|---|
| 认证声称有证书 | ✅ 通过 | 只写 NVOCC(用户确认有);WCA 标"申请中";IATA/FMC 未写 |
| 案例/Logo 有授权 | ✅ 通过 | 无案例/Logo(新公司),无违规 |
| 无编造参数/产能 | ✅ 通过 | grep 零编造;specs 通用化(不编精确数字);运力数字未写 |
| Service JSON-LD 不带 price | ✅ 通过 | json-ld.ts 无 offers/priceCurrency |
| 无无依据最高级 | ✅ 通过 | grep 仅命中 CSS `leading-tight`(行高),无 leading/best/#1 声称 |
| AI 图不冒充真实 | ✅ 通过 | 全部标注 "Representative image, real photos TBD" |
| 量化声称有据 | ✅ 通过 | 唯一数字"18 years"= 创始人资历(用户确认,符合红线10) |

## 4. 技术实测
- ✅ **leads 测试询盘**:提交 → `[inquiry:mock]` server 日志完整记录 + `POST /en/contact 200` + UI 成功反馈(模拟模式闭环;飞书真实接通待 env)
- ✅ preview_resize 三端正常(desktop/tablet/mobile)
- ✅ sitemap.xml / robots.txt 可访问(build 生成)
- ✅ build exit 0,23 页 SSG

## 5. 汇总
### 🔴 必改(阻塞上线)
- **代码层面:0 项**

### 🟡 建议(不阻塞,提升质量)
1. 字体:Inter 改 next/font 加载(跨端一致)
2. Logo:用真实 PNG+SVG 替换文字 logo "T"/"T1"
3. 实拍:办公室/仓库/操作照替换 representative 占位图
4. favicon / apple-touch-icon:补充
5. 图片:WebP 压缩 + lazy(首图 eager 已设)
6. 自定义 404 页
7. Why TopOne 文案:补料后从声明式升级为实力型
8. 中文站主体 i18n(当前 nav+form 中文化,主体英文;英文优先可接受)

### 🟢 通过
- 诚信零违规 | SEO 基建完整 | leads 闭环 | 三端响应式 | 配色落地 | build 通过 | 23 页 SSG

> 代码层面已可上线。剩余阻塞项为**朋友补料/配置**(飞书 env、域名、联系方式、NVOCC号),详见 DELIVERY.md。
