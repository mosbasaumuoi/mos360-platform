import { api, track } from "../core/apiClient.js";
import { setState } from "../core/state.js";

export async function renderHome() {
  const res = await api("/public/courses");

  const courses = res.data;

  setState({ courses });

  document.body.innerHTML = `
    <h1>MOS360 Home</h1>
    <div id="course-list"></div>
  `;

  const container = document.getElementById("course-list");

  container.innerHTML = courses.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.description}</p>

      <button onclick="handleClick('zalo')">
        Đăng ký
      </button>
    </div>
  `).join("");
}

// 🔥 GLOBAL FUNCTION
window.handleClick = async function(source) {
  await track(source);
  window.open("https://zalo.me/0912888360", "_blank");
};
