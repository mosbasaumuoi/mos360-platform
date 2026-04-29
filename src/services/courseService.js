export async function getCourses(env) {
  // Tạm thời mock data (sau sẽ thay bằng KV / Sheet)

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
