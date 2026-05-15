import { SignJWT, jwtVerify } from "jose";

import {
  createUser,
  getUserByEmail
}
  from "../users/users.service.js";

import {
  trackEvent
}
  from "../tracking/tracking.service.js";

import {
  createLoginSuccessEvent
}
  from "../tracking/tracking.helpers.js";

const encoder = new TextEncoder();

// ============================================
// LOGIN
// ============================================

export async function login(
  email,
  password,
  env
) {

  // ========================================
  // DEMO AUTH
  // ========================================

  if (
    email !== "admin@mos360.vn"
    ||
    password !== "123456"
  ) {

    return null;
  }

  // ========================================
  // ENSURE USER EXISTS
  // ========================================

  let user =

    await getUserByEmail(
      env,
      email
    );

  if (!user) {

    user = await createUser(

      env,

      {
        email,

        role: "admin",

        name: "MOS360 Admin"
      }

    );
  }

  // ========================================
  // JWT
  // ========================================

  const token =

    await new SignJWT({

      role:
        user.role,

      email:
        user.email,

      userId:
        user.id

    })

      .setProtectedHeader({
        alg: "HS256"
      })

      .setExpirationTime("2h")

      .sign(
        encoder.encode(
          env.JWT_SECRET
        )
      );

  await trackEvent(

    env,

    createLoginSuccessEvent({

      userId:
        user.id,

      email:
        user.email

    })

  );

  return {

    token,

    user
  };
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
