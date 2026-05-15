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
// GLOBAL RUNTIME ERROR SHIELD
// ============================================

window.onerror = (

  message,
  source,
  line,
  column,
  error

) => {

  console.error(

    "[MOS360:RUNTIME_ERROR]",

    {
      message,
      source,
      line,
      column,
      error
    }

  );
};

// ============================================
// UNHANDLED PROMISE REJECTION
// ============================================

window.onunhandledrejection = (
  event
) => {

  console.error(

    "[MOS360:UNHANDLED_REJECTION]",

    event.reason
  );
};

// ============================================
// START APP
// ============================================

async function bootstrap() {

  appContext.user =
    await getCurrentUser();

  loadRoute();
}

bootstrap();