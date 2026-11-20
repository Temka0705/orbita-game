// Builds the standalone site page (index.html) from the game source in src/orbita.html.
// The source is the exact page published as the claude.ai artifact (no <html>/<head> of its own),
// so here it gets a full document shell: viewport, PWA manifest, icons and the offline service worker.
// Usage: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const game = readFileSync(new URL('./src/orbita.html', import.meta.url), 'utf8');

const head = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="description" content="Орбита — аркада на одну кнопку: срывайся с орбиты звезды и лови кольцо следующей.">
<meta name="theme-color" content="#0d1033">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Орбита">
<meta property="og:title" content="Орбита">
<meta property="og:description" content="Аркада на одну кнопку про прыжки между звёздами.">
<meta property="og:image" content="icons/icon-512.png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<style>
:root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); box-sizing: border-box; }
body { margin: 0; font: 14px system-ui, sans-serif; overscroll-behavior: none; }
* { -webkit-tap-highlight-color: transparent; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
</head>
<body>
`;

const tail = `
<script>
  if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
</script>
</body>
</html>
`;

writeFileSync(new URL('./index.html', import.meta.url), head + game + tail);
console.log('index.html built,', (head + game + tail).length, 'bytes');
