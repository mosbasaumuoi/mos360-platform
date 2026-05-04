import { renderHome } from "../views/home.js";
import { renderCourse } from "../views/course.js";
import { renderAdmin } from "../views/admin.js";
import { renderAnalytics } from "../views/analytics.js";

const routes = {
  "/": renderHome,
  "/course": renderCourse,
  "/admin": renderAdmin,
  "/admin/analytics": renderAnalytics
};

export function router() {
  const path = window.location.pathname;

  const view = routes[path] || renderHome;
  view();
}

window.onpopstate = router;
