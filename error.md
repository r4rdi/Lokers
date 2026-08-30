15:30:24.727 Running build in Washington, D.C., USA (East) – iad1
15:30:24.728 Build machine configuration: 2 cores, 8 GB
15:30:24.771 Cloning github.com/r4rdi/Lokers (Branch: main, Commit: ff31caf)
15:30:24.773 Skipping build cache, deployment was triggered without cache.
15:30:25.118 Cloning completed: 347.000ms
15:30:25.441 Running "vercel build"
15:30:25.468 Vercel CLI 59.3.0
15:30:26.046 Installing dependencies...
15:30:46.246 
15:30:46.247 added 243 packages in 20s
15:30:46.248 
15:30:46.248 38 packages are looking for funding
15:30:46.248   run `npm fund` for details
15:30:46.249 npm warn allow-scripts 4 packages have install scripts not yet covered by allowScripts:
15:30:46.250 npm warn allow-scripts   @google/genai@2.19.0 (preinstall: echo 'preinstall: no-op')
15:30:46.250 npm warn allow-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
15:30:46.251 npm warn allow-scripts   protobufjs@7.6.6 (postinstall: node scripts/postinstall)
15:30:46.252 npm warn allow-scripts   puppeteer@25.9.0 (postinstall: node install.mjs)
15:30:46.252 npm warn allow-scripts
15:30:46.252 npm warn allow-scripts Run `npm approve-scripts --allow-scripts-pending` to review, or `npm approve-scripts <pkg>` to allow.
15:30:46.315 Running "npm run build"
15:30:46.542 
15:30:46.542 > web@0.1.0 build
15:30:46.542 > next build
15:30:46.542 
15:30:46.979 ▲ Next.js 16.3.3 (Turbopack)
15:30:47.012 ✓ Running next.config.mjs took 27ms
15:30:47.382 Attention: Next.js now collects completely anonymous telemetry regarding usage.
15:30:47.382 This information is used to shape Next.js' roadmap and prioritize features.
15:30:47.383 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
15:30:47.383 https://nextjs.org/telemetry
15:30:47.383 
15:30:47.399   Downloading swc package @next/swc-linux-x64-gnu... to /vercel/.cache/next-swc
15:30:48.541   Downloading swc package @next/swc-linux-x64-musl... to /vercel/.cache/next-swc
15:30:49.691 
15:30:49.712 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
15:30:49.712 
15:30:49.712   To migrate automatically, run:
15:30:49.713   npx @next/codemod@canary middleware-to-proxy .
15:30:49.713 
15:30:49.713   Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
15:30:49.739   Creating an optimized production build ...
15:31:11.715 
15:31:11.716 > Build error occurred
15:31:11.719 Error: Turbopack build failed with 1 error:
15:31:11.719 ./apps/web/src/styles/globals.css
15:31:11.719 Error: Error evaluating Node.js code
15:31:11.719 Error: Cannot find module '../lightningcss.linux-x64-gnu.node'
15:31:11.719 Require stack:
15:31:11.719 - /vercel/path0/apps/web/node_modules/lightningcss/node/index.js
15:31:11.720 - /vercel/path0/apps/web/node_modules/@tailwindcss/node/dist/index.js
15:31:11.721 - /vercel/path0/apps/web/node_modules/@tailwindcss/postcss/dist/index.js
15:31:11.721 - /vercel/path0/apps/web/.next/build/chunks/[root-of-the-server]__1jlzd-w._.js
15:31:11.721 - /vercel/path0/apps/web/.next/build/chunks/[turbopack]_runtime.js
15:31:11.722 - /vercel/path0/apps/web/.next/build/chunks/pool_entry-[turbopack-node]_transforms_postcss_ts_209e2m8._.js
15:31:11.722     [at Module._resolveFilename (node:internal/modules/cjs/loader:1517:15)]
15:31:11.723     [at wrapResolveFilename (node:internal/modules/cjs/loader:1071:27)]
15:31:11.723     [at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1095:10)]
15:31:11.723     [at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1122:12)]
15:31:11.724     [at Module._load (node:internal/modules/cjs/loader:1294:5)]
15:31:11.724     [at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)]
15:31:11.724     [at Module.require (node:internal/modules/cjs/loader:1617:12)]
15:31:11.725     [at require (node:internal/modules/helpers:153:16)]
15:31:11.725     [at Object.<anonymous> (/vercel/path0/apps/web/node_modules/lightningcss/node/index.js:20:12)]
15:31:11.725     [at Module._compile (node:internal/modules/cjs/loader:1872:14)]
15:31:11.726 
15:31:11.726 Import trace:
15:31:11.726   Client Component Browser:
15:31:11.727     ./apps/web/src/styles/globals.css [Client Component Browser]
15:31:11.727     ./apps/web/src/app/layout.tsx [Server Component]
15:31:11.727 
15:31:11.727 
15:31:11.728     at ignore-listed frames
15:31:11.788 npm error Lifecycle script `build` failed with error:
15:31:11.789 npm error code 1
15:31:11.790 npm error path /vercel/path0/apps/web
15:31:11.790 npm error workspace web@0.1.0
15:31:11.791 npm error location /vercel/path0/apps/web
15:31:11.791 npm error command failed
15:31:11.792 npm error command sh -c next build
15:31:11.804 Error: Command "npm run build" exited with 1