import { layout } from "./layout.js";
import { getHomeUI } from "./pages/home.js";
import { getCoursesPage } from "./pages/courses.js";
import { getCourses } from "./services/courseService.js";
import { getCourseDetailPage } from "./pages/courseDetail.js";
import { getCourseBySlug } from "./services/getCourseBySlug.js";
import { getCoursesAPI } from "./api/courses.js";
import { getCourseBySlugAPI } from "./api/course.js";
import { healthCheck } from "./api/health.js";
import { seedCourses } from "./api/admin.js";


export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;
// =========================
// API ROUTES (THÊM MỚI)
// =========================

if (path === "/api/health") {
  return healthCheck();
}

if (path === "/api/courses") {
  return getCoursesAPI(env);
}

if (path.startsWith("/api/course/")) {
  const slug = path.split("/api/course/")[1];
  return getCourseBySlugAPI(env, slug);
}

if (path === "/api/seed") {
  return seedCourses(env);
}
    let content = "";

    if (path === "/") {
      content = getHomeUI();
    }

    else if (path === "/courses") {
      const courses = await getCourses(env);
      content = getCoursesPage(courses);
    }
else if (path === "/seed") {
  try {
    content = await seedCourses(env);
  } catch (err) {
    content = `
      <h1>SEED ERROR</h1>
      <pre>${err.stack}</pre>
    `;
  }
}
  else if (path.startsWith("/course/")) {

  const slug = path.split("/course/")[1];

  const course = await getCourseBySlug(env, slug);

  content = getCourseDetailPage(course);
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
