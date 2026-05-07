// ============================================
// EMPTY STATE COMPONENT
// ============================================

export function renderEmptyState(
  message = "No data"
) {

  return `

    <div class="empty-state">

      <h2>
        EMPTY
      </h2>

      <p>
        ${message}
      </p>

    </div>

  `;
}