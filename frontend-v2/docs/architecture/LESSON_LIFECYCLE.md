PURPOSE

Tài liệu này định nghĩa:

lesson lifecycle states
lesson mutation flow
runtime readiness states
archive/deprecation policy

để:

future CMS không chaos
runtime evolution an toàn
lesson governance rõ ràng
AI mutation có kiểm soát

1. OFFICIAL LESSON LIFECYCLE
DRAFT
→ IMPORTED
→ NORMALIZED
→ VALIDATED
→ RUNTIME_READY
→ ACTIVE
→ DEPRECATED
→ ARCHIVED
2. DRAFT

STATUS: Human editable state.

SOURCE:

Google Sheet
CMS
AI draft
manual creation

DRAFT MUST NOT:

render production runtime
bypass validation
3. IMPORTED

STATUS: Raw imported lesson.

RESPONSIBILITY: Capture imported content before normalization.

IMPORTED MUST:

preserve source data
preserve import metadata
4. NORMALIZED

STATUS: Canonicalized lesson state.

NORMALIZED MUST:

follow canonical contracts
hydrate semantic blocks
preserve lesson identity

TARGET:
lesson.blocks = []
5. VALIDATED

STATUS: Semantic-safe lesson.

VALIDATION MUST CHECK:

structure
semantic integrity
compatibility
progression safety

VALIDATED lessons MAY enter runtime.

6. RUNTIME_READY

STATUS: Ready for runtime execution.

RUNTIME_READY MUST:

pass validation
pass compatibility checks
preserve runtime continuity
7. ACTIVE

STATUS: Live runtime lesson.

ACTIVE lessons MUST:

preserve compatibility
preserve runtime identity
preserve progression continuity
8. DEPRECATED

STATUS: Legacy lesson pending archive.

DEPRECATED lessons:

SHOULD remain compatible
SHOULD remain readable
MUST NOT corrupt runtime
9. ARCHIVED

STATUS: Frozen inactive lesson.

ARCHIVED lessons:

MUST preserve historical integrity
MUST preserve lesson metadata
SHOULD remain recoverable
10. MUTATION RULES

ALL mutations MUST:

preserve lesson identity
preserve canonical structure
preserve runtime compatibility
preserve progression continuity
11. COMPATIBILITY RULE

MOS360 MUST SUPPORT:

EVOLUTION WITHOUT REWRITE

New runtime capability MUST:

attach safely
preserve active lessons
preserve canonical contracts

12. FINAL LIFECYCLE PRINCIPLE

Lessons are:

EVOLVING SEMANTIC RUNTIME ENTITIES

NOT:
STATIC CONTENT FILES