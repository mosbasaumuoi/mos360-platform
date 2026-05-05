import { SignJWT, jwtVerify } from "jose";

export async function login(email, password, env) {

  // demo user
  if (email !== "admin@mos360.vn" || password !== "123456") {
    return null;
  }

  const SECRET = new TextEncoder().encode(env.JWT_SECRET);

  const token = await new SignJWT({
    id: 1,
    email,
    role: "admin"
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(SECRET);

  return {
    token,
    user: {
      id: 1,
      email,
      role: "admin"
    }
  };
}

export async function verifyToken(token, env) {

  try {
    const SECRET = new TextEncoder().encode(env.JWT_SECRET);

    const { payload } = await jwtVerify(token, SECRET);

    return payload;

  } catch (err) {
    return null;
  }
}
