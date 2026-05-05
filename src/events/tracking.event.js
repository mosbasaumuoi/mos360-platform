function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // ví dụ: 2026-05-05
}

export function registerTrackingEvents(runtime) {

  console.log("⚡ registerTrackingEvents INIT"); // check có đăng ký chưa

  runtime.events.on("track.click", async ({ source }) => {

    try {
      const date = getDateKey();

      const key = `track:${date}:${source}`;

      console.log("👉 EVENT RECEIVED:", source);
      console.log("👉 KV KEY:", key);

      const current = await runtime.env.MOS360_TRACKING.get(key);

      console.log("👉 CURRENT VALUE:", current);

      const count = current ? parseInt(current) : 0;

      const newCount = count + 1;

      await runtime.env.MOS360_TRACKING.put(key, String(newCount));

      console.log("🔥 UPDATED:", key, newCount);

    } catch (err) {
      console.error("❌ TRACK ERROR:", err);
    }

  });

}
