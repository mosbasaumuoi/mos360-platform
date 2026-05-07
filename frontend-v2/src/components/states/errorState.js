// ============================================
// ERROR STATE COMPONENT
// ============================================

export function renderErrorState(
  message = "Something went wrong"
) {

  return `

    <div class="error-state">

      <h2>
        ERROR
      </h2>

      <p>
        ${message}
      </p>

    </div>

  `;
}