export const use = (middlewares, handler) => {
  return async (request, env, ctx) => {

    for (const middleware of middlewares) {
      const result = await middleware(request, env, ctx);

      // ❌ bị chặn
      if (result instanceof Response) {
        return result;
      }

      // 🔁 middleware inject request mới
      if (result?.request) {
        request = result.request;
      }
    }

    // 👉 gọi handler cuối
    return handler(request, env, ctx);
  };
};
