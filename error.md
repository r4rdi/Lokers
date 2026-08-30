14:45:21.861 Running build in Washington, D.C., USA (East) – iad1
14:45:21.862 Build machine configuration: 2 cores, 8 GB
14:45:21.904 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
14:45:21.905 Skipping build cache, deployment was triggered without cache.
14:45:22.244 Cloning completed: 340.000ms
14:45:22.556 Running "vercel build"
14:45:22.625 Vercel CLI 59.3.0
14:45:23.155 Installing dependencies...
14:45:42.559 
14:45:42.560 added 243 packages in 19s
14:45:42.560 
14:45:42.561 38 packages are looking for funding
14:45:42.561   run `npm fund` for details
14:45:42.562 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
14:45:42.562 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
14:45:42.562 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
14:45:42.562 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
14:45:42.562 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
14:45:42.562 npm warn allow-scripts
14:45:42.562 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
14:45:42.625 Running "npm run build"
14:45:42.834 
14:45:42.835 > web@0.1.0 build
14:45:42.836 > next build
14:45:42.836 
14:45:43.251 ▲ Next.js 16.3.3 (Turbopack)
14:45:43.267 ✓ Running next.config.mjs took 15ms
14:45:43.662 Attention: Next.js now collects completely anonymous telemetry regarding usage.
14:45:43.662 This information is used to shape Next.js' roadmap and prioritize features.
14:45:43.662 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
14:45:43.663 https://nextjs.org/telemetry
14:45:43.663 
14:45:43.677   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
14:45:44.785   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
14:45:45.939 
14:45:46.150 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
14:45:46.151 
14:45:46.151   To migrate automatically, run:
14:45:46.151   npx @next/codemod@canary middleware-to-proxy .
14:45:46.151 
14:45:46.151   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
14:45:46.180   Creating an optimized production build ...