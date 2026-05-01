export const compose = (middlewares) => {
  return async (request, env, ctx, handler) => {
    let index = -1;

    const next = async () => {
      index++;

      if (index < middlewares.length) {
        return await middlewares[index](request, env, ctx, next);
      }

      return handler(request, env, ctx);
    };

    return next();
  };
};
