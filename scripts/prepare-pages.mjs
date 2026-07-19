import { readFile, writeFile, copyFile } from "node:fs/promises";

const file = "dist/client/index.html";
let html = await readFile(file, "utf8");
html = html
  .replaceAll('/assets/', '/exame/assets/')
  .replaceAll('/manifest.json', '/exame/manifest.json')
  .replaceAll('/icon.svg', '/exame/icon.svg')
  .replaceAll('/icon-192.png', '/exame/icon-192.png')
  .replaceAll('/icon-512.png', '/exame/icon-512.png')
  .replaceAll('/icon-maskable-512.png', '/exame/icon-maskable-512.png')
  .replaceAll('/favicon.svg', '/exame/favicon.svg');
await writeFile(file, html);
await copyFile(file, "dist/client/404.html");
