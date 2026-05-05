const API = "/api/admin/analytics";

// 🔐 token (bạn paste từ login)
const token = localStorage.getItem("token");

async function load() {
  const res = await fetch(API, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const json = await res.json();

  if (!json.ok) return;

  document.getElementById("zalo").innerText = json.data.zalo;
  document.getElementById("facebook").innerText = json.data.facebook;
  document.getElementById("messenger").innerText = json.data.messenger;
}

// 🔁 auto refresh
setInterval(load, 2000);

load();
