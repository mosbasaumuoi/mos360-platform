import { json }
from "../../utils/response.js";

// ============================================
// MOCK COURSES
// ============================================

const courses = [

  {
    id: "mos-excel-expert",

    title:
      "MOS Excel Expert",

    teacher:
      "MOS360",

    price:
      2900000,

    thumbnail:
      "MOS",

    status:
      "published",

    description:
      "Khóa học MOS Excel từ cơ bản tới Expert dành cho học sinh, sinh viên và nhân sự văn phòng.",

    students:
      1250,

    duration:
      "24 giờ",

    level:
      "Intermediate",

    lessons: [

      {
        id: "excel-basics",

    title:
    "Excel Basics",

    duration:
    "12:40",

    thumbnail:
    "EXCEL",

    content:
    "Học các thao tác cơ bản trong Excel."
   },

      {
        id: "functions-formulas",
  
    title:
    "Functions & Formulas",

     duration:
    "24:10",

     thumbnail:
    "FORMULA",

     content:
    "Học cách sử dụng SUM, IF, VLOOKUP..."
   },

      {
      id: "pivot-table",

      title:
      "Pivot Table",

      duration:
       "18:20",

      thumbnail:
       "PIVOT",

  content:
    "Phân tích dữ liệu bằng Pivot Table và Dashboard."
      }

    ]
  },

  {
    id: "mos-word-specialist",

    title:
      "MOS Word Specialist",

    teacher:
      "MOS360",

    price:
      1900000,

    thumbnail:
      "WORD",

    status:
      "published",

    description:
      "Khóa học MOS Word giúp bạn thành thạo định dạng văn bản và xử lý tài liệu chuyên nghiệp.",

    students:
      860,

    duration:
      "16 giờ",

    level:
      "Beginner",

    lessons: [

      {
        id: "word-basics",

        title:
          "Word Basics",

        content:
          "Giới thiệu giao diện Word và các thao tác cơ bản."
      },

      {
        id: "formatting",

        title:
          "Formatting",

        content:
          "Học cách định dạng văn bản chuyên nghiệp."
      },

      {
        id: "professional-documents",

        title:
          "Professional Documents",

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