# MOS360
# COMPOSER LIFECYCLE

STATUS:
🔄 ACTIVE FREEZE

PURPOSE:
Định nghĩa:
- authoring lifecycle
- draft lifecycle
- preview lifecycle
- publish lifecycle
- mutation flow
- runtime-safe composition

để:
future composer evolve an toàn
và không phá semantic runtime.

---

# 1. OFFICIAL COMPOSER FLOW

```text
Create Draft
→ Edit Blocks
→ Validate
→ Runtime Preview
→ Save Draft
→ Publish
→ Runtime Persistence
→ Learn Runtime

2. DRAFT STATE

DRAFT là:

TEMPORARY AUTHORING STATE

DRAFT MAY:

incomplete
partially validated
experimental
work-in-progress

DRAFT MUST NOT:

bypass validation on publish
mutate production runtime directly
3. EDITING FLOW

Editing MUST happen through:

semantic blocks
sequencing controls
progression-aware composition

NOT:

raw HTML editing
direct renderer mutation
4. VALIDATION FLOW

Every publish MUST:

validate lesson structure
validate semantic blocks
validate compatibility
validate progression continuity

IF validation fails:

reject publish
preserve previous runtime
5. PREVIEW FLOW

Preview MUST simulate:

runtime pacing
sequencing rhythm
continuity transitions
learning momentum

Preview MUST NOT:

mutate persisted runtime
overwrite production lessons
6. SAVE STRATEGY

Composer SHOULD support:

draft save
temporary state recovery
mutation history
snapshot recovery
7. PUBLISH STRATEGY

Publishing MUST:

preserve lesson identity
preserve compatibility
preserve semantic integrity

Publishing MUST NOT:

overwrite runtime blindly
bypass governance layer
8. VERSION STRATEGY

Every publish SHOULD eventually support:

semantic versioning
lesson history
rollback
evolution tracking
9. BLOCK EVOLUTION RULE

Blocks MAY evolve:

visually
structurally
semantically

BUT MUST:

preserve compatibility
preserve runtime meaning
10. FINAL PRINCIPLE

MOS360 Composer SHOULD ALWAYS FEEL:

LIGHTWEIGHT
FOCUSED
FLOW-FIRST
PROGRESSION-FIRST

NOT:

ENTERPRISE CMS

---

# KẾT QUẢ ĐẠT ĐƯỢC

MOS360 giờ đã có:
# composer lifecycle foundation

↓

Đây là nền cho:
- future draft system
- preview engine
- publish workflow
- visual composer
- AI-assisted authoring
- mutation safety

↓

và quan trọng nhất:
composer sẽ không drift thành:
# “CMS editor truyền thống”.