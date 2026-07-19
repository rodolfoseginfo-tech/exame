import { readFile, writeFile, copyFile } from "node:fs/promises";

const file = "dist/client/index.html";
let html = await readFile(file, "utf8");
html = html
  .replaceAll('href="/assets/', 'href="/exame/assets/')
  .replaceAll('src="/assets/', 'src="/exame/assets/')
  .replaceAll('href="/manifest.json"', 'href="/exame/manifest.json"')
  .replaceAll('href="/icon.svg"', 'href="/exame/icon.svg"')
  .replaceAll('href="/favicon.svg"', 'href="/exame/favicon.svg"');
await writeFile(file, html);
await copyFile(file, "dist/client/404.html");
