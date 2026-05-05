export const adminOnly = async (req) => {

  if (!req.user) {
    return new Response(JSON.stringify({
      ok: false,
      message: "Unauthorized"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (req.user.role !== "admin") {
    return new Response(JSON.stringify({
      ok: false,
      message: "Forbidden"
    }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 🔥 QUAN TRỌNG
  return { request: req };
};
