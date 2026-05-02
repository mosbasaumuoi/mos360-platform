import { json } from "../../utils/response.js";

export async function handleCourses(request, env, ctx) {

  // ⚡ TEST DATA TRỰC TIẾP (KHÔNG DB)
  const data = [
    {
      id: 1,
      title: "MOS Word 2019",
      description: "Học Word từ cơ bản đến nâng cao"
    },
    {
      id: 2,
      title: "MOS Excel 2019",
      description: "Thực hành Excel thực chiến"
    }
  ];

  return json(data);
}
