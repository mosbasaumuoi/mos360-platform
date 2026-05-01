export async function getCourses(env) {

  const data = await env.MOS_COURSES.get("courses");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}
