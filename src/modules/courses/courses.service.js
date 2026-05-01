import { json } from "../../utils/response.js";

const fakeDB = [
  { id: 1, title: "MOS Basic", description: "Intro course" },
  { id: 2, title: "MOS Advanced", description: "Deep system" }
];

export function getCourses() {
  return json(fakeDB);
}
