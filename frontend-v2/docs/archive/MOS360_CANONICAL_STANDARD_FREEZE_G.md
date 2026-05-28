# MOS360 CANONICAL STANDARD FREEZE — PHASE G

## PURPOSE

Tài liệu này là:

* Source of Truth kiến trúc MOS360
* Runtime Canonical Standard
* Naming Standard
* Content Contract Standard
* Renderer Ownership Standard
* Runtime Identity Standard
* Phase Checkpoint Freeze

Mọi phase tiếp theo:

* H
* I
* J
* K

PHẢI tuân theo tài liệu này.

---

# 1. CORE ARCHITECTURE PRINCIPLE

MOS360 là:

```text
DATA-DRIVEN LEARNING PLATFORM
```

KHÔNG phải:

```text
STATIC FILE WEBSITE
```

---

# 2. CANONICAL RUNTIME FLOW

## OFFICIAL FLOW

```text
Google Sheet / CMS / Runtime Source
→ Normalize
→ Canonical Contract
→ Semantic Runtime Hydration
→ Blocks[]
→ Renderer
→ Learn Page
```

---

# 3. PHASE STATUS

## G.1 — Runtime Import Foundation

### STATUS

✅ DONE

### COMPLETED

* Google Sheet Import
* Runtime Storage
* Dynamic Course Import
* Dynamic Lesson Import
* Runtime Course Loading
* Runtime Lesson Loading

---

## G.2 — Canonical Semantic Runtime Foundation

### FOUNDATION STATUS

✅ DONE

### COMPLETED

* Canonical Lesson Schema
* Semantic Block Hydration
* Runtime Lesson Builder
* Block Renderer Pipeline
* Scoped Lesson Identity
* Runtime Semantic Flow

### NOT COMPLETED

❌ Cinematic Experience Parity
❌ Advanced Block Authoring
❌ Narrative Lesson Composition
❌ Visual Storytelling Engine

---

## PHASE H

### TARGET

Cinematic Block-Native Authoring System

### PLANNED

* Rich Semantic Blocks
* AI Lesson Builder
* Block-native CMS
* Visual Lesson Composer
* Cinematic Learning Flow
* Advanced Learning Narrative

---

# 4. CANONICAL COURSE CONTRACT

## REQUIRED

```js
{
  id,
  slug,
  title,
  description,
  category,
  level,
  xpReward,
  lessons: []
}
```

---

## OPTIONAL

```js
{
  thumbnail,
  duration,
  difficulty,
  tags,
  objectives,
  requirements,
  skills,
  learningOutcomes,
  version,
  status
}
```

---

# 5. CANONICAL LESSON CONTRACT

## OFFICIAL STANDARD

```js
{
  id,
  courseId,
  title,
  description,
  blocks: [],
  quiz: []
}
```

---

## REQUIRED

```js
{
  id,
  courseId,
  title,
  order,
  xpReward
}
```

---

## OPTIONAL

```js
{
  description,
  duration,
  difficulty,
  videoUrl,
  tags,
  objectives,
  resources,
  workflowSteps,
  tips,
  practicalContent,
  commonMistakes,
  version
}
```

---

# 6. LESSON ARCHITECTURE STANDARD

## OFFICIAL MODEL

```text
BLOCK-NATIVE LESSON MODEL
```

---

## STANDARD

```js
lesson.blocks = []
```

Mọi lesson cuối cùng PHẢI hydrate thành:

```js
blocks: []
```

---

## LEGACY TEMPLATE-FIRST

Ví dụ:

```js
workflowSteps
tips
resources
```

chỉ là:

```text
LEGACY COMPATIBILITY LAYER
```

---

# 7. CANONICAL BLOCK CONTRACT

## STANDARD

```js
{
  type,
  priority
}
```

---

## TEXT BLOCK

```js
{
  type: "text",
  priority,
  content
}
```

---

## WORKFLOW BLOCK

```js
{
  type: "workflow",
  priority,
  title,
  steps: []
}
```

---

## TIPS BLOCK

```js
{
  type: "tips",
  priority,
  title,
  items: []
}
```

---

## PRACTICAL BLOCK

```js
{
  type: "practical",
  priority,
  content
}
```

---

## RESOURCE BLOCK

```js
{
  type: "resource",
  priority,
  resources: []
}
```

---

## CHECKPOINT BLOCK

```js
{
  type: "checkpoint",
  priority,
  title,
  message
}
```

---

# 8. OFFICIAL BLOCK TYPES

## CURRENTLY APPROVED

```text
text
workflow
tips
practical
resource
checkpoint
video
quiz
reinforcement
continuity
```

---

## FUTURE BLOCK TYPES

```text
summary
exercise
callout
mindset
story
challenge
simulation
interactive
```

---

# 9. LESSON IDENTITY RULE

## OFFICIAL STANDARD

```text
courseId + lessonId
```

---

## WRONG

```text
lessonId globally unique
```

---

## CORRECT

```js
lesson.id === lessonId
&&
lesson.courseId === courseId
```

---

# 10. COURSE IDENTITY RULE

## STANDARD

```text
course.id globally unique
```

---

# 11. NAMING STANDARD

## OFFICIAL STYLE

```text
camelCase
```

---

## CORRECT

```text
courseId
lessonId
videoUrl
workflowSteps
progressPercent
runtimeBlocks
```

---

## FORBIDDEN

```text
course_id
lessonID
VideoURL
workflow_steps
runtime_blocks
```

---

# 12. RUNTIME IMPORT RULE

## GOOGLE SHEET

Google Sheet là:

```text
HUMAN INPUT LAYER
```

KHÔNG phải:

```text
CANONICAL SYSTEM LAYER
```

---

## RUNTIME ENGINE PHẢI:

* normalize
* trim
* cast type
* inject defaults
* validate
* hydrate semantic blocks

---

# 13. RENDER OWNERSHIP

## learnPage.js

### RESPONSIBILITY

* page orchestration
* runtime composition
* hero composition
* layout composition

### MUST NOT

* normalize data
* mutate lesson structure
* build blocks

---

## lessonNormalizer.js

### RESPONSIBILITY

* canonical lesson hydration
* semantic block creation
* legacy compatibility

### MUST NOT

* render UI
* fetch API

---

## lessonBlockRendererEngine.js

### RESPONSIBILITY

* render blocks
* semantic UI rendering

### MUST NOT

* normalize lessons
* mutate runtime

---

## contentSourceEngine.js

### RESPONSIBILITY

* runtime content loading
* content source orchestration
* lesson lookup
* course lookup

### MUST NOT

* render blocks
* mutate UI

---

# 14. FOLDER OWNERSHIP

## engines/

Runtime orchestration logic

## content/

Static content & manifests

## renderers/

UI rendering engines

## pages/

Route-level composition

## layouts/

Global layout system

## runtime/

Dynamic runtime systems

## contracts/

Canonical schemas

---

# 15. RENDER PRINCIPLES

## OFFICIAL RULE

```text
ONE PRIMARY FOCUS PER VIEWPORT
```

---

## FORBIDDEN

* endless card stacking
* duplicate continuity sections
* duplicate workflow sections
* repeated reinforcement blocks
* giant wall-of-content pages

---

## LEARN PAGE TARGET FLOW

```text
Hero
→ Video
→ Workflow
→ Tips
→ Practice
→ Resources
→ Quiz
→ Checkpoint
```

---

# 16. UI PRINCIPLES

## TARGET EXPERIENCE

```text
CLEAN
FOCUSED
PRACTICAL
MOMENTUM-FIRST
```

---

## MUST AVOID

```text
feature spam
visual noise
repeated sections
over-engineered layouts
```

---

# 17. LEGACY COMPATIBILITY RULE

## LEGACY SUPPORT

Template-first lessons vẫn được support.

Nhưng:

```text
PHẢI hydrate thành blocks[]
```

trước khi render.

---

# 18. FUTURE CMS RULE

## OFFICIAL TARGET

Future CMS SHOULD write directly:

```js
blocks: []
```

---

## AVOID

```text
raw field rendering
```

---

# 19. AI DEVELOPMENT RULES

## AI MUST NOT

* guess variable names
* guess architecture
* guess ownership layers
* invent contracts
* create duplicate runtime systems

---

## AI MUST

1. inspect tree structure
2. inspect canonical contracts
3. inspect ownership layer
4. inspect runtime flow
5. modify only responsible layer

---

# 20. PHASE EVOLUTION STRATEGY

## OFFICIAL STRATEGY

```text
STABILIZE
→ FREEZE
→ EXTEND
```

NOT:

```text
REWRITE EVERYTHING
```

---

# 21. MOS360 ARCHITECTURE DIRECTION

## CURRENT STATE

```text
Prototype → Runtime Platform Transition
```

---

## TARGET STATE

```text
Semantic Learning Runtime Platform
```

---

# 22. MOST IMPORTANT PRINCIPLE

## BEFORE BUILDING ANYTHING

ALWAYS IDENTIFY:

1. Input Contract
2. Canonical Contract
3. Runtime Ownership
4. Render Ownership
5. Existing Runtime Flow

---

# 23. FINAL PHASE G CHECKPOINT

## COMPLETED

✅ Runtime Import System
✅ Canonical Runtime Foundation
✅ Semantic Block Hydration
✅ Runtime Lesson Loading
✅ Scoped Lesson Identity
✅ Dynamic Course Runtime
✅ Dynamic Lesson Runtime
✅ Block Renderer Runtime

---

## NEXT PHASE

```text
PHASE H
Cinematic Block-Native Authoring System
```

---

# END OF FREEZE

This document becomes the official architectural source of truth for MOS360 after Phase G.
