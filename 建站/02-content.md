# 02 · 内容清单（TopOne Logistics）

> 段4 产出。记录每页内容路径 + 三态 + 诚信缺口,供段5 审查核对。货代站适配(产品页 → 服务页)。
> **段4 验收结论:codex 产出零编造,reference/01 修整清单全部通过,build 成功(23 页 SSG)。**

---

## 服务页（`content/services/{locale}/{slug}.mdx`,Velite services collection）

| slug | locale | title | serviceSpecs | certifications | images | 三态 |
|---|---|---|---|---|---|---|
| sea-fcl | en | Sea FCL from China | 全 TODO | NVOCC ✅ | port-hero | 🟡 specs 待补 |
| sea-lcl | en | Sea LCL Consolidation | 全 TODO | NVOCC ✅ | warehouse | 🟡 specs 待补 |
| air-freight | en | Air Freight from China | 全 TODO | NVOCC ✅ | warehouse | 🟡 specs 待补 |
| land-multimodal | en | Land & Multimodal Logistics | 全 TODO | NVOCC ✅ | yard | 🟡 specs 待补 |
| sea-fcl | zh | 整柜海运 | 全 TODO | NVOCC ✅ | port-hero | 🟡 specs 待补 |
| sea-lcl | zh | 拼箱海运 | 全 TODO | NVOCC ✅ | warehouse | 🟡 specs 待补 |
| air-freight | zh | 国际空运 | 全 TODO | NVOCC ✅ | warehouse | 🟡 specs 待补 |
| land-multimodal | zh | 陆运与多式联运 | 全 TODO | NVOCC ✅ | yard | 🟡 specs 待补 |

> 所有 serviceSpecs(origin/destination/transit/schedule/cutoff/minVolume)均 `<!-- TODO: 客户确认 -->`,scope 已写实。FAQ 明确"不公布固定运价,走询盘报价"。无编造。

## 其他页面

| 页面 | 路径 | 状态 | 关键内容三态 |
|---|---|---|---|
| Home | `src/app/[locale]/page.tsx` + `lib/content.ts` | ✅ 框架 | Hero UVP ✅ / 卖点 🟡(founder TODO) / 信任区 🟡(WCA TODO) / 流程 ✅ |
| Services 列表 | `services/page.tsx` | ✅ | 4 服务卡 ✅ + Customs/Warehousing 附加卡 🟡 |
| Services 详情 `[slug]` | `services/[slug]/page.tsx` | ✅ | Service+Breadcrumb+FAQ JSON-LD ✅ / specs 全 TODO 🟡 / 询盘 ✅ |
| Routes | `routes/page.tsx` + `content.ts` | ✅ | 6 航线(核心 3 + 覆盖 3)✅ / ports·schedule 全 TODO 🟡 |
| About | `about/page.tsx` | ✅ 框架 | 公司 ✅(2025/青岛) / 创始人履历 🔴TODO / 资质 🟡(WCA TODO) |
| Contact | `contact/page.tsx` + `contact-form.tsx` | ✅ | 表单 ✅ / 联系方式 🔴TODO / 询盘模拟模式 ✅ |
| Header/Footer | `site-header.tsx` / `site-footer.tsx` | ✅ | 导航 + 语言切换 ✅ / 联系方式 🔴TODO |

## 技术验收(reference/01 修整清单)

| 检查项 | 结果 |
|---|---|
| 内容未被偷填(grep 真实参数/认证/案例) | ✅ 全 TODO,零编造 |
| Service JSON-LD 不带 offers/price | ✅ `serviceJsonLd` 无 price |
| 询盘路数 | ✅ 3 路结构(飞书 bitable+SMTP+群机器人)+ 模拟模式开关(本次未接通,符合决策) |
| Velite 配置 | ✅ services + blog collection,`lib/services.ts` readFileSync |
| 静态路由与 [slug] 并存 | ✅ 无(仅 services/page + services/[slug]) |
| 多语 next-intl | ✅ en/zh,middleware + messages + hreflang |
| 每页 metadata | ✅ title/desc/canonical/alternates/openGraph |
| JSON-LD 完整 | ✅ Organization+WebSite(layout) + Service+Breadcrumb+FAQ(详情) |
| sitemap.ts / robots.ts | ✅ 静态+Velite 动态 / 允许全站 |
| 配色/字体落地 | ✅ navy #0A2540 / steel #1E4D8B / gold #C9A24A / Inter |
| build | ✅ exit 0,23 页 SSG,首屏 JS 102–129 kB |
| 三端视觉 | ✅ desktop/tablet/mobile 结构正确,移动端汉堡菜单正常 |

## 对外英文文案定稿状态
- 首页:🟡 待确认(诚实框架就位,卖点待补 founder/响应承诺)
- 服务页:🟡 待确认(文案就位,specs 待补)
- 关于:🔴 待确认(**创始人履历未填,信任核心**)
- 联系:🔴 待确认(联系方式未填)

> 🔴 **段4 检查点:对外英文文案须用户确认后才进段5**。当前文案诚实但偏"声明式"(Why TopOne 写的是诚信原则),补料后可转为实力型卖点。

## 待客户确认(🔴 内容缺口汇总,按影响排序)
1. 🔴 **创始人履历**(年限/前东家/专长航线)→ About 信任核心 + Home 卖点
2. 🔴 **各航线真实参数**(港口/航程/船期/截关)→ Routes + Services + 详情页 specs
3. 🔴 **WCA/CIFA/IATA 会员** → Home/About/Footer 信任徽章
4. 🔴 **NVOCC 备案号** → Home 信任区
5. 🔴 **企业邮箱/WhatsApp/Skype/LinkedIn** → Contact + Footer
6. 🔴 **报价响应承诺**(24h?)→ 卖点(须朋友能做到)
7. 🔴 **运力数据**(年柜量/仓库面积)→ 量化信任(目前正确地未写数字)
8. 🔴 **真实案例/客户** → 案例页(MVP 未做,待积累)
9. 🟡 **办公室/仓库/操作实拍** → 替换 representative 占位图
10. 🔴 **toponelog.com 域名归属** → 上线(非你方持有则用 toponeforwarding.com)
