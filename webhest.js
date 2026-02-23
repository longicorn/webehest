import { chromium } from "npm:playwright";

const PORT = 8080;

Deno.serve({
  port: PORT,
  hostname: "0.0.0.0",
  //cert: Deno.readTextFileSync("./cert.pem"),
  //key: Deno.readTextFileSync("./key.pem"),
}, async (req) => {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Usage: ?url=https://example.com", { status: 400 });
  }

  try {
    const browser = await chromium.connectOverCDP("http://127.0.0.1:9222", { timeout: 5000 });
    const context = browser.contexts()[0];
    const page = await context.newPage();

    // set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    });

    await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30000 });

    // Baseタグ挿入
    // CSSや画像が元のドメインを向くように、絶対パスの<base>を一番上に挿入
    await page.evaluate((href) => {
      const url = new URL(href);
      const base = document.createElement('base');
      // ドメインのルートを指定することで、相対パスを解決させる
      base.href = url.origin + "/"; 
      document.head.prepend(base);
    }, targetUrl);

    const html = await page.content();
    await page.close();

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  } catch (e) {
    console.error("Detailed Error:", e);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
});
