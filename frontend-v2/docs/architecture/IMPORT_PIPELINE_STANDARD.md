PURPOSE

Tài liệu này định nghĩa:

canonical import flow
import ownership
validation checkpoints
hydration rules
persistence boundaries
rollback strategy

để:

import không drift runtime
future CMS obey standards
AI import không phá semantic integrity
1. OFFICIAL IMPORT FLOW
Input Source
→ Normalize
→ Canonical Contract
→ Validate
→ Semantic Hydration
→ Runtime Persistence
→ Renderer
→ Learn Runtime
2. INPUT SOURCE LAYER

SUPPORTED SOURCES:

Google Sheet
CMS
Runtime Import
Static Content
AI-generated Lessons
API

INPUT SOURCE RESPONSIBILITY: raw human-readable content.

INPUT SOURCE MUST NOT:

render runtime
mutate runtime
bypass validation
3. NORMALIZATION LAYER

PRIMARY RESPONSIBILITY: Convert inconsistent content thành canonical structure.

NORMALIZATION MUST:

trim
cast type
inject defaults
normalize ids
canonicalize lesson structure
hydrate semantic blocks

OUTPUT: canonical lesson object.

4. CANONICAL CONTRACT CHECKPOINT

EVERY lesson MUST converge về:

{
  id,
  courseId,
  title,
  description,
  blocks: [],
  quiz: []
}

NO EXCEPTIONS.

5. VALIDATION LAYER

VALIDATION MUST CHECK:

STRUCTURE
required fields
valid types
canonical naming
identity integrity
SEMANTIC INTEGRITY
supported block types
valid block contracts
runtime-safe ordering
progression continuity
COMPATIBILITY
runtime compatibility
schema compatibility
legacy compatibility
6. SEMANTIC HYDRATION LAYER

RESPONSIBILITY: Transform canonical lesson into runtime semantic structure.

HYDRATION MUST:

create semantic blocks
preserve ordering
preserve priorities
preserve lesson identity

HYDRATION MUST NOT:

render UI
mutate renderer state
7. RUNTIME PERSISTENCE LAYER

RESPONSIBILITY: Store validated runtime-safe content.

PERSISTENCE MUST STORE:

canonical lesson
import metadata
source metadata
version metadata
validation metadata
8. IMPORT REGISTRY TARGET

Every import SHOULD eventually contain:

{
  importId,
  source,
  timestamp,
  checksum,
  semanticVersion,
  validationStatus,
  compatibilityVersion
}
9. IMPORT FAILURE STRATEGY

IF validation fails:

MUST:

reject import
preserve previous runtime
log validation issue
avoid partial mutation

MUST NOT:

corrupt runtime
partially hydrate runtime
bypass validation
10. ROLLBACK STRATEGY

MOS360 SHOULD SUPPORT:

rollback previous imports
restore compatible runtime
archive failed imports
preserve runtime continuity
11. FUTURE DIRECTION

FINAL TARGET:

SEMANTIC GOVERNED IMPORT ECOSYSTEM

NOT:
RAW CONTENT INGESTION