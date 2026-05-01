export async function handleAuth(request) {
  if (request.method === "POST") {
    return new Response("Login endpoint");
  }

  return new Response("Auth API");
}
