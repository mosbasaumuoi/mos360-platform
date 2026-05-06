// ============================================
// FRONTEND APPLICATION ENTRY
// Điểm khởi động frontend system
// ============================================

import { resolveRoute } from "./core/router.js";

export async function renderApp(request) {

  // ============================================
  // LẤY URL
  // ============================================

  const url = new URL(request.url);

  // ============================================
  // RESOLVE PAGE
  // ============================================

  const html = await resolveRoute(url.pathname);

  // ============================================
  // RETURN HTML
  // ============================================

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
}
