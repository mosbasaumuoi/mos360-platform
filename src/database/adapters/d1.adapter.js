export class D1Adapter {

  constructor(db) {
    this.db = db;
  }

  async query(sql, params = []) {

    const stmt = this.db
      .prepare(sql)
      .bind(...params);

    return stmt.all();
  }

  async first(sql, params = []) {

    const stmt = this.db
      .prepare(sql)
      .bind(...params);

    return stmt.first();
  }

  async run(sql, params = []) {

    const stmt = this.db
      .prepare(sql)
      .bind(...params);

    return stmt.run();
  }
}
