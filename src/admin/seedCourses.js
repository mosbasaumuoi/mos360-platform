export async function seedCourses(env) {

  const courses = [

    {
      title: "MOS Word 365",
      description: "Khóa học Word từ cơ bản tới nâng cao",
      url: "https://example.com/word"
    },

    {
      title: "MOS Excel 365",
      description: "Khóa học Excel thực chiến",
      url: "https://example.com/excel"
    }

  ];

  await env.MOS_COURSES.put(
    "courses",
    JSON.stringify(courses)
  );

  return "Seed done";
}
