import { json } from "../utils/response.js";

export async function getCoursesAPI(env) {
  const raw = await env.MOS_COURSES.get("courses");

  const courses = raw ? JSON.parse(raw) : [];

  return json({
    success: true,
    data: courses,
    total: courses.length
  });
}
