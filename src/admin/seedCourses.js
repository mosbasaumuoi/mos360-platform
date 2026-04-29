export async function seedCourses(env) {
  const data = [
    { id: 1, title: "MOS Excel", price: 400000 },
    { id: 2, title: "MOS Word", price: 400000 }
  ];

  if (!env.MOS_KV) {
    return "❌ KV chưa bind MOS_KV";
  }

  await env.MOS_KV.put("courses", JSON.stringify(data));

  return `
    <h1>Seed OK</h1>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  `;
}
