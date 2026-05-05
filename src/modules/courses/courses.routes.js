import { json } from "../../utils/response.js";

export async function handleCourses(request, env) {
  const list = await env.MOS360_COURSES_KV.get("courses");

  return json(list ? JSON.parse(list) : []);
}
