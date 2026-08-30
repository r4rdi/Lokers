D:\Projects\lokers-ai> npm run build

> lokers-ai@0.1.0 build
> turbo run build

• turbo 2.10.12

   • Packages in scope: web
   • Running build in 1 packages
   • Remote caching disabled

web:build: cache miss, executing 5a72efaf145f22f6
web:build: 
web:build: > web@0.1.0 build
web:build: > next build
web:build:
web:build: ▲ Next.js 16.3.3 (Turbopack)
web:build: - Environments: .env.local
web:build: ✓ Running next.config.mjs took 25ms
web:build: 
web:build:   Creating an optimized production build ...
web:build: ✓ Compiled successfully in 973ms
web:build:   Running TypeScript ...
web:build: src/services/puppeteer.service.ts(1,23): error TS2307: Cannot find module 'puppeteer' or its corresponding type declarations.
web:build: Failed to type check.
web:build: 
web:build: npm error Lifecycle script `build` failed with error:
web:build: npm error code 1
web:build: npm error path D:\Projects\lokers-ai\apps\web
web:build: npm error workspace web@0.1.0
web:build: npm error location D:\Projects\lokers-ai\apps\web
web:build: npm error command failed
web:build: npm error command C:\WINDOWS\system32\cmd.exe /d /s /c next build
web#build:  ERROR  command (D:\Projects\lokers-ai\apps\web) D:\Program Files\nodejs\node.exe D:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js run build exited (1)

 Tasks:    0 successful, 1 total
Cached:    0 cached, 1 total
  Time:    3.212s
Failed:    web#build

 ERROR  run failed: command  exited (1)