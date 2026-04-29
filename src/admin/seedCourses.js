export async function seedCourses(env) {

  if (!env.MOS_COURSES) {
    return "MOS_COURSES KV chưa được bind";
  }

  const courses = [
    {
      id: "excel-365",
      name: "MOS Excel 365",
      price: "400.000đ",
      lessons: 35
    }
  ];

  await env.MOS_COURSES.put("list", JSON.stringify(courses));

  return "seed done";
}
