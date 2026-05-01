export async function seedCourses(env) {

  const courses = [

    {
      slug: "mos-word-365",
      title: "MOS Word 365",
      description: "Khóa học Word từ cơ bản tới nâng cao",
      url: "https://example.com/word"
    },

    {
      slug: "mos-excel-365",
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
