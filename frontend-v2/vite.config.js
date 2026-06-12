import { defineConfig }
    from "vite";

import react
    from "@vitejs/plugin-react";

export default defineConfig({

    plugins: [

        react()
    ],

    server: {

        proxy: {

            // Proxy tất cả /api/* → Cloudflare Worker (wrangler dev)
            "/api": {

                target:
                    "http://localhost:8787",

                changeOrigin:
                    true
            }
        }
    }
});