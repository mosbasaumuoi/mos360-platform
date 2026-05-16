import { json }
from "../../utils/response.js";

// ============================================
// MOCK COURSES
// ============================================

const courses = [

  {
    id: "mos-excel-expert",

    slug: "mos-excel-expert",

    category: "excel",

    xpReward: 500,

    title: "MOS Excel Expert",

    teacher: "MOS360",

    price: 2900000,

    thumbnail: "MOS",

    status: "published",

    description:
      "Khóa học MOS Excel từ cơ bản tới Expert dành cho học sinh, sinh viên và nhân sự văn phòng.",

    students: 1250,

    duration: "24 giờ",

    level: "Intermediate",

    lessons: [

      {
        id: "excel-basics",

        courseId: "mos-excel-expert",

        slug: "excel-basics",

        title: "Excel Basics",

        description:
          "Học các thao tác cơ bản trong Excel.",

        type: "video",

        duration: 12,

        xpReward: 20,

        order: 1,

        thumbnail: "EXCEL",

        content:
          "Học các thao tác cơ bản trong Excel."
      },

      {
        id: "functions-formulas",

        courseId: "mos-excel-expert",

        slug: "functions-formulas",

        title: "Functions & Formulas",

        description:
          "Học cách sử dụng SUM, IF, VLOOKUP.",

        type: "video",

        duration: 24,

        xpReward: 25,

        order: 2,

        thumbnail: "FORMULA",

        content:
          "Học cách sử dụng SUM, IF, VLOOKUP."
      },

      {
        id: "pivot-table",

        courseId: "mos-excel-expert",

        slug: "pivot-table",

        title: "Pivot Table",

        description:
          "Phân tích dữ liệu bằng Pivot Table.",

        type: "video",

        duration: 18,

        xpReward: 30,

        order: 3,

        thumbnail: "PIVOT",

        content:
          "Phân tích dữ liệu bằng Pivot Table và Dashboard."
      }

    ]
  },

  {
    id: "mos-word-specialist",

    slug: "mos-word-specialist",

    category: "word",

    xpReward: 400,

    title: "MOS Word Specialist",

    teacher: "MOS360",

    price: 1900000,

    thumbnail: "WORD",

    status: "published",

    description:
      "Khóa học MOS Word giúp thành thạo định dạng văn bản và xử lý tài liệu chuyên nghiệp.",

    students: 860,

    duration: "16 giờ",

    level: "Beginner",

    lessons: [

      {
        id: "word-basics",

        courseId: "mos-word-specialist",

        slug: "word-basics",

        title: "Word Basics",

        description:
          "Giới thiệu giao diện Word và thao tác cơ bản.",

        type: "video",

        duration: 10,

        xpReward: 20,

        order: 1,

        thumbnail: "WORD",

        content:
          "Giới thiệu giao diện Word và thao tác cơ bản."
      },

      {
        id: "word-formatting",

        courseId: "mos-word-specialist",

        slug: "word-formatting",

        title: "Formatting",

        description:
          "Học cách định dạng văn bản chuyên nghiệp.",

        type: "video",

        duration: 15,

        xpReward: 25,

        order: 2,

        thumbnail: "FORMAT",

        content:
          "Học cách định dạng văn bản chuyên nghiệp."
      },

      {
        id: "professional-documents",

        courseId: "mos-word-specialist",

        slug: "professional-documents",

        title: "Professional Documents",

        description:
          "Xây dựng tài liệu chuyên nghiệp cho công việc.",

        type: "video",

        duration: 22,

        xpReward: 30,

        order: 3,

        thumbnail: "DOC",

        content:
          "Xây dựng tài liệu chuyên nghiệp cho công việc."
      }

    ]
  }

];
    
// ============================================
// GET COURSES
// ============================================

export async function handleCourses() {

  return json(
    courses
  );
}

// ============================================
// GET COURSE DETAIL
// ============================================

export async function handleCourseDetail(
  request
) {

  const url =
    new URL(request.url);

  const id =
    url.pathname
      .split("/")
      .pop();

  const course =
    courses.find(
      item => item.id === id
    );

  if (!course) {

    return json(
      "Course not found",
      404
    );
  }

  return json(course);
}

// ============================================
// GET LESSON DETAIL
// ============================================

export async function handleLessonDetail(
  request
) {

  const url =
    new URL(request.url);

  const parts =
    url.pathname.split("/");

  const courseId =
    parts[3];

  const lessonId =
    parts[4];

  const course =
    courses.find(
      item =>
        item.id === courseId
    );

  if (!course) {

    return json(
      "Course not found",
      404
    );
  }

  const lesson =
    course.lessons.find(
      item =>
        item.id === lessonId
    );

  if (!lesson) {

    return json(
      "Lesson not found",
      404
    );
  }

  return json({

    courseId,

    courseTitle:
      course.title,

    lesson

  });
}