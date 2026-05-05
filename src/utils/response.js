export function json(data = null, status = 200) {
  return new Response(
    JSON.stringify({
      ok: status >= 200 && status < 300,
      data,
      error: status >= 400 ? data : null
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
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
