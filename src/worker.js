import { layout } from "./layout.js";
import { getHomeUI } from "./pages/home.js";
import { getCoursesPage } from "./pages/courses.js";
import { getCourses } from "./services/courseService.js";
import { seedCourses } from "./admin/seedCourses.js";

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
      else if (path === "/seed") {
  content = await seedCourses(env);
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
