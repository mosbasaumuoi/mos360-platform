export const adminOnly = async (req, env, ctx, next) => {
  if (req.user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  return next();
};
