import { api } from "../core/apiClient.js";

export async function renderAnalytics() {

  document.body.innerHTML = `
    <h1>📊 Analytics Dashboard</h1>
    <div id="summary">Loading...</div>
    <canvas id="chart" width="400" height="200"></canvas>
  `;

  try {
    const res = await fetch("/debug/analytics");
    const data = await res.json();

    const { zalo, facebook, messenger } = data.data;
    const total = data.total;

    // summary
    document.getElementById("summary").innerHTML = `
      <p>Zalo: ${zalo}</p>
      <p>Facebook: ${facebook}</p>
      <p>Messenger: ${messenger}</p>
      <hr/>
      <strong>Total: ${total}</strong>
    `;

    // simple chart (canvas)
    const ctx = document.getElementById("chart").getContext("2d");

    const values = [zalo, facebook, messenger];
    const labels = ["Zalo", "Facebook", "Messenger"];

    const max = Math.max(...values, 1);

    values.forEach((v, i) => {
      const height = (v / max) * 150;
      const x = 50 + i * 100;

      ctx.fillRect(x, 180 - height, 40, height);
      ctx.fillText(labels[i], x, 195);
      ctx.fillText(v, x, 170 - height);
    });

  } catch (err) {
    document.getElementById("summary").innerText = "Lỗi load analytics";
  }
}
