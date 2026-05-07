// ============================================
// HOME PAGE
// ============================================

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

export async function renderHomePage() {

  const content = `

    <div class="page">

      <h1>
        MOS360 PLATFORM
      </h1>

      <p>
        Home Page
      </p>

    </div>

  `;

  document.querySelector("#app")
    .innerHTML =
      renderAppLayout(content);
}