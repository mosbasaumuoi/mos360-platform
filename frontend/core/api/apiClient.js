// ============================================
// API CLIENT
// Frontend gọi backend tập trung
// ============================================

const API_BASE = "/api";

// ============================================
// GET REQUEST
// ============================================

export async function apiGet(path) {

  try {

    const response = await fetch(
      `${API_BASE}${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // ========================================
    // RESPONSE JSON
    // ========================================

    const result = await response.json();

    return result;

  } catch (error) {

    console.error(
      "[API GET ERROR]",
      error
    );

    return {
      ok: false,
      error: "Network Error"
    };
  }
}
