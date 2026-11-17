# Changelog

## 0.2.3 — 2026-11-17

- Fixed broken README images: `package.json` now includes `docs/screenshots/*.png`.
- Added four real UI screenshots: 7-day funding report, AI新产品, all-intel, and the 继续对话 prefill.
- Rewrote the README "界面速览" sections around those screenshots, including what each table/action does and how the conversation prefill works.

## 0.2.2 — 2026-11-17

- Added launch materials: X / Xiaohongshu copy, 1600×900 X images, and 1242×1656 vertical images in `docs/launch/`.
- Updated README screenshots to the funding report and AI新产品 all-intel view.
- Improved the funding table column layout and shortened source links to “原文 ↗” so amounts/valuations no longer wrap character-by-character.

## 0.2.1 — 2026-11-17

- Added an **AI新产品** category to 全部情报, backed by Product Hunt AI's daily feed.
- Product Hunt cards are enriched with the same Chinese quick-reads as other candidates and show up under the new category chip.
- Daily full refresh now preserves an existing 7-day funding report instead of dropping it when regenerating signals/opportunities.

## 0.2.0 — 2026-11-17

- **Replaced the first tab's content** with a 7-day AI funding intelligence report: funding, new models, new products, and 3–5 trend signals.
- Every report row requires a source URL from the fetched candidates; funding keeps amount and valuation separate and marks confirmed / rumored / in-talks.
- Added report generation (`mode: "report"`), report storage on the daily digest, report-aware bootstrap/date labels, and a `ReportView` with source-linked tables.
- Added TechCrunch Funding / Fundraising, Product Hunt AI, and The Verge AI; 32 sources total.
- Added 投融资 / 产品 categories to the all-intel view.
- Kept `ai-weekly-report` as the “deep dive in chat” action and preserved the daily full run for opportunities/all-intel.
- Added report normalization tests.

## 0.1.5 — 2026-11-17

- Added **AI 周报**: a header action plus a registered `ai-weekly-report` skill. It opens a new conversation that uses web search for the last 7 days and returns funding, model, product, and trend tables with sources.
- Enforced signal source diversity: at most 2 cards from one source, and 5 signals must cover at least 3 sources.
- Added source-fetch concurrency limiting and transient retry; a full 28-source run now completes 28/28 reliably.
- The weekly skill distinguishes confirmed / rumored / in-talks events and keeps valuation separate from funding amount.

## 0.1.4 — 2026-11-08

- Fixed `paper-reading` skill loading: runtime skills now declare the required `source` string.
- Verified the skill loads through the Harness skill tool and returns the full paper-reading protocol.
- No source-analysis or UI behavior changes.

## 0.1.3 — 2026-11-07

- Expanded from 17 to **28 sources**, including 15 official AI company blogs.
- Added RSS/Atom sources: Google Research, NVIDIA Developer, Apple Machine Learning, LangChain, Cloudflare AI, AWS Machine Learning.
- Added HTML-adapted sources for sites without RSS: Anthropic News, Anthropic Engineering, Cognition, Meta AI, Cohere.
- Official blog lookback is now 14 days (news/community remain 48 hours), so weekly-updated labs still appear.
- Model candidate pool raised to 72, with per-source caps, a 24-official cap, and round-robin source diversification so one company cannot dominate.
- Source fetch retries once on transient network failures.
- Updated README source list and categories.

## 0.1.2 — 2026-11-06

- Added a host-registered **paper-reading** skill with the full "papers are compressed arguments" protocol and a fixed Chinese output contract.
- Paper cards now show **精读论文** next to 继续对话; it opens a new conversation with the paper title, URL, abstract, and intel quick-read already in the composer.
- Added a collapsed **论文精读** panel above the tabs for papers outside the digest: paste an arXiv / DOI / PDF link, or a title + abstract.
- The paper prompt tells the agent to fetch full text first, mark unavailable evidence instead of inventing it, and not pretend to inspect figure pixels.
- Added regression coverage for article→chat, paper→chat, and manual paper/DOI normalization.

## 0.1.1 — 2026-11-05

- Added **继续对话 / Discuss with AI** to every signal and candidate card.
- The button opens a new Harness conversation with the title, URL, source, category, Chinese quick-read, evidence, summary, and key details already in the composer.
- If no workspace/conversation service is available, the full prompt is copied to the clipboard with a notice.
- Includes a local regression test for the article-to-chat prompt and `startSession` call.

## 0.1.0 — 2026-11-04

First public release.

- Sidebar panel with three tabs: selected signals, business/engineering opportunities, and every fetched candidate.
- 17 login-free sources: Hacker News, arXiv, Hugging Face Daily Papers, GitHub Trending, official AI blogs, newsletters, and media.
- Two-stage AI analysis on the signed-in DeepSeek account:
  - select at most 5 signals with Chinese “what was found / why it matters / evidence” cards;
  - write 3 business + 3 engineering opportunities from those signals.
- Chinese quick-reads for every candidate, with category tags (paper, repository, model, news, AI company blog, WeChat official account, Smol news, investor news).
- Full candidate list with search, category filters, original links, and expandable details.
- One digest per day under `$DSH_HOME/signalforge`; dates without signals are hidden.
- Optional import of already-generated SignalForge briefings for historical dates.
