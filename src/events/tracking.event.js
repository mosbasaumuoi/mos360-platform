function getDateKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // 2026-05-04
}

export function registerTrackingEvents(runtime) {

  runtime.events.on("track.click", async ({ source }) => {

    const date = getDateKey();

    const key = `track:${date}:${source}`;

    const current = await runtime.env.MOS360_TRACKING.get(key);
    const count = current ? parseInt(current) : 0;

    const newCount = count + 1;

    await runtime.env.MOS360_TRACKING.put(key, String(newCount));

    console.log("TRACK:", key, newCount);
  });

}
