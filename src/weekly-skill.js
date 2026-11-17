export const WEEKLY_SKILL_NAME = "ai-weekly-report";

export const WEEKLY_SKILL_DESCRIPTION =
	"Research and write a high-signal weekly AI report: the last 7 days of notable funding rounds, new model releases, new AI products, and 3–5 trend signals. Use when the user asks for an AI 周报 / 投融资周报 / weekly AI roundup, or wants funding, model, product, and trend tables with sources.";

export const WEEKLY_SKILL_WHEN =
	"用户要求 AI 周报、投融资周报、过去 7 天 AI 大事、融资/新模型/新产品汇总，或要按表格和趋势信号整理近期 AI 情报时。";

export const WEEKLY_SKILL_CONTENT = `# AI 周报（ai-weekly-report）

当用户要求「AI 周报 / 投融资周报 / 过去 7 天 AI 大事 / 融资、新模型、新产品汇总」时，按本协议执行。

## 先检索，再写

1. 先确认今天是哪一天；检索范围是**今天往前 7 天**。所有日期写具体日期，不要写「最近」「本周早些时候」。
2. **必须使用 web_search / web_fetch 实际检索**，不要只凭记忆。优先来源：
   - 公司 / 机构官方公告、官方博客、模型卡
   - Reuters、TechCrunch、主流科技媒体
   - Product Hunt、GitHub、Hugging Face
   - 可信的创投/融资报道
3. 每条事件都要能回答「来源是什么」。没有来源链接的事件不要写进表格。
4. 区分三种状态：
   - **已确认**：公司/机构公告，或多家可信媒体确认
   - **传闻**：单一媒体报道、未获官方确认
   - **洽谈中**：明确写了 in talks / 正在谈判
5. **不要把估值当融资金额**；金额和估值分列。未披露就写「未披露」。
6. 不追求数量。只保留高信号、可验证、值得持续跟踪的事件；找不到就写「本期未找到足够可靠的条目」，不要凑数。
7. 对同一事件的多篇报道合并成一条，引用最可靠/最原始的来源。

## 输出结构（中文 Markdown）

### 1）重点投融资表

| 日期 | 公司 | 融资金额 | 估值 | 方向 | 为什么值得关注 | 状态 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |

- 金额和估值带币种/单位；未知写「未披露」。
- 状态只能是「已确认 / 传闻 / 洽谈中」。
- 只保留高信号条目，通常 5–12 条。

### 2）重要新模型表

| 日期 | 模型 | 方向 | 核心变化 | 来源 |
| --- | --- | --- | --- | --- |

- 核心变化写具体能力、上下文、价格、速度、开放权重等，不要写「更强」。
- 通常 3–8 条。

### 3）值得关注的新产品表

| 时间 | 产品 | 做什么 | 为什么值得关注 | 来源 |
| --- | --- | --- | --- | --- |

- 优先 Product Hunt、GitHub、Hugging Face 和官方发布。
- 通常 3–8 条。

### 4）趋势信号

提炼 3–5 个**真正有变化**的趋势，不要复述新闻。每个信号包含：

- **判断**：一句话
- **证据**：2–3 条本周事件/数据，带日期和来源
- **so what**：对独立开发者 / 产品人 / 研发团队意味着什么
- **反证/边界**：什么情况下这个判断不成立

## 纪律

- 全文中文，术语保留英文。
- 表格里的每一条都必须有可点击来源链接。
- 不要把标题里的「 reportedly / in talks / sources say 」改写成确定事实。
- 如果检索结果不足以支撑某个表，明确写「证据不足」，不要编造公司、金额、模型或产品。
- 不要输出空话式的「AI 持续发展」；趋势必须有本周证据。`;
