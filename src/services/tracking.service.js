export async function trackClick(runtime, source) {

  const { env, cache } = runtime;

  // ❗ không cache tracking
  const current = await env.MOS360_TRACKING.get(source);
  const count = current ? parseInt(current) : 0;

  const newCount = count + 1;

  await env.MOS360_TRACKING.put(source, String(newCount));

  return {
    source,
    count: newCount
  };
}
