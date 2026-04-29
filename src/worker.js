import { CONFIG } from "./config";
import { getHomeUI } from "./pages/home.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    let content = "";

    if (path === "/") {

      content = getHomeUI("test");

    } else {

      content = "<h1>404</h1>";

    }

    return new Response(layout(content), {
      headers: {
        "Content-Type": "text/html;charset=UTF-8"
      }
    });
  }
};

function layout(content) {

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${CONFIG.TITLE}</title>
  </head>

  <body>

    ${content}

  </body>
  </html>
  `;
}
