// ============================================
// MOS360 FRONTEND ENTRY
// ============================================

import "./styles/global.css";
import "./styles/foundation/interactions.css";
import "./styles/layouts/appLayout.css";

import "./styles/pages/dashboard.css";
import "./styles/pages/learn.css";
import "./styles/pages/home.css";
import "./styles/pages/courses.css";
import "./styles/pages/auth.css";
import "./styles/pages/courseDetail.css";
import "./styles/pages/verify.css";
import "./styles/pages/import.css";

import "./styles/components/states.css";
import "./styles/components/cards.css";
import "./styles/components/certificate.css";

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