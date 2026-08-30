16:15:52.179 Running build in Washington, D.C., USA (East) – iad1
16:15:52.180 Build machine configuration: 2 cores, 8 GB
16:15:52.223 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
16:15:52.224 Skipping build cache, deployment was triggered without cache.
16:15:52.613 Cloning completed: 389.000ms
16:15:52.969 Running "vercel build"
16:15:53.016 Vercel CLI 59.3.0
16:15:53.591 Installing dependencies...
16:16:13.961 
16:16:13.962 added 243 packages in 20s
16:16:13.962 
16:16:13.962 38 packages are looking for funding
16:16:13.962   run `npm fund` for details
16:16:13.964 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
16:16:13.965 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
16:16:13.965 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
16:16:13.966 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
16:16:13.967 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
16:16:13.967 npm warn allow-scripts
16:16:13.968 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
16:16:14.021 Running "npm run build"
16:16:14.286 
16:16:14.287 > web@0.1.0 build
16:16:14.287 > next build
16:16:14.288 
16:16:14.795 ▲ Next.js 16.3.3 (Turbopack)
16:16:14.813 ✓ Running next.config.mjs took 17ms
16:16:15.125 Attention: Next.js now collects completely anonymous telemetry regarding usage.
16:16:15.125 This information is used to shape Next.js' roadmap and prioritize features.
16:16:15.125 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
16:16:15.125 https://nextjs.org/telemetry
16:16:15.125 
16:16:15.141   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
16:16:16.294   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
16:16:17.510 
16:16:17.601 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
16:16:17.601 
16:16:17.601   To migrate automatically, run:
16:16:17.601   npx @next/codemod@canary middleware-to-proxy .
16:16:17.601 
16:16:17.601   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
16:16:17.635   Creating an optimized production build ...