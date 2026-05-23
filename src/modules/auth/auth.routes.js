import { json } from "../../utils/response.js";
import {
  login,
  verifyToken
}
from "./auth.service.js";

export async function handleLogin(
  request,
  env
) {

  try {

    // ======================================
    // BODY
    // ======================================

    const body =
      await request.json();
   
    // ======================================
    // LOGIN
    // ======================================

    const result =
      await login(
        body.email,
        body.password,
        env
      );

    // ======================================
    // INVALID
    // ======================================

    if (!result) {

      return json(
        "Invalid credentials",
        401
      );
    }

    // ======================================
    // SUCCESS
    // ======================================

    return json(result);

  } catch (error) {

    console.error(
      "[LOGIN ERROR]",
      error
    );

    return json(
      error.message ||
      "Internal Error",
      500
    );
  }
}

export async function handleMe(
  request,
  env
) {

  const auth =
    request.headers.get(
      "Authorization"
    );

  if (!auth)
    return json(
      "No token",
      401
    );

  const token =
    auth.replace(
      "Bearer ",
      ""
    );

  const user =
    await verifyToken(
      token,
      env
    );

  if (!user)
    return json(
      "Invalid token",
      401
    );

  return json({ user });
}
