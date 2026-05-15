import {
  EVENT_TYPES
}
  from "./tracking.events.js";

export async function trackEvent(
  env,
  event
) {

  const id = crypto.randomUUID();

  // ========================================
  // EVENT TYPE VALIDATION
  // ========================================

  if (

    !Object.values(
      EVENT_TYPES
    ).includes(
      event.type
    )

  ) {

    throw new Error(
      `Invalid event type: ${event.type}`
    );
  }

  const trackingEvent = {

    id,

    type:
      event.type,

    userId:
      event.userId || null,

    email:
      event.email || null,

    courseId:
      event.courseId || null,

    lessonId:
      event.lessonId || null,

    metadata:
      event.metadata || {},

    createdAt:
      Date.now()
  };

  await env.MOS360_TRACKING_KV.put(

    `event:${id}`,

    JSON.stringify(
      trackingEvent
    )
  );

  return trackingEvent;
}