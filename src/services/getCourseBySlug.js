export async function getCourseBySlug(env, slug) {

  const raw = await env.MOS_COURSES.get("courses");

  if (!raw) {
    return null;
  }

  const courses = JSON.parse(raw);

  return courses.find(course => course.slug === slug);
}
