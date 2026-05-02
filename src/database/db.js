import { D1Adapter }
  from "./adapters/d1.adapter.js";

export function createDB(env) {

  return new D1Adapter(env.DB);
}
