function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function registerTrackingEvents(runtime) {

  runtime.events.on("track.click", async ({ source }) => {

    // 🔒 chuẩn hóa input (tránh lỗi lệch key)
    const safeSource = (source || "").trim().toLowerCase();

    if (!safeSource) {
      console.log("❌ Invalid source");
      return;
    }

    const date = getDateKey();
    const key = `track:${date}:${safeSource}`;

    try {
      const current = await runtime.env.MOS360_TRACKING.get(key);
      const count = current ? parseInt(current) : 0;

      const newCount = count + 1;

      await runtime.env.MOS360_TRACKING.put(key, String(newCount));

      console.log("TRACK:", key, "=>", newCount);

    } catch (err) {
      console.error("TRACK ERROR:", err);
    }

  });

}
