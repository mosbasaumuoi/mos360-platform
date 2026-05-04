export function registerTrackingEvents(runtime) {

  runtime.events.on("track.click", async ({ source }) => {

    const current = await runtime.env.MOS360_TRACKING.get(source);
    const count = current ? parseInt(current) : 0;

    const newCount = count + 1;

    await runtime.env.MOS360_TRACKING.put(source, String(newCount));

    console.log("TRACK EVENT:", source, newCount);
  });

}
