<!DOCTYPE html>
<html>

<head>
    <meta charSet="utf-8" data-next-head="" />
    <meta name="viewport" content="width=device-width" data-next-head="" />
    <style data-next-hide-fouc="true">
        body {
            display: none
        }
    </style><noscript data-next-hide-fouc="true">
        <style>
            body {
                display: block
            }
        </style>
    </noscript><noscript data-n-css=""></noscript>
    <script src="/_next/static/chunks/node_modules_next_dist_compiled_14ibvna._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_dist_shared_lib_196_nl_._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_dist_client_16lnmlo._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_dist_1gdrd03._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_app_0yrdk3r.js" defer=""></script>
    <script src="/_next/static/chunks/%5Bnext%5D_entry_page-loader_ts_0z3haqk._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_react-dom_0kla17-._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_10e2-xo._.js" defer=""></script>
    <script src="/_next/static/chunks/%5Broot-of-the-server%5D__0l4r13l._.js" defer=""></script>
    <script src="/_next/static/chunks/pages__app_0du2_q-._.js" defer=""></script>
    <script src="/_next/static/chunks/turbopack-pages__app_0e7z0ug._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_dist_shared_lib_1vsvqbg._.js" defer=""></script>
    <script src="/_next/static/chunks/node_modules_next_dist_1atto1n._.js" defer=""></script>
    <script src="/_next/static/chunks/%5Bnext%5D_entry_page-loader_ts_1aoli7m._.js" defer=""></script>
    <script src="/_next/static/chunks/%5Broot-of-the-server%5D__02sxxph._.js" defer=""></script>
    <script src="/_next/static/chunks/pages__error_0du2_q-._.js" defer=""></script>
    <script src="/_next/static/chunks/turbopack-pages__error_1g3qll_._.js" defer=""></script>
    <script src="/_next/static/development/_buildManifest.js" defer=""></script>
    <script src="/_next/static/development/_ssgManifest.js" defer=""></script>
    <script src="/_next/static/development/_clientMiddlewareManifest.js" defer=""></script><noscript
        id="__next_css__DO_NOT_USE__"></noscript>
</head>

<body>
    <div id="__next"></div>
    <script id="__NEXT_DATA__" type="application/json">
        {"props":{"pageProps":{"statusCode":500,"hostname":"localhost"}},"page":"/_error","query":{},"buildId":"development","isFallback":false,"err":{"name":"Error","source":"server","message":"./src/app/api/cv/parse/route.ts:5:1\nError: Module not found: Can't resolve 'pdf-parse'\n  3 | import { generateCVEmbedding } from \"@/services/embedding.service\";\n  4 | import { supabase } from \"@/lib/supabase\";\n\u003e 5 | import pdfParse from \"pdf-parse\";\n    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  6 |\n  7 | // Handler GET untuk pengujian browser\n  8 | export async function GET() {\n\n\n\nhttps://nextjs.org/docs/messages/module-not-found\n\n","stack":"Error: ./src/app/api/cv/parse/route.ts:5:1\n\u001b[1m\u001b[31mError\u001b[39m: \u001b[1m\u001b[31mModule not found\u001b[39m\u001b[22m\u001b[1m: Can't resolve \u001b[32m'pdf-parse'\u001b[39m\u001b[22m\n  \u001b[90m3 |\u001b[0m \u001b[36mimport\u001b[0m { generateCVEmbedding } \u001b[36mfrom\u001b[0m \u001b[32m\"@/services/embedding.service\"\u001b[0m;\n  \u001b[90m4 |\u001b[0m \u001b[36mimport\u001b[0m { supabase } \u001b[36mfrom\u001b[0m \u001b[32m\"@/lib/supabase\"\u001b[0m;\n\u001b[31m\u001b[1m\u003e\u001b[0m \u001b[90m5 |\u001b[0m \u001b[36mimport\u001b[0m pdfParse \u001b[36mfrom\u001b[0m \u001b[32m\"pdf-parse\"\u001b[0m;\n  \u001b[90m  |\u001b[0m \u001b[31m\u001b[1m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\u001b[0m\n  \u001b[90m6 |\u001b[0m\n  \u001b[90m7 |\u001b[0m \u001b[90m// Handler GET untuk pengujian browser\u001b[0m\n  \u001b[90m8 |\u001b[0m \u001b[36mexport\u001b[0m \u001b[36masync\u001b[0m \u001b[36mfunction\u001b[0m \u001b[33mGET\u001b[0m() {\n\n\n\nhttps://nextjs.org/docs/messages/module-not-found\n\n\n    at Object.getCompilationErrors (D:\\Projects\\lokers-ai\\apps\\web\\node_modules\\next\\dist\\server\\dev\\hot-reloader-turbopack.js:1417:59)\n    at DevBundlerService.getCompilationError (D:\\Projects\\lokers-ai\\apps\\web\\node_modules\\next\\dist\\server\\lib\\dev-bundler-service.js:59:55)\n    at DevServer.getCompilationError (D:\\Projects\\lokers-ai\\apps\\web\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:754:42)\n    at DevServer.findPageComponents (D:\\Projects\\lokers-ai\\apps\\web\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:724:43)\n    at async DevServer.renderErrorToResponseImpl (D:\\Projects\\lokers-ai\\apps\\web\\node_modules\\next\\dist\\server\\base-server.js:1828:26)","__NEXT_ERROR_CODE":"E394"},"gip":true,"scriptLoader":[]}
    </script>
</body>

</html>