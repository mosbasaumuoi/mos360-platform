// ============================================
// STAT CARD COMPONENT
// ============================================

export function renderStatCard(
  title,
  value,
  id
) {

  return `

    <div class="card">

      <h3>
        ${title}
      </h3>

      <p id="${id}">
        ${value}
      </p>

    </div>

  `;
}