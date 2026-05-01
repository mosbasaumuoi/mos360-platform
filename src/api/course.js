import { json } from "../utils/response.js";

export async function getCourseBySlugAPI(env, slug) {
  const raw = await env.MOS_COURSES.get("courses");
  const courses = raw ? JSON.parse(raw) : [];

  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return json({
      success: false,
      message: "Course not found"
    }, 404);
  }

  return json({
    success: true,
    data: course
  });
}
