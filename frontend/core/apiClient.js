const API_BASE = "https://mos360-platform.mos360-vn.workers.dev";

let token = null;

export function setToken(t) {
  token = t;
}

// 🔐 LOGIN
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

// 🔗 CALL API
export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    cache: "no-store",
    ...options
  });

  return res.json();
}

// 📊 TRACK
export async function track(source) {
  return fetch(`${API_BASE}/api/public/track?source=${source}`, {
    method: "GET",
    keepalive: true
  });
}

// =============================
// 🔑 LOGIN
// =============================
export async function login(email, password) {

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

// =============================
// 🚪 LOGOUT
// =============================
export function logout() {
  clearToken();
}

// =============================
// 👤 CHECK LOGIN
// =============================
export function isLoggedIn() {
  return !!getToken();
}
