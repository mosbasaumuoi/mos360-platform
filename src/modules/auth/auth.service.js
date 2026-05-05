import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();

export async function login(email, password, env) {
  // DEMO: hardcode 1 user admin
  if (email !== "admin@mos360.vn" || password !== "123456") {
    return null;
  }

  const token = await new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(encoder.encode(env.JWT_SECRET));

  return { token };
}

export async function verifyToken(token, env) {
  try {
    const { payload } = await jwtVerify(
      token,
      encoder.encode(env.JWT_SECRET)
    );
    return payload;
  } catch {
    return null;
  }
}
