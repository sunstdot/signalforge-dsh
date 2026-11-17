import { normalizeReport } from "../src/analyze.js";

const candidates = [
	{ title: "LangChain raises", url: "https://example.com/langchain", source: "LangChain Blog", source_type: "blog", published_at: "2026-11-16T00:00:00.000Z", summary: "Series C" },
	{ title: "Model launch", url: "https://example.com/model", source: "OpenAI News", source_type: "blog", published_at: "2026-11-15T00:00:00.000Z", summary: "New model" },
	{ title: "Product launch", url: "https://example.com/product", source: "Product Hunt AI", source_type: "product", published_at: "2026-11-14T00:00:00.000Z", summary: "New product" },
];

const raw = {
	funding: [
		{ date: "2026-11-16", company: "LangChain", amount: "$300M", valuation: "$3B", sector: "Agent", why: "Series C", status: "confirmed", source_url: "https://example.com/langchain" },
		{ date: "2026-11-16", company: "No source", amount: "?", valuation: "?", sector: "AI", why: "bad", status: "rumor", source_url: "https://evil.example/x" },
	],
	models: [
		{ date: "2026-11-15", model: "Model 1", direction: "Agent", change: "Better", source_url: "https://example.com/model" },
	],
	products: [
		{ date: "2026-11-14", product: "Product 1", what: "Does X", why: "Useful", source_url: "https://example.com/product" },
	],
	trends: [
		{
			title: "Trend",
			judgment: "Something changed",
			evidence: [
				{ date: "2026-11-16", text: "Valid evidence", source_url: "https://example.com/langchain" },
				{ date: "2026-11-16", text: "Invalid evidence", source_url: "https://evil.example/x" },
			],
			so_what: "Build",
			boundary: "Not always",
		},
	],
};

const report = normalizeReport(raw, candidates, { start: "2026-11-11", end: "2026-11-17" });
console.log({ funding: report.funding.length, models: report.models.length, products: report.products.length, trends: report.trends.length, status: report.funding[0]?.status, evidence: report.trends[0]?.evidence.length, url: report.funding[0]?.source.url });
if (report.funding.length !== 1 || report.models.length !== 1 || report.products.length !== 1 || report.trends.length !== 1) process.exit(1);
if (report.funding[0].status !== "已确认" || report.trends[0].evidence.length !== 1 || report.funding[0].source.url !== "https://example.com/langchain") process.exit(1);
console.log("report normalization ok");
