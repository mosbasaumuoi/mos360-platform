export async function seedCourses(env) {

  const courses = [
    {
      id: "excel-365",
      name: "MOS Excel 365",
      price: "400.000đ",
      lessons: 35
    },
    {
      id: "word-365",
      name: "MOS Word 365",
      price: "350.000đ",
      lessons: 30
    }
  ];

  await env.MOS_COURSES.put(
    "list",
    JSON.stringify(courses)
  );

  return "seed done";
}
