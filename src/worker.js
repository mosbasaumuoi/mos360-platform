import { CONFIG } from "./config/config.js";
import { layout } from "./layout.js";
import { getHomeUI } from "./pages/home.js";
import { getCoursesPage } from "./pages/courses.js";

export default {
  async fetch(request) {

    const url = new URL(request.url);
    const path = url.pathname;

    let content = "";

    if (path === "/") {
      content = getHomeUI();
    }

    else if (path === "/courses") {
      content = getCoursesPage();
    }

    else {
      content = "<h1>404 - Không tìm thấy trang</h1>";
    }

    return new Response(layout(content), {
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
