import { json }
from "../../utils/response.js";

// ============================================
// MOCK COURSES
// ============================================

const courses = [

  {
    id: 1,

    title:
      "MOS Excel Expert",

    teacher:
      "MOS360",

    price:
      2900000,

    thumbnail:
      "MOS",

    status:
      "published"
  },

  {
    id: 2,

    title:
      "MOS Word Specialist",

    teacher:
      "MOS360",

    price:
      1900000,

    thumbnail:
      "WORD",

    status:
      "published"
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
    Number(
      url.pathname.split("/").pop()
    );

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