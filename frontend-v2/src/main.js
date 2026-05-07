// ============================================
// MOS360 FRONTEND ENTRY
// ============================================

import "./styles/global.css";

import {
  loadRoute
}
from "./core/router";

import {
  appContext
}
from "./core/appContext.js";

import {
  getCurrentUser
}
from "./services/auth.js";

// ============================================
// START APP
// ============================================

async function bootstrap() {

  appContext.user =
    await getCurrentUser();

  loadRoute();
}

bootstrap();