import { json }
  from "../../utils/response.js";

import { CoursesService }
  from "../../database/services/courses.service.js";

export async function handleCourses(
  request,
  env
) {

  const service =
    new CoursesService(env);

  const courses =
    await service.getCourses();

  return json(courses);
}
