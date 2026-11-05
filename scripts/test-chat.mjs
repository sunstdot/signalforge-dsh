import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const React = require("react");

const registrations = [];
globalThis.window = {
	__ModuleLoader__: {
		load({ id, factory }) {
			globalThis.__loaded = { id, loaded: factory((name) => {
				if (name === "react") return React;
				throw new Error(`unexpected module: ${name}`);
			}) };
		},
	},
};

const writes = [];
try {
	Object.defineProperty(globalThis.navigator, "clipboard", {
		value: { writeText: async (text) => { writes.push(text); } },
		configurable: true,
	});
} catch {
	// Clipboard is optional; the startSession assertion below is the primary check.
}

await import("../client.js");
const { loaded } = globalThis.__loaded;
let started = null;
const workspace = {
	workspaces: { list: { getSnapshot: () => ({ items: [{}] }) } },
	startSession: (workspaceId, options) => { started = { workspaceId, options }; },
};
const ctx = {
	effect(fn) { fn(); return () => {}; },
	locale: { register() {}, bind() { return (key) => key; } },
	slots: {
		inject(_name, fn) { return fn(); },
		register(options, component) { registrations.push({ options, component }); return () => {}; },
	},
	get(name) { return name === "uiWorkspace" ? workspace : undefined; },
};
loaded.apply(ctx);
const main = registrations.find((item) => item.options.name === "main");
const action = main.options.inject().openArticleChat;
const item = {
	id: "a", title: "Show HN: OnKey", url: "https://example.com/onkey", source: "Hacker News",
	source_type: "hn", category: "资讯", published_at: new Date().toISOString(),
	finding: "开发者做了一个实时显示跑调位置的应用。",
	why_read: "AI 编程让个人痛点更容易变成小产品。",
	evidence_note: "社区热榜（转述/讨论，非独立验证）",
	summary: "A developer built an app.", details: ["44 points", "作者自称唱歌很差"],
};
const result = await action(item);
console.log({ result, workspaceId: started?.workspaceId, hasTitle: started?.options.prompt.includes("Show HN: OnKey"), hasUrl: started?.options.prompt.includes("https://example.com/onkey"), hasFinding: started?.options.prompt.includes("开发者做了一个实时显示跑调位置的应用。"), clipboard: writes.length });
if (!result.ok || !started?.options.prompt.includes("https://example.com/onkey") || !started?.options.prompt.includes("开发者做了一个实时显示跑调位置的应用。")) process.exit(1);
console.log("chat action ok");
