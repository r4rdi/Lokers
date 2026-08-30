16:06:46.994 Running build in Washington, D.C., USA (East) – iad1
16:06:46.995 Build machine configuration: 2 cores, 8 GB
16:06:47.040 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
16:06:47.041 Skipping build cache, deployment was triggered without cache.
16:06:47.416 Cloning completed: 376.000ms
16:06:47.782 Running "vercel build"
16:06:47.820 Vercel CLI 59.3.0
16:06:48.406 Installing dependencies...
16:07:08.412 
16:07:08.413 added 243 packages in 20s
16:07:08.413 
16:07:08.413 38 packages are looking for funding
16:07:08.413   run `npm fund` for details
16:07:08.415 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
16:07:08.415 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
16:07:08.415 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
16:07:08.415 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
16:07:08.417 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
16:07:08.418 npm warn allow-scripts
16:07:08.418 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
16:07:08.483 Running "npm run build"
16:07:08.684 
16:07:08.685 > web@0.1.0 build
16:07:08.685 > next build
16:07:08.685 
16:07:09.146 ▲ Next.js 16.3.3 (Turbopack)
16:07:09.163 ✓ Running next.config.mjs took 16ms
16:07:09.613 Attention: Next.js now collects completely anonymous telemetry regarding usage.
16:07:09.614 This information is used to shape Next.js' roadmap and prioritize features.
16:07:09.614 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
16:07:09.614 https://nextjs.org/telemetry
16:07:09.614 
16:07:09.630   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
16:07:10.814   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
16:07:11.939 
16:07:11.950 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
16:07:11.950 
16:07:11.950   To migrate automatically, run:
16:07:11.951   npx @next/codemod@canary middleware-to-proxy .
16:07:11.951 
16:07:11.951   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
16:07:11.979   Creating an optimized production build ...