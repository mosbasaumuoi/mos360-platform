const API_BASE = "https://mos360-platform.mos360-vn.workers.dev";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store",
    ...options
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}

export async function track(source) {
  return fetch(`${API_BASE}/api/public/track?source=${source}`, {
    method: "GET",
    keepalive: true
  });
}
