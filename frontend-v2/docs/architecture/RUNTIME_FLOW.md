# MOS360 RUNTIME FLOW

# OFFICIAL FLOW

Google Sheet / CMS / Runtime Source
→ Normalize
→ Canonical Contract
→ Semantic Hydration
→ blocks[]
→ Renderer
→ Learn Page

---

# 1. INPUT LAYER

SOURCES:
- Google Sheet
- CMS
- Static Content
- Runtime Import
- API

RESPONSIBILITY:
raw human input

---

# 2. NORMALIZE LAYER

FILE:
lessonNormalizer.js

RESPONSIBILITY:
- trim
- cast type
- inject defaults
- hydrate semantic blocks
- canonicalize data

OUTPUT:
canonical lesson object

---

# 3. CANONICAL CONTRACT LAYER

OFFICIAL LESSON STANDARD:

{
  id,
  courseId,
  title,
  description,
  blocks: [],
  quiz: []
}

---

# 4. SEMANTIC BLOCK LAYER

OFFICIAL BLOCK MODEL:

{
  type,
  priority
}

SUPPORTED BLOCKS:
- text
- workflow
- tips
- practical
- resource
- checkpoint
- quiz
- continuity
- video

---

# 5. RENDER LAYER

FILE:
lessonBlockRendererEngine.js

RESPONSIBILITY:
semantic UI rendering

MUST NOT:
- normalize
- mutate data
- fetch data

---

# 6. PAGE COMPOSITION LAYER

FILE:
learnPage.js

RESPONSIBILITY:
- page orchestration
- layout composition
- runtime composition

MUST NOT:
- normalize lessons
- mutate blocks

---

# 7. IDENTITY RULES

COURSE:
course.id globally unique

LESSON:
courseId + lessonId

CORRECT:

lesson.id === lessonId
&&
lesson.courseId === courseId

---

# 8. FUTURE DIRECTION

TARGET:
block-native runtime lessons

FINAL TARGET:

{
  id,
  title,
  blocks:[]
}