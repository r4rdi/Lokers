15:42:13.671 Running build in Washington, D.C., USA (East) – iad1
15:42:13.672 Build machine configuration: 2 cores, 8 GB
15:42:13.717 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
15:42:13.718 Skipping build cache, deployment was triggered without cache.
15:42:14.196 Cloning completed: 479.000ms
15:42:14.504 Running "vercel build"
15:42:14.975 Vercel CLI 59.3.0
15:42:15.550 Installing dependencies...
15:42:35.691 
15:42:35.692 added 243 packages in 20s
15:42:35.692 
15:42:35.692 38 packages are looking for funding
15:42:35.692   run `npm fund` for details
15:42:35.693 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
15:42:35.695 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
15:42:35.696 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
15:42:35.696 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
15:42:35.697 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
15:42:35.697 npm warn allow-scripts
15:42:35.698 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
15:42:35.746 Running "npm run build"
15:42:35.944 
15:42:35.944 > web@0.1.0 build
15:42:35.944 > next build
15:42:35.944 
15:42:36.394 ▲ Next.js 16.3.3 (Turbopack)
15:42:36.415 ✓ Running next.config.mjs took 21ms
15:42:36.877 Attention: Next.js now collects completely anonymous telemetry regarding usage.
15:42:36.877 This information is used to shape Next.js' roadmap and prioritize features.
15:42:36.877 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
15:42:36.877 https://nextjs.org/telemetry
15:42:36.877 
15:42:36.894   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
15:42:38.100   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
15:42:39.232 
15:42:39.243 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
15:42:39.243 
15:42:39.243   To migrate automatically, run:
15:42:39.244   npx @next/codemod@canary middleware-to-proxy .
15:42:39.244 
15:42:39.244   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
15:42:39.270   Creating an optimized production build ...