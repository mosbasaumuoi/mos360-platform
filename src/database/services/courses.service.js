import { createDB }
  from "../db.js";

import { CoursesRepository }
  from "../repositories/courses.repo.js";

export class CoursesService {

  constructor(env) {

    const db = createDB(env);

    this.repo =
      new CoursesRepository(db);
  }

  async getCourses() {

    return this.repo.getAllCourses();
  }

  async getCourse(slug) {

    return this.repo.getCourseBySlug(slug);
  }
}
