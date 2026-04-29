export async function getCourses(env) {

  // BƯỚC 1: thử lấy từ KV trước
  const data = await env.MOS_COURSES?.get("list");

  if (data) {
    return JSON.parse(data);
  }

  // fallback nếu chưa có KV
  return [
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
}
