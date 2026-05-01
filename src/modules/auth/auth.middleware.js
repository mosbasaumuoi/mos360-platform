export const use = (middlewares, handler) => {
  const runner = compose(middlewares);

  return (request, env, ctx) =>
    runner(request, env, ctx, handler);
};
