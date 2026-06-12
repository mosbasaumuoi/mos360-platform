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

            "/api": {

                target:
                    "https://mos360-platform.mos360-vn.workers.dev",

                changeOrigin:
                    true,

                secure:
                    true
            }
        }
    }
});