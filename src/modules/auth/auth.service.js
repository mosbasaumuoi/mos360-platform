import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode("MOS360_SECRET_KEY");

const fakeUsers = [
  {
    id: 1,
    email: "admin@mos360.vn",
    password: "123456",
    role: "admin"
  }
];
export async function createToken(user) {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    return null;
  }
}
export async function login(email, password) {
  const user = fakeUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) return null;

  const token = await createToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}
