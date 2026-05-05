import { api } from "../core/apiClient.js";

export async function renderAnalytics() {

  const res = await api("/admin/analytics");

  if (!res.ok) {
    document.body.innerHTML = `<h2>Lỗi: ${res.message}</h2>`;
    return;
  }

  const data = res.data;

  document.body.innerHTML = `
    <h1>📊 MOS360 Analytics</h1>

    <div>Zalo: ${data.zalo}</div>
    <div>Facebook: ${data.facebook}</div>
    <div>Messenger: ${data.messenger}</div>

    <button onclick="location.reload()">Refresh</button>
  `;
}
