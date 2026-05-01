import { json } from "../utils/response.js";

export function healthCheck() {
  return json({
    status: "ok",
    app: "MOS360",
    time: Date.now()
  });
}
