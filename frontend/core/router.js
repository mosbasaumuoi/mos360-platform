import { renderAnalytics } from "../views/analytics.js";

export function router() {
  const path = window.location.pathname;

  if (path === "/analytics") {
    renderAnalytics();
    return;
  }

  // default
  document.body.innerHTML = `
    <h1>MOS360</h1>

    <button onclick="goAnalytics()">Xem Analytics</button>
  `;
}

window.goAnalytics = () => {
  history.pushState({}, "", "/analytics");
  router();
};

window.onpopstate = router;
