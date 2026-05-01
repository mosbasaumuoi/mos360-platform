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
