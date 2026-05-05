export function json(data, status = 200, options = {}) {
  const {
    cache = "no-store" // default cho API động
  } = options;

  return new Response(JSON.stringify({
    ok: status < 400,
    data: status < 400 ? data : null,
    error: status >= 400 ? data : null
  }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cache
    }
  });
}

export function error(message = "Error", status = 500) {
  return new Response(
    JSON.stringify({
      ok: false,
      data: null,
      error: message
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
