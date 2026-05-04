export async function trackClick(runtime, source) {

  await runtime.events.emit("track.click", {
    source
  });

  return {
    source
  };
}
