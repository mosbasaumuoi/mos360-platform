import { json } from "../utils/response.js";

export async function seedCourses(env) {

  const courses = [
    {
      slug: "mos-word-365",
      title: "MOS Word 365",
      description: "Word từ cơ bản đến nâng cao",
      price: 499000,
      lessons: 30
    },
    {
      slug: "mos-excel-365",
      title: "MOS Excel 365",
      description: "Excel thực chiến",
      price: 599000,
      lessons: 40
    }
  ];

  await env.MOS_COURSES.put("courses", JSON.stringify(courses));

  return json({
    success: true,
    message: "Seed completed",
    count: courses.length
  });
}
