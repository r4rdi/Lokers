15:23:21.852 Running build in Washington, D.C., USA (East) – iad1
15:23:21.853 Build machine configuration: 2 cores, 8 GB
15:23:21.896 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
15:23:21.897 Skipping build cache, deployment was triggered without cache.
15:23:22.344 Cloning completed: 448.000ms
15:23:22.703 Running "vercel build"
15:23:22.732 Vercel CLI 59.3.0
15:23:23.419 Installing dependencies...
15:23:43.844 
15:23:43.846 added 243 packages in 20s
15:23:43.846 
15:23:43.847 38 packages are looking for funding
15:23:43.847   run `npm fund` for details
15:23:43.849 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
15:23:43.849 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
15:23:43.850 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
15:23:43.850 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
15:23:43.850 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
15:23:43.850 npm warn allow-scripts
15:23:43.850 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
15:23:43.912 Running "npm run build"
15:23:44.136 
15:23:44.137 > web@0.1.0 build
15:23:44.137 > next build
15:23:44.137 
15:23:44.582 ▲ Next.js 16.3.3 (Turbopack)
15:23:44.602 ✓ Running next.config.mjs took 24ms
15:23:44.979 Attention: Next.js now collects completely anonymous telemetry regarding usage.
15:23:44.979 This information is used to shape Next.js' roadmap and prioritize features.
15:23:44.979 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
15:23:44.979 https://nextjs.org/telemetry
15:23:44.979 
15:23:44.995   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
15:23:46.150   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
15:23:47.293 
15:23:47.299 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
15:23:47.299 
15:23:47.299   To migrate automatically, run:
15:23:47.299   npx @next/codemod@canary middleware-to-proxy .
15:23:47.299 
15:23:47.299   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
15:23:47.339   Creating an optimized production build ...