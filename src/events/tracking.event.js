function getDateKey() {
  return new Date().toLocaleDateString("en-CA");
}

export async function trackClick(runtime, source) {

  const safeSource = (source || "").trim().toLowerCase();

  if (!safeSource) return;

  const date = getDateKey();

  const key = `track:${date}:${safeSource}`;

  const current = await runtime.env.MOS360_TRACKING_KV.get(key);

  const count = current ? parseInt(current) : 0;

  const newCount = count + 1;

  await runtime.env.MOS360_TRACKING_KV.put(
    key,
    String(newCount)
  );

  console.log("TRACK:", key, "=>", newCount);
}
