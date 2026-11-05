# Changelog

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
