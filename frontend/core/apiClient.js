export async function api(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
