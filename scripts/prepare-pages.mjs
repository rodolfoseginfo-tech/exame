import { readFile, writeFile, copyFile } from "node:fs/promises";

const file = "dist/client/index.html";
let html = await readFile(file, "utf8");
html = html
  .replaceAll('/assets/', '/exame/assets/')
  .replaceAll('/manifest.json', '/exame/manifest.json')
  .replaceAll('/icon.svg', '/exame/icon.svg')
  .replaceAll('/favicon.svg', '/exame/favicon.svg');
await writeFile(file, html);
await copyFile(file, "dist/client/404.html");
