export async function adminOnly(req) {
  if (!req.user || req.user.role !== "admin") {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Forbidden"
      }),
      { status: 403 }
    );
  }

  return true;
}
