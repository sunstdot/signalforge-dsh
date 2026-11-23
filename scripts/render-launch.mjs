import { readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const dataDir = path.join(os.homedir(), '.dsh', 'signalforge');
const date = process.env.SF_RENDER_DATE || '2026-11-17';
const outDir = process.env.SF_RENDER_OUT || 'docs/launch';
const digest = JSON.parse(readFileSync(path.join(dataDir, 'digests', `${date}.json`), 'utf8'));
const index = JSON.parse(readFileSync(path.join(dataDir, 'index.json'), 'utf8'));

const registrations = [];
globalThis.window = {
	__ModuleLoader__: {
		load({ factory }) {
			globalThis.__loadedModule = { loaded: factory((name) => {
				if (name === 'react') return ReactProxy;
				throw new Error(`unexpected module: ${name}`);
			}) };
		},
	},
};
let presetIndex = 0;
let preset = [];
const ReactProxy = new Proxy(React, {
	get(target, property) {
		if (property === 'useState') {
			return function useState(initial) {
				if (presetIndex < preset.length) return [preset[presetIndex++], () => {}];
				return target.useState(initial);
			};
		}
		return Reflect.get(target, property);
	},
});
await import('../client.js');
const { loaded } = globalThis.__loadedModule;
const ctx = {
	effect(fn) { fn(); return () => {}; },
	locale: { register() {}, bind() { return (key) => key; } },
	slots: { inject(_name, fn) { return fn(); }, register(options, component) { registrations.push({ options, component }); return () => {}; } },
	get() { return undefined; },
};
loaded.apply(ctx);
const main = registrations.find((item) => item.options.name === 'main');

function render(tab, category = 'all') {
	presetIndex = 0;
	preset = [date, date, digest, index.dates, null, tab, false, null, null, 0, '', category, '', false];
	const html = renderToStaticMarkup(React.createElement(main.component, {}));
	const theme = `
	:root{
		--dsw-alias-bg-base:#f5f5f2;
		--dsw-alias-bg-layer-1:#ffffff;
		--dsw-alias-border-l1:#ececea;
		--dsw-alias-border-l2:#ddddda;
		--dsw-alias-label-primary:#1d1d1f;
		--dsw-alias-label-secondary:#4b4b4f;
		--dsw-alias-label-tertiary:#89898e;
		--dsw-alias-brand-primary:#171717;
		--dsw-alias-brand-text:#171717;
	}
	html,body{margin:0;padding:0;background:var(--dsw-alias-bg-base);}
	body{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB",sans-serif;}
	.sf-page{min-height:100vh;height:auto!important;}
	.sf-scroll{overflow:visible!important;}
	`;
	return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${theme}</style></head><body>${html}</body></html>`;
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
async function shot(html, file, width, height) {
	const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1.5 });
	await page.setContent(html, { waitUntil: 'load' });
	await page.waitForTimeout(250);
	await page.screenshot({ path: file, fullPage: false });
	await page.close();
}
await shot(render('signals'), `${outDir}/report-raw.png`, 1600, 1100);
await shot(render('all', 'AI新产品'), `${outDir}/products-raw.png`, 1600, 1100);
await browser.close();
console.log('rendered raw launch screenshots');
