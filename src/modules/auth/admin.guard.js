import { authMiddleware } from "./auth.middleware.js";

export const adminGuard = async (request) => {
  const auth = await authMiddleware(request);

  if (!auth.ok) {
    return new Response(JSON.stringify(auth), { status: 401 });
  }

  if (auth.user.role !== "admin") {
    return new Response(
      JSON.stringify({ error: "Forbidden - Admin only" }),
      { status: 403 }
    );
  }

  // pass through
  request.user = auth.user;
  return null;
};
