import { api } from "../core/apiClient.js";
import { setState } from "../core/state.js";

export async function renderHome() {
  const data = await api("/courses");

  setState({ courses: data });

  document.body.innerHTML = `
    <h1>MOS360 Home</h1>
    <div id="course-list"></div>
  `;

  const container = document.getElementById("course-list");

  container.innerHTML = data.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
    </div>
  `).join("");
}
