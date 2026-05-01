import { getCourses } from "./courses.service.js";

export async function handleCourses(request) {
  const url = new URL(request.url);

  if (request.method === "GET") {
    return getCourses();
  }

  return new Response("Method not allowed", { status: 405 });
}
