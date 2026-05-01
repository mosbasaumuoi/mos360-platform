export async function use(request, env, ctx, middlewares = []) {
  for (const middleware of middlewares) {
    const result = await middleware(request, env, ctx);

    // middleware chặn request
    if (result instanceof Response) {
      return result;
    }

    // middleware inject request mới
    if (result?.request) {
      request = result.request;
    }
  }

  return { request };
}
