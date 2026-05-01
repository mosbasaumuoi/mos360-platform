import { adminGuard } from "../auth/admin.guard.js";

export const handleAdmin = async (request, env, ctx) => {
  // 🛡️ check quyền tại đây (KHÔNG phải router)
  const guard = await adminGuard(request);

  if (guard) return guard;

  return new Response(
    JSON.stringify({
      message: "Welcome Admin",
      user: request.user
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
