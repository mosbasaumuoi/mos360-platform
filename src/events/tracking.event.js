function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function registerTrackingEvents(runtime) {
  runtime.events.on("track.click", async ({ source }) => {

    const date = getDateKey();

    const dailyKey = `track:${date}:${source}`;
    const totalKey = `track_total:${source}`;

    // =============================
    // 📊 DAILY COUNT
    // =============================
    const currentDaily = await runtime.env.MOS360_TRACKING.get(dailyKey);
    const dailyCount = currentDaily ? parseInt(currentDaily) : 0;

    await runtime.env.MOS360_TRACKING.put(
      dailyKey,
      String(dailyCount + 1)
    );

    // =============================
    // 🚀 TOTAL COUNT (NEW)
    // =============================
    const currentTotal = await runtime.env.MOS360_TRACKING.get(totalKey);
    const totalCount = currentTotal ? parseInt(currentTotal) : 0;

    await runtime.env.MOS360_TRACKING.put(
      totalKey,
      String(totalCount + 1)
    );

    console.log("TRACK:", source, "daily:", dailyCount + 1, "total:", totalCount + 1);
  });
}
