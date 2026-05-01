import { use } from "../../gateway/middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../auth/admin.guard.js";

const adminHandler = async (req) => {
  return new Response(
    JSON.stringify({
      message: "Admin OK",
      user: req.user,
    })
  );
};

// 🔥 CHAIN APPLY
export const handleAdmin = use(
  [authMiddleware, adminOnly],
  adminHandler
);
