export class CoursesRepository {

  constructor(db) {
    this.db = db;
  }

  async getAllCourses() {

    return this.db.query(`
      SELECT * FROM courses
      ORDER BY created_at DESC
    `);
  }

  async getCourseBySlug(slug) {

    return this.db.first(`
      SELECT * FROM courses
      WHERE slug = ?
    `, [slug]);
  }
}
