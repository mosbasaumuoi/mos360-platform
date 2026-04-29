import { CONFIG } from ".config/config.js";
import { getHomeUI } from "./pages/home.js";

export default {
  async fetch(request) {

    const url = new URL(request.url);
    const path = url.pathname;

    let content = "";

    if (path === "/") {
      content = getHomeUI("test");
    } else {
      content = "<h1>404</h1>";
    }

    return new Response(layout(content, CONFIG), {
      headers: {
        "Content-Type": "text/html;charset=UTF-8"
      }
    });
  }
};

function layout(content, CONFIG) {

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
