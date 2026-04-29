import { CONFIG } from "./config/config.js";
import { layout } from "./layout.js";
import { getHomeUI } from "./pages/home.js";
import { getCoursesPage } from "./pages/courses.js";
import { getCourses } from "./services/courseService.js";
import { getCoursesPage } from "./pages/courses.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    let content = "";

    if (path === "/") {
      content = getHomeUI();
    }

    else if (path === "/courses") {

      const courses = await getCourses(env);
      content = getCoursesPage(courses);

    }

    else {
      content = "<h1>404</h1>";
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
