import {
  json
}
  from "../../utils/response.js";

import {
  trackEvent
}
  from "../tracking/tracking.service.js";

import {
  EVENT_TYPES
}
  from "../tracking/tracking.events.js";

export async function handlePublic(

  request,
  env

) {

  const url =

    new URL(request.url);

  const source =

    url.searchParams.get(
      "source"
    );

  if (!source) {

    return json(
      "Missing source",
      400
    );
  }

  // ======================================
  // SOURCE WHITELIST
  // ======================================

  const allowedSources = [

    "homepage",
    "landing",
    "certificate",
    "social",
    "campaign"

  ];

  if (

    !allowedSources.includes(
      source
    )

  ) {

    return json(
      "Invalid source",
      400
    );
  }

  // ======================================
  // TRACK
  // ======================================

  await trackEvent(

    env,

    {

      type:
        EVENT_TYPES.CERTIFICATE_VERIFIED,

      metadata: {

        source
      }
    }
  );

  return json({

    ok: true,

    source
  });
}