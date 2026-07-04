# DELIVERY · 交付清单（TopOne Logistics）

> 段5 产出。三色分级 + 待客户确认汇总 + 上线建议。

## 交付物清单

| 交付物 | 形态 | 状态 | 说明 |
|---|---|---|---|
| 站点代码 | Next.js 15 App Router + Velite + next-intl | 🟢 | 完整可跑,build exit 0,23 页 SSG |
| 服务页内容 | Velite MDX(`content/services/{en,zh}/`)4 服务×2 语 | 🟢 | specs 通用化(不编数字),FAQ 诚实,Service schema 无 price |
| 首页/关于/航线/联系文案 | 英文(中文 nav+form) | 🟡 | 英文完整诚实;中文主体暂英文(英文优先 MVP) |
| 询盘表单 + 飞书接通 | Server Action 3 路 + 模拟模式 | 🟡 | 表单闭环已验证(mock log + success);配 env 后自动接飞书 3 路 |
| SEO | metadata/hreflang/JSON-LD/sitemap/robots/alt | 🟢 | 完整,alt 段5 已修 |
| 资料包/规划/审查文档 | md(`建站/00~03`+DELIVERY) | 🟢 | 全 |

## 三色分级说明
- 🟢 **已完成**:可直接用
- 🟡 **建议优化**:不阻塞,提升质量
- 🔴 **待客户确认**(阻塞上线):缺资料/缺配置/缺决策

## 待客户确认汇总(按影响排序)
1. 🔴 **飞书 env**(`FEISHU_APP_ID/SECRET/APP_TOKEN/TABLE_ID`、`SMTP_*`、`FEISHU_BOT_WEBHOOK_URL`) → 影响:询盘真实接收(当前模拟模式,提交只在 server 日志) → 处理:朋友创建飞书应用 + 多维表格 + 群机器人,填 .env
2. 🔴 **toponelog.com 域名归属** → 影响:上线 + canonical + SSL → 处理:确认持有,否则改用 `toponeforwarding.com`(可用)
3. 🔴 **NVOCC 备案号** → 影响:home 信任区(当前显示 TODO) → 处理:提供备案号 + 证书扫描件
4. 🔴 **企业邮箱 / WhatsApp / Skype / LinkedIn** → 影响:contact + footer(当前 TODO) → 处理:提供联系方式
5. 🔴 **报价响应承诺**(如 24h) → 影响:卖点 → 处理:确认能做到的时效
6. 🟡 **办公室/仓库/操作实拍** → 影响:替换 representative 占位图 → 处理:拍摄提供
7. 🟡 **Logo(PNG+SVG)** → 影响:品牌(当前文字 logo) → 处理:设计提供
8. 🟡 **WCA 正式加入** → 影响:信任徽章从"申请中"升级为"Member" → 处理:加入后更新文案
9. 🟡 **中文站主体 i18n** → 影响:中文站完整性(当前主体英文) → 处理:后续阶段(英文优先可缓)

## 诚信自检(段5 增量)
- ✅ 对照全量自检之后的 diff(footer 导航 / 图片 alt / PageHero prop / 创始人18年 / 航线通用化 / WCA申请中),**无新增编造**
- ✅ 所有 🔴 TODO 仍为 TODO(未被偷填值);唯一数字"18 years"有用户确认依据

## 上线建议
- **代码层面已可上线**(build 通过 / leads 闭环 / 诚信零违规 / SEO 完整 / 三端正常)。
- 🔴 **阻塞上线项**(朋友补):飞书 env + 域名 + 联系方式 + NVOCC号。这 4 项补齐即可上线。
- 风险提示:
  - toponelog.com 未确认归属 — 上线前必须落实域名 + SSL
  - 询盘当前模拟模式 — 上线前必须配飞书 env,否则客户询盘只在 server 日志、无人接收
- 上线后建议:
  - 提交 sitemap.xml 到 Google Search Console / Bing
  - 可选接 GA / Meta Pixel(reference/04 F区)
  - 可选跑 `b2b-overseas-acquisition-kit` 启动海外货代获客

## 语言规则
对内说明中文,对外文案示例英文,不混排。
