import { json } from "../../utils/response.js";

export async function handleCourses(request, env) {
  const list = await env.MOS360_DATA.get("courses");

  return json(list ? JSON.parse(list) : []);
}
